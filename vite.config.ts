import { resolve } from 'path';
import Tov from './presets/tov';
import { defineConfig } from 'vite';
import path from 'path';
import eslint from 'vite-plugin-eslint';

export default defineConfig({
  resolve: {
    // 无法加载elementplus组件的自动按需引入,还是不行
    extensions: ['.ts', '.mjs'],
    alias: {
      '~/': `${resolve(__dirname, 'src')}/`
    }
  },
  plugins: [eslint({
    include:[
      "src/**/*.js",
      "src/**/*.ts",
      "src/**/*.vue,"
    ],
    exclude:["./node_modules"],
    cache:false
  }

  ), Tov()],
  build: {
    rollupOptions: {
      // 将pinia的全局库实例打包进vendor，避免和页面一起打包造成资源重复引入
      output: {
        manualChunks(id) {
          // 将pinia的全局库实例打包进vendor，避免和页面一起打包造成资源重复引入
          if (id.includes(path.resolve(__dirname, '/src/store/index.ts'))) {
            return 'vendor';
          }
        },
        //TODO： [name] [hash] [ext]... 为内置占位符，详见对应的rollup配置。e.g.assetFileNames
        // TODO:注意：vite 模式下走的是 rollup 打包，默认情况下 hash 能力无法对齐 webpack，
        // 入口文件名
        entryFileNames: 'assets/[name]-[hash].js',
        // 块文件名
        chunkFileNames: 'assets/[name]-[hash].js',
        // 资源文件名 css 图片等等
        assetFileNames: 'assets/[name]-[hash]-balabala.[ext]'
      }
    }
  },
  server: {
    host: '0.0.0.0',
    port: 9099,
    // strictPort:false,//尝试端口
    hmr: true,
    proxy: {
      '/api': {
        target: 'https://test-api.tob.yinweiart.com/',
        changeOrigin: true
      }
    }
  }
});
