import Mock from 'mockjs'

import user from './User/index'
import demo from './Demo/index'

// 配置Ajax请求延时，可用来测试网络延迟大时项目中一些效果
Mock.setup({
  timeout: 0
})

const mockMapList = [].concat(user, demo)

mockMapList.forEach((item) => {
  Mock.mock(item[0], item[1])
})
