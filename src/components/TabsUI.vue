<template>
  <div>
    <div v-if="show" class="tabs-ui">
      <Tabs :value="tabsName" @on-click="tabChange" :class="{'tabs-mid-view': !menuShow}">
        <TabPane :label="item.label" :name="item.name" v-for="item in tabsList" :key="item.name"></TabPane>
      </Tabs>
      <div style="height: 100%;">
        <router-view style="height: 100%;"></router-view>
      </div>
    </div>
    <div v-else style="height: 100%;">
      <router-view style="height: 100%;"></router-view>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'Main',
  props: {
    // tab页结构
    tabsList: {
      type: Array,
      default: () => []
    },
    show: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      tabsName: '',
      menuShow: true,
      routeList: []
    }
  },
  watch: {
    $route (val) {
      if (val.name !== this.tabsName && this.routeList.includes(val.name)) {
        this.tabsName = val.name
      }
    },
    tabsList: {
      handler (val) {
        if (val) {
          this.routeList = []
          val.forEach(item => {
            this.routeList.push(item.name)
          })
        }
      },
      immediate: true
    },
    menuState (val) {
      this.menuShow = val
    }
  },
  computed: {
    ...mapState('user', ['menuState']),
    routeName () {
      return this.$route.name // 监控路由
    }
  },
  methods: {
    tabChange (name) {
      this.$router.push({
        name: name
      })
    }
  },
  created () {
    this.tabsName = this.$route.name
  }
}
</script>
<style lang="less" scoped>
.tabs-ui {
  height: 100%;

  /deep/ .ivu-tabs {
    position: absolute;
    top: 0;
    left: 30px;
    height: 56px;
    line-height: 56px;
    color: #605F6B;
    .ivu-tabs-bar {
      border-bottom: 0;
      /deep/ .ivu-tabs-tab-active {
        color: #3B3453;
        font-family: PingFangSC-Semibold;
      }
    }
    .ivu-tabs-ink-bar {
      height: 4px;
      background-color: #5C86FF;
    }
    .ivu-tabs-nav-scroll {
      font-size: 18px;
      line-height: 40px;
    }
  }
  .tabs-mid-view {
    left: 50%;
    transform: translate3d(-50%, 0, 0);
  }
}
</style>
