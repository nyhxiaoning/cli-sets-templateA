import 'virtual:windi-base.css';
import 'virtual:windi-components.css';
// 你自定义的 css
import './styles/main.css';
// TODO:引入路由
import router from '~/router';
import 'virtual:windi-utilities.css';
import 'virtual:windi-devtools';
import App from './App.vue';
// 引入vite-plugin-svg-icons
import 'virtual:svg-icons-register';
// icon-svg组件
import iconSvg from './components/SvgIcon/index.vue';
import { createPinia } from 'pinia';
// 引入持久化的pinia，刷新登录态或是头像不用重新获取
import piniaPersist from 'pinia-plugin-persist';

const app = createApp(App);
app.component('SvgIcon', iconSvg);
// 插件自动加载
const modules = import.meta.globEager('./modules/*.ts');
Object.values(modules).map(v => {
  v.default?.(app);
});
const pinia = createPinia();

pinia.use(piniaPersist);

app.use(pinia);
app.use(router);
// 注册pinia状态管理库
app.mount('#app');
