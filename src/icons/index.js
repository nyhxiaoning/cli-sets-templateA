import Vue from "vue";
// import Icon from "components/icon-svg.vue";

// Vue.component("icon", Icon);

// TODO:利用reuqire.context导入函数
const requireAll = requireContext => requireContext.keys().map(requireContext);
// TODO:定义一个正则表达式，使用svg结尾的文件，全部loader进去
// TODO:第一个参数指定文件夹名称，第二个参数指定是否包含子文件夹，第三个正则
const req = require.context("./", false, /\.svg$/);

requireAll(req);