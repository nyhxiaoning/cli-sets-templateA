## 第一步
~~~
src/components 目录下，新建打包配置文件 index.ts。


~~~

## 第二步：根目录创建一个build.cjs
~~~
const path = require('path')
const { defineConfig, build } = require('vite')
const vue = require('@vitejs/plugin-vue')

// 添加打包入口文件夹 packages（需要手动创建）
const entryDir = path.resolve(__dirname, '../src/components')
// 添加出口文件夹 lib（不需要手动创建，会自动生成）
const outDir = path.resolve(__dirname, '../lib')

// vite 配置
const baseConfig = defineConfig({
	configFile: false,
	publicDir: false,
	plugins: [vue()]
})

// rollup 配置（vite 基于 rollup 打包）
const rollupOptions = {
    // 这两个库不需要打包
	external: ['vue', 'vue-router'],
	output: {
		globals: {
			vue: 'Vue'
		}
	}
}

//全量构建
const buildAll = async () => {
  await build(defineConfig({
    ...baseConfig,
    build: {
      rollupOptions,
      lib: {
        entry: path.resolve(entryDir, 'index.ts'),
		    // 组件库名字
        name: 'my-components-base',
        fileName: 'my-components-base',
		    // 输出格式
        formats: ['es', 'umd']
      },
      outDir
    }
  }))
}


const buildLib = async () => {
  await buildAll()
}

buildLib()



~~~

## 第三步：打包命令
~~~
"build:components": "node --trace-warnings ./build/build.js",
"lib": "npm run build:components"

~~~

## 第四步：使用方式
~~~
main.js中全局引入
// 引入组件
import MyComponents from '../lib/my-components-base.es.js'
// 注意一定要引入样式
import '../lib/style.css'


~~~


## 第五步：发布npm
~~~
private 值为 false，组件库不能私有；

version 默认为 0.0.0，发布到 npm 必须遵守规范，这里改为 1.0.0；
main 当组件库被 import 时，默认指向 /lib/my-components.es.js 文件；



~~~

npm login的时候，nrm切换到npm的镜像源地址。

第二：出现下面校验，使用方法登录npm网站，点击account
npm ERR! This operation requires a one-time password from your authenticator.

然后自己选择npm内部的双因子认证登录，避免丢失。
自己下载authenticator后，扫描即可。

npm publish后，发现错误说，你不能发布名为lib的包，意思是重名了。



## 创建npm私有服务器，公司内部访问
因为npm上面的包都是公共，不能私有化。

-npm install -g verdaccio --unsafe-perm

-安装完成后，命令行输入verdaccio启动一次，会生成下面文件
会有输出显示：
~~~
安装后，在文件夹 C:\Users\rongm\.config\verdaccio\config.yaml

~~~

-在配置文件的末尾添加listen: 0.0.0.0:4873

-配置文件的storage选项，然后把仓库的位置填写进去，注意是用斜线，而不是反斜线
~~~

storage: E:/CICD/selfnpm

重启verdaccio命令
访问：http://127.0.0.1:4873/或是本机ip+端口4873

接着nrm add localnpm  ip+端口4873

增加后，nrm ls  
localnpm ----- http://localhost:4873/


~~~

-切换私有npm域，新建用户
npm adduser

这里添加的daning,密码和原来的npm一样，然后访问127.0.0.1：4873


-将刚刚的lib库，尝试再次上传一次

创建一个npm init -f

## 私有域配置了nrm后，如果使用，
就是npm i 后使用，和正常的一摸一样，
在私有域找不到，会自动连接到npm.mirror上，自己不用担心私有共有的包的问题。

