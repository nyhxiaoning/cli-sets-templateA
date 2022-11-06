<template>
  <div>
    <a-modal
      class='edit-dialog'
      title="删除提示"
      :visible="visible"
      :centered="true"
      width='370px'
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <!-- :confirm-loading="confirmLoading" -->
      <div class="dialog-content">
        <div class="iocn-box">
          <img src="@/assets/img/tcjg@2x.png" alt="">
        </div>
        <div class="text-box">
          <div class="text-title">确认删除此应用？</div>
          <div class="text-content">删除后无法恢复，如果再次调试，请重新添加应用</div>
        </div>
      </div>
    </a-modal>
  </div>
</template>
<script>
export default {
  data() {
    return {
      visible: false,
      // confirmLoading: false,
      id: 0,
    };
  },
  methods: {
    show(){
      this.visible = true;
    },
    // 数据回显
    setValue(value){
      this.id = value;
    },
    handleCancel(){
      this.visible = false;
    },
    handleOk() {
      this.$emit('submitDate',this.id)
      this.visible = false;
    },
  },
};
</script>
<style lang="less" scoped>
  .edit-dialog {
    // width: 370px;
    /deep/.ant-modal-close-x {
      width: 38px;
      height: 38px;
      line-height: 38px;
    }
    /deep/.ant-modal-header {
      padding: 0;
      padding-left: 16px;
      height: 38px;
      background: #f0f1f5;
      display: flex;
      align-items: center;
      .ant-modal-title {
        font-size: 16px;
        font-family: PingFang SC, PingFang SC-Medium;
        font-weight: 600;
        text-align: left;
        color: #1d2129;
      }
      
    }
    .dialog-content {
      display: flex;
      .iocn-box {
        margin-right: 16px;
        img {
          width: 18px;
        }
      }
      .text-box {
        .text-title {
          height: 14px;
          font-size: 14px;
          font-family: Microsoft YaHei UI, Microsoft YaHei UI-Bold;
          font-weight: 700;
          text-align: LEFT;
          color: #333333;
          line-height: 14px;
          letter-spacing: 0.02px;
          margin-bottom: 10px;
        }
        .text-content {
          height: 46px;
          font-size: 14px;
          font-family: Microsoft YaHei UI, Microsoft YaHei UI-Regular;
          font-weight: 400;
          text-align: LEFT;
          color: #666666;
          line-height: 22px;
          letter-spacing: 0.02px;
        }
      }
    }
    /deep/.ant-modal-footer {
      .ant-btn {
        border: none;
        background: #f7f8fa;
        color: #666666;
      }
      .ant-btn-primary {
        background: #006fd0;
        color: #fff;
      }
    }
      
      
      
      
     


  }
 
</style>