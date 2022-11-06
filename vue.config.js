const path = require('path');
// TODO:增加别名配置的方法
function resolve (dir) {
    return path.join(__dirname, dir);
}
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

// TODO:如果是分析每一个打包的时候的时间列表展示
const SpeedMesaurePlugin = require("speed-measure-webpack-plugin");

// TODO:引入移除最后的console.log
const TerserPlugin = require("terser-webpack-plugin");
// const smp = new SpeedMesaurePlugin({
//     compareLoadersBuild: {
//         filePath: "./buildInfo.json",
//     },
// });

// const smp = new SpeedMesaurePlugin();
// TODO:配置构建速度
// const webpackConfig = smp.wrap({
//     plugins: [new MyPlugin(), new MyOtherPlugin()],
// });
module.exports = {
    /** 区分打包环境与开发环境
     * process.env.NODE_ENV==='production'  (打包环境)
     * process.env.NODE_ENV==='development' (开发环境)
     * baseUrl: process.env.NODE_ENV==='production'?"https://xxx":'',
     */
    // 项目部署的基础路径
    // 我们默认假设你的应用将会部署在域名的根部,
    // 例如 https://www.my-app.com/
    // 如果你的应用部署在一个子路径下，那么你需要在这里
    // 指定子路径。比如将你的应用部署在
    // https://www.foobar.com/my-app/
    // 那么将这个值改为 '/my-app/'
    //baseUrl: '/',//vue-cli3.3以下版本使用
    publicPath: '/',//vue-cli3.3+新版本使用

    // 构建好的文件输出到哪里
    outputDir: "dist",

    // assetsDir: "base" //静态资源打包地址

    //以多页模式构建应用程序。
    pages: {
        index: {
            entry: "./src/main.js",
            template: "./index.html",
            filename: "index.html"
        }
    },

    // 是否在保存时使用‘eslint-loader’进行检查 // 有效值: true | false | 'error'
    // 当设置为‘error’时，检查出的错误会触发编译失败
    lintOnSave: false,

    // 使用带有浏览器内编译器的完整构建版本,是否使用包含运行时编译器的 Vue 构建版本
    runtimeCompiler: false,

    // babel-loader默认会跳过`node_modules`依赖. // 通过这个选项可以显示转译一个依赖
    // 默认babel-loader忽略mode_modules，这里可增加例外的依赖包名
    transpileDependencies: [],

    // 是否在构建生产包时生成 sourceMap 文件，false将提高构建速度  映射文件 打包时使用
    productionSourceMap: false,

    filenameHashing: true, // TODO:生成的静态资源在它们的文件名中包含了 hash 以便更好的控制缓存

    // 调整内部的webpack配置.
    // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
    // TODO:增加优化颗粒度大的配置内容chainWebpack，vue抽象的webpack配置
    chainWebpack: (config) => {
        // 配置别名
        config.resolve.alias
            .set('@', resolve('src'))
            .set('assets', resolve('src/assets'))
            .set('components', resolve('src/components'))
            // .set('views', resolve('src/views'))
            // .set('icons', resolve('src/icons'))
            .set('router', resolve('src/router'));
        // TODO:看一下每一个模块的bundle的打包大小，
        // TODO:这里是 plugin 而不是 plugins;
        // config.plugin("webpack-bundle-analyzer").use(BundleAnalyzerPlugin);
        // TODO：增加一个当前打包的时间
        config.plugin("speed-measure-webpack-plugin").use(SpeedMesaurePlugin);
        // TODO:    增加一处一些多余的打印的内容
        // 移除 prefetch 插件
        // 这里是 plugins 而不是 plugin;
        config.plugins.delete('prefetch-index');
        // // 移除 preload 插件，避免加载多余的资源
        config.plugins.delete('preload-index');
        // TODO:
        const svgRule = config.module.rule('svg');
        // 清除已有的所有 loader。
        // 如果你不这样做，接下来的 loader 会附加在该规则现有的 loader 之后。
        svgRule.uses.clear();
        svgRule
            .test(/\.svg$/)
            .include.add(resolve('./src/icon'))
            .end()
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            .tap(options => {
                options = {
                    symbolId: 'icon-[name]'
                };
                return options;
            });
        // config.optimization.minimize(true);
        // TODO:分包优化，会导致不同文件引入出现问题，慎用！！！！！！具体原理不上认知，
        // TODO：具体原因未知
        // config
        //     .optimization.splitChunks({
        //         chunks: 'all',
        //         cacheGroups: {
        //             libs: {
        //                 name: 'chunk-libs',
        //                 test: /[\\/]node_modules[\\/]/,
        //                 priority: 10,
        //                 chunks: 'initial' // only package third parties that are initially dependent
        //             },
        //             elementUI: {
        //                 name: 'chunk-elementUI', // split elementUI into a single package
        //                 priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
        //                 test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
        //             },
        //             echarts: {
        //                 name: 'chunk-echarts', // split echarts into a single package
        //                 priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
        //                 test: /[\\/]node_modules[\\/]_?echarts(.*)/ // in order to adapt to cnpm
        //             },
        //             commons: {
        //                 name: 'chunk-commons',
        //                 test: resolve('src/components'), // can customize your rules
        //                 minChunks: 3, //  minimum common number
        //                 priority: 5,
        //                 reuseExistingChunk: true
        //             }
        //         }
        //     });
    },
    // TODO：debug,console内容删除


    // chainWebpack: () => {
    //   // 删除懒加载模块的prefetch，降低带宽压力
    //   // 而且预渲染时生成的prefetch标签是modern版本的，低版本浏览器是不需要的
    //   //config.plugins.delete('prefetch');
    //   //if(process.env.NODE_ENV === 'production') {
    //   // 为生产环境修改配置...process.env.NODE_ENV !== 'development'
    //   //} else {
    //   // 为开发环境修改配置...
    //   //}
    // },
    // TODO:比较简单的webpack配置
    configureWebpack: {
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /(node_modules)/,
                    loader: 'babel-loader',
                    options: {
                        presets: [['@babel/preset-env', {
                            targets: {
                                chrome: '60',
                                firefox: '60',
                                ie: '9',
                                safari: '10',
                                edge: '19'
                            },
                            useBuiltIns: 'usage',//TODO: 按需加入
                            corejs: {
                                //TODO:指定core- js版本,值为3或2,polyfill一些方法,即promise等
                                version: 3
                            }
                        }]],
                    }
                }

            ]
            // rules: [
            //     {
            //         test: /\.js$/,
            //         exclude: /(node_modules|bower_components)/,
            //         loader: 'babel-loader',
            //         options: {
            //             presets: [['@babel/preset-env', { targets: "defaults" }]], //TODO:预设, 指示babel做兼容性处理, target可以指定版本等参数, 具体查看https://babeljs.io/docs/en/babel-preset-env#targets和https://github.com/babel/babel-loader
            //             cacheDirectory: true  //TODO:开启缓存
            //         }
            //     }
            // ]
        },
        // optimization: {
        //     minimize: true,
        //     minimizer: [
        //         new TerserPlugin({
        //             terserOptions: {
        //                 compress: {
        //                     warnings: false,
        //                     drop_console: process.env.NODE === 'developemnt' ? true : true,
        //                     drop_debugger: process.env.NODE === 'developemnt' ? true : true,
        //                     pure_funcs: ['console.log']
        //                 },
        //             },
        //         }),
        //     ],
        // },
    },
    // configureWebpack: () => {
    // // 生产and测试环境
    // let pluginsPro = [
    //   new CompressionPlugin({ //文件开启Gzip，也可以通过服务端(如：nginx)
    //     filename: '[path].gz[query]',
    //     algorithm: 'gzip',
    //     test: new RegExp('\\.(' + ['js', 'css'].join('|') + ')$'),
    //     threshold: 8192,
    //     minRatio: 0.8,
    //   }),
    //   new BundleAnalyzerPlugin(),
    // ];
    // //开发环境
    // let pluginsDev = [
    //   new vConsolePlugin({
    //     filter: [], // 需要过滤的入口文件
    //     enable: true // 发布代码前记得改回 false
    //   }),
    // ];
    // if (process.env.NODE_ENV === 'production') { // 为生产环境修改配置...process.env.NODE_ENV !== 'development'
    //   config.plugins = [...config.plugins, ...pluginsPro];
    // } else {
    //   // 为开发环境修改配置...
    //   config.plugins = [...config.plugins, ...pluginsDev];
    // }
    // },

    // CSS 相关选项
    css: {
        // 将组件内部的css提取到一个单独的css文件（只用在生产环境）
        // 也可以是传递给 extract-text-webpack-plugin 的选项对象
        // 是否使用css分离插件 ExtractTextPlugin，采用独立样式文件载入，不采用<style>方式内联至html文件中
        extract: true,

        // 是否在构建css样式映射，false将提高构建速度
        sourceMap: false,
        // css预设器配置项
        loaderOptions: {},
        // 启用 CSS modules for all css / pre-processor files.
        requireModuleExtension: true
    },


    // 构建时开启多进程处理 babel 编译
    //是否为 Babel 或 TypeScript 使用 thread-loader。
    //该选项在系统的 CPU 有多于一个内核时自动启用，仅作用于生产构建，在适当的时候开启几个子进程去并发的执行压缩
    parallel: require("os").cpus().length > 1,

    // PWA 插件相关配置
    // 单页插件相关配置 https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
    pwa: {},

    //vue3.0+
    devServer: {//跨域
        // open: process.platform === "darwin",s
        //open: true, //配置自动启动浏览器
        disableHostCheck: false,
        // host: "localhost",
        host: "0.0.0.0",//暴露出来当前的ip
        //   App running at:
        // - Local:   http://localhost:8080/
        // - Network: http://192.168.1.102:8080/
        // host: "127.0.0.1"=>
        //   App running at:
        // - Local:   http://127.0.0.1:8080/
        // - Network: http://127.0.0.1:8080/
        port: 8080,// 端口号
        https: false,// true 配置之后可使用生成 https://localhost:8080/
        hotOnly: false,// 热更新（webpack已实现了，这里false即可）
        // proxy: null // 设置代理
        // proxy: 'http://localhost:8080'   // 配置跨域处理,只设一个代理
        // * 本地接口配置代理地址，mcpc地址，
        proxy: {
            '/mcpc': {
                // target: 'http://192.168.0.153:8099/',  //周明芳
                // target: 'http://192.168.0.194:8099/',  //李明龙
                // target: 'http://192.168.0.177:8099/',
                target: 'http://192.168.0.223:8082/',
                // TODO:http://49.233.30.230:9091/
                changeOrigin: true,
                pathRewrite: {
                    '^/mcpc': '/mcpc'
                }
            }
        },
    },

    // vue 2.0 设置跨域
    // dev: {
    //   // proxyTable: {
    //   //     '/api': {
    //   //         target: 'http://127.0.0.1:8080', // 目标地址
    //   //         changeOrigin: true,
    //   //         pathRewrite: {
    //   //             '^/api': '' // 将目标地址变成这个
    //   //         }
    //   //     }
    //   // },
    // },

    // 是否启用dll webpack dll
    // 关于dll只做简单解释 未附详细代码
    // webpack.dll.conf.js
    // 1、entry配置需要dll打包的库
    // 2、module配置处理对应文件类型的loader
    // 3、增加 webpack.DllPlugin插件
    //    (1)、path:生成mainfest.json文件的绝对路径。mainfest.json里面的内容为所有被打包到dll.js文件模块id的映射。
    //    (2)、name：webpack打包时mainfest.json包含的库的暴露出来的函数名名
    //    (3)、contenxt(可选):引入manifest文件的context，默认为webpack的context
    // dll: false,//配置好dll库，设置dll：true；可优化打包效率。减少打包时间，增加库缓存

    // 第三方插件配置
    pluginOptions: {},
    // pluginOptions: {
    //   'style-resources-loader': {//https://github.com/yenshih/style-resources-loader
    //     preProcessor: 'scss',//声明类型
    //     'patterns': [
    //       //path.resolve(__dirname, './src/assets/scss/_common.scss'),
    //     ],
    //     //injector: 'append'
    //   }
    // }
};



