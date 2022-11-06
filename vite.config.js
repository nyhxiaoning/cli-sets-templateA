import { defineConfig } from 'vite';
const path = require('path');
import vue from '@vitejs/plugin-vue';
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from 'unplugin-vue-components/resolvers';
import AutoImport from 'unplugin-auto-import/vite';
import { visualizer } from 'rollup-plugin-visualizer';
// const BASE_API = import.meta.env.VITE_APP_BASE_API

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "components": path.resolve(__dirname, "src/components"),
      "styles": path.resolve(__dirname, "src/styles"),
      "plugins": path.resolve(__dirname, "src/plugins"),
      "views": path.resolve(__dirname, "src/views"),
      "layouts": path.resolve(__dirname, "src/layouts"),
      "utils": path.resolve(__dirname, "src/utils"),
      "apis": path.resolve(__dirname, "src/apis"),
      "dirs": path.resolve(__dirname, "src/directives"),
    },
  },
  plugins: [
    vue(),
    // visualizer({  //    build后的视图
    //   open: true,
    //   gzipSize: true,
    //   brotliSize: true
    // }),
    Components({
      resolvers: [VantResolver()]
    }),
    AutoImport({
      imports: ['vue', 'vue-router'] // 自动导入vue和vue-router相关函数
    })
  ],
  css: {
    preprocessorOptions: {
      // define global scss variable
      scss: {
        additionalData: `@import '@/common/styles/mixin.scss';`
      }
    }
  },
  server: {
    host: '0.0.0.0',
    port: 81,
    open: true
  },
  base: './',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      components: path.resolve(__dirname, 'src/components'),
      views: path.resolve(__dirname, 'src/views'),
      utils: path.resolve(__dirname, 'src/utils')
    }
  },
  build: {
    sourcemap: false,
    rollupOptions: {
      output: {
        chunkFileNames: 'static/js/[name]-[hash].js',
        entryFileNames: 'static/js/[name]-[hash].js',
        assetFileNames: 'static/[ext]/[name]-[hash].[ext]'
      }
    }
  }
});
