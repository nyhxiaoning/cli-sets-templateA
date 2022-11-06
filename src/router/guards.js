import { hasAuthority } from '@/utils/authority-utils'
import { loginIgnore } from '@/router/index'
// import {checkAuthorization} from '@/utils/request'
// import NProgress from 'nprogress'
// import { setTimeFunc } from '@/utils/util'

// setTimeFunc()
// NProgress.configure({ showSpinner: false })

/**
 * 进度条开始
 * @param to
 * @param form
 * @param next
 */
// const progressStart = (to, from, next) => {
//   // start progress bar
//   if (!NProgress.isStarted()) {
//     NProgress.start()
//   }
//   next()
// }
/**
 * 增加一个白名单机制，如果是这个白名单的路由，不会进行校验
 * 
 */
/**
 * 登录守卫
 * @param to
 * @param form
 * @param next
 * @param options
 */
const loginGuard = (to, from, next, options) => {
  const { message } = options
  console.log(" 11111111111111111当前的值💡 ", to, from, '看看路由是否合理，如果是测试路由或是不需要权限，那么直接放过', to.meta.whiteFlag, '此时的路由标记');
  let userInfor = JSON.parse(localStorage.getItem('userInfor'));
  if (to.meta.whiteFlag) {
    next()
  } else {
    if (!loginIgnore.includes(to) && !userInfor) {
      message.warning('登录已失效，请重新登录')
      next({ path: '/login' })
    } else {
      next()
    }
  }

}



/**
 * 权限守卫
 * @param to
 * @param form
 * @param next
 * @param options
 */
const authorityGuard = (to, from, next, options) => {
  console.log(" 00000权限守卫相关当前的值💡 ", to, from, '看看路由是否合理，如果是测试路由或是不需要权限，那么直接放过');
  const { store, message } = options
  const permissions = store.getters['account/permissions']
  const roles = store.getters['account/roles']
  if (to.fullPath !== '/login') {
    if (!hasAuthority(to, permissions, roles)) {
      message.warning(`对不起，您无权访问页面: ${to.fullPath}，请联系管理员`)
      next({ path: '/login' })
      // NProgress.done()
    } else {
      next()
    }
  } else {
    next()
  }
}

/**
 * 混合导航模式下一级菜单跳转重定向
 * @param to
 * @param from
 * @param next
 * @param options
 * @returns {*}
 */
const redirectGuard = (to, from, next, options) => {
  const { store } = options
  const getFirstChild = (routes) => {
    const route = routes[0]
    if (!route.children || route.children.length === 0) {
      return route
    }
    return getFirstChild(route.children)
  }
  if (store.state.setting.layout === 'mix') {
    const firstMenu = store.getters['setting/firstMenu']
    if (firstMenu.find(item => item.fullPath === to.fullPath)) {
      store.commit('setting/setActivatedFirst', to.fullPath)
      const subMenu = store.getters['setting/subMenu']
      if (subMenu.length > 0) {
        const redirect = getFirstChild(subMenu)
        return next({ path: redirect.fullPath })
      }
    }
  }
  next()
}

/**
 * 进度条结束
 * @param to
 * @param form
 * @param options
 */
// const progressDone = () => {
//   // finish progress bar
//   NProgress.done()
// }

export default {
  beforeEach: [loginGuard, authorityGuard, redirectGuard],
  afterEach: []
}
