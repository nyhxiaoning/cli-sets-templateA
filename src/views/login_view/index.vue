<!--  -->
<template>
  <div id="">
    2
    <el-button>测试是否有按需成功</el-button>

    <el-link type="success">
      此时的样式
    </el-link>
    svg图标小工
    <!-- TODO:是elememt-icon的图标库 -->
    <svg-icon icon="field" style="margin-left: 8px;" />
    你好世界哈哈哈哈
  </div>
</template>

<script lang='ts'>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { defineComponent, reactive, onUnmounted, onUpdated, onMounted, toRefs } from 'vue'; // 引入需要的
export default defineComponent({
    //setup开始创建组件之前，在 beforeCreate 和 created 之前执行，创建的是 data 和 method
    setup() {
        //setup是在beforeCreate和created之前执行，创建的是data和method

        onMounted(() => {
            // console.log('页面挂载完成，触发了onMounted钩子函数');
            //window.addEventListener('resize', someMethod)
        });
        onUpdated(() => {
            // console.log('数据发生了更新，触发了onUpdated钩子函数')
        });
        onUnmounted(() => {
            //console.log('页面/组件退出，触发了onUnmounted钩子函数')
            //window.removeEventListener('resize', someMethod)
        });
        //返回定义好的组件内容
        return {

        };
    }
});
</script>
<style lang='css' scoped>
</style>