import { createRouter, createWebHashHistory } from 'vue-router';

import fixedRoutes from './modules/fixedRoutes';
import course from './modules/course';
import question from './modules/question';
import input from './modules/input';
// 添加动态菜单需要新增的页面路由TODO:新增了一个
// 过程性评价
import evaluate from './modules/evaluate';

// TODO:新增一个a-upload的模拟字节的上传组件图片
import filedrop from './modules/filedrop';
// 动态菜单 添加新页面
export const asyncRoutes = [...course, ...question, ...input, ...evaluate,...filedrop];

const router = createRouter({
  history: createWebHashHistory(),
  routes: [...fixedRoutes, ...asyncRoutes],
  scrollBehavior(to: any, from: any, savedPosition: any) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { left: 0, top: 0 };
    }
  }
});

export default router;
