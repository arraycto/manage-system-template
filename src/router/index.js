import Vue from 'vue'
import Router from 'vue-router'
import config from '@/config'
import store from '@/store'
import { getToken } from '../libs/util'

import login from './login'
import home from './home'

Vue.use(Router)

let routes = [].concat(home, login)

const router = new Router({
  mode: 'hash',
  routes,
  // 路由切换,页面滚动条自动回到顶部
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})

// 解决vue项目路由出现message: "Navigating to current location (XXX) is not allowed"的问题
const routerPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return routerPush.call(this, location).catch(error => error)
}

let getAccess = false // 为false时代表页面被刷新

function getUserAccess (to) {
  const menuList = store.state.user.menuList
  let routeAccess = true
  if (Object.keys(menuList).length) {
    // 查看当前跳转页面是否有访问权限
    const { name, menuName, ifParent, showMenu } = to.meta
    const toName = to.name
    let menudata = menuList.filter(item => item.menuName === menuName)
    let data = []
    if (menudata.length) {
      data = [].concat(menudata[0].subMenuList)
    }
    if (data.length > 0) {
      let arr = data.filter(item => item.routeName === name)
      data = [].concat(arr)
      if (data && data[0] && Object.keys(data[0]).length > 0) {
        if (ifParent) {
          routeAccess = true
        } else {
          routeAccess = data[0].tabsList.filter(item => item.name === toName).length > 0
        }
      } else {
        routeAccess = false
      }
    } else {
      routeAccess = false
    }
    if (showMenu === false) {
      routeAccess = true // 不需要菜单
    }
    getAccess = true
  }
  return routeAccess
}

router.beforeEach((to, from, next) => {
  let routeAccess = true
  if (to.name !== config.loginPage && getAccess) {
    routeAccess = getUserAccess(to)
  }
  const token = getToken()
  if (!token && to.name !== config.loginPage) {
    // 未登录且要跳转的页面不是登录页
    next({
      name: config.loginPage // 跳转到登录页
    })
  } else if (!token && to.name === config.loginPage) {
    // 未登陆且要跳转的页面是登录页
    next()
  } else if (token && to.name === config.loginPage) {
    // 已登录且要跳转的页面是登录页
    next({
      name: config.homePage
    })
  } else if (!routeAccess) {
    next({
      name: config.homePage
    })
  } else {
    let name = ''
    if (getAccess) { // 输入一级url重定向到tab页
      let data = store.state.user.menuList
        .filter(item => item.menuName === to.meta.menuName)[0].subMenuList
        .filter(item => item.routeName === to.name)[0]
      if (data && JSON.parse(JSON.stringify(data)).tabsList) {
        name = [].concat(JSON.parse(JSON.stringify(data)).tabsList)[0].name
      }
    }
    if (name) {
      next({ name })
    } else {
      next()
    }
  }
})

router.afterEach((to, from) => {
})

export default router
