<template>
  <div>
    <div
      id="test"
      style="width: 0px; height: 12px; line-height: 12px; margin-bottom: 5px; background: rgb(185, 236, 243);"
    ></div>当前进度：
    <span id="progress">0%</span>
    <button id="btn">开启进度条setInterval实现</button>
    <button id="btn1">开启进度条setTimeout实现</button>

    <button id="btn2">开启进度条requestFrame</button>
  </div>
</template>

<script>
export default {
  name: "pageprogress",
  data() {
    return {};
  },
  components: {},
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {
    // TODO:进度条实现记录
    let btn = document.getElementById("btn");
    let btn1 = document.getElementById("btn1");
    let btn2 = document.getElementById("btn2");
    let test = document.getElementById("test");
    let progress = document.getElementById("progress");
    btn.onclick = function () {
      let timer = setInterval(() => {
        if (parseInt(test.style.width) < 300) {
          test.style.width = parseInt(test.style.width) + 3 + "px";
          progress.innerHTML = parseInt(test.style.width) / 3 + "%";
        } else {
          clearInterval(timer);
        }
      }, 17);

      // var timer = setInterval(function () {
      //     if (parseInt(test.style.width) < 300) {
      //         test.style.width = parseInt(test.style.width) + 3 + 'px';
      //         progress.innerHTML = parseInt(test.style.width) / 3 + '%';
      //     } else {
      //         clearInterval(timer);
      //     }
      // }, 17);
    };

    // TODO：setTImeout实现
    // btn1.onclick = function(){
    //     console.log('点击触发setTimeout')
    //     let timer = setTimeout(function fn(){
    //         if(parseInt(test.style.width < 300)){
    //             test.style.width = parseInt(test.style.width)+3+'px';
    //             progress.innerHTML = parseInt(test.style.width)/3+"%";
    //             // TODO:为什么不触发，因为方法没有被调用，这里只是一个函数定义
    //             timer = setTimeout(fn,17)

    //         }
    //     },17)
    // }
    btn1.onclick = function () {
      let timer = setTimeout(function fn() {
        if (parseInt(test.style.width) < 300) {
          test.style.width = parseInt(test.style.width) + 3 + "px";
          progress.innerHTML = parseInt(test.style.width) / 3 + "%";
          timer = setTimeout(fn, 17);
        } else {
          clearTimeout(timer);
        }
      }, 17);
    };

    // btn2.onclick = function(){
    //     console.log('btn2内容');
    //     let timer = requestAnimationFrame(function fn(){
    //         if(parseInt(test.style.width < 300)){
    //             test.style.width = parseInt(test.style.width) + 3 + "px";
    //             progress.innerHTML = parseInt(test.style.width)/3 +"%";
    //             timer = requestAnimationFrame(fn);
    //         }else {
    //             cancelAnimationFrame(timer)
    //         }
    //     })
    // }

    btn2.onclick = function () {
      console.log("触发了吗requestFrame");
      var timer = requestAnimationFrame(function fn() {
        if (parseInt(test.style.width) < 300) {
          test.style.width = parseInt(test.style.width) + 3 + "px";
          progress.innerHTML = parseInt(test.style.width) / 3 + "%";
          timer = requestAnimationFrame(fn);
        } else {
          cancelAnimationFrame(timer);
        }
      });
    };
  },
  beforeUpdate() {},
  destroyed() {},
  methods: {},
};
</script>
<style lang='scss' scoped>
</style>
