export default [
  {
    path: '/user/login',
    name: 'login',
    meta: {
      name: 'login'
    },
    component: () => import(/* webpackChunkName: "login" */ '@/views/layout/Login')
  },
  {
    path: '/*',
    name: 'all',
    redirect: '/user/login',
    component: () => import(/* webpackChunkName: "login" */ '@/views/layout/Login')
  }
]
