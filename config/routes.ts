
export default [
  {
    path: '/entry',
    component: '../layouts/BlankLayout',
    routes: [
      {
        path: '/entry/input',
        component: './infomation',
      },
      {
        path: '/entry/result',
        component: './result',
        hideInMenu: true,
      },
    ],
  },
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      {
        name: 'login',
        path: '/user/login',
        component: './user/login',
      },
    ],
  },
  {
    path: '/',
    component: '../layouts/SecurityLayout',
    routes: [
      {
        path: '/',
        component: '../layouts/BasicLayout',
        routes: [
          {
            path: '/',
            redirect: '/welcome',
          },
          {
            path: '/welcome',
            name: '管理数据',
            icon: 'SnippetsOutlined',
            component: './welcome',
          },
        ]
      },

      {
        component: './404',
      },
    ]
  },
  {
    component: './404',
  },
];
