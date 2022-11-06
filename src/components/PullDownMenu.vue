<template>
  <div>
    <van-popup v-model="isShow" position="right" :style="{width:'100%'}">
      <!-- 下拉菜单 -->
      <van-dropdown-menu>
        <van-dropdown-item v-model="value1" :options="option1" />
      </van-dropdown-menu>
    </van-popup>
  </div>
</template>
<script>
export default {
  props: {
    isShow: {
      type: Boolean,
      default: false,
    },
    // 父组件传过来的一个radio
    field: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      value1: 0,
      option1: [
        { text: "全部商品", value: 0 },
        { text: "新款商品", value: 1 },
        { text: "活动商品", value: 2 },
      ],
    };
  },
  methods: {
    //   编写一个函数，将从父组件传递过来的field.idType渲染在下拉框中
    // assignValue() {},
  },
};
</script>
