const BASE_URL = process.env.NODE_ENV === 'production' ? '/static' : '/'

class HtmlOptionsAssetsWebpackPlugin {
  constructor (options = {}) {
    this.excludeCss = options.excludeCss || [] // 需要排除不必引用的css资源
  }

  apply (compiler) {
    const self = this
    compiler.hooks.compilation.tap('HtmlOptionsAssetsWebpackPlugin', (compilation) => {
      compilation.hooks.htmlWebpackPluginBeforeHtmlGeneration.tapAsync('HtmlOptionsAssetsWebpackPlugin', function (htmlPluginData, callback) {
        let assetsMap = {}
        for (let key in compilation.assets) {
          assetsMap[key.replace(/\?\S*/g, '')] = compilation.assets[key]
        }
        htmlPluginData.plugin.options.assets = assetsMap

        let includesCss = [...htmlPluginData.assets.css]
        for (var i = 0; i < self.excludeCss.length; i++) {
          var excludeCss = self.excludeCss[i]
          for (var j = 0; j < includesCss.length; j++) {
            if (includesCss[j].includes(excludeCss)) {
              includesCss.splice(j, 1)
            }
          }
        }
        htmlPluginData.assets.css = includesCss

        callback(null, htmlPluginData)
      })
      
      compilation.hooks.htmlWebpackPluginBeforeHtmlProcessing.tapAsync('HtmlOptionsAssetsWebpackPlugin', function (htmlPluginData, callback) {
        htmlPluginData.html = htmlPluginData.html.replace(/..\/..\/assets/g, './../assets')
        callback(null, htmlPluginData)
      })
    })
  }
}

module.exports = {
  publicPath: BASE_URL,
  outputDir: undefined,
  assetsDir: 'assets',
  runtimeCompiler: undefined,
  productionSourceMap: false,
  parallel: undefined,
  css: undefined,
  filenameHashing: false,
  configureWebpack: config => {
    config.entry.app = ['babel-polyfill', './src/main.js']
    // 拆包
    config.optimization = {
      splitChunks: {
        chunks: 'all',
        maxInitialRequests: Infinity,
        minSize: 300000,
        automaticNameDelimiter: '-',
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name (module) {
              const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1]
              return `chunk.${packageName.replace('@', '')}`
            },
            priority: 10
          }
        }
      }
    }
    if (process.env.NODE_ENV === 'production') {
      config.plugins.push(new HtmlOptionsAssetsWebpackPlugin({
        excludeCss: ['app.css', 'chunk.view-design.css']
      }))
    }
  },
  chainWebpack: config => {
    config.plugins.delete('prefetch')
    config.plugins.delete('preload')

    if (process.env.NODE_ENV === 'production') {
      // js 文件
      config
        .mode('production')
        .output
        .filename('assets/js/[name].js?v=[hash]')
        .chunkFilename('assets/js/[name].js?v=[hash]')
        .end()
      // css 文件 重命名
      config.plugin('extract-css').tap(args => {
        args[0].filename = 'assets/css/[name].css?v=[hash]'
        args[0].chunkFilename = 'assets/css/[name].css?v=[hash]'
        return args
      })
      // css 文件 压缩
      config.plugin('optimize-css-assets').use(require('optimize-css-assets-webpack-plugin'), [{
        assetNameRegExp: /\.css(.*)/i,
        cssProcessor: require('cssnano'),
        cssProcessorOptions: {
          preset: ['default', { discardComments: { removeAll: true } }]
        },
        canPrint: true
      }])
      config.module
        .rule('view-design')
        .test(/view-design.src.*?js$/)
        .use('babel')
          .loader('babel-loader')
          .end()
    }
  }
}
