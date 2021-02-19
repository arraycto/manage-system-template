export default [
  {
    path: '/demo',
    name: 'demo',
    meta: {
      name: 'demo',
      menuName: 'userCenter',
      ifParent: true
    },
    component: () =>
      import(/* webpackChunkName: "demo" */ '@/views/pages/Demo/Main.vue'),
    children: [
      {
        path: 'form',
        name: 'form',
        meta: {
          name: 'demo',
          menuName: 'userCenter'
        },
        component: () =>
          import(
            /* webpackChunkName: "form" */ '@/views/pages/Demo/FormDemo.vue'
          )
      },
      {
        path: 'table',
        name: 'table',
        meta: {
          name: 'demo',
          menuName: 'userCenter'
        },
        component: () =>
          import(
            /* webpackChunkName: "table" */ '@/views/pages/Demo/TableDemo.vue'
          )
      },
      {
        path: 'search',
        name: 'search',
        meta: {
          name: 'demo',
          menuName: 'userCenter'
        },
        component: () =>
          import(
            /* webpackChunkName: "search" */ '@/views/pages/Demo/SearchDemo.vue'
          )
      }
    ]
  }
]
