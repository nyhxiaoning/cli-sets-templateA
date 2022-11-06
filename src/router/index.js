import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/page/home/Home';
import { Toast } from 'vant';
Vue.use(Router);

const router = new Router({
    mode: "hash",
    routes: [
        {
            path: '/home',
            name: 'home',
            component: Home
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('@/page/Login')
        },
        {
            path: '/',
            redirect: '/login',
        },
        // 设置
        {
            path: '/set',
            name: 'set',
            component: () => import('@/page/Set')
        },
        // 消息
        {
            path: '/message',
            name: 'message',
            component: () => import('@/page/Message')
        },
        // 我的
        {
            path: '/mine',
            name: 'mine',
            component: () => import('@/page/Mine')
        },
        // 添加
        {
            path: '/add',
            name: 'add',
            component: () => import('@/page/Add')
        },
        // 急救
        {
            path: '/jjiu',
            name: 'jjiu',
            component: () => import('@/page/Jjiu')
        },
        // 转归
        {
            path: '/zgui',
            name: 'zgui',
            component: () => import('@/page/Zgui')
        },
        // 检查
        {
            path: '/jcha',
            name: 'jcha',
            component: () => import('@/page/Jcha')
        },
        // 诊疗
        {
            path: '/zliao',
            name: 'zliao',
            component: () => import('@/page/Zliao')
        },
        // 导管室
        {
            path: '/dgshi',
            name: 'dgshi',
            component: () => import('@/page/Dgshi')
        },
        // 时间轴
        {
            path: '/time',
            name: 'time',
            component: () => import('@/page/Time')
        },
        // 病例
        {
            path: '/bingli',
            name: 'bingli',
            component: () => import('@/page/Bingli')
        },
        // 修改密码
        {
            path: '/password',
            name: 'password',
            component: () => import('@/page/Password')
        },
        {
            path: "/progressbar",
            name: "progressbar",
            component: () => import("@/components/pageprogress.vue")
        }
    ]
});
// 路由守卫
router.beforeEach((to, from, next) => {
    // TODO:权限控制页面这里，localStrage中的一个字段，如果不存在，
    // if (!(to.path === '/login')) {
    //     // 先拿到用户信息
    //     const user = JSON.parse(sessionStorage.getItem('user'));
    //     if (!user) {
    //         // 先轻提示，再跳转到登录页，要先登录，才能浏览页面
    //         Toast.fail('请先去登录');
    //         router.push('/login');
    //         return;
    //     }
    // }
    // 可以进去
    next();

});
// 导出路由
export default router;

