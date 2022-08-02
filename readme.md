## 引入 electron 打包器

```
"vue-cli-plugin-electron-builder": "~2.1.1"
"electron": "^17.4.7",
"electron-devtools-installer": "^3.1.0",

```

## 引入压缩的 hash,chunhash,contenthash

使用 hash 对于 dev 开发环境的 js 进行打包设置，

使用 chunkhash 对于不同的入口 lib 的依赖库进行打包构建

使用 contenthash 对于 css 文件进行打包设置。

```
      config.output.filename('./js/[name].[hash].js');
      config.output.chunkFilename('./js/[name].[hash].js');


```

一句话来说就是可以配合浏览器缓存带给更佳的用户体验
clean-webpack-plugin 插件用于每次重新构建能清除上一次的 dist 文件夹
mini-css-extract-plugin 插件用于 css 代码分离，这样能够把打包之后的 css 文件提取到一个单独的文件中

### hash

每次 webpack 构建时生成一个唯一的 hash 值

```
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.[name].[hash].js'
  },
plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].[hash].css'
    })
  ]

---每个文件都具有相同的哈希值，因为它[hash]是基于我们使用的所有源文件生成的。
---如果我重新运行该构建而不更改任何内容，则生成的[hash]将保持不变。
---如果我仅编辑一个文件，则[hash]值将发生变化，并且所有生成捆绑的名称中都会包含此新[hash]。
```

使用场景--------------

### chunkhash

    根据chunk生成hash值，来源于同一个chunk，则hash值就一样

```
输出的结果全部使用chunkhash的情况
 output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.[name].[chunkhash].js'
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].[chunkhash].css'
    })
  ]
---chunkhash是根据不同的入口进行依赖文件解析，构建对应的chunk(模块)，生成对应的hash值。
---在使用上来说：我们可以把一些公共库和程序入口文件区分开来，单独打包构建，接着可以采用chunkhash方式来生成hash值，那么只要我们不改动公共库的代码，就可以保证其hash值不受影响，这样也能起到缓存的作用。
```

使用场景

### contenthash

    根据内容生成hash值，文件内容相同hash值就相同

```
output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.[name].[contenthash].js'
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash].css'
    })
  ]
---每个生成的文件的名称都有一个唯一的hash值，该哈希值是根据该文件的内容计算得出的。

---当要构建的文件内容发生改变时，就会生成新的hash值，且该文件的改变并不会影响和它同一个模块下的其它文件。

```

### 三种 hash 区别

hash 是跟整个项目的构建相关，只要项目里有文件更改，整个项目构建的 hash 值都会更改，并且全部文件都共用相同的 hash 值。(粒度整个项目)(一个文件改变，整个项目重新构建，因为共用一个 hash)

chunkhash 是根据不同的入口进行依赖文件解析，构建对应的 chunk(模块)，生成对应的 hash 值。只有被修改的 chunk(模块)在重新构建之后才会生成新的 hash 值，不会影响其它的 chunk。(粒度 entry 的每个入口文件)(根据入口文件模块生成)

contenthash 是跟每个生成的文件有关，每个文件都有一个唯一的 hash 值。当要构建的文件内容发生改变时，就会生成新的 hash 值，且该文件的改变并不会影响和它同一个模块下的其它文件。(粒度每个文件的内容)

## 解决 webpack4 修改文件热更新失效

```
npm install --save-dev webpack-dev-server

同时在dev上面增加命令行&& webpack-dev-server，
npm run dev后可以自动更新


```

## 基于 webpack 解决持久化缓存

### hash 值解决缓存文件

每次开发时，小明都需要手动添加一个版本号，很是麻烦，小明想，能不能每次构建的时候就添加一个版本号码呢，此时小明想到了 webpack 的 hash 方法

### 为每一个 chunkhash 每一个项目依赖包创建自己的 hash

webpack 为每个 chunk 资源都生成与其内容相关的 hash 摘要，为不同的资源打上不同的 hash。webpack 配置 chunkhash 的部分代码
每一个入口 lib 库文件使用这种 chunkhash

### .contenthash 专业为 css 配置 hash 值。

css 文件修改后，不想要影响了 js 重新生成一次，那么 css 使用 contenthash,
extract-text-plugin 为抽离出来的内容提供了 contenthash 即：new ExtractTextPlugin('[name]-[contenthash].css')

## 引入打包前清除 dist

clean-webpack-plugin

## 引入性能分析工具：

耗时 speed-measure-plugin
分析构建包大小 webpack-bundle-analyzer

```

npm i @types/webpack-bundle-analyzer
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

    chainWebpack: (config) => {


        // TODO:看一下每一个模块的bundle的打包大小，
        // TODO:这里是 plugin 而不是 plugins;
        // config.plugin("webpack-bundle-analyzer").use(BundleAnalyzerPlugin);


暂时不用这个插件
pnpm i speed-measure-webpack-plugin
```

## 新增 elementui 按需引入

```
npm i unplugin-auto-import


```

## element-plus 中版本 2.2.4 和"vue-router": "^4.0.0-0",不兼容

```
理所当然认为是element-plus版本不兼容问题，当前element-plus版本是2.2.4，回退到2.2.0

```

### 自动导入 elementplus 插件环境配置依赖，需要严格的版本对应

```
node16.13.0
unplugin-vue-components版本是0.21.2

unplugin-auto-import版本是0.6.0


```
