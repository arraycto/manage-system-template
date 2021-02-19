import '@babel/polyfill'
import Es6Promise from 'es6-promise'
import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store'
import './libs/iview.js'
import config from '@/config'

if (process.env.NODE_ENV !== 'production') require('@/mock')

Es6Promise.polyfill()

if (window.HTMLElement) {
	if (Object.getOwnPropertyNames(HTMLElement.prototype).indexOf('dataset') === -1) {
		Object.defineProperty(HTMLElement.prototype, 'dataset', {
			get: function () {
				var attributes = this.attributes
				var name = []
				var value = []
				var obj = {}

				for (var i = 0; i < attributes.length; i++) {
					if (attributes[i].nodeName.slice(0, 5) === 'data-') {
						name.push(attributes[i].nodeName.slice(5))
						value.push(attributes[i].nodeValue)
					}
				}

				for (var j = 0; j < name.length; j++) {
					obj[name[j]] = value[j]
				}
				return obj
			}
		})
	}
}

Vue.config.productionTip = false

Vue.prototype.$config = config

Vue.config.devtools = true

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
