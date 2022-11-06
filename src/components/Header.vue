<template functional>
  <div class="xt-header">
    <div class="xt-left">
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
  background-color: #4676fb;
  height: 40px;
  line-height: 40px;
  text-align: center;
  .xt-left {
    font-size: 16px;
    width: 50px;
    padding-left: 10px;
    text-align: left;
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
