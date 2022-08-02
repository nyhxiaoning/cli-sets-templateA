// TODO:单文件是一个个的文件引入，也可以放在最外面访问直接全局的所有的文件，减少导入的次数
// const modulesFiles = require.context('./modules', true, /\.js$/) // webpack
// const modulesFiles = import.meta.globEager("./module/*.js") // vite
const files = import.meta.globEager('./*.ts');
const modules: any = {};
Object.keys(files).forEach((key: any) => {
     // 避免死循环
     if (key === './autofile.ts') { return; }
     modules[key.replace(/(\.\/|\.ts)/g, '')] = files[key];
});
export default modules;
