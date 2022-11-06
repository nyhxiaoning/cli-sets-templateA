<template>
  <div>
    我是vant的v-for组件
    <van-radio-group v-model="radio">
      <van-radio name="1">单选框 1</van-radio>
      <van-radio name="2">单选框 2</van-radio>
    </van-radio-group>
    <!-- 循环实现v-for -->
    <template>
      <van-radio-group v-model="radio">
        <van-radio
          :name="items"
          v-for="(items,index) in dataRadio"
          :key="index"
          @click="clickRadio(items,index+1)"
        >{{items}}</van-radio>
      </van-radio-group>
    </template>
  </div>
</template>
<script>
export default {
  data() {
    return {
      radio: "2",
      arrRadio: ["1", "2", "3", "4"],
      dataRadio: ["单选框1", "单选框2", "单选框3", "单选框4"],
      radioResult: "",
    };
  },
  methods: {
    /**
     */
    clickRadio(radiovalue, index) {
      console.log(radiovalue, index);
    },
  },
};
</script>

<style>
</style>