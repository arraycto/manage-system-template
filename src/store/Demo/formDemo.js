import { getResponse } from '@/libs/util'
import { getFormData } from '@/api/Demo/formDemo.js'

const state = {
  formData: {}
}

const mutations = {
  formData (state, data) {
    state.formData = data
  }
}

const actions = {
  getFormData (context, req) {
    return getResponse(context, req, getFormData, 'formData')
  }
  
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
