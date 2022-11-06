<template>
  <div class="demo-warpper">{{ demo }}</div>
  <div class="demo-warpper">{{ reactiveDemo.name }}</div>
  <div class="demo-warpper">{{ name }}</div>
</template>

<script setup>
import { windowHeight, repairBlur } from '@/hooks/useFixedInput.js'; // 解决ios不回弹的问题

onMounted(() => {
  windowHeight.value = window.innerHeight;
});

onUpdated(() => {
  repairBlur();
});

// 顶部状态栏高度
const demo = ref('第三方');
const reactiveDemo = reactive({
  name: 'sdfasdfasdfasdfasdf'
});

const { name } = toRefs(reactiveDemo);
</script>

<style lang="scss" scoped>
.demo-warpper {
  color: red;
}
</style>
