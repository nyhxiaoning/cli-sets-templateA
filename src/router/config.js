import TabsView from "@/layouts/tabs/TabsView";
import BlankView from "@/layouts/BlankView";
// import PageView from '@/layouts/PageView'

// 路由配置
const options = {
    routes: [{
        path: "/login",
        name: "登录页",
        component: () =>
            import("@/pages/login"),
    },
    // 增加个人测试vue2.6升级称为vue2.7后的test
    // TODO:路由中name使用路由名称，相关的路由名称的配置，使用meta元信息
    {
        path: "/testvue",
        name: "testvue",
        component: () => import("@/pages/vueTwoSeven/titleList.vue"),
        meta: {
            title: "测试页面test",
            whiteFlag: true,//默认是flase或是undefined,
        }
    },
    {
        path: "*",
        name: "404",
        component: () =>
            import("@/pages/exception/404"),
    },
    {
        path: "/403",
        name: "403",
        component: () =>
            import("@/pages/exception/403"),
    },
    {
        path: "manage/account-info",
        name: "账户信息",
        component: () =>
            import("@/pages/manage/account-info"),
    },
    {
        path: "/",
        component: TabsView,
        redirect: "/login",
        children: [{
            path: "application",
            name: "应用",
            meta: {
                icon: "code-sandbox",
                code: 'athletic_contest',

            },
            component: BlankView,
            children: [{
                path: "applicationDebugging",
                name: "应用调试",
                component: () =>
                    import("@/pages/application/applicationDebugging"),
                meta: {
                    code: 'cloud_game'
                },
            },
            {
                path: "addApplication",
                name: "新增应用",
                meta: {
                    invisible: true,
                    highlight: '/application/applicationDebugging',
                    page: {
                        breadcrumb: ['应用', '应用调试', '新增应用']
                    }
                },
                component: () =>
                    import(
                        "@/pages/application/applicationDebugging/addApplication"
                    ),
            },
            {
                path: "debugger",
                name: "应用调试",
                component: () =>
                    import(
                        "@/pages/application/applicationDebugging/debugger"
                    ),
                meta: {
                    highlight: "/application/applicationDebugging",
                    invisible: true
                },
            },
            ],
        },
        {
            path: "manage",
            name: "管理",
            meta: {
                icon: "code",
                code: 'manage',

            },
            component: BlankView,
            children: [{
                path: "deviceManage",
                name: "设备管理",
                component: () =>
                    import("@/pages/manage/deviceManage"),
                meta: {
                    code: 'cloud_game'
                },
            },
            {
                path: "deviceInfo",
                name: "设备信息",
                meta: {
                    invisible: true,
                    highlight: '/manage/deviceManage',
                    page: {
                        breadcrumb: ['管理', '设备管理', '']
                    }
                },
                component: () =>
                    import("@/pages/manage/deviceInfo"),
                // meta: {
                //     highlight: "/manage",
                //     invisible: true,
                // },
            },
                // {
                //   path: "detail",
                //   name: "检测详情",
                //   component: () =>
                //     import(
                //       "@/pages/testing/record/detail"
                //     ),
                //   meta: {
                //     highlight: "/testing/record",
                //     invisible: true,
                //   },
                // },
            ],
        }
        ],
    },
    ],
};

export default options;