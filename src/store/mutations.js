/*
 * @Author: your name
 * @Description:存放同步修改的函数
 */











export default {
  // 修改全局login登录态的值
  setLoginState (state, loginState) {
    console.log('state1==', state.loginState);
    state.loginState = loginState;
    console.log('state2==', state.loginState);
  },


  // 接收异步状态值控制
  setAsyncState (state, data) {
    console.log('state', data);
    state.asyncState = data;
  }
};
