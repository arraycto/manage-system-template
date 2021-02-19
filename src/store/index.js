import Vue from 'vue'
import Vuex from 'vuex'

import user from './User/index'
import demo from './Demo/index'
  
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    ...user,
    ...demo
  }
})
