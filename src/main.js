// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// TODO:引入polifill文件
// import '@babel/polyfill';
// TODO：如果vue.config.js中
import Vue from 'vue';
import App from './App';
// import mock from './mock/index.js';
// 引入当期的svg组件必要的依赖和组件
import "@/icons";//TODO:引入所有的svg图标
import iconSvg from "components/icon-svg.vue";
import router from './router';
import store from './store/index';
import Vant from 'vant';
import 'vant/lib/index.css';
import { Icon } from 'vant';
import { DatetimePicker } from 'vant';
import { Popup } from 'vant';

// TODO:引入plugins插件自定义实现
import plugins from "./utils/plugins";
import plugins1 from "./utils/plugins1";

import './assets/css/hackcss.css';

// 性能考虑不适用antd的全局引入
// import Antd from 'ant-design-vue';
// import 'ant-design-vue/dist/antd.css';
// Vue.use(Antd);
// 局部引入ant-design的按钮样式自己实现的样式有一些不精致
import { Radio } from 'ant-design-vue';
Vue.use(Radio);
Vue.use(Vant);
Vue.use(Icon);
Vue.use(DatetimePicker);
Vue.use(Popup);
// TODO:
Vue.use(plugins, 1, 3, 333);
Vue.use(plugins1, 1, 3, 333);
// Vue.use(mock);
Vue.component("icon-svg", iconSvg);


Vue.config.productionTip = false;

Vue.prototype.$patientobj = "";
Vue.prototype.$YearDay = new Date().getDate();
console.log('-----------------------------------------');

/* eslint-disable no-new */
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");

// 时间轴，质控兄弟组件传值
// Vue.prototype.bus = new Vue();


