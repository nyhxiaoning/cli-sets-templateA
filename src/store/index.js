/*
 * @Author: your name
 * @Description: 管理vuex的入口文件
 * 在文件中定义好vuex,在main.js中统一管理全局引入的模块
 */

// 引入核心文件
import Vue from 'vue';//引入vue文件
import Vuex from 'vuex';//引入vuex文件

// 导入需要用到的模块
// import * as getters from './getters';
// import * as mutations from './mutations';
// mutations should be function but "mutations.default" is {}. 解决办法
import mutations from './mutations';
import actions from './actions';
// import * as actions from './actions';

// 给vue绑定一个vuex插件
Vue.use(Vuex);

// 声明全局需要用到的状态值
const state = {
  loginState: '',//这里仅仅存储一个登录态，以后用到自己加入
  asyncState: "",//尝试使用actions控制函数
};

// 将引入的模块注册到vuex中
const store = new Vuex.Store({
  state,
  // getters,
  actions,
  mutations
});

// 导出store模块
export default store;


