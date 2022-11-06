<template>
  <div class="main-layout">
    <Header v-bind="$attrs" />
    <div class="main-container">
      <div class="main-container-slot">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import Header from '@/layout/Header.vue';
import { getNavHeight } from '@/utils/index.js';

const headerHeight = ref('');
if (window.JeeWeb?.deviceInfo?.statusBarHeight) {
  headerHeight.value = getNavHeight() + window.JeeWeb?.deviceInfo?.statusBarHeight + 'px';
} else {
  headerHeight.value = getNavHeight() + 'px';
}
</script>

<style lang="scss" scoped>
.main-layout {
  display: flex;
  .main-container {
    width: 100%;
    .main-container-slot {
      height: calc(100vh - v-bind("headerHeight"));
    }
    &::before {
      content: "";
      height: v-bind(headerHeight);
      width: 100%;
      display: block;
    }
  }
}
</style>
