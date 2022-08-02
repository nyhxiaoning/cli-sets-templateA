import { fileURLToPath, URL } from 'node:url';
import path from 'path';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
// https://vitejs.dev/config/
export default defineConfig({
  // TODO:新增库模式，将一些公共的utils资源库打包
  // build: {
  //   lib: {
  //     // 测试库模式
  //     entry: path.resolve(__dirname, './src/lib/js/plain-draggable.esm.js'),
  //     name: 'myLib',
  //     // 生成的库的名称lib
  //     fileName: 'my-lib'
  //   },
  //   rollupOptions: {
  //     // TODO:设置一些不想要打包进行的依赖
  //     external: ['vue', 'axios', 'lodsh'],
  //     output: {
  //       // 在umd的模式下，为外部的依赖提供一个全局变量使用
  //       globals: {
  //         vue: 'Vue',
  //         axios: 'Axios',
  //         lodsh: 'Lodsh'
  //       }
  //     }
  //   }
  // },
  plugins: [
    vue(),
    vueJsx(),
    // 支持svg图片引入vite框架
    createSvgIconsPlugin({
      // Specify the icon folder to be cached
      iconDirs: [path.resolve(process.cwd(), 'src/assets/svg')],
      // Specify symbolId format
      symbolId: 'icon-[dir]-[name]'
    })
  ],
  resolve: {
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json'],
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  define: {
    'process.env': {}
  },
  server: {
    host: '0.0.0.0',
    // TODO:端口冲突可以换下一个
    strictPort: false,
    // 配置多个服务器代理地址的访问
    proxy: {
      '/mock': {
        // 当访问mock后，代理到http://127.0.0.1:4523.
        target: 'http://127.0.0.1:4523',
        changeOrigin: true
        // TODO:如果代理地址中有了api/vi，怎么办
      },
      '/api': {
        // 当访问mock后，代理到http://127.0.0.1:4523.
        target: 'http://127.0.0.1:4523',
        changeOrigin: true,
        // 使用下面替换即可
        rewrite: path => path.replace(/^\/api\/v1\//, '')
      }
    }
  }
});
