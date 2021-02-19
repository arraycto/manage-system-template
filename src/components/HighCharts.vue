<template>
  <div class="highcharts-ui" :style="styles"></div>
</template>

<script>
import Highcharts from 'highcharts/highstock'
import HighchartsMore from 'highcharts/highcharts-more'
import HighchartsDrilldown from 'highcharts/modules/drilldown'
import Highcharts3D from 'highcharts/highcharts-3d'
import elementResizeDetectorMaker from 'element-resize-detector'

HighchartsMore(Highcharts)
HighchartsDrilldown(Highcharts)
Highcharts3D(Highcharts)

export default {
  props: ['id', 'options', 'styles'],
  name: 'Highcharts',
  data () {
    return {
      chart: null
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  methods: {
    initChart () {
      let me = this
      // 将chart挂到全局
      this.chart = new Highcharts.Chart(this.$el, this.options)
      window[(me.id ? me.id : 'High') + 'Charts'] = this.chart
      this.chart.reflow()
      // 侧边栏收缩展开重新绘制图表
      var erd = elementResizeDetectorMaker()
      const chartBoxes = document.getElementsByClassName('highcharts-ui')
      new Array(chartBoxes).forEach(element => {
         erd.listenTo(element, () => {
         this.$nextTick(() => {
           this.chart.reflow()
         })
       })
      })
    }
  }
}
</script>
<style lang="less" scoped>
.highcharts-ui {
  width: 800px;
  height: 400px;
}
</style>
