export default {
  namespaced: true,
  state: {
    appId: localStorage.getItem('appId') || undefined,
    appCode: localStorage.getItem('appCode') || undefined,
    appInfo: localStorage.getItem('appInfo') || undefined
  },
  getters: {
    appId: state => {
      return state.appId
    },
    appCode: state => {
      return state.appCode
    },
    appInfo: state => {
      return state.appInfo
    }
  },
  mutations: {
    setAppId (state, appId) {
      state.appId = appId
      localStorage.setItem('appId', appId)
    },
    setAppCode (state, appCode) {
      state.appCode = appCode
      localStorage.setItem('appCode', appCode)
    },
    setAppInfo (state, appInfo) {
      state.appInfo = appInfo
      localStorage.setItem('appInfo', appInfo)
    }
  }
}
