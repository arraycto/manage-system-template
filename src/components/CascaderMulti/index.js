import Vue from 'vue'
import CascaderMulti from './cascader-multi'
let vueIn = Vue

CascaderMulti.install = function (Vue) {
	vueIn.component(CascaderMulti.name, CascaderMulti)
}

export default CascaderMulti
