# 所有项目增加任何插件功能前，实验测试的地方

# mdks_test_xtapp_base_0608

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Run your tests

```
npm run test
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

## 本地组件化实现

### 第一步：安装必要的脚手架插件

    "@vue/cli-plugin-babel": "^4.5.0",
    "@vue/cli-plugin-eslint": "^4.5.0",
    "@vue/cli-service": "^4.5.0",

### 第二步：自己封装组件，同时 install 注册方法

### 第三步：将自己的组件通过 index.js 安装

```
// TODO:专门定义个文件作为导出组件打包的方式
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
```

### 第四步：将命令写进 package.json 中

### 第五步： 引入 main.js 使用

```
import libComponents from "./packages";

Vue.use(libComponents)

```

注意路径地址正确
"lib": "vue-cli-service build --target lib --name lib-components --dest lib packages/index.js"

    这里说明
    --target是默认构建应用，这里修改为lib后，可以启用构建库模式
    --name是指定输出文件的文件名前缀
    --dest是输出文件夹名称，默认是dist，我们修改为lib
    --entry是入口文件路径，默认是src/App.vue,这里修改为packages/index.js

然后，npm run lib

## 3.如何给一个组件增加 babel(babel 很奇怪，cnpm 下载很快》》》)

最新版本可以使用的配置如下

### 第一步，package.json 文件

```
{
  "name": "01cornerstonedemo",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "directories": {
    "lib": "lib"
  },
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "babel-cli": "^6.26.0",
    "babel-preset-es2015": "^6.24.1",
    "babel-preset-stage-2": "^6.24.1"
  },
  "dependencies": {
    "babel-polyfill": "^6.26.0"
  }
}


```

### 第二步.babelrc

```


{
 "presets": [
 "es2015", "stage-2"
 ],
 "plugins": []
}



```

### 第三步，在当前的根目录下 npx babel test.js -o demotest.js

test.js 文件是 es6 写的。

核心

## 5.项目中自动增加 babel-polifill

npm install -D babel-loader @babel/preset-env @babel/core
全部处理下载:npm install -S @babel/polyfill （这里先使用全局引入）
按需处理下载:npm install -S core-js

```
② 全局使用babel-polyfill(设置babel-preset-env options项的useBuiltIns)
    具体使用方法如下：
    1. 引入babel-preset-env包；
    2. 在.babelrc文件预设presets中使用设置babel-preset-env options项
        useBuiltins: usage | entry
        (usage: 仅仅加载代码中用到的 polyfill. entry: 根据浏览器版本的支持，将 polyfill 需求拆分引入，仅引入有浏览器不支持的polyfill)
        targets.browsers: 浏览器兼容列表
        modules: false
    3. 在入口文件顶部直接import ''babel-polyfill';

    此方案的适合应用级的开发，babel会根据指定的浏览器兼容列表自动引入所有所需的polyfill。

作者：Erric_Zhang
链接：https://www.jianshu.com/p/b8f494a5fe48
来源：简书
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。






```

## 增加 babel 降级的时候浏览器的配置说明

.browserslistrc

```
> 1%  兼容市面上，使用超过1%的浏览器
last 2 versions 最近两个版本
not ie <= 10






```

## 增加 js 中使用 babel-loader，

## 增加打包的时候 babel-loader 不打包某些库文件，降级 node_modules 中的高版本 es

    // babel-loader默认会跳过`node_modules`依赖. // 通过这个选项可以显示转译一个依赖
    // 默认babel-loader忽略mode_modules，这里可增加例外的依赖包名
    transpileDependencies: [],

    常用echart
    transpileDependencies:["echart"]

    transpileDependencies : ['vue-baberrage'], // 需要转译的依赖数组
    下面这种写法是将 element 和 vuex 进行降级
    transpileDependencies: [/node_modules[/\\\\](element-ui|vuex|)[/\\\\]/],

### 有时候还是不行，

重新删除 node_modules

第二种方案
这种情况我的解决方法是在 src 目录下新建一个 utils 目录，将依赖的 js 文件移到该目录下，然后引入该目录下的 js 文件。

## vue.config.js 中增加相关 loader

cssloader 有专门的配置项目

```
css: {
    loaderOptions: {
      css: {
        // 这里的选项会传递给 css-loader
      },
      postcss: {
        // 这里的选项会传递给 postcss-loader
      }
    }
  }


```

## vue.config.js 中配置 babel

When setting `useBuiltIns: 'usage'`, polyfills are automatically imported when needed.
Please remove the direct import of `@babel/polyfill` or use `useBuiltIns: 'entry'` instead.
就是说如果 vue.config.js 中配置了 babel 按需引入，不需要 main.js 中专门引入了

 <!-- //TODO：如果理解没有问题。 ！TODO: -->

```
// babel.config.js
module.exports = {
  presets: [
    ['@vue/app', {
      polyfills: [
        'es.promise',
        'es.symbol'
      ]
    }]
  ]
}

```

如果已经配置了 configureWebpack，那么这里如下 useBuiltIns 按需引入。（那么 main.js 中 polifill 不需要）

```
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
    },


```

#### 后记，上面两处 babel.config.js 和 vue.config.js 配置后，

这里使用 npm run lib 也可以将最后的结果进行 es6 转换。

## configureWebpack 与 chainWebpack

configureWebpack 对象胡轶贝 webpack-merge 合入 webpack 配置中；

```

const path = require("path");
function resolve(dir) {
  return path.join(__dirname, dir)
}
对象的写法：使用属性来说明结果
// 覆盖webpack默认配置的都在这里
    resolve: {
      // 配置解析别名其中:@代表根目录，@c代表 src/components 文件夹，等
      alias: {
        "@": path.resolve(__dirname, "./src"),
        "@a": path.resolve(__dirname, "./src/assets"),
        "@c": path.resolve(__dirname, "./src/components"),
      }
    }



函数写法，return {}其中写每一个变量或是对象。


```

### chainWebpack

这个是 vue 内部抽象的高级 webpack 配置，官方说可以更加细颗粒度的控制

这里一个例子

```
控制一个图片的上传限制和转换

  chainWebpack: config => {
    // config.plugin('copy')
    //     .use(require('copy-webpack-plugin'), [
    //         [{
    //             from: resolve('src/static/'),
    //             to: './',
    //             toType: 'dir',
    //             ignore: publicCopyIgnore
    //         }]
    //     ])
    config.module
      .rule("images")
      .use("url-loader")
      .options({
        // 图片大小限制 单位b
        limit: 4096,
        // 生成的文件的存放目录
        name: "images/[name].[hash].[ext]"
      });
  },



```

## 6.补充 elementui 和 ant-design 和 vant 按需引入

### （1）elementUI 按需引入（babel.config.js 中引入）

babel-plugin-component 插件，npm install babel-plugin-component --save-dev

```
babel.config.js中

module.exports = {
  presets: [
    '@vue/app'
  ],
  plugins: [
    [
      "component",
      {
        libraryName: "element-ui",
        styleLibraryName: "theme-chalk"
      }
    ]
  ]
}

```

### (2)BundleAnalyzer 显示当前那些包大，过大（vue.config.js，上线前注释）

### （2）speedmeasure 的每一个包的时间

这里自己和相关的 bundleAnalyzer 一样使用

```
cnpm install -D speed-measure-webpack-plugin
这些包，用cnpm很快。
    configureWebpack:(config)=>{
        // TODO:这里是 plugin 而不是 plugins;
        // config.plugin("webpack-bundle-analyzer").use(BundleAnalyzerPlugin);
        // TODO：增加一个当前打包的时间，注意之类是plugin，不是plugins
        // config.plugin("speed-measure-webpack-plugin").use(SpeedMesaurePlugin);
    }

```

### （3）css 按需加载（vue.config.js）

mini-css-extract-plugin
npm install mini-css-extract-plugin -D

```
chainWebpack: config => {
  let miniCssExtractPlugin = new MiniCssExtractPlugin({
    filename: 'assets/[name].[hash:8].css',
    chunkFilename: 'assets/[name].[hash:8].css'
  })
  config.plugin('extract-css').use(miniCssExtractPlugin)


```

### （4）图片按需加载 vue.config.js 中

image-webpack-loader

npm install image-webpack-loader -D

```

chainWebpack:(config)=>{
    config.module.rule('images')
        .test(/\.(png|jpe?g|gif|webp)(\?.*)?$/)
        .use('image-webpack-loader')
        .loader('image-webpack-loader')
        .options({
        bypassOnDebug: true
        })
        .end()
}



```

### （5）压缩代码 gzip 压缩，(vue.config.js 中）

npm install compression-webpack-plugin -D

```
const CompressionWebpackPlugin = require('compression-webpack-plugin');

chainWebpack:(config)=>{
    // 开启gzip压缩
  config.plugins.push(
    new CompressionWebpackPlugin(
      {
        filename: info => {
          return `${info.path}.gz${info.query}`
        },
        algorithm: 'gzip',
        threshold: 10240, // 只有大小大于该值的资源会被处理 10240
        test: new RegExp('\\.(' + ['js'].join('|') + ')$'
        ),
        minRatio: 0.8, // 只有压缩率小于这个值的资源才会被处理
        deleteOriginalAssets: false // 删除原文件
      }
    )
  )
}

```

### (6)lodash 按需加载（vue.config.js 和 babel.config.js 中都要加）

npm install lodash-webpack-plugin --save-dev

```
vue.config.js
const LodashModuleReplacementPlugin = require("lodash-webpack-plugin");

chainWebpack: config => {
    config
    .plugin("loadshReplace")
    .use(new LodashModuleReplacementPlugin());
}


babel.config.js
plugins: [
    "lodash",
  ]

```

### (7)删除无用的插件（vue.config.js 中）

删除无用的插件，避免加载多余的资源（如果不删除的话，则会在 index.html 里面加载 无用的 js 文件）
chainWebpack: config => {
// 移除 prefetch 插件，避免加载多余的资源
config.plugins.delete('prefetch')
/ 移除 preload 插件，避免加载多余的资源
config.plugins.delete('preload');
}

### （8）性能优化代码汇总

```
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const LodashModuleReplacementPlugin = require("lodash-webpack-plugin");

module.exports = {
  productionSourceMap: false, // 关闭生产环境的 source map
  lintOnSave: false,
  publicPath: process.env.VUE_APP_PUBLIC_PATH,
  devServer: {
    host: "localhost",
    port: 3002,
    proxy: {
      '/api': {
        target: "https://tapi.quanziapp.com/api/",
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      },
    }
  },

  chainWebpack: config => {

    // 移除 prefetch 插件
    <!-- TODO:禁止预加载的页面 -->
    <!-- TODO：不是下面的方法 -->
    config.plugins.delete('prefetch');//TODO:需要指定一个页面，这行做法不对
    <!-- TODO：使用正确方式， -->
    <!-- TODO：使用config.plugins.delete('preload-${name}')去删除
            ${name}需要赋值具体的页面入口

        例如
        login.html 则添加 config.plugins.delete('preload-login'),
        index.html 则添加 config.plugins.delete('preload-index') -->
    // 移除 preload 插件，避免加载多余的资源
    config.plugins.delete('preload');

    config.optimization.minimize(true);

    config.optimization.splitChunks({
      chunks: 'all'
    })
    <!-- TODO:这里plugin内容 -->
    config
      .plugin('webpack-bundle-analyzer')
      .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)

    if (process.env.NODE_ENV !== 'development') {

      let miniCssExtractPlugin = new MiniCssExtractPlugin({
        filename: 'assets/[name].[hash:8].css',
        chunkFilename: 'assets/[name].[hash:8].css'
      })
      config.plugin('extract-css').use(miniCssExtractPlugin)
      config.plugin("loadshReplace").use(new LodashModuleReplacementPlugin());

      config.module.rule('images')
        .test(/\.(png|jpe?g|gif|webp)(\?.*)?$/)
        .use('image-webpack-loader')
        .loader('image-webpack-loader')
        .options({
          bypassOnDebug: true
        })
        .end()
        .use('url-loader')
        .loader('file-loader')
        .options({
          name: 'assets/[name].[hash:8].[ext]'
        }).end()
      config.module.rule('svg')
        .test(/\.(svg)(\?.*)?$/)
        .use('file-loader')
        .loader('file-loader')
        .options({
          name: 'assets/[name].[hash:8].[ext]'
        })
    }
  },
  configureWebpack: config => {
    // config.plugins.push(["equire"]);

    if (process.env.NODE_ENV !== 'development') {
      config.output.filename = 'assets/[name].[hash:8].js'
      config.output.chunkFilename = 'assets/[name].[hash:8].js'
    }
    // 公共代码抽离
    config.optimization = {
      // 分割代码块
      splitChunks: {
        cacheGroups: {
          //公用模块抽离
          common: {
            chunks: 'initial',
            minSize: 0, //大于0个字节
            minChunks: 2, //抽离公共代码时，这个代码块最小被引用的次数
          },
          //第三方库抽离
          vendor: {
            priority: 1, //权重
            test: /node_modules/,
            chunks: 'initial',
            minSize: 0, //大于0个字节
            minChunks: 2, //在分割之前，这个代码块最小应该被引用的次数
          },
        },
      }
    }
    // 开启gzip压缩
    config.plugins.push(
      new CompressionWebpackPlugin(
        {
          filename: info => {
            return `${info.path}.gz${info.query}`
          },
          algorithm: 'gzip',
          threshold: 10240, // 只有大小大于该值的资源会被处理 10240
          test: new RegExp('\\.(' + ['js'].join('|') + ')$'
          ),
          minRatio: 0.8, // 只有压缩率小于这个值的资源才会被处理
          deleteOriginalAssets: false // 删除原文件
        }
      )
    )
  },
  css: {
    extract: true,
    sourceMap: false,
    loaderOptions: {
      sass: {
      },
    },
  },
}


```

## 优化口诀要记牢

```
  总结一下优化策略

  速度大小来评测，webpack配置设。
  hash文件多线程，图片样式按需引
  UI框架按需加，babel按需不包含
  缓存利用预加载，路由组件动态引
  摇树优化标准6, webpack4才有
  代码压缩并行压，移除打印ter一下


```

## tree-shaking 优化

sideEffects 默认是 true。 sideEffects 可选值如下：
结合上面的内容，为了在实际项目中达到有效的 tree shaking 效果，需注意以下几点：

使用 ES2015 模块，并且注意不要被 babel 转换成 CommonJs（也就是服务器的 Node.js 的 babel 将 es6 代码降级后，）
生产环境中 webpack 配置中 mode 设置为 production
package.json 设置合适的 sideEffects
多个对象不要集中在一个变量中导出

也就是说 babel 支持 es2015 的 ES 模块的优化，不要通过 common.js 打包。

所以，所有可需要 tree-shaking 的代码必须以这种方式编译。因此，如果你有要导入的库，则必须将这些库编译为 es2015 模块以便进行 tree-shaking 。
如果它们被编译为 commonjs，那么它们就不能做 tree-shaking ，并且将会被打包进你的应用程序中。
许多库支持部分导入，lodash 就是一个很好的例子，它本身是 commonjs 模块，但是它有一个 lodash-es 版本，用的是 es2015 模块。

# 120 行理解 HRM

# 摇树优化原理

```
//TODO:直接在 package.json中配置，也可以在vue.config.js中配置
{
 ...
 sideEffects: false,
}

// 或者// !TODO:建议使用第二种
这样会将优化的副作用，作用在自己想要优化的内容上，这里对于polyfill.js不会进行优化

{
 ...
 sideEffects: ["./polyfill.js"],
}


总结使用

// 所有文件都有副作用，全都不可 tree-shaking
{
 "sideEffects": true
}
// 没有文件有副作用，全都可以 tree-shaking
{
 "sideEffects": false
}
// 只有这些文件有副作用，所有其他文件都可以 tree-shaking，但会保留这些文件
{
 "sideEffects": [
  "./src/file1.js",
  "./src/file2.js"
 ]
}

```

### 这里一个技巧，全局 css 不需要优化，那么配置的地方

```
// 全局 CSS 副作用规则相关的 Webpack 配置
const config = {
 module: {
  rules: [
   {
    test: /regex/,
    use: [loaders],
    // 全局 CSS 副作用规则相关的 Webpack 配置
const config = {
 module: {
  rules: [
   {
    test: /regex/,
    use: [loaders],
    sideEffects: true
   }
  ]
 }
};
   }
  ]
 }
};


```

## 8.TerserWebpackPlugin：删除 debug，console,多余代码

npm install terser-webpack-plugin --save-dev

插件

```
module.exports = {
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
              warnings: false,
              drop_console: true,
              drop_debugger: true,
              pure_funcs: ['console.log']
          },
        },
      }),
    ],
  },
};



```

## 9.注意如果使用 mock 后，注意会不会对于本地项目影响启动，一定要加入 mock 后，重新 npm

## 10.增加 svg 的优化和按需加载

svg 矢量图，多色不失真，

### 第一步，安装 svg-sprite-loader

svg-sprite-loader
npm i svg-sprite-loader -D

### 第二步，配置 vue.config.js 的配置内容

```

增加在chainWebpack的vue颗粒度的实现上去
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


```

### 第三步，创建一个公共函数 svg 组件

```
利用当前的属性名，定义每一个名称

<template>
  <svg class="svg-icon" aria-hidden="true">
    <use :xlink:href="iconName" />
  </svg>
</template>



<script>
export default {
  name: "icon-svg",
  props: {
    iconClass: {
      type: String,
      required: true,
    },
  },
  computed: {
    iconName() {
      return `#icon-${this.iconClass}`;
    },
  },
};
</script>



```

### 第四步，增加 icons 文件夹的 svg 图标内容

```
import Vue from "vue";
// import Icon from "components/icon-svg.vue";

// Vue.component("icon", Icon);

// TODO:利用reuqire.context导入函数
const requireAll = requireContext => requireContext.keys().map(requireContext);
// TODO:定义一个正则表达式，使用svg结尾的文件，全部loader进去
// TODO:第一个参数指定文件夹名称，第二个参数指定是否包含子文件夹，第三个正则
const req = require.context("./", false, /\.svg$/);

requireAll(req);


```

### 第五步，引入 main.js 中

```
import "@/icons";//TODO:引入所有的svg图标
import iconSvg from "components/icon-svg.vue";

Vue.component(”icon-svg“,iconSvg)

```

### 第六步，使用 svg

## 删除 console 多余代码，

使用 terser-webpack-plugin 一直不行，不知道为什么。
转而使用 babel 的配置插件 babel-plugin-transform-remove-console

```
//这是项目发布阶段需要用到的
const prodPlugins = []
if (process.env.NODE_ENV === 'production') {
    prodPlugins.push('transform-remove-console')
}
module.exports = {
    presets: [
        '@vue/cli-plugin-babel/preset'
    ],
    plugins: [
        [
            'component',
            {
                libraryName: 'element-ui',
                styleLibraryName: 'theme-chalk'
            }
        ],
        ...prodPlugins
    ]
}


```

## axios 增强学习，

### post 和 get 参数

post 的传参是 data
get 的传参是 params

### axios 的响应时间

### axios 的取消请求实现

cancelToken.
利用 Map 中只能存一个唯一键值对。
每一个键值对的方法是一个 cancelToken 方法。
如果此时第二次触发后，也有相同的键值，那么触发 cancelToken 的方法，同时删除此时的键值。

### axios 自动携带 token 实现。

### 判断用户是否断网

window.navigator.onLine

### 异常关闭浏览器，登录状态清空

注意不要使用 onbeforeunload,因为浏览器刷新也会触发这个方法

window.addEventListener('unload', { navigator.sendBeacon('/siteAnalytics', getStatistics()); } //sendBeacon 可以通过 HTTP 协议，将少量数据异步传输到服务器，因为底层是 fetchAPI，

### 优化 axios 的请求报错码

```
 if (error && error.response) {
    switch(error.response.status) {
      case 302: message = '接口重定向了！';break;
      case 400: message = '参数不正确！';break;
      case 401: message = '您未登录，或者登录已经超时，请先登录！';break;
      case 403: message = '您没有权限操作！'; break;
      case 404: message = `请求地址出错: ${error.response.config.url}`; break; // 在正确域名下
      case 408: message = '请求超时！'; break;
      case 409: message = '系统已存在相同数据！'; break;
      case 500: message = '服务器内部错误！'; break;
      case 501: message = '服务未实现！'; break;
      case 502: message = '网关错误！'; break;
      case 503: message = '服务不可用！'; break;
      case 504: message = '服务暂时无法访问，请稍后再试！'; break;
      case 505: message = 'HTTP版本不受支持！'; break;
      default: message = '异常问题，请联系管理员！'; break
    }
  }
  if (error.message.includes('timeout')) message = '网络请求超时！';
  if (error.message.includes('Network')) message = window.navigator.onLine ? '服务端异常！' : '您断网了！';


作者：橙某人
链接：https://juejin.cn/post/6968630178163458084
来源：掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

```

## 进度条实现 UI 样式页面 progressBar

比较 setTimeout 和 setInterval 实现区别

如何 setTimeout 和 setInterval 实现转换
例子 1

```
let timer = setTimeout(function fn(){
    if(timer < 100){
        console.log('小于200000的时间点',timer)
        timer = setTimeout(fn,2000)
    }else{
        clearTimeout(timer)
    }

},2000)


```

```
上面的转换为setInterval实现内容

let  timer = setInterval(function fn () {
        if (timer < 115) {
            console.log('小于100',timer)
    } else {
            clearInterval(timer);
        }
    }, 1000)


```

## use 插件原理简单实现。

本质上，都是对于 vue.prototype 的实现
