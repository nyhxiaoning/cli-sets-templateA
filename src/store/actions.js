/*
 * @Author: your name
 * @Description: 存放可以通过全局异步修改的函数
 */

export default {
  // 异步状态值设置
  setAsyncState ({ commit }, data) {
    commit('setAsyncState', data);
  }
};
