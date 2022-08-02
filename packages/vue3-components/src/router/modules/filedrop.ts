export default [
    {
      path: '/filedrop',
      component: () => import('@/components/layout/index.vue'),
      name: 'filedrop',
      meta: {
        title: '文件上传和图片标记'
      },
      icon: 'el-icon-location',
      children: [
        {
          path: '',
          name: 'filedrop',
          component: () => import('@/views/fileDrop/index.vue'),
          meta: {
            title: '拖拽当前的文件'
          }
        },
        {
          path: '/filedrop/svg',
          name: 'svg',
          component: () => import('@/views/marker/index1.vue'),
          meta: {
            title: '拖拽当前的文件'
          }
        }
      ]
    }
  ];
  