<template>
  <div id="title-list">
    <span>title标题切换</span>
    <ChildlistoneVue
      msg="我是父组件传递的消息"
      :money="states.fatherMoney"
      @childChangeMoney="changeChildMoneyFn"
    />
  </div>
</template>
<script >
export default {
  name: "titleList",
};
</script>
<script setup>
import ChildlistoneVue from "./childlistone.vue";
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
// 引入api-hook部分

import { reactive, onUnmounted, onUpdated, onMounted, toRefs } from "vue"; // 引入需要的
// 引入各种组件库部分
// 引入接口api部分
//setup是在beforeCreate和created之前执行，创建的是data和method
const states = reactive({
  fatherMoney: 145,
});
/**
 * 父组件接收到子组件的事件通知驱动：
 * 通知修改金额的事件
 */
const changeChildMoneyFn = (params) => {
  console.log(params);
  states.fatherMoney += states.fatherMoney;
};
</script>
<style lang='css' scoped>
</style>