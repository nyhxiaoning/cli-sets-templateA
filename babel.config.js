
const pluginsLog = [];
// 生产环境移除console
if (process.env.NODE_ENV === 'production') {
    pluginsLog.push("transform-remove-console");
}
module.exports = {
    presets: [
        "@vue/cli-plugin-babel/preset",//TODO:解析babel中的es6语法将AST
        // "babel-preset-vue" //TODO: 解析vue相关语法
    ],
    plugins: [
        // TODO:支持一些小的功能插件，下面的第一个是将import进行转换，同时将ant-desigin中的语法进行降级
        [
            "import",
            { libraryName: "ant-design-vue", libraryDirectory: "es", style: 'css' }
        ],
        // TODO:新增移除打包console信息
        ...pluginsLog,
        //     ["@babel/ plugin-proposal-decorators", { "legacy": true }], //TODO:解析装饰器语法
        //     ["@babel/plugin-proposal-class-properties", { "loose": true }],//TODO:	解析es7中类的写法
        //     //TODO:避免重复引入兼容代码, 提取公共代码引入一次, 还需cnpm install--save @babel/runtime '@babel/plugin-transform-runtime',
        //     [
        //         '@babel/plugin-transform-runtime',
        //         {
        //             corejs: false, //TODO:？？？？？// !TODO:值为3或2, polyfill一些方法, 即promise等
        //             helpers: true, //TODO:工具函数
        //             regenerator: true, //TODO:Generator函数
        //             useESModules: true	//TODO:es6模块
        //         }
        //     ]
        // ]
    ]
};
