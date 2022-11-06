<template>
  <div class="footer">
    <div class="copyright">
      Copyright<a-icon type="copyright" />2022 Jeejio. All Rights Reserved. | 京ICP备18055853号-2
    </div>
  </div>
</template>

<script>
export default {
  name: 'PageFooter',
  props: ['copyright', 'linkList']
}
</script>

<style lang="less" scoped>
  .footer{
    padding: 24px 16px;
    /*margin: 48px 0 24px;*/
    text-align: center;
    .copyright{
      color: @text-color-second;
      font-size: 14px;
      i {
          margin: 0 4px;
      }
    }
    .links{
      margin-bottom: 8px;
      a:not(:last-child) {
        margin-right: 40px;
      }
      a{
        color: @text-color-second;
        -webkit-transition: all .3s;
        transition: all .3s;
      }
    }
  }
</style>
