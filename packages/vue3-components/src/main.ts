import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from '@/router';
// 样式初始化
import './assets/less/reset.less';
import './assets/less/common.less';
// 加载 element-plus
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';

import './assets/main.css';
// 自动导入svg-icon的解析器
import 'virtual:svg-icons-register';
// js版本// 引入svg图标注册脚本
// import 'vite-plugin-svg-icons/register'
// 案例可以看https://gitee.com/nyhxiaoning/nocompany-my-person-tob-sch

import * as Components from './global-component';
const app = createApp(App);

type obj = any[];
// 注册全局组件，包含svg的图标组件
console.log(
  '%c💡 Compoents当前的最新打印，用完删除',
  'background-color:blue;color:#fff',
  Components,
  'Object.entries(Components)',
  Object.entries(Components)
);
Object.entries(Components).forEach(([key, component]: obj) => {
  console.log(
    '%c💡 key,name当前的最新打印，用完删除',
    'background-color:blue;color:#fff',
    key,
    component,
    key,
    component
  );
  app.component(key, component);
  console.log(
    '%c💡 component当前的最新打印，用完删除',
    'background-color:blue;color:#fff',
    component,
    component
  );
});
// Object.entries((Components: any)).forEach((key,component) => {

// })
app.use(createPinia());
app.use(router);
app.use(ElementPlus);

app.mount('#app');
