import routerMap from './router.map'
import {parseRoutes} from '@/utils/routerUtil'
import TabsView from "@/layouts/tabs/TabsView";
import BlankView from "@/layouts/BlankView";
// 异步路由配置
const routesConfig = [
  'login',
  'root',
  {
    router: 'exp404',
    path: '*',
    name: '404'
  },
  {
    router: 'exp403',
    path: '/403',
    name: '403'
  }
]
// const routesConfig = [
//     {
//       path: "/login",
//       name: "登录页",
//       component: () => import("@/pages/login"),
//     },
//     {
//       path: "*",
//       name: "404",
//       component: () => import("@/pages/exception/404"),
//     },
//     {
//       path: "/403",
//       name: "403",
//       component: () => import("@/pages/exception/403"),
//     },
//     {
//       path: "system-settings/account-info",
//       name: "账户信息",
//       component: () => import("@/pages/system-settings/account-info"),
//     },
//     {
//       path: "/",
//       component: TabsView,
//       redirect: "/login",
//       children: [
//         {
//           path: "dashboard",
//           name: "仪表盘",
//           meta: {
//             icon: "dashboard",
//             code:'instrument_panel',
//             invisible: true,//
//           },
//           component: BlankView,
//           children: [
//             {
//               path: "workbench",
//               name: "工作台",
//               component: () => import("@/pages/dashboard/workbench"),
//               meta: {
//                 invisible: true,//
//                 code:'workbench'
//               },
//             },
//           ],
//         },
//         {
//           path: "sports-competition",
//           name: "体育比赛",
//           meta: {
//             icon: "trophy",
//             code:'athletic_contest',
//             invisible: true,//
//           },
//           component: BlankView,
//           children: [
//             {
//               path: "cloud-cmpetition",
//               name: "云比赛",
//               component: () =>
//                 import("@/pages/sports-competition/cloud-cmpetition"),
//                 meta: {
//                   invisible: true,//
//                   code:'cloud_game'
//                 },
//             },
//             {
//               path: "cloud-cmpetition/addMatch",
//               name: "创建比赛",
//               component: () =>
//                 import(
//                   "@/pages/sports-competition/cloud-cmpetition/addMatch"
//                 ),
//               meta: {
//                 highlight: "/sports-competition/cloud-cmpetition",
//                 invisible: true,
//               },
//             },
//             {
//               path: "cloud-cmpetition/editMatch",
//               name: "比赛详情",
//               component: () =>
//                 import(
//                   "@/pages/sports-competition/cloud-cmpetition/editMatch"
//                 ),
//               meta: {
//                 highlight: "/sports-competition/cloud-cmpetition",
//                 invisible: true,
//               },
//             },
//           ],
//         },

//         {
//           path: "system-settings",
//           name: "系统设置",
//           meta: {
//             icon: "setting",
//             code:'system_settings',
//             invisible: true,//
//           },
//           component: BlankView,
//           children: [
//             {
//               path: "member-manage",
//               name: "成员管理",
//               component: () => import("@/pages/system-settings/member-manage"),
//               meta: {
//                 invisible: true,//
//                 code:'users_management'
//               },
//             },
//             {
//               path: "member-manage/addMember",
//               name: "新增成员",
//               meta: {
//                 invisible: true,
//                 highlight: "/system-settings/member-manage",
//               },
//               component: () =>
//                 import("@/pages/system-settings/member-manage/addMember"),
//             },
//             {
//               path: "organize-manage",
//               name: "组织管理",
//               component: () =>
//                 import("@/pages/system-settings/organize-manage"),
//                 meta: {
//                   invisible: true,//
//                   code:'organizations_management'
//                 },
//             },
//             {
//               path: "organize-manage/editOrganize",
//               name: "新增成员",
//               meta: {
//                 invisible: true,
//                 highlight: "/system-settings/organize-manage",
//               },
//               component: () =>
//                 import("@/pages/system-settings/organize-manage/editOrganize"),
//             },
//           ],
//         },
//       ],
//     },
//   ]
;
const options = {
  routes: parseRoutes(routesConfig, routerMap)
}

export default options
