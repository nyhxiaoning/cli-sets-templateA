import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';

const LoginView = () => import('@/views/login_view/index.vue');

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'Login',
    component: LoginView,
    meta: {
      title: '登录'
    }
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

router.beforeEach(async to => {
  // 为了避免每一次跳转刷新页面 paramsMenuId 丢失，
  localStorage.setItem('paramsMenuId', JSON.stringify(to.params));
  //如果页面不在登录页，且token不存在的话。则进入登录页
  const pageList = ['/login', '/register', '/password_reset', '/setting'];
  if (pageList.indexOf(to.path) == -1) {
    router.replace('/login');
  } else if (pageList.indexOf(to.path) == -1 && to.path !== '/cjqy') {
    // 创建企业
    // const value = sessionStorage.getItem('company');
    // let company = JSON.parse(value!) as Array<any>;
    // if (!company) {
    //   sessionStorage.setItem('company', JSON.stringify(company));
    // }
    // if (company.length == 0) {
    //   router.replace('/cjqy');
    // }
  }

  if (to.meta.title) {
    document.title = to.meta.title as string;
  }
});

export default router;
