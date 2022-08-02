const files = require.context('.', false, /\.ts$/);
const modules: any = {};
files.keys().forEach((key:any) => {
     if (key === './index.ts') { return; }
     modules[key.replace(/(\.\/|\.ts)/g, '')] = files(key).default;
});
export default modules;
