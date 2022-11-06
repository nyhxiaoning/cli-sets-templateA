<template functional>
  <div class="xt-header">
    <div class="xt-left">
      <i class="iconfont icon-xiaoyuhao"></i>
      <slot name="left"></slot>
    </div>
    <div class="xt-title">
      <h1 v-if="props.title">{{props.title}}</h1>
      <slot v-else></slot>
    </div>
    <div class="xt-right">
      <slot name="right"></slot>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.xt-header {
  display: flex;
  color: #fff;
  background-color: #3a5ba4;
  height: 40px;
  line-height: 40px;
  text-align: center;
  .xt-left {
    font-size: 16px;
    padding-left: 10px;
  }
  .xt-right {
    width: 60px;
    font-size: 16px;
  }
  .xt-title {
    flex: 1;
    font-size: 16px;
    font-weight: bold;
  }
  h1 {
    font-size: 24px;
    font-weight: normal;
  }
}
</style>
