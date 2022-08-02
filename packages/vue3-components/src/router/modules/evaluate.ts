export default [
  {
    path: '/evaluate',
    component: () => import('@/components/layout/index.vue'),
    name: 'evaluate',
    meta: {
      title: '过程性评价'
    },
    children: [
      {
        // TODO:默认只解析第一个路由
        path: '',
        // TODO:路由如果要渲染，不只是有路径，需要有name
        // TODO:路由如果要渲染，不只是有路径，需要有name
        // TODO:路由如果要渲染，不只是有路径，需要有name
        // TODO:路由如果要渲染，不只是有路径，需要有name
        name: 'list'
        // TODO:案例1：获取周课表内容学习
        // TODO:案例2：获取日课表内容
        // component: () => import('@/components/evaluate/day.vue')
      },
      {
        path: '/evaluate/week',
        name: '周课程表',
        component: () => import('@/views/evaluate/week.vue'),
        meta: {
          title: '周课程表'
        },
        hidden: true
      }
      // {
      //   path: '/evaluate/day',
      //   name: '日课程表',
      //   component: () => import('@/views/evaluate/day.vue'),
      //   meta: {
      //     title: '日课程表',
      //   },
      //   hidden: true,
      // },
      // {
      //   path: '/evaluate/comment',
      //   name: '随堂点评数据',
      //   component: () => import('@/views/evaluate/comment.vue'),
      //   meta: {
      //     title: '随堂点评数据',
      //   },
      //   hidden: true,
      // },
      // {
      //   path: '/evaluate/classes',
      //   name: '班级统计',
      //   component: () => import('@/views/evaluate/classes.vue'),
      //   meta: {
      //     title: '班级统计',
      //   },
      //   hidden: true,
      // },
    ]
  }
];
