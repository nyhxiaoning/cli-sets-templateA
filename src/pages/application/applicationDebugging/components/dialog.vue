<template>
  <div>
    <a-modal
      width="384px"
      class="edit-dialog"
      :title="dialogTitle"
      :visible="visible"
      :centered="true"
      :confirm-loading="confirmLoading"
      @cancel="handleCancel"
      @ok="handleCancel"
    >
      <a-carousel arrows :afterChange="afterChange">
        <div v-for="item in imgList" :key="item.id">
          <div class="img-box">
            <img :src=" item" alt="" />
            <!-- <img src="https://pics4.baidu.com/feed/5243fbf2b211931341bbb75b2911a7dd90238d11.jpeg" alt=""> -->
          </div>
        </div>
        <div
          slot="prevArrow"
          class="custom-slick-arrow"
          style="left: 75px;zIndex: 1"
        >
          <img src="@/assets/img/left-icon.png" class="itemImage" />
          <!-- <a-icon type="left-circle" /> -->
        </div>
        <div
          slot="nextArrow"
          class="custom-slick-arrow"
          style="right: 75px"
        >
          <img src="@/assets/img/right-icon.png" class="itemImage" />
          <!-- <a-icon type="right-circle" class='jiantou' /> -->
        </div>
      </a-carousel>
      <div>
      <div class="total"><p>{{this.current}}</p><p>/</p><p>{{ imgList.length }}</p></div>
      </div>
    </a-modal>
  </div>
</template>
<script>
export default {
  // props: {
  //   imgList: {
  //     type: Array,
  //     default: () => [],
  //   },
  // },
  data() {
    return {
      visible: false,
      confirmLoading: false,
      imgList: [],
      dialogTitle: undefined,
      current: 1
    };
  },
  methods: {
    afterChange(current) {
      this.current = current+1;
      console.log(current, "afterChange,current");
    },
    setValue(value, name) {
      // debugger
      this.imgList = [];
      console.log(value)
      this.imgList = value;
      this.dialogTitle = name;
    },
    handleCancel() {
      this.visible = false;
    },
    show() {
      this.visible = true;
    },
    handleOk(e) {
      this.confirmLoading = true;
      setTimeout(() => {
        this.visible = false;
        this.confirmLoading = false;
      }, 2000);
    },
  },
};
</script>
<style lang="less" scoped>
.edit-dialog {
  /deep/.ant-modal-header {
    .ant-modal-title {
      display: flex;
      justify-content: center;
      font-size: 16px;
      font-family: PingFang SC, PingFang SC-Medium;
      font-weight: 500;
      text-align: CENTER;
      color: #1d2129;
    }
  }
  /deep/ .ant-modal-body {
    // padding-bottom: 50px;
    .ant-carousel {
      width: 100% !important;
      // background: #364d79;
      .custom-slick-arrow {
        img {
          width: 20px;
        }
      }
      .slick-slider {
        .slick-list {
          .img-box {
            width: 100%;
            height: 148px;
            img {
              display: block;
              max-width: 100%;
              max-height: 100%;
              text-align: center;
              margin: 0 auto;
            }
          }
        }
        .slick-dots {
          height: 6px;
          li {
            button {
              width: 6px !important;
              height: 6px !important;
              border-radius: 50%;
            }
          }
        }
      }
    }
    .ant-carousel .slick-prev, .ant-carousel .slick-next {
      top: 111%;
    }
  }

  .ant-carousel > .slick-slide {
    text-align: center;
    height: 160px;
    line-height: 160px;
    background: #364d79 !important;
    overflow: hidden;
  }

  .ant-carousel > .custom-slick-arrow {
    width: 25px;
    height: 25px;
    font-size: 25px;
    color: #fff;
    background-color: rgba(31, 45, 61, 0.11);
    opacity: 0.3;
  }
  .ant-carousel > .custom-slick-arrow:before {
    display: none;
  }
  .ant-carousel > .custom-slick-arrow:hover {
    opacity: 0.5;
  }

  .ant-carousel > .slick-slide h3 {
    color: #fff;
  }
  .total {
    height: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
    p {
      margin: 0;
      padding: 0;
      font-size: 16px;
      font-weight: 600;
    }
    p:first-child {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 40px;
      height: 28px;
      background: #f2f3f5;
      border-radius: 2px;
    }
    p:nth-child(2) {
      margin: 0 12px;
    }
  }
}
</style>
