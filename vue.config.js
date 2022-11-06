const path = require("path");
const { vueCodeLinkServer, vueCodeLinkLoaderConfig } = require('@linzhinan/vue-code-link')

function resolve(dir) {
    return path.join(__dirname, dir);
}

module.exports = {
    lintOnSave: false, //关闭eslint文件
    pages: {
        index: {
            entry: './src/main.ts'
        }
    },
    devServer: {
        proxy: { //配置代理服务器
            "/hehe": {
                target: "这里填写的地址类似于服务器代理★填写的地址是地址问号之前的地址", //目标网址
                changeOrigin: true,
                pathRewrite: {
                    "^/hehe": '' //发请求的时候要把上面taget填写的地址参数改成/hehe注意改完这个配置文件一定要重启服务
                }
            }
        }
    },
    chainWebpack: config => {
        // TODO:增加常见的别名配置
        config.resolve.alias.set("@", resolve("./src")) //给src的绝对路径起一个别名叫@.set("api", resolve("./src/api")) //aip文件夹绝对路径地址起一个别名叫api
            .set("components", resolve("./src/components"))
            .set("style", resolve("./src/style"))
        //添加vue-code-link处理器
        //  vueCodeLinkLoaderConfig.addVueCodeLinkLoader(config)
        // 清除svg默认配置对./src/icons文件夹的处理
        config.module
            .rule("svg")
            .exclude.add(resolve("src/assets/icons")) // icons存放地（svg放的地方）
            .end()

        // 添加新的rule处理./src/icons文件夹的svg文件
        config.module
            .rule("svg-sprite")
            .test(/\.svg$/)
            .include
            .add(resolve("src/assets/icons"))
            .end()
            .use("svg-sprite-loader")
            .loader("svg-sprite-loader")
            .options({
                symbolId: "icon-[name]",
                include: ["src/assets/icons"]
            })
            .end()
            .before("svg-sprite-loader")
            .use("svgo-loader")
            .loader("svgo-loader")
            .options({
                plugins: [
                    { removeAttrs: { attrs: "path:fill" } }
                ]
            })
            .end()
    },
    devServer: {
        //添加监听服务
        // before: vueCodeLinkServer.before,
        // open: true,

        host: "0.0.0.0"
    }
}
