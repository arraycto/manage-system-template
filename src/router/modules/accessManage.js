export default [
  {
    path: '/accessManage',
    name: 'accessManage',
    meta: {
      name: 'accessManage',
      menuName: 'userCenter',
      ifParent: true
    },
    component: () =>
      import(/* webpackChunkName: "demo" */ '@/views/pages/AccessManage/AccessManage.vue')
  }
]
