   <!--
            deptCode	科室编码		
            deptName	科室名称	 deptName: "自行来院"	
            deptStatus	科室状态		1：救治中；2.救治过；3.未救治过
            timeNodeViewList	时间节点		List
            timeNodeCode	时间节点编码		
            timeNodeName	时间节点名称  timeNodeName: "首份心电图"		
            timeNodeDate	时间节点日期		
            timeNodeTime	时间节点时间		
            timeNodeStatus	时间节点质控状态		1：正常；2.超过指标值；3.负值；4.合理性
            timeNodeStandardQuality	标准质控指标		
            timeNodeRealityQuality	实际质控指标		
            timeNodeNum	时间合理性序号		
            rationality	合理性指标-->
<template>
  <div style="width: 100%;margin-bottom: 20px">
    <ul class="qualityTitlebox" style="width: 100%">
      <li>
        <span
          class="titlesign"
          style="background:#259e33;margin-left:5px;width:13px;height:13px;display: inline-block;border-radius: 50%;"
        ></span>
        <span class="titletxt">正常</span>
      </li>
      <li>
        <span
          class="titlesign"
          style="background:#ff9900;margin-left:5px;width:13px;height:13px;display: inline-block;border-radius: 50%;"
        ></span>
        <span class="titletxt">超标</span>
      </li>
      <li>
        <span
          class="titlesign"
          style="background:red;margin-left:5px;width:13px;height:13px;display: inline-block;border-radius: 50%;"
        ></span>
        <span class="titletxt">不合理</span>
      </li>
    </ul>
    <div class="container">
      <ul>
        <li v-for="(item, number) in (timeDataArr)" :key="number">
          <div class="deptContainer">
            <div
              :class="{
                deptScroll:
                  item.timeNodeViewList.length > '1' && item.deptStatus != '1',
                deptScrollActive:
                  item.timeNodeViewList.length > '1'&& item.deptStatus == '1',
                deptHidden: item.timeNodeViewList.length <= 1
              }"
            >
              <!-- <div class="a">
                <div class="deptName">
                    <span> item.deptName</span>
                </div>
                <div class="dept">
                    <span>item.deptName</span>
                </div>
                <div class="item">
                    <div class="">
                        <div class="">
                            <span>{{ items.timeNodeName }}</span>
                        </div>
                    </div>
              </div>-->
              <div
                class="dept"
                v-if="item.timeNodeViewList.length <= 1"
                :class="{
                deptNameActive: item.deptName && item.deptStatus == '1',
                deptActive: item.deptName && item.deptStatus == '2'
              }"
              >
                <span>{{222}}{{ item.deptName }}</span>
              </div>
              <div
                class="deptName"
                v-if="item.timeNodeViewList.length > 1"
                :class="{
                  deptNameActive: item.deptName && item.deptStatus == '1'
                }"
              >
                <span>{{1111}}{{item.deptName }}</span>
              </div>
            </div>

            <div
              class="item"
              v-for="(items, index) in item.timeNodeViewList"
              :key="index"
              :class="{ itemActive: items.timeNodeTime }"
            >
              <div
                :class="{
                  hollowCircle: index != '0',
                  realCircle: index == '0',
                  realCircleActive: items.timeNodeTime && index == '0',
                  hollowNormalCircleActive:
                    index != '0' &&
                    items.timeNodeTime &&
                    items.timeNodeStatus == '1',
                  hollowErrorCircleActive:
                    index != '0' &&
                    items.timeNodeTime &&
                    items.timeNodeStatus == '-1',
                  hollowOverCircleActive:
                    index != '0' &&
                    items.timeNodeTime &&
                    (items.timeNodeStatus == '0' || items.timeNodeStatus == '2')
                }"
              ></div>
              <div
                class="timeLabel"
                :class="{
                  timeLabelActive: item.deptStatus == '1' && items.timeNodeTime
                }"
              >
                <span>{{3333}}{{ items.timeNodeName }}</span>
              </div>
              <div
                class="timeContainer"
                v-on:mouseenter="mouseover($event, items, items.overmaintext)"
                v-on:mouseleave="leave(items)"
              >
                <span>{{ items.timeNodeTime }}</span>
                <span
                  :class="{
                    normalSpan: items.timeNodeStatus == '1',
                    errorSpan: items.timeNodeStatus == '-1',
                    overSpan:
                      items.timeNodeStatus == '0' || items.timeNodeStatus == '2'
                  }"
                >{{5555}}{{ items.timeNodeRealityQuality }}</span>
                <ul
                  :id="'floatover' + items.timeNodeName"
                  class="floatover"
                  v-if="items.timeNodeStandardQuality || items.rationality"
                >
                  <!-- <li>
             该时间涉及以下认证指标的统计，可能影响指标最终结果
                  </li>-->
                  <li v-if="items.timeNodeStandardQuality">
                    <div class="floatovertitle">质控指标:{{ items.timeNodeStandardQuality }}</div>
                  </li>
                  <li v-if="items.rationality">
                    <div class="floatovertitle">合理性:{{ items.rationality }}</div>
                  </li>
                  <!-- <li>
             点击该时点可以高亮显示相关时点
                  </li>-->
                </ul>
              </div>
            </div>
          </div>
          <div
            :class="{
              item: number != timeDataArr.length - 1,
              itemActive:
                number != timeDataArr.length - 1 &&
                timeDataArr[number + 1].deptStatus != '3',
              itemDept: number == timeDataArr.length - 1
            }"
            v-if="
              item.deptName && timeDataArr[number].timeNodeViewList.length != 1
            "
          >
            <div
              :class="{
                realCircle:
                  number != timeDataArr.length - 1 &&
                  timeDataArr[number].deptStatus == '3',
                realCircleEnd:
                  number == timeDataArr.length - 1 &&
                  timeDataArr[number].deptStatus == '3',
                realCircleActive:
                  number != timeDataArr.length - 1 &&
                  timeDataArr[number].deptStatus != '3',
                realCircleEndActive:
                  number == timeDataArr.length - 1 &&
                  timeDataArr[number].deptStatus != '3'
              }"
            ></div>
            <!--<div class="realCircleActive"></div>-->
          </div>
          <div class="itemDept" v-if="!(!record || item.deptSet == true)">
            <div
              :class="{
                realCircleEndActive: !(!record || item.deptSet == true)
              }"
            ></div>
            <!--<div class="realCircleActive"></div>-->
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { queryTimeAxisDataByPk } from "../../api/index.js";
import bus from "../../main.js";
import Vue from "vue";
export default {
  name: "timeLine",
  //   components: { bus },
  data() {
    return {
      //存储queryTimeAxisDataByPk数据，所有时间节点信息
      timeDataArr: [],
      timeNodeViewList: [],
      timeSocket: "",
      val: {},
      time: [],
      valname: "",
      //     {
      //       deptCode: "emergencyDept",
      //       deptName: "120",//null
      //       deptStatus: null,
      //       timeNodeViewList: [
      //         {
      //           timeNodeCode: "INHOSPITAL_TIME",
      //           timeNodeName: "住院时间",
      //           timeNodeDate: null,
      //           timeNodeTime: null,
      //           timeNodeStatus: null,
      //           timeNodeStandardQuality: null,
      //           timeNodeRealityQuality: null,
      //           timeNodeNum: null,
      //           rationality: null,
      //         },
      //       ],
      //     },
      //   ],
    };
  },
  props: {
    // 传三个值，病历主键，病历类型，是否是查看病历
    //pk_pat_info
    patientID: {
      //病历主键
      type: String,
      default: "",
    },
    // Prop "patient_source" is not in camelCase                     vue/prop-name-casing
    // 不要使用这样的命名，这个是错误的内容
    patient_source: {
      //病历类型
      type: String,
      default: "1",
    },
    record: {
      //????????
      type: Boolean,
      default: false,
    },
  },
  methods: {
    //移入
    mouseover(ev, items, overmaintext) {
      var ev = window.event || ev;
      ev.preventDefault();
      let _this = this;
      let detailed = items.timeNodeStandardQuality;
      let timerationality = items.rationality;
      let floatover = $("#floatover");
      if (!items.timeNodeStandardQuality && !items.rationality) {
        $("#floatover" + items.timeNodeName).hide();
      } else {
        $("#floatover" + items.timeNodeName).show();
      }
      //          let x=ev.clientX
      //          let y=ev.clientY
      //          //console.log(ev)//scrollTop
      //          let offX = ev.target.offsetLeft;
      //          let offY = ev.target.offsetTop+10;
      //          let offwidth=ev.target.offsetWidth
      //          let offheight=ev.target.offsetHeight
      //          y += $(".qualityverticalTime").scrollTop();
      //          x += document.body.scrollLeft;
      //          // console.log("y:"+$(".qualityverticalTime").scrollTop())
      //          floatover.css({"top":(offY-$(".qualityverticalTime").scrollTop())+"px", "left":(offX+offwidth+12)+"px", "visibility":"visible"});
      //        }
    },
    //移出
    leave(items) {
      //        let _this=this
      //console.log("$$$$")
      //        clearTimeout(_this.TimeFn);
      $("#floatover" + items.timeNodeName).hide();
      /*  this.overindex="-1"
           $("#floatover").hide();*/
    },
    //时间节点数据推送
    webSocket(params) {
      //          this.timeSocket = new WebSocket("ws://192.168.0.193:8099/websocket/timeAxisWebSocket");//时间
      if (this.ApiUrl == undefined) {
        this.timeSocket = new WebSocket(
          "ws://192.168.0.179:8090/websocket/timeAxisWebSocket"
        ); //时间
      } else {
        //            this.timeSocket = new WebSocket("ws://192.168.0.179:8090/websocket/timeAxisWebSocket");//时间
        this.timeSocket = new WebSocket(
          "ws://" + this.ApiUrl.split("//")[1] + "websocket/timeAxisWebSocket"
        );
      }
      this.timeSocket.onopen = () => {
        let data = this.patientID + "timeAxis";
        this.timeSocket.send(data);
      };
      this.timeSocket.onmessage = (evt) => {
        if (evt.data) {
          let data = JSON.parse(evt.data);
          this.timeDataArr = data;
          //   console.log("所有的时间节点的信息timeDataArr", this.timeDataArr);
          this.$forceUpdate();
        }
      };
      this.timeSocket.onclose = () => {
        // 关闭 websocket
        this.timeSocket.close();
        console.log("连接已关闭...");
      };
    },
  },
  created() {
    //链接口：时间轴/时间节点/质控
    // let data = this.patientID;
    let data = "1001A0100000004NJTKV";

    let paramsObj = { pk_pat_info: data };

    let url;
    if (this.patient_source == "1") {
      // 时间轴数据接口
      url = "mcpc/timeAxisDept/queryTimeAxisDataByPk";
      queryTimeAxisDataByPk(paramsObj, url).then((res) => {
        // console.log("res2:", res);
        this.timeDataArr = res.results;
        console.log("timeDataArr i", this.timeDataArr[1]);
        console.log("timeDataArr j", this.timeDataArr[1].timeNodeViewList[0]);
        for (var i = 0; i < this.timeDataArr.length; i++) {
          for (
            var j = 0;
            j < this.timeDataArr[i].timeNodeViewList.length;
            j++
          ) {
            if (
              this.timeDataArr[i].timeNodeViewList.timeNodeName == this.val.name
            ) {
              this.timeDataArr[i].timeNodeViewList.timeNodeTime ==
                this.val.time;
              console.log(this.timeDataArr[i].timeNodeViewList.timeNodeTime);
            }
          }
        }

        // console.log("time:", this.time);
      });
    } else if (this.patient_source == "2") {
      data = { pk_emgency: this.patientID };
      url = "mcpc/strokeTimeAxis/queryStrokeTimeAxisData";
    } else if (this.patient_source == "3") {
      data = { pk_emgency: this.patientID };
      url = "mcpc/tcTimeAxis/queryTcTimeAxisData";
    }
  },
  mounted() {
    console.log("val2:", this.valname);
    var that = this;
    // debugger;
    this.bus.$on("val", function (data) {
      console.log("data:", data);
      this.val = data;
      console.log("val:", this.val.name);
      this.valname = this.val.name;
    });

    console.log("val2:", this.valname);

    // this.timeDataArr;
    // console.log(
    //   "localstrage++++++++++++++++++++----------------------------patientLists",
    //   JSON.parse(localStorage.getItem("patientLists"))
    // );
    // var lists = JSON.parse(localStorage.getItem("patientLists"));
    // console.log(
    //   this.timeDataArr,
    //   "00000000000000this.timeDataArrthis.timeDataArr)"
    // );
  },
  beforeDestory() {
    // console.log(
    //   this.timeDataArr,
    //   "11111111111this.timeDataArrthis.timeDataArr)"
    // );
    this.timeSocket.onclose();
  },
  watch: {
    record() {
      if (this.record == true && this.timeSocket) {
        this.timeSocket.onclose();
      } else {
        this.webSocket(this.patientID);
      }
    },
  },
};
</script>
<style scoped lang="scss">
.container {
  display: flex;
  /* justify-content: center; */
  background-color: #ffffff;
  ul {
    width: 100vw;
  }
  overflow-y: auto;
}
.qualityTitlebox {
  font-size: 14px;
  color: #333;
  background-color: #ffffff;
  height: 40px;
  line-height: 40px;
  /*margin-top:18px;*/
  /* padding-left: 20px; */
  li {
    display: inline-block;
  }
  span {
    display: inline-block;
  }
  .titlesign {
    width: 11px;
    height: 11px;
    display: inline-block;
    border-radius: 50%;
  }
  .titletxt {
    margin-left: 5px;
  }
}
.deptScroll {
  position: absolute;
  width: 40px;
  left: 40px;
  height: 100%;
  border-left: 2px solid #757575;
  border-top: 2px solid #757575;
  border-bottom: 2px solid #757575;
  border-radius: 20px 0 0 20px;
}
.deptScrollActive {
  position: absolute;
  width: 40px;
  left: 30px;
  height: 100%;
  border-left: 2px solid #259e33;
  border-top: 2px solid #259e33;
  border-bottom: 2px solid #259e33;
  border-radius: 20px 0 0 20px;
}
.deptHidden {
  position: absolute;
  /*width: 40px;*/
  left: 30px;
  /*height: 100%;*/
  /*border-left: 2px solid #757575;*/
  /*border-top: 2px solid #757575;*/
  /*border-bottom: 2px solid #757575;*/
  /*border-radius: 20px 0 0 20px;*/
  border: hidden;
}
// li.{
//   padding-top: 25px;
//   padding-bottom: 3px;
//   height: 75px;
//   padding-left: 150px
// }
.item {
  margin-left: 90px;
  min-height: 60px;
  /*padding-top: 25px;*/
  width: 150px;
  border-left: 4px solid #757575;
  position: relative;
  margin-top: 20px;
  cursor: pointer;
  /*position: absolute;*/
  /*top:-15px;*/
}
.itemDept {
  margin-left: 90px;
  /*min-height: 50px;*/
  /*padding-top: 25px;*/
  width: 150px;
  /*border-left: 4px solid #757575;*/
  position: relative;
  margin-top: 20px;
  border: hidden;
}
.realCircleEndActive {
  border: 2px solid #259e33;
  top: -16px;
  left: -4px;
  position: absolute;
  width: 12px;
  height: 12px;
  border-radius: 50%;
}
.realCircleEnd {
  border: 6px solid #323634;
  top: -16px;
  left: -4px;
  position: absolute;
  width: 12px;
  height: 12px;
  border-radius: 6px;
}
.itemActive {
  margin-left: 90px;
  min-height: 60px;
  /*padding-top: 25px;*/
  width: 150px;
  /*border-left: 4px solid #757575;*/
  position: relative;
  margin-top: 20px;
  border-left: 4px solid #259e33;
}
.realCircle {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 2px solid #323634;
  /*margin-top: 10px;*/
  /*float: left;*/
  top: -16px;
  left: -8px;
  position: absolute;
}
.realCircleActive {
  border: 2px solid #259e33;
  top: -16px;
  left: -8px;
  position: absolute;
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.hollowCircle {
  width: 10px;
  height: 10px;
  border-radius: 5px;
  border: 2px solid #323634;
  /*margin-top: 10px;*/
  /*float: left;*/
  top: -15px;
  left: -7px;
  position: absolute;
}
.hollowNormalCircleActive {
  width: 10px;
  height: 10px;
  border-radius: 10px;
  border: 2px solid #259e33;
  /*margin-top: 10px;*/
  /*float: left;*/
  top: -15px;
  left: -7px;
  position: absolute;
}
.hollowErrorCircleActive {
  width: 10px;
  height: 10px;
  border-radius: 10px;
  border: 2px solid red;
  /*margin-top: 10px;*/
  /*float: left;*/
  top: -15px;
  left: -7px;
  position: absolute;
}
.hollowOverCircleActive {
  width: 10px;
  height: 10px;
  border-radius: 10px;
  border: 2px solid #ff9900;
  /*margin-top: 10px;*/
  /*float: left;*/
  top: -15px;
  left: -7px;
  position: absolute;
}
.timeLabel {
  width: 120px;
  height: 20px;
  font-family: 微软雅黑;
  /*line-height: 30px;*/
  /*margin-top: 10px;*/
  margin-left: 10px;
  font-size: 14px;
  font-weight: bold;
  /*margin-top: -5px;*/
  top: -15px;
  position: absolute;
  /*float: left;*/
}
.timeLabelActive {
  font-family: 微软雅黑;
  font-size: 14px;
  font-weight: bold;
  color: #259e33;
}
.timeContainer {
  width: 100%;
  min-height: 40px;
  padding-top: 5px;
  /*margin-top: 5px;*/
  /*margin-left: 20px;*/
  /*border:4px solid #259e33;*/
  /*text-align: center;*/
  /*margin-top: 30px;*/
  /*line-height: 30px;*/
  /*margin-left: 4px;*/
  /*border-left: 4px solid #259e33;*/
  font-size: 14px;
  /*position: relative;*/
  /*display: flex;*/
  /*float: left;*/
}
.timeContainer span {
  margin-left: 10px;
  font-size: 14px;
  width: 100%;
  float: left;
}
.normalSpan {
  color: #259e33;
}
.errorSpan {
  color: red;
}
.overSpan {
  color: #ff9900;
}
.yellowSpan {
  color: #ffd306;
}
.deptContainer {
  position: relative;
}
.deptName {
  width: 80px;
  /*top: -20px;*/
  top: calc(50% - 20px);
  left: -40px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  background-color: #ffffff;
  font-size: 15px;
  font-family: 微软雅黑;
  font-weight: bold;
  color: #151d2e;
  position: absolute;
}
.dept {
  width: 80px;
  top: -30px;
  /*left: 20px;*/
  height: 40px;
  line-height: 40px;
  text-align: center;
  background-color: #ffffff;
  font-size: 15px;
  font-family: 微软雅黑;
  font-weight: bold;
  color: #151d2e;
  position: absolute;
}
.deptNameActive {
  color: #259e33;
}
.deptActive {
  color: #259e33;
}
.floatover {
  padding: 5px 0 5px 15px;
  width: 140px;
  height: 60px;
  display: none;
  background: #fff;
  color: #333;
  /*display: none;*/
  border: 1px solid #c4cad9;
  position: absolute;
  z-index: 10002;
  left: 10px;
  top: -40px;
  li {
    width: 100%;
    height: 20px;
  }
  .floatovertitle {
    font-size: 14px;
    float: left;
    /* width:60px;*/
    width: 100%;
    height: 100%;
    font-family: "微软雅黑";
    font-weight: bold;
  }
}
.floatover:after {
  content: "";
  width: 0;
  height: 0;
  border-left: 9px solid transparent;
  border-right: 9px solid transparent;
  border-top: 14px solid #fff;
  position: absolute;
  top: 58px;
  left: 16px;
}

.floatover:before {
  content: "";
  width: 0;
  height: 0;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-top: 15px solid #c4cad9;
  position: absolute;
  top: 58px;
  left: 15px;
}
</style>
