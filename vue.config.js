const CompressionWebpackPlugin = require('compression-webpack-plugin');
const productionGzipExtensions = ['js', 'css'];

const webpack = require('webpack');
// css压缩的hash不同的生成文件格式策略
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
/* 每一次都贱清理dist */
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const BundleAnalyzerPlugin =
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

// const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');

const path = require('path');
function resolve(dir) {
  return path.join(__dirname, dir);
}
// 按需引入elementplus
const AutoImport = require('unplugin-auto-import/webpack');
const Components = require('unplugin-vue-components/webpack');
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers');
module.exports = {
  // mode = process.env.NODE_ENV,
  lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: false,
  pluginOptions: {
    // TODO:配置插件：electron打包插件配置
    // electronBuilder: {
    //     nodeIntegration: true,
    // },
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [
        // 存放less变量文件的路径
        // path.resolve(__dirname, '@/assets/css/index.less'),
      ]
    },
    css: {
      loaderOptions: {
        less: {
          lessOptions: {
            javascriptEnabled: true
          }
        }
      }
    },
    plugins: [
      new CleanWebpackPlugin(),
      //   使用webpack的hash模式，整个项目hash，只要一个文件修改，整个都改，不好
      new MiniCssExtractPlugin({
        // filename: 'css/[name].[hash].css'
        filename: 'css/[name].[contenthash:8].css'
      }),
      // Ignore all locale files of moment.js
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
      // 配置compression-webpack-plugin压缩
      //   作用：提升网络传输速率=>优化web页面加载时间
      //     基本原理
      //     1.浏览器请求资源文件时会自动带一个Accept-Encoding的请求头告诉服务器支持的压缩编码类型
      //     2.服务器配置开启gzip选项：
      //     接收客户端资源文件请求，查看请求头Content-encoding支持的压缩编码格式，如果是包含gzip那么
      //     在每次响应资源请求之前进行gzip编码压缩后再响应返回资源文件(在响应头会带上Content-encoding: gzip)
      //     3.浏览器接收到响应后查看请求头是否带有Content-encoding:gzip，如果有进行对返回的资源文件进行解压缩然后再进行解析渲染
      new CompressionWebpackPlugin({
        algorithm: 'gzip',
        test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
        threshold: 10240,
        minRatio: 0.8
      })
    ]
  },
  configureWebpack: {
    // webpack中的内容配置方法，chainWebpack是vue封装抽象一层配置
    // 例如，通过判断运行环境，设置mode
    // config.mode = 'production';
    plugins: [
      // 自动引入插件
      AutoImport({
        resolvers: [ElementPlusResolver()]
      }),
      Components({
        resolvers: [ElementPlusResolver()]
      })
    ]
  },
  chainWebpack(config) {
    // 设置 svg-sprite-loader
    // config 为 webpack 配置对象
    // config.module 表示创建一个具名规则，以后用来修改规则
    config.module
      // 规则
      .rule('svg')
      // 忽略
      .exclude.add(resolve('src/assets/svgs'))
      // 结束
      .end();
    // config.module 表示创建一个具名规则，以后用来修改规则
    config.module
      // 规则
      .rule('svgs')
      // 正则，解析 .svg 格式文件
      .test(/\.svg$/)
      // 解析的文件
      .include.add(resolve('src/assets/svgs'))
      // 结束
      .end()
      // 新增了一个解析的loader
      .use('svg-sprite-loader')
      // 具体的loader
      .loader('svg-sprite-loader')
      // loader 的配置
      .options({
        symbolId: 'icon-[name]'
      })
      // 结束
      .end();
    // TODO:设置hash模式
    //   Cannot use [chunkhash] or [contenthash] for chunk in 'js/[name].[contenthash:8].js' (use [hash] instead)

    if (process.env.NODE_ENV === 'production') {
      config.output.filename('./js/[name].[hash].js');
      config.output.chunkFilename('./js/[name].[hash].js');
    } else {
      config.output.filename('./js/[name].[hash].js');
      config.output.chunkFilename('./js/[name].[hash].js');
    }
    // 分析打包后大小
    // config.plugin('webpack-bundle-analyzer').use(BundleAnalyzerPlugin);
  },
  devServer: {
    // 避免修改文件热更新失效
    hot: true,
    port: 8016,
    host: '0.0.0.0',
    // 反向代理的设置
    proxy: {
      '/api': {
        target: 'https://11test-api.tob.yinweiart.com/',
        changeOrigin: true
        // pathRewrite: { '^/api/': '/' },
        // 关闭证书校验
        // secure: false,
      },
      // 获取曲谱的时候，使用这个代理地址
      '/rest/': {
        target: 'https://111test-api.piano.fish.yinweiart.com/', //跨域地址
        // ws:true,//如果要代理WebSockets,设置为true
        changOrigin: true, //默认flase,将主机头的原点更改为目标URL
        pathRewrite: {
          //如果不希望传递/api，则需要重写路径：
          '^/rest/': ''
        }
      }
    }
  }
};
