<!--  -->
<template>
<div id=''>
   222222222 测试可以正常引入一个文件路由吗
</div>
   
</template>

<script setup>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { reactive, onUnmounted, onUpdated, onMounted, toRefs } from 'vue'; // 引入需要的
//setup是在beforeCreate和created之前执行，创建的是data和method
    
onMounted(() => {
    console.log('22222测试这里的内容有打印吗');
// console.log('页面挂载完成，触发了onMounted钩子函数');
//window.addEventListener('resize', someMethod)
})
onUpdated(() => {
// console.log('数据发生了更新，触发了onUpdated钩子函数')
})
onUnmounted(() => {
//console.log('页面/组件退出，触发了onUnmounted钩子函数')
//window.removeEventListener('resize', someMethod)
})
</script>
<style lang='css' scoped>
 
</style>