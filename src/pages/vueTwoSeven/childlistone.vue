<template>
  <div id="">
    我是子节点的内容
    <h2 @click="ageInc">{{ states.name }}现在的年龄是{{ states.age }}</h2>
    <span>我是父组件传递的属性：{{ props.msg }}</span>
    <span>
      金额汇总内容金钱总数：
      {{ props.money }}
    </span>
    <span @click="changeMoneyFn"> 点击切换当前的money值 </span>
  </div>
</template>
<!-- 增加一个名称 -->
<script >
export default {
  name: "childlistone",
};
</script>
<script setup>
//这里可以导入其他文件（比如：组件，工具    js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
// 引入api-hook部分

import {
  reactive,
  watch,
  defineEmits,
  defineProps,
  getCurrentInstance,
} from "vue"; // 引入需要的
// TODO:vue2.7使用:defineProps用来接收父组件传来的值props。defineEmit用来声明触发的事件表。useContext用来获取组件上下文context。
// 派发事件，使用数组
// const emit = defineEmit(["child-click"]);
// 使用定义好的事件通知

// 获取当前的上下文数据

// prop传值配置
/**
 * todo:1.props传值配置对象
 */
const props = defineProps({
  msg: {
    type: String,
    default: "消息",
  },
  money: {
    type: Number,
    default: 0,
  },
});
/**
 * todo:2.emit的事件列表汇总内容，定义位置
 */
const emits = defineEmits(["childChangeMoney"]);

// 引入各种组件库部分
// 引入接口api部分
//setup是在beforeCreate和created之前执行，创建的是data和method
const states = reactive({
  name: "姓名是什么",
  age: 34,
});
// todo:获取this
const contexts = getCurrentInstance();
const ageInc = function () {
  states.age++;
};
/**
 * 子组件更改值，让父组件派发money值
 */
const changeMoneyFn = () => {
  emits("childChangeMoney", "我是子组件");
};
// const handleClick = () => {
//   emit("child-click", ctx);
// };

/**
 * 子组件接受监听变化money值
 */
watch(
  () => props.money,
  (newValue, oldValue) => {
    console.log("person的年龄变化了", newValue, oldValue);
    console.log(contexts, "contexts-------");
  },
  { deep: true }
);
</script>
<style lang='css' scoped>
</style>