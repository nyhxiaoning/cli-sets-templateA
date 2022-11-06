import { createRouter, createWebHashHistory } from 'vue-router';

// TODO:实现vue3中，自动注册组件路由的实现，按照文件夹进行访问即可。

const modules = import.meta.globEager('../views/*/index.vue');
const routes = [];
for (const path in modules) {
  routes.push({
    path: `/${path.split('/')[2]}`,
    component: modules[path].default
  });
}

routes.unshift({
  path: '/',
  redirect: '/Home'
});

const router = createRouter({
  history: createWebHashHistory(),
  routes: routes
});

export default router;
