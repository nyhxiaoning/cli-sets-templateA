<template>
  <div class="demoPage">
    <div>1231231313</div>
    <iframe
      :src="'http://172.16.31.135:8080/test.html'"
      id="childFrame"
      scrolling="auto"
      seamless
      width="360"
      height="617"
      frameborder="0"
      name="youdaoFrame"
    ></iframe>
  </div>
</template>

<script>
export default {
  mounted() {
    var iframe = document.getElementById("childFrame");
    iframe.contentWindow.username='111111111111111'
    iframe.contentWindow.conmand= (data)=>{
      return new Promise((resolve, reject) => {
        resolve(111)
      })
    }
    iframe.contentWindow.onRx=(call)=>{
      callback=call?call:()=>{}
    }
    setTimeout(() => {
      let res={code:111,result:'asdsd',device:'1111'}
      callback(res)
    }, 3000);
    iframe.contentWindow.deviceArr=[{
      deviceId:'111',
      name:'传感器',
    }]
    iframe.contentWindow.onreday()  
  }
}
</script>

<style>

</style>