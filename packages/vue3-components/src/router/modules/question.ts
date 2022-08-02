export default [
  {
    path: '/question',
    component: () => import('@/components/layout/index.vue'),
    name: 'question',
    meta: {
      title: '试卷'
    },
    icon: 'el-icon-location',
    children: [
      {
        path: '',
        name: '/question',
        component: () => import('@/views/question/index.vue'),
        meta: {
          title: '试卷'
        }
      }
    ]
  }
];
