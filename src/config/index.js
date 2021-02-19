export default {
  /**
   * @description token在Cookie中存储的天数，默认1天
   */
  cookieExpires: 1,
  /**
 * @description api请求基础路径
 */
  baseUrl: {
    dev: '',
    pro: ''
  },
  /**
   * @description http请求成功状态码
   */
  successCode: 200,
  /**
   * @description http请求登录过期状态码
   */
  expiryStatus: 10006,
  /**
   * @description 登录页路由name,默认为 login
   */
  loginPage: 'login',
  /**
   * @description 默认打开的首页的路由name值，默认为home
   */
  homePage: 'demo',
  /**
   * @description 需要加载的插件
   */
  plugin: {}
}
