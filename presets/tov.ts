import Pages from "vite-plugin-pages";
import Icons from "unplugin-icons/vite";
import Inspect from "vite-plugin-inspect";
import Windicss from "vite-plugin-windicss";
import Layouts from "vite-plugin-vue-layouts";
import AutoImport from "unplugin-auto-import/vite";
import IconsResolver from "unplugin-icons/resolver";
import Components from "unplugin-vue-components/vite";
import viteSvgIcons from 'vite-plugin-svg-icons';
import path from 'path';

import {
  ElementPlusResolver,
  VueUseComponentsResolver,
} from "unplugin-vue-components/resolvers";
import { viteMockServe } from "vite-plugin-mock";
import Markdown from "vite-plugin-md";
import Vue from "@vitejs/plugin-vue";
import Prism from "markdown-it-prism";

const markdownWrapperClasses =
  "prose md:prose-lg lg:prose-lg dark:prose-invert text-left p-10 prose-slate prose-img:rounded-xl prose-headings:underline prose-a:text-blue-600";

export default () => {
  return [
    Vue({
      include: [/\.vue$/, /\.md$/],
    }),
    Markdown({
      wrapperClasses: markdownWrapperClasses,
      markdownItSetup(md) {
        md.use(Prism);
      },
    }),
    Pages({
      extensions: ["vue", "md"],
    }),
    Layouts(),
    Inspect(),
    Windicss({
      safelist: markdownWrapperClasses,
    }),
    viteMockServe(),
    // https://icones.netlify.app/
    // 图标自动使用注册
    Icons({
      autoInstall: true,
    }),
    viteSvgIcons({
      // 指定要缓存的图标文件夹
      iconDirs: [path.resolve(process.cwd(), 'src/assets/svg')],
      // 执行icon name的格式
      symbolId: 'icon-[dir]-[name]',
    }),
    Components({
      extensions: ["vue"],
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      resolvers: [
        // TODO:引入nativeui组件库
        // NaiveUiResolver(),
        // 按需引入elementplus组件库
        ElementPlusResolver(),
        // 按需引入antD
        // AntDesignVueResolver(),
        // TODO:自动引入了vueuse的配置部分组件
        VueUseComponentsResolver(),
        // 需要放在elementplus配置下面
        // TODO:配置了最前面后，会导致inconfsResolver和
        // TODO：配置相关的elementplus的汇总图标，引入后，这里比如使用<el-icon >包裹即可。
        // TODO:引入第三方插件图标和elementplus的图标，
        // elementplus图标方式<el-icon>，第三方的插件地址https://icones.netlify.app/collection/mdi?s=
        IconsResolver({
        	prefix: false,
          componentPrefix: ''
        }),
      ],
      dts: true,
    }),
    // 自动导入部分vue,vue-router,pinia,vueuse
    AutoImport({
      dts: "./presets/types/auto-imports.d.ts",
      imports: ["vue", "pinia", "vue-router", "@vueuse/core"],
    }),
  ];
};
