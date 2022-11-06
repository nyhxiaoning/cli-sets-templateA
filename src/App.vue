<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",

  methods: {
    esfn() {
      let a = "33";
      console.log(a, "es6的let");
      Promise.resolve(() => {
        console.log(
          "直接使用一个promise2222222222222222222222promisepromise44444444444444promise00000000000000"
        );
      });
    },
    esfn1() {
      let a = "44";
      console.log(a, "es6的let");
      Promise.resolve(() => {
        console.log(
          "直接使用一个promise2222222222222222222222promisepromise44444444444444promise00000000000000"
        );
      });
    },
  },
};
</script>

<style>
/* 全局样式最好写一个文件 */
html,
body {
  background-color: #efefef;
  width: 100%;
  height: 100%;
}
#app {
  margin: 0;
  padding: 0;
  list-style: none;
  width: 100%;
  height: 100%;
}
p {
  -webkit-margin-before: 0;
  -webkit-margin-after: 0;
}
</style>
