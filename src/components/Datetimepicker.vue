<template>
  <div>
    <van-popup v-model="isShow" position="right" :style="{ height: '40%', width: '100%'}">
      <van-datetime-picker
        v-model="currentDate"
        type="datetime"
        title="选择日期和时间"
        :min-date="minDate"
        :max-date="maxDate"
        :formatter="formatter"
        @confirm="queding"
        @cancel="quxiao"
      />
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
      // isShow: false,
      minDate: new Date(2020, 0, 1),
      maxDate: new Date(2025, 10, 1),
      currentDate: new Date(),
      oTime: "",
    };
  },
  methods: {
    showPopup() {
      this.isShow = true;
      console.log(1111);
    },
    formatter(type, val) {
      if (type === "month") {
        return `${val}月`;
      } else if (type === "day") {
        return `${val}日`;
      } else if (type === "hour") {
        return `${val}时`;
      } else if (type === "minute") {
        return `${val}分`;
      }
      return val;
    },
    getMyDate(data) {
      var oDate = new Date(data),
        oYear = oDate.getFullYear(),
        oMonth = oDate.getMonth() + 1,
        oDay = oDate.getDate(),
        oHour = oDate.getHours(),
        oMin = oDate.getMinutes(),
        oTime = oYear + "-" + oMonth + "-" + oDay + " " + oHour + ":" + oMin; //最后拼接时间
      return oTime;
    },
    queding() {
      console.log("日期选择器确定");
      // this.isShow = false
      let param = {
        time: this.getMyDate(this.currentDate),
        field: this.field,
      };
      this.$emit("choosedata", param);
    },
    quxiao() {
      console.log("日期选择器取消");
      this.isShow = false;
      // debugger
    },
    quxiao() {
      console.log("日期选择器取消");
      this.isShow = false;
    },
  },
};
</script>
 