// TODO:
// const modulesFiles = require.context('./modules', true, /\.js$/) // webpack
// const modulesFiles = import.meta.globEager("./module/*.js") // vite
const files = import.meta.globEager('.ts');
const modules: any = {};
files.keys().forEach((key:any) => {
     if (key === './index.ts') { return; }
     modules[key.replace(/(\.\/|\.ts)/g, '')] = files(key).default;
});
export default modules;
