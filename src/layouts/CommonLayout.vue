<template>
  <div class="common-layout">
    <div class="common-header">
      <div class="header-left">
        <img src="../assets/img/Component 1.svg" alt="" style="width:203px;height:32px">
      </div>
    </div>
    <div class="content"><slot></slot></div>
    <!-- <div class="login-bottom">
      关于我们 | 联系我们 | 服务协议 Copyright © 2018-2022 Jeejio. All Rights Reserved
    </div> -->
  </div>
</template>

<script>
// import PageFooter from '@/layouts/footer/PageFooter'
import {mapState} from 'vuex'

export default {
  name: 'CommonLayout',
  // components: {PageFooter},
  computed: {
    ...mapState('setting', ['footerLinks', 'copyright'])
  },
  methods: {
    handleGoTools() {
      let url = process.env.VUE_APP_TOOLS_URL // /forget
      let tools = window.open(url + '/tools/login')
    }
  }
}
</script>

<style scoped lang="less">
.common-layout{
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: auto;
  background-color: #f7f8fc;
  background-image: url('../assets/img/bg.png');
  // background-image: url('https://gw.alipayobjects.com/zos/rmsportal/TVYTbAXWheQpRcWDaDMu.svg');
  background-repeat: no-repeat;
  background-position-x: center;
  background-size: 100% 50%;
  .common-header{
    padding: 32px;
    display: flex;
    justify-content: space-between;
    .header-right{
      font-size: 16px;
      font-family: PingFang SC, PingFang SC-Regular;
      font-weight: 400;
      text-align: LEFT;
      color: #333333;
      line-height: 16px;
      cursor: pointer;
    }
  }
  .content{
    flex: 1;
    // @media (min-width: 768px){
    //   padding: 112px 0 24px;
    // }
  }
  .login-bottom{
    height: 46px;
    background: rgba(0,0,0,0.65);
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
  }
}
</style>
