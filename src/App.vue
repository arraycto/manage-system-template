<template>
  <div id="app">
    <!-- 渲染登录页面 -->
    <router-view v-if="!routeName || routeName === 'login'"></router-view>
    <!-- 渲染接口文档页面 -->
    <router-view v-else-if="routeName === 'interfaceDoc'"></router-view>
    <!-- 渲染主页面 -->
    <Home v-else ></Home>
  </div>
</template>

<script>
import Home from '@/views/layout/Home.vue'
export default {
  data () {
    return {}
  },
  components: {
    Home
  },
  computed: {
    routeName () {
      return this.$route.name // 监控路由
    }
  }
}
</script>

<style lang="less">
@import '~@/assets/common.less';

html,
body,
#app {
  width: 100%;
  height: 100%;
}
</style>
