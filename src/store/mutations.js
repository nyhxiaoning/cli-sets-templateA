var mutations = {
    //左边导航栏列表
    SET_MENU: function (state, menu) {
        state.sidebarMenu = menu;
    },
    /* 完整的路由表 */
    SET_PERMISSION: function (state, routes) {
        state.permissionList = routes;
    },
    //当前选中的导航
    SET_CURRENT_MENU: function (state, currentMenu) {
        state.currentMenu = currentMenu;
    },
    //导航栏是否折叠
    toggleNavCollapse: function (state) {
        state.isSidebarNavCollapse = !state.isSidebarNavCollapse;
    },
    /* 面包屑导航列表 */
    setCrumbList: function (state, list) {
        state.crumbList = list;
    }
};
export default mutations;
//# sourceMappingURL=mutations.js.map