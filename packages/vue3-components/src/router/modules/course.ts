export default [
  {
    path: '/course',
    component: () => import('@/components/layout/index.vue'),
    name: 'course',
    // course?id=903&kpId=905
    meta: {
      title: '备课管理'
    },
    icon: 'el-icon-location',
    children: [
      {
        path: '',
        name: '/course/systemCourse',
        component: () => import('@/views/course/systemCourse.vue'),
        meta: {
          title: '精品课件'
        }
      }
    ]
  }
  // 无法解析二级菜单的内容
  // {
  //   path: '/list2',
  //   name: 'list2',
  //   component: () => import('@/components/evaluate/list2.vue'),
  //   meta: {
  //     title: '任务列表'
  //   }
  // }
];
