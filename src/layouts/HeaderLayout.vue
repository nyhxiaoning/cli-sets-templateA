<template>
  <div class="common-layout">
    <admin-header/>
    <div class="content"><slot></slot></div>
    <!-- <page-footer :link-list="footerLinks" :copyright="copyright"></page-footer> -->
  </div>
</template>

<script>
import AdminHeader from '@/layouts/header/AdminHeader.vue'
// import PageFooter from '@/layouts/footer/PageFooter'
import {mapState} from 'vuex'

export default {
  name: 'HeaderLayout',
  components: {AdminHeader},
  computed: {
    ...mapState('setting', ['footerLinks', 'copyright'])
  }
}
</script>

<style scoped lang="less">
.common-layout{
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: auto;
  background-color: @layout-body-background;
  background-repeat: no-repeat;
  background-position-x: center;
  background-size: 100%;
  .content{
    flex: 1;
    // padding: 32px 0;
    // flex: 1;
    // @media (min-width: 768px){
    //   padding: 0 116px;
    // }
  }
}
</style>
