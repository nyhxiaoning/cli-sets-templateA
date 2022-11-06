<template>
  <div class="checkboxlib">
    <div>
      <!-- <span v-for="item in selOptions" :key="item.id">item</span> -->
    </div>
    <input type="text" placeholder="请输入内容" />
    <span>我是一个checkbox-lib伪装组件</span>
  </div>
</template>

<script>
export default {
  name: "checkboxlib",
  //   TODO：增加自定义指令的配置项目
  directives: {
    focus: {
      inserted(el) {
        console.log("当前触发了这个input框，需要集中focus内容");
      },
    },
  },
  props: {
    selOptions: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {};
  },
  components: {},
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {},
  beforeUpdate() {},
  destroyed() {},
  methods: {
    esfnlib() {
      let alib = "33";
      console.log(alib, "es6的let");
      Promise.resolve(() => {
        console.log(
          "直接使用一个lib2222222222222222222222promisepromise44444444444444promise00000000000000"
        );
      });
    },
  },
};
</script>
<style lang='scss' scoped>
</style>
