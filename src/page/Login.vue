<template>
  <div class="view">
    <div class="nav">
      <span class="nav_left">麦迪克斯</span>
      <router-link tag="span" to="/set">
        <van-icon name="setting-o" size="30" class="right" />
      </router-link>
    </div>
    <p>MEMRS绿色通道</p>
    <div class="login">
      <van-form @submit="login">
        <div class="iconfont icon-inspection"></div>
        <van-field v-model="logindata.username" class="input" name="用户名" placeholder="用户名" />
        <div class="iconfont icon-suo"></div>
        <van-field
          v-model="logindata.password"
          class="input"
          type="password"
          name="密码"
          placeholder="密码"
        />
        <div class="iconfont icon-eye"></div>
        <div class="password">忘记密码</div>
        <div style="margin: 16px;">
          <van-button round block type="info" native-type="submit" class="login-button">
            <span class="button">登录</span>
          </van-button>
        </div>
      </van-form>
      <icon-svg icon-class="food"></icon-svg>
      <icon-svg icon-class="AddUser"></icon-svg>
    </div>
  </div>
</template>
<style scoped lang="scss">
.view {
  background-color: #fff;
  height: 100%;
}
.nav {
  display: flex;
  padding-top: 15px;
  align-items: center;
  .nav_left {
    flex: 1;
    padding-left: 50px;
  }
  span {
    padding-right: 20px;
  }
}
p {
  text-align: center;
  margin: 80px;
  font-size: 20px;
  font-weight: 600;
}
.login {
  width: 300px;
  height: 400px;
  margin: 0 auto;
  .van-form {
    position: relative;
    color: #b3b3b3;
    .password {
      float: right;
      padding: 23px 15px 50px 0;
      font-size: 12px;
      color: #464c5b;
    }
    .input {
      padding-left: 70px;
    }
    .iconfont {
      position: absolute;
      font-size: 30px;
      z-index: 999;
    }
    .icon-inspection {
      top: 9px;
      left: 26px;
    }
    .icon-suo {
      top: 50px;
      left: 26px;
    }
    .icon-eye {
      top: 56px;
      right: 37px;
      font-size: 18px;
    }
    .login-button {
      background-color: #3a5ba4;
      .button {
        font-weight: bold;
        font-size: 18px;
      }
    }
  }
}
</style>
<script>
// import { loginFirst, getUserInfo } from "./../api/login/index.js";
// import { loginFirst,getUserInfo } from "../api/login/index";
// import { base } from '../appConfig/base.js'

// 导入loginFirst的接口
//import { loginFirst } from "@/api/index.js";
import { loginFirst, getUserInfo, loginFirstMock } from "../api/index.js";
export default {
  data() {
    return {
      logindata: {
        username: "",
        password: "",
        userSource: "PC",
      },
    };
  },
  created() {
    //   TODo:测试使用use的实现原理，自己封装实现一个组件，第一个参数默认是当前的vue对象。
    this.myAdd(333, 444);
    this.myNoAdd(333, 44);
  },
  mounted() {
    //   TODO:增加对于vue中优秀实现的案例增加hook
    window.addEventListener("resize", this.login);
    this.$on("hook:beforeDestory", () => {
      console.log("-------------hook实现优秀");
      window.removeEventListener("resize", this.login);
    });
  },
  methods: {
    login() {
      let _this = this;
      let loginname = this.encode(this.logindata.username);
      let loginpass = this.encode(this.logindata.password);
      // this.$http.post("http://192.168.0.194:8099/login"+"?username="+loginname+"&password="+loginpass+"&userSource=Pad")
      //this.$http.post("/api/login"+"?username="+loginname+"&password="+loginpass+"&userSource=Pad")
      let dataParam = {
        username: loginname,
        password: loginpass,
        userSource: "PC",
        cancelTokenFlag: false,
        loadingFlag: false,
      };
      console.log("-------------打印内容是什么---login");
      //   loginFirstMock(dataParam).then((res) => {
      //     const { code, data } = res.data;
      //     console.log(code, "-------code内容-------", "data----------", data);
      //   });
      // _占位符
      loginFirst(dataParam)
        .then((res) => {
          console.log("我要处理的内容是");
          //   console.log(res)

          getUserInfo().then((res) => {
            console.log(res);
            //将用户信息存入到sessionStorage中
            sessionStorage.setItem("user", JSON.stringify(dataParam));
            //实现路由的跳转，跳转到home页
            this.$router.push({
              name: "home",
              params: {
                pkorg: res.results[0].pkOrg,
              },
            });
            sessionStorage.setItem("name", res.results[0].userName);
            // this.$router.push("/home",res[0].pkOrg);
          });
          return new Promise(() => {});
        })
        .catch((err) => {
          console.log("打印出错了", err);
        });
      // this.$http
      //   .post(
      //     _this.host("login") +
      //       "?username=" +
      //       this.logindata.username +
      //       "&password=" +
      //       this.logindata.password +
      //       "&userSource=" +
      //       this.logindata.userSource
      //   )
      //   .then(function(response) {
      //     if (response.data.state == "ok") {
      //       this.$http
      //         .post(_this.host("getUserInfo"), {})
      //         .then(function(response) {
      //           if (response.data.state == "1") {
      //             //授权加密
      //             let data = [
      //               {
      //                 systemId: "MCPS",
      //                 moduleId: "login"
      //               },
      //               {
      //                 systemId: "MCPS",
      //                 moduleId: "MCPS_encrypt_17"
      //               },
      //               {
      //                 systemId: "MCPS",
      //                 moduleId: "MCPS_encrypt_05"
      //               },
      //               {
      //                 systemId: "MCPS",
      //                 moduleId: "MCPS_encrypt_06"
      //               }
      //             ];
      //             _this.$http
      //               .post(_this.host("authorization/encrypt"), data)
      //               .then(function(res) {
      //                 let results = res.data.results;
      //                 for (let i = 0; i < results.length; i++) {
      //                   if (
      //                     results[i].moduleId == "login" &&
      //                     results[i].state != "0"
      //                   ) {
      //                     //state:1,未授权，根据返回error编码，提示对应的错误信息
      //                     // _this.$toast.center('fail.png',results[i].error);
      //                     return;
      //                   }
      //                   if (
      //                     results[i].moduleId == "MCPS_encrypt_17" &&
      //                     results[i].state != "0"
      //                   ) {
      //                     //state:1,未授权，根据返回error编码，提示对应的错误信息
      //                     // _this.$toast.center('fail.png',results[i].error);
      //                     return;
      //                   }
      //                 }
      //                 for (let j = 0; j < results.length; j++) {
      //                   if (results[j].moduleId == "MCPS_encrypt_05") {
      //                     if (results[j].state == "0") {
      //                       this.util.autho.uploadEcg.status = 0;
      //                     } else {
      //                       this.util.autho.uploadEcg.status = 1;
      //                       this.util.autho.uploadEcg.errorMsg =
      //                         results[j].error;
      //                     }
      //                     continue;
      //                   } else if (results[j].moduleId == "MCPS_encrypt_06") {
      //                     if (results[j].state == "0") {
      //                       this.util.autho.checkEcg.status = 0;
      //                     } else {
      //                       this.util.autho.checkEcg.status = 1;
      //                       this.util.autho.checkEcg.errorMsg =
      //                         results[j].error;
      //                     }
      //                     continue;
      //                   }
      //                 }
      //                 //state:0,已授权，跳转胸痛页面
      //                 _this.util.logindata = response.data.results[0];
      //                 _this.selectSystemset();
      //                 _this.initWebSocket();
      //                 sessionStorage.setItem(
      //                   "logindata",
      //                   JSON.stringify(response.data.results[0])
      //                 );
      //                 _this.TimeRationality();
      //                 _this.changepwd();
      //                 _this.$router.push("/home");
      //                 //页面信息初始化
      //                 _this.util.diagnosistreatment = {}; //初始化患者诊断信息
      //                 _this.util.patient = {}; //初始化患者信息
      //                 _this.util.jumpUrl = ""; //初始化患者PCI手术路由
      //                 _this.util.baseInfo.name = "";
      //                 _this.util.baseInfo.gender = "";
      //                 _this.util.baseInfo.age = "";
      //                 _this.patientinfo.padPatInfoView = {};
      //                 _this.patientinfo.padCheckInfoView = {};
      //                 _this.patientinfo.padDiaInfoView = {};
      //                 // _this.patientinfo.padTimeView={};
      //                 Vue.set(_this.util, "menuActiveName", "1-1");
      //                 //建立websocket服务连接
      //                 //                  this.location.initWebSocket();
      //               })
      //               .catch(function(error) {
      //                 _this.$toast.center("fail.png", error);
      //                 console.log(error);
      //               });
      //           }
      //           if (response.data.state == "2") {
      //             // _this.$toast.center('warn.png',response.data.msg)
      //             _this.$router.push("/");
      //           }
      //         })
      //         .catch(function(error) {
      //           console.log(error);
      //         });
      //     } else {
      //       // _this.$toast.center('fail.png',response.data.msg)
      //     }
      //   })
      //   .catch(function(error) {
      //     // _this.$toast.center('fail.png',error);
      //     console.log(error);
      //   });
      // this.$router.push({
      //   path: "/home"
      // });
    },
    encode(str) {
      // 对字符串进行编码

      let encode = encodeURI(str);
      // 对编码的字符串转化base64
      let base64 = btoa(encode);
      return base64;
    },
  },
};
</script>
