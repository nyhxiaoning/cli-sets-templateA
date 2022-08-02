
<template>
  <div>
    <!-- 引入地址是https://icones.netlify.app的一个图标库 -->
    <!-- <ep:user />
  <ep:user />

  <ep:user />
  <tabler:2fa />
  <mdi:abacus />
  <ant-design:account-book-twotone /> -->
    <svg-icon name="home">
      图标库
    </svg-icon>
    <div>222222</div>
    <el-button @click="getTermQueryFn">
      触发一个请求封装
    </el-button>
    <el-button @click="upload">
      测试上传
    </el-button>
    <div m="6">
      Hello，This is the tov template！！
    </div>
    <el-button m="6" cursor="pointer" @click="toggleDark()">
      light: {{ isDark }} 点击切换主题色彩!!
    </el-button>
    <div>当前的坐标地址{{ x }}:{{ y }}</div>


    <!-- <el-button type="primary">elementplus</el-button> -->

    <!-- TODO:另一个可以项目： https://gitee.com/nyhxiaoning/myvite3-vuerouter-auto.git -->
    <el-button type="primary" disabled>
      我是elementplus
    </el-button>
    <!-- <el-rate v-model="value" allow-half /> -->
    <!-- <a-button type="primary">我是antDVue3的按钮</a-button> -->
    <!-- TODO:实现原理：请求实现 -->
    <!-- <div>data: {{ data }}</div>
  <div>error: {{ error }}</div>
  <div>loading: {{ loading }}</div> -->
  </div>
</template>

<script setup lang="ts">
import { ref, defineEmits, watch } from "vue";
import SvgIcon from "./../components/SvgIcon/index.vue";
import { isDark, toggleDark } from "~/composables/dark";
import { useRequest } from "vue-request";
import https from "~/utils/https/https";
import { getTermQuery } from "~/api/test";
// useMouse 被自动按需引入了，不需要import


const { x, y } = useMouse();
// 引入事件库
// const emit = defineEmits(['color'])
// if(2+2 ==4){
//     emit('setColor','green')
// }else {
//     emit('setColor','red')
// }
async function getTermQueryFn() {
  await useRequest(getTermQuery('1'));
}


// 进行上传操作
function upload(params: any) {
  console.log(params.file);
  if (params.file) {
    // 执行上传操作 （params.file 上传的文件对象）
    // debugger;
    let formData = new FormData();
    formData.append("file", params.file);
    https
      .uploadfile("media", "upload", formData)
      .then(function (response) {
        console.log("文件上传结果11111111", response.id);

      })
      .catch((err) => {
        console.log("文件上传报错", err);
      });
  }
}
</script>


<script lang='ts'>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { defineComponent } from 'vue'; // 引入需要的
export default defineComponent({
  name: "PageIndex"
});
</script>
<style lang='css' scoped>
</style>