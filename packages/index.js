// TODO:专门定义个文件作为导出组件打包的方式


// 导入颜色选择器组件
import checkboxlib from './checkboxlib';

// 存储组件列表
const components = [
    checkboxlib
];

// TODO:新增一个自定义的组件


const install = Vue => {
    components.forEach(component => Vue.component(component.name, component));
};

export default {
    install,
    ...components
};