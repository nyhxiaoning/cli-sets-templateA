import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { emoji } from './directives/index';
import '@/common/styles/index.scss';
import { Circle, Switch, DatetimePicker, Form, Field, CellGroup, Image as VanImage } from 'vant';
const app = createApp(App);
// TODO:h5样式
import '@/common/styles/index.scss';
import '@/common/styles/public.scss';
import '@/common/styles/reset.scss';

import Vconsole from 'vconsole'; // 移动端控制台插件

// if (import.meta.env.MODE === 'dev') {
//   new Vconsole();
// }

app.directive('emoji', emoji);
app.use(router);
app.use(Circle);
app.use(Switch);
app.use(DatetimePicker);
app.use(Form);
app.use(Field);
app.use(CellGroup);
app.use(VanImage);

app.mount('#app');
