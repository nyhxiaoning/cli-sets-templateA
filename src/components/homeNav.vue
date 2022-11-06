<template>
  <div class="home-nav-container">
    <div class="home-nav-label">{{ lable }}</div>
    <div class="home-nav-value">
      {{ value }}{{ unit }}
      <img src="@/assets/common/enter-icon.png" alt="" class="enter-icon" />
    </div>
  </div>
</template>
<script setup>
defineProps({
  value: {
    type: Number
  },
  unit: {
    type: String
  },
  lable: {
    type: String
  }
});
</script>
<style lang="scss" scoped>
.home-nav-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 7.1rem;
  height: 1.2rem;
  background: #ffffff;
  border-radius: 0.2rem;
  margin: 0.2rem auto;
  padding: 0 0.32rem;
  .home-nav-label {
    font-size: 0.28rem;
    font-family: PingFangSC, PingFangSC-Regular;
    font-weight: 400;
    text-align: center;
    color: #333333;
    line-height: 0.4rem;
  }
  .home-nav-value {
    line-height: 0.4rem;
    font-size: 0.26rem;
    font-family: PingFangSC, PingFangSC-Regular;
    font-weight: 400;
    text-align: right;
    color: #999999;
    line-height: 0.37rem;
    display: flex;
    align-items: center;
  }
  .enter-icon {
    margin-left: 0.24rem;
    width: 0.13rem;
    height: 0.23rem;
  }
}
</style>
