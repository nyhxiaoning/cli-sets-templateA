import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
// import ElementPlus from 'element-plus';
// import zhCn from 'element-plus/es/locale/lang/zh-cn';
// import 'element-plus/dist/index.css';
import '@/assets/css/global.less';
import "./type.ts";//扩展函数
import https from "@/utils/https/https";
import mitt from '@/utils//events/events';
import store from "@/store";
import { nextTick } from "vue";
import installIcons from '@/components/svg_icon/local_svg';


const init = async function () {
    const vm = createApp(App);
    installIcons(vm);
    vm.provide('https', https);
    vm.provide('emitter', mitt);
    // vm.provide('store', store);

    nextTick(() => {
        vm.config.globalProperties.$emitter = mitt;
    });
    vm.use(router);
    vm.use(store);
    // vm.use(ElementPlus, { locale: zhCn });
    vm.mount('#app');
};
init();