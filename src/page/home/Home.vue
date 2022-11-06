<template>
  <div class="view">
    <headerCom>
      <div slot="left" class="left-nav">
        <div class="nav-img"></div>
        <span>{{name}}</span>
      </div>
      <span>患者列表</span>
      <span slot="right" @click="$router.push('/add')" class="right-nav">+</span>
    </headerCom>
    <div class="content">
      <div class="title">
        <div class="title-left">
          <div
            v-for="(item, index) in tabs"
            :key="index"
            @click="tab(index,item.state)"
            :class="menuIndex==index?'choose':''"
          >{{item.title}}</div>
          <!-- <div class="choose" >未完成</div>
          <div>已完成</div>-->
        </div>
        <div class="title-right">
          <div
            v-for="(item, index) in tabs"
            :key="index"
            @click="change(index,item.states)"
            :class="currentindex==index?'choose':''"
          >{{item.title}}</div>
          <!-- <div>胸痛</div>
          <div>卒中</div>
          <div>创伤</div>-->
        </div>
      </div>
      <van-notice-bar scrollable mode="closeable" left-icon="../../../static/img/8.png">
        <template slot="default">李佳航 男 26岁 STEMI 血常规报告已耗时2分钟</template>
      </van-notice-bar>
      <div
        v-for="(item, index) in lists"
        :key="index"
        class="case"
        :class="menuIndex==index?'current':''"
      >
        <div class="num" :style="{ background: item.color }">{{ item.task_state }}</div>
        <div class="firstmsg">
          <div class="msg">
            <span class="name">{{ item.name }}</span>
            <!-- gender -->
            <span v-if="item.gender=='1'">男</span>
            <span v-else>女</span>
            <span>{{ item.age }}</span>
            <span>{{ item.type }}</span>
          </div>
          <div class="right_msg">
            <span class="state" :style="{ color: item.color2 }">{{item.state}}</span>
            <img src="../../assets/static/img/bingli.png" alt @click="bingli(index)" />
            <!-- 时间轴 -->
            <img src="../../assets/static/img/shijian.png" alt @click="time(index)" />
          </div>
        </div>
        <p>
          <span>接诊时间：{{ item.time }}</span>
        </p>
        <p class="doctor">
          <span>归属医生：{{ item.doctor1 }}</span>
          <span>{{ item.doctor2 }}</span>
        </p>
        <!-- 不同的样式使用不同的progress-bar进行样式替换 -->
        <!-- 因为这里设置li标签，那么我们利用router-link后变成li标签 -->
        <div class="progress-bar">
          <!-- <li
            v-for="childitem, index in item.illness"
            :key="index"
            :class="{'active':childitem.status==1}"
          >
            <span>{{childitem.name}}</span>
          </li>-->

          <!-- :to="childitem.url" -->
          <router-link
            :to="{name:childitem.url,query:{info:item.pk_pat_info}}"
            tag="li"
            v-for="(childitem, index) in item.illness"
            :key="index"
            :class="{ active: childitem.status == 1 }"
          >
            <!-- 当前的进行中的样式 -->
            <span>{{ childitem.name }}</span>
          </router-link>
        </div>
      </div>
    </div>
    <tabber></tabber>
  </div>
</template>
<script>
// 上面标题
import headerCom from "../../components/Header";
import Tabber from "../../components/Tabber";
import { getPatViews } from "../../api/index.js";
export default {
  components: {
    headerCom,
    Tabber,
  },
  data() {
    return {
      lists: [],
      tabs: ["未完成", "已完成"],
      menuIndex: 0,
      currentindex: -1,
      org: "",
      flag: false,
      state: 5,
      states: "",
    };
  },
  methods: {
    // 函数：跳转到时间轴函数
    // 参数：索引值
    //点击按钮触发
    bingli(index) {
      this.$router.push({
        name: "bingli",
        query: {
          name: this.lists[index].name,
          gender: this.lists[index].gender,
          age_value: this.lists[index].age_value,
          dcp_diagnosis_code: this.lists[index].dcp_diagnosis_code,
        },
      });
    },
    // 函数： 跳转到查看页面
    // 参数： 索引值
    time(index) {
      this.$router.push({
        // 指定time页面
        name: "time",
        // 传递参数
        query: {
          name: this.lists[index].name,
          gender: this.lists[index].gender,
          age_value: this.lists[index].age_value,
          dcp_diagnosis_code: this.lists[index].dcp_diagnosis_code,
          pk_pat_info: this.lists[index].pk_pat_info,
        },
      });
    },
    tab(index) {
      this.menuIndex = index;
    },
  },
  created() {
    var org = this.$route.params.pkorg;
    console.log(org);
    // 新增一个分页胡limit限制胡数量limit: 20
    let datas = {
      limit: 10,
      offset: 1,
      pk_org: org,
    };
    // 优化实现接口直接调用
    getPatViews(datas).then((res) => {
      console.log("res:", res);
      let JSONStr = JSON.stringify({ ...res.results[0].patViewlist });
      this.$patientobj = JSONStr;
      localStorage.setItem("patientLists", JSONStr);
      this.lists = res.results[0].patViewlist;
      console.log("lists", this.lists);
    });
  },
};
</script>
<style lang="scss" scoped>
// 进度条中字体
$myProgressFontSize: 15px;
// 进度条统一样式选中的时候和其他未选
$activeProgressColor: #4676fb;
$noActiveProgressColor: #d9dde8;
$noActiveArrowProgressColor: #fff;
// 滚动条样式
.van-notice-bar {
  padding: 0 10px;
  margin: 0 10px 10px 10px;
  height: 30px;
  background-color: #ffefb0;
}

// 导航条出了问题，到时候，进行@media 媒体查询
// TODO：
.view {
  background-color: #f8faff;
  height: 100%;
  .xt-header {
    background-color: #4676fb;
  }
  .left-nav {
    display: flex;
    align-items: center;
    width: 100px;
    .nav-img {
      width: 30px;
      height: 30px;
      background-color: skyblue;
      border-radius: 50%;
      margin-right: 5px;
    }
  }
  .right-nav {
    width: 70px;
    font-size: 30px;
  }
  .title {
    display: flex;
    margin: 10px 5px;
    text-align: center;
    .title-left,
    .title-right {
      div {
        height: 30px;
        line-height: 30px;
        border-radius: 30px;
        background-color: #fff;
      }
    }
    .title-left {
      display: flex;
      flex: 1;
      div {
        width: 70px;
      }
    }
    .title-right {
      display: flex;
      div {
        width: 50px;
      }
    }
    .choose {
      background-color: #4676fb !important;
      color: #fff !important;
    }
  }
  .news {
    // width: 100%;
    height: 30px;
    margin: 10px 5px;
    color: #b96835;
    background-color: #ffefb0;
    text-align: center;
    line-height: 30px;
    display: flex;
    font-size: 14px;
    img {
      width: 20px;
      height: 20px;
    }
    // div:first-child {
    //     background-color: #FFC67B;
    //     width: 35px;
    // }
    // :nth-child(2) {
    //     flex: 1;
    // }
    // :last-child {
    //     padding-right: 5px;
    // }
  }
  .content {
    .case {
      background-color: #fff;
      margin-bottom: 20px;
      position: relative;
      padding: 10px 10px 10px 25px;
      img {
        width: 28px;
        height: 28px;
      }
      p {
        margin: 5px 0;
      }
      .firstmsg {
        display: flex;
        align-items: center;
        .msg {
          flex: 1;
          font-size: 18px;
          span {
            margin-right: 5px;
            font-weight: 500;
          }
          :first-child {
            letter-spacing: 2px;
          }
        }
        .right_msg {
          display: flex;
          align-items: center;
          span {
            margin-right: 10px;
            font-size: 18px;
          }
          img {
            margin-right: 10px;
          }
        }
      }
      .doctor {
        margin-bottom: 10px;
        span {
          padding-right: 5px;
        }
      }
      .below {
        // width: 100%;//样式不生效，乱写
        height: 30px;
        font-size: 15px;
        display: flex;
        // 设置两个选中的时候样式默认选中
        .belowchoose2 {
          flex: 1;
          display: flex; //根据不同的进行自适应
          border: 1px solid #ffffff;
          // 设置每一种选中的样式
          background-color: #4676fb !important;
          // 背景文字样式
          color: white;
          text-align: center;
          .below2 {
            // width: 55px;
            display: inline-block;
            text-align: center;
            height: 28px;
            line-height: 28px;
            position: relative;
          }
          // 组件实现逻辑第一个每一个
          // 给每一个below2加上伪类实现箭头导航向后加上
          .below2:after {
            content: "";
            display: block; //为什么伪类需要是块
            top: 0;
            position: absolute; //那么below2是一个相对定位
            right: -5px;
            width: 0px;
            height: 0px;
            border: 14px solid transparent;
            border-left: 14px solid #4676fb;
            border-top: 14px solid transparent;
            border-bottom: 14px solid transparent;
            z-index: 10;
          }
          // 给每一个below2加上伪类实现箭头导航向前加上
          .below2:before {
            content: "";
            display: block; //为什么伪类需要是块
            top: 0;
            left: -10px;
            position: absolute; //那么below2是一个相对定位
            width: 0px;
            height: 0px;
            border: 14px solid transparent;
            border-left: 14px solid #f9fbff;
            border-top: 14px solid transparent;
            border-bottom: 14px solid transparent;
          }
        }
      }
      // 特殊样式处理
      // 特殊样式处理：第一个
      .below {
        // 选择某一个整体样式背景色设置
        .belowchoose2:nth-child(5) {
          background-color: #4676fb;
        }
        // 伪类箭头的设置
        .below1:nth-child(5):after {
          background-color: #4676fb;
          color: white;
        }
        .below1:nth-child(5):before {
          background-color: white;
          color: white;
        }
      }
    }
    .num {
      width: 22px;
      height: 22px;
      border-radius: 0 0 40px 0;
      position: absolute;
      top: 0;
      left: 0;
      color: #fff;
    }
  }
}
// 设置目前的用法说明，每一条数据明确知道当前的不同的状态值一定是
// 当样式是两个的时候的默认展示

.progress-bar {
  display: flex;
  font-size: 14px;
}
// 默认展示全部置灰色
.progress-bar li {
  flex: 1; //每一个li标签占用的位置
  flex-wrap: nowrap; //强制不换行
  padding: 0px 9px;
  line-height: 30px;
  background: #d9dde8;
  display: inline-block;
  color: #fff;
  position: relative;
  text-align: center;
}
// 默认颜色展示
.progress-bar li:after {
  content: "";
  display: block;
  border-top: $myProgressFontSize solid transparent;
  border-bottom: $myProgressFontSize solid transparent;
  border-left: $myProgressFontSize solid #d9dde8;
  position: absolute;
  right: -12px;
  top: 0;
  z-index: 10;
}
// 做出区域的箭头反色,三角形放在底部，错位使用
.progress-bar li:before {
  content: "";
  display: block;
  border-top: $myProgressFontSize solid transparent;
  border-bottom: $myProgressFontSize solid transparent;
  border-left: $myProgressFontSize solid #fff;
  position: absolute;
  left: 0px;
  top: 0;
}
// .progress-bar li {
//   padding-left: $myProgressFontSize;
// }
.progress-bar li:first-child {
  border-radius: 4px 0 0 4px;
}
// 因为第一个不是箭头，所以第一个就不要加上伪类
.progress-bar li:first-child:before {
  display: none;
}

// 设置已经选中过的样式的颜色是蓝色，没有选中过的样式颜色是灰色
// 根据状态不同样式的跟踪状态值不断变化
// 此时是选中两个，那么第一个和第二个可以展示正常其他置灰:包括箭头哦置灰和块元素置灰
// 因为最后一个不要箭头
.progress-bar li:last-child:after {
  display: none;
}

// 设置默认选中和没有选中的内容样式展示
.progress-bar li.active {
  background-color: #4676fb !important;
}
.progress-bar li.active:after {
  border-left-color: #4676fb !important;
}
.current {
  display: block;
}
</style>
<script>
// 上面标题
import headerCom from "../../components/Header";
import Tabber from "../../components/Tabber";
import { getPatViews } from "../../api/index.js";
export default {
  components: {
    headerCom,
    Tabber,
  },
  data() {
    return {
      list: [
        //患者列表
        {
          name: "赵栋",
          sex: "男",
          age: "80",
          type: "STEMI",
          time: "2020-06-08 08:00",
          doctor1: "赵星",
          doctor2: "李红",
          state: "未完成",
          num: "1",
          color: "red",
          color2: "#FF8A00",
          illness: [
            {
              status: 1,
              name: "急诊",
              url: "/jjiu",
              style: true,
            },
            {
              status: 1,
              name: "检查",
              url: "/jcha",
              style: true,
            },
            {
              status: 1,

              name: "诊疗",
              url: "/zliao",
              style: true,
            },
            {
              status: 1,
              name: "导管室",
              url: "/dgshi",
              style: "3",
            },
            {
              name: "转归",
              url: "/zgui",
              style: "3",
              status: 0,
            },
          ],
        },
        {
          name: "赵栋",
          sex: "男",
          age: "80",
          type: "STEMI",
          time: "2020-06-08 08:00",
          doctor1: "赵星",
          doctor2: "李红",
          state: "未完成",
          num: "1",
          color: "red",
          color2: "#FF8A00",
          illness: [
            {
              name: "急诊",
              url: "/jjiu",
              style: true,
              status: 1,
            },
            {
              name: "既往史",
              url: "/",
              style: true,
            },
            {
              name: "检查",
              url: "/jcha",
              style: true,
            },
            {
              name: "诊疗",
              url: "/zliao",
              style: "2",
            },
            {
              name: "住院",
              url: "/",
              style: "2",
            },
            {
              name: "转归",
              url: "/zgui",
              style: "2",
            },
          ],
        },
        {
          name: "赵栋",
          sex: "男",
          age: "80",
          type: "STEMI",
          time: "2020-06-08 08:00",
          doctor1: "赵星",
          doctor2: "李红",
          state: "未完成",
          num: "1",
          color: "#FF8A00",
          illness: [
            {
              name: "急诊",
              url: "/jjiu",
              style: true,
              status: 1,
            },
            {
              name: "检查",
              url: "/jcha",
              style: "2",
              status: 1,
            },
            {
              name: "诊疗",
              url: "/zliao",
              style: "2",
            },
            {
              name: "手术",
              url: "/",
              style: "2",
            },
            {
              name: "转归",
              url: "/zgui",
              style: "2",
            },
          ],
        },
      ],
      lists: [],
      tabs: [
        {
          title: "未完成",
          state: 5,
        },
        {
          title: "已完成",
          state: 6,
        },
      ],
      tabss: [
        {
          title: "胸痛",
          states: 1,
        },
        {
          title: "卒中",
          states: 2,
        },
        {
          title: "创伤",
          states: 3,
        },
      ],
      menuIndex: 0,
      currentindex: -1,
      org: "",
      name:'',
      flag: false,
      state: 5,
      states: "",
    };
  },
  methods: {
    // 函数：跳转到时间轴函数
    // 参数： 索引值
    //点击按钮触发
    bingli(index) {
      this.$router.push({
        name: "bingli",
        query: {
          name: this.lists[index].name,
          sex: this.lists[index].gender,
          age: this.lists[index].age,
          type: this.lists[index].type,
        },
      });
    },
    // 函数： 跳转到查看页面
    // 参数： 索引值
    time(index) {
      console.log("lists[index].name:", this.lists[index].name);
      console.log(".lists[index].pk_pat_info:", this.lists[index].pk_pat_info);

      //   命名的路由
      //由于动态路由也是传递params的，所以 this.$router.push() 方法中path不能和params一起使用，否则params无效。需用name来指定页面。及通过路由配置的name属性访问
      this.$router.push({
        // 指定time页面
        name: "time",
        // 传递参数
        query: {
          name: this.lists[index].name,
          sex: this.lists[index].sex,
          age: this.lists[index].age,
          type: this.lists[index].type,
          pk_pat_info: this.lists[index].pk_pat_info,
          //   lists: this.lists[index],
        },
      });
    },
    tab(index, state) {
      this.menuIndex = index;
      this.interface(state, this.states);
      this.state = state;
    },
    change(index, states) {
      this.currentindex = index;
      this.interface(this.state, states);
      this.states = states;
    },
    interface(state, states) {
      if (this.flag == false) {
        var datas = {
          limit: 10,
          offset: 1,
          pk_org: this.org,
          state: 5,
        };
      } else {
        var datas = {
          limit: 10,
          offset: 1,
          pk_org: this.org,
          state: state,
          patient_source: states,
        };
      }
      this.flag = true;
      getPatViews(datas).then((res) => {
        this.lists = res.results[0].patViewlist;

        // console.log(
        //   this.$patientobj,
        //   "00000000000000000000000000000000000000000000"
        // );
        let JSONStr = JSON.stringify({ ...res.results[0].patViewlist });
        this.$patientobj = JSONStr;
        localStorage.setItem("patientLists", JSONStr);
        console.log("lists", this.lists);
      });
    },
  },

  created() {
    //   debugger;
    var org = this.$route.params.pkorg;
    this.org = org;

    // var name=this.$route.params.name;
    var name=sessionStorage.getItem('name');
    this.name=name
    
    //   console.log(state)
    //       let params = {
    //         task_state: 5,
    //         page: 1,
    //         pagesize: 4,
    //         nameOrId: '',
    //         patient_source: 1,
    //       };
    // 新增一个分页胡limit限制胡数量limit: 20

    this.interface();

    // getPatViews(datas).then((res) => {
    //     console.log('getPatViews',res)
    // });

    //  getPatViews({...datas}).then(() => {
    //   console.log("我要处理的内容是");
    // }).catch((err)=>{
    //     console.log(err)
    // })
  },
};
</script>
