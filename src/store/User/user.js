import { getUserInfo, login, logout, getAccess } from '@/api/User/user.js'
import { setToken, delToken, getResponse } from '@/libs/util'
import config from '@/config'

const state = {
  userName: '',
  isAdmin: false,
  menuList: [],
  accessObj: {},
  menuState: ''
}

const mutations = {
  setUserInfo (state, data) {
    state.userName = data.name
    state.isAdmin = data.isAdmin
    state.menuList = data.menuList
  },
  setAccess (state, data) {
    const { menuUrl, newAccess } = data
    const arr = menuUrl.split('/')
    const name = arr[arr.length - 1]
    state.accessObj[name] = newAccess
  },
  setMenuState (state, iShow) {
    state.menuState = iShow
  }
}

const actions = {
  // 获取用户信息
  getUserInfo (context, req) {
    return getResponse(context, req, getUserInfo, 'setUserInfo')
  },
  // 获取用户新建权限
  getAccess (context, req) {
    return getResponse(context, req, getAccess, 'setAccess')
  },
  // 登录
  loginHandler ({ state, commit }, req) {
    return new Promise((resolve, reject) => {
      login(req).then(res => {
        const data = res.data
        if (+data.code === config.successCode) {
          setToken('token')
          resolve()
        } else {
          reject(data.msg)
        }
      }).catch(err => {
        reject(err)
      })
    })
  },
  // 退出登录
  logoutHandler ({ state, commit }, req) {
    return new Promise((resolve, reject) => {
      logout(req)
        .then(res => {
          const data = res.data
          if (+data.code === config.successCode) {
            delToken()
            if (location.hash.indexOf('user/login') === -1) {
              window.location.reload()
            }
            resolve()
          } else {
            reject(data.msg)
          }
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  modifyMenuState  ({ state, commit }, req) {
    return new Promise((resolve, reject) => {
      commit('setMenuState', req.menuState)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
