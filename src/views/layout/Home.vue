<template>
  <!-- 渲染主页面 -->
  <div id="home">
    <!-- 适配IE的布局 -->
    <div v-if="isIE" class="ie-page-cont" :style="{width: pageWidth + 'px'}">
      <Header style="height: 75px; margin-bottom: 10px;box-shadow: 0 0 6px 0;border-bottom: 1px solid rgba(59,52,83,0.12);">

        <Head :title="title" :userName="userName" @on-logout="logoutHandler"></Head>
      </Header>
      <div class="ie-cont-box">
        <div class="ie-menu-item">
          <Menu :menuListData="menuList"></Menu>
        </div>
        <div class="ie-cont-item" :style="{width: (pageWidth - menuWidth) + 'px', background: rgb(242, 245, 247)}">
          <router-view></router-view>
        </div>
      </div>
    </div>
    <!-- 非IE浏览器的布局 -->
    <Layout v-else class="no-ie-page">
      <Sider v-show="menuShow">
        <Menu :menuListData="menuList" :menuState="menuShow" @hideMenu="toggleMenuHandler"></Menu>
      </Sider>
      <Layout class="layout">
        <Header class="header">
          <Head :title="title" :menuState="menuShow" :userName="userName" :tabsList="tabsList" @on-logout="logoutHandler" @show-menu="toggleMenuHandler">
          </Head>
        </Header>
        <div class="content">
          <router-view></router-view>
        </div>
      </Layout>
    </Layout>
  </div>
</template>

<script>
import Head from '@/components/HeadUI'
import Menu from '@/components/MenuUI'
import { mapActions, mapState } from 'vuex'
export default {
  data () {
    return {
      title: '外部数据管理平台', // 项目名称
      isIE: false,
      menuShow: true,
      tabsList: [],
      pageWidth: 1024,
      menuWidth: 320
    }
  },
  components: {
    Head,
    Menu
  },
  computed: {
    ...mapState('user', ['userName', 'menuList']),
    routeName () {
      return this.$route.name // 监控路由
    }
  },
  methods: {
    ...mapActions('user', ['getUserInfo', 'logoutHandler', 'modifyMenuState']),
    isIEHandler () {
      let userAgent = navigator.userAgent
      let isIE = userAgent.indexOf('compatible') > -1 && userAgent.indexOf('MSIE') > -1
      if (isIE) {
        let reIE = new RegExp('MSIE (\\d+\\.\\d+);')
        reIE.test(userAgent)
        let ieVer = parseFloat(RegExp['$1'])
        if (ieVer < 11) {
          return true
        }
      } else {
        return false
      }
    },
    toggleMenuHandler (iShow) {
      this.menuShow = iShow
      this.modifyMenuState({ menuState: iShow })
    }
  },
  created () {
    this.pageWidth = window.screen.width
    this.isIE = this.isIEHandler()

    this.getUserInfo().then(() => {
      if (!this.userName) {
        this.logoutHandler()
      }
    }).catch(err => {
      this.logoutHandler()
      this.$Message.error('请重新登录' || err)
    })

    // 配置信息展示时长
    this.$Message.config({
      duration: 3
    })
  }
}
</script>

<style lang="less">
#home {
  width: 100%;
  height: 100%;
  .ivu-layout-header,
  .ivu-layout-sider {
    background-color: #fff;
  }
  .ie-page-cont {
    height: 100%;
    margin: 0 auto;
    overflow-x: auto;
    .ie-cont-box {
      width: 100%;
      height: 90%;
      .ie-menu-item {
        width: 180px;
        height: 100%;
        float: left;
        background: #fff;
      }
      .ie-cont-item {
        margin: 30px;
        float: left;
      }
    }
  }
  .no-ie-page {
    width: 100%;
    height: 100%;
    .layout {
      position: relative;
      height: 100%;
      .header {
        height: 56px; 
        box-shadow: 0 0 6px 0;
        border-bottom: 1px solid rgba(59,52,83,0.12);
      }
      .content {
        height: 100%; 
        padding: 20px 40px; 
        background: rgb(242, 245, 247); 
        overflow-x: hidden;
      }
    }
  }
}
</style>
