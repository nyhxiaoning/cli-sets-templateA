import { __awaiter, __generator, __spreadArray } from "tslib";
// 后端路由
import permissionList from "@/utils/permission";
import { setDefaultRoute } from "@/utils/recursion-router";
//固定路由
import router, { DynamicRoutes } from "@/router/index";
import view from "@/components/view/view.vue";
function typeOf(obj) {
    var toString = Object.prototype.toString;
    var map = {
        "[object Boolean]": "boolean",
        "[object Number]": "number",
        "[object String]": "string",
        "[object Function]": "function",
        "[object Array]": "array",
        "[object Date]": "date",
        "[object RegExp]": "regExp",
        "[object Undefined]": "undefined",
        "[object Null]": "null",
        "[object Object]": "object",
    };
    return map[toString.call(obj)];
}
function clone(data) {
    var t = typeOf(data);
    var o;
    if (t === "array") {
        o = [];
    }
    else if (t === "object") {
        o = {};
    }
    else {
        return data;
    }
    if (t === "array") {
        for (var i = 0; i < data.length; i++) {
            o.push(clone(data[i]));
        }
    }
    else if (t === "object") {
        for (var i in data) {
            o[i] = clone(data[i]);
        }
    }
    return o;
}
var actions = {
    FETCH_PERMISSION: function (_a) {
        var commit = _a.commit;
        return __awaiter(this, void 0, void 0, function () {
            var routes, MainContainer, children, initialRoutes;
            return __generator(this, function (_b) {
                routes = filterAsyncRouter(permissionList);
                MainContainer = clone(DynamicRoutes).find(function (v) { return v.path === ""; });
                children = [];
                children = MainContainer.children;
                //将两种路由结合生成左边的导航栏
                children = children.concat(routes);
                commit("SET_MENU", children);
                MainContainer.children = children;
                /*
                        为所有有children的菜单路由设置第一个children为默认路由
                        主要是供面包屑用，防止点击面包屑后进入某个路由下的 '' 路由,比如/manage/
                        而我们的路由是
                        [
                            /manage/menu1,
                            /manage/menu2
                        ]
                    */
                setDefaultRoute([MainContainer]);
                initialRoutes = router.options.routes;
                router.addRoute(MainContainer);
                /* 完整的路由表 */
                // @ts-ignore //忽略提示
                commit("SET_PERMISSION", __spreadArray(__spreadArray([], initialRoutes, true), DynamicRoutes, true));
                return [2 /*return*/];
            });
        });
    },
};
export var loadView = function (view) {
    return function () { return import("@/views/".concat(view)); };
};
//递归处理后端数据
function filterAsyncRouter(asyncRouterMap) {
    return asyncRouterMap.filter(function (route) {
        if (route.children) {
            route.component = view;
        }
        else {
            route.component = loadView(route.component);
        }
        ;
        if (route.children != null && route.children && route.children.length) {
            route.children = filterAsyncRouter(route.children);
        }
        else {
            delete route['children'];
            delete route['redirect'];
        }
        return true;
    });
}
;
export default actions;
//# sourceMappingURL=actions.js.map