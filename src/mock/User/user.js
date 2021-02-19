import { getParams } from '@/libs/util'

// 获取登录用户信息
export const getUserInfo = (req) => {
  req = getParams(req.body)
  let data = {
    name: 'admin',
    isAdmin: true,
    menuList: [
      {
        title: '使用中心',
        menuName: 'userCenter',
        type: 'user',
        subMenuList: [
          {
            menuTitle: '使用示例',
            routeName: 'demo',
            routePath: '/demo',
            tabsList: [
              {
                name: 'form',
                label: 'FormUI'
              },
              {
                name: 'table',
                label: 'TableUI'
              },
              {
                name: 'search',
                label: 'SearchUI'
              }
            ]
          },
          {
            menuTitle: '权限管理',
            routeName: 'accessManage',
            routePath: '/accessManage'
          }
        ]
      },
      {
        title: '管理中心',
        menuName: 'manageCenter',
        type: 'manage',
        subMenuList: [
        ]
      }
    ]
  }
  return {
    code: 200,
    msg: 'ok',
    data
  }
}

export const login = (req) => {
  req = getParams(req.body)
  return {
    code: 200,
    msg: 'ok',
    data: '登录成功'
  }
}

export const logout = (req) => {
  return {
    code: 200,
    msg: 'ok',
    data: '登出成功'
  }
}

export const getAccess = (req) => {
  const reqBody = JSON.parse(req.body)
  let data = {
    newAccess: true,
    menuUrl: reqBody.menuUrl
  }
  return {
    code: 200,
    msg: 'ok',
    data
  }
}
