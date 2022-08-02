export default [
    {
      path: '/input',
      component: () => import('@/components/layout/index.vue'),
      name: 'input',
      meta: {
        title: '试题录入'
      },
      icon: 'el-icon-location',
      children: [
        {
          path: '',
          name: '/input/index',
          component: () => import('@/views/input/index.vue'),
          meta: {
            title: '试题录入'
          }
        }
      ]
    }
  ];
  