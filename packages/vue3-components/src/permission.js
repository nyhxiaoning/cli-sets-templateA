import router from "@/router";
import store from "@/store";

// TODO:权限判断的相关的内容，这里不做拦截，为了展示不同的组件
const WhiteList = ["login", "lock"];
router.beforeEach(async (to) => {
  document.title = to.meta.title ?? "用户登录";
  const token = store.state.common.token;
  if (WhiteList.includes(to.name)) {
    return true;
  }
  // TODO:暂时不做token权限校验，直接放行
  if (!token) {
    // return {
    //   name: "login",
    //   query: {
    //     redirect: to.fullPath,
    //   },
    //   replace: true,
    // };
  } else {
    let user = store.state.common.user;
    // if (!user) {
    //   try {
    //     user = await store.dispatch("common/getUserinfo");
    //   } catch (err) {
    //     return false;
    //   }
    // }
    // if (store.state.common.menus.length <= 0) {
    //   try {
    //     await store.dispatch("common/getMenus", user);
    //     return to.fullPath;
    //   } catch (err) {
    //     return false;
    //   }
    // }
  }
});
