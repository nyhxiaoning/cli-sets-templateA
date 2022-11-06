<template>
  <div style="width: 100%;margin-bottom: 20px">
    <ul class="qualityTitlebox" style="width: 100%">
      <li>
        <span
          class="titlesign"
          style="background:#259e33;margin-left:5px;width:11px;height:11px;display: inline-block;border-radius: 50%;"
        ></span>
        <span class="titletxt">正常</span>
      </li>
      <li>
        <span
          class="titlesign"
          style="background:#ff9900;margin-left:5px;width:11px;height:11px;display: inline-block;border-radius: 50%;"
        ></span>
        <span class="titletxt">超标</span>
      </li>
      <li>
        <span
          class="titlesign"
          style="background:red;margin-left:5px;width:11px;height:11px;display: inline-block;border-radius: 50%;"
        ></span>
        <span class="titletxt">负值</span>
      </li>
      <!--<li>-->
      <!--<span class="titlesign" style="background:#FFD306;margin-left:5px;"></span><span class="titletxt">合理性</span>-->
      <!--</li>-->
    </ul>
    <div class="container">
      <ul>
        <li v-for="(item,number) in timeDataArr " :key="item">
          <div class="deptContainer">
            <div
              :class="{deptScroll:item.timeNodeViewList.length > '1' && item.deptStatus !='1',deptScrollActive:item.timeNodeViewList.length > 1 && item.deptStatus=='1',deptHidden:item.timeNodeViewList.length <= 1}"
            >
              <div
                class="deptName"
                v-if="item.timeNodeViewList.length > 1"
                :class="{deptNameActive:item.deptName && item.deptStatus=='1'}"
              >
                <span>{{item.deptName}}</span>
              </div>
            </div>
            <div
              class="dept"
              v-if="item.timeNodeViewList.length <= 1"
              :class="{deptNameActive:item.deptName && item.deptStatus=='1',deptActive:item.deptName && item.deptStatus=='2'}"
            >
              <span>{{item.deptName}}</span>
            </div>
            <div
              class="item"
              v-for="(items,index) in item.timeNodeViewList"
              :key="items"
              :class="{itemActive:items.timeNodeTime}"
            >
              <div
                :class="{hollowCircle:index !='0',realCircle:(index=='0'),realCircleActive:items.timeNodeTime && index=='0',hollowNormalCircleActive:index !='0' && items.timeNodeTime && items.timeNodeStatus=='1',hollowErrorCircleActive:index !='0' && items.timeNodeTime && items.timeNodeStatus=='-1',hollowOverCircleActive:index !='0' && items.timeNodeTime && (items.timeNodeStatus=='0' || items.timeNodeStatus=='2')}"
              ></div>
              <div
                class="timeLabel"
                :class="{timeLabelActive:item.deptStatus=='1' && items.timeNodeTime}"
              >
                <span>{{items.timeNodeName}}</span>
              </div>
              <div
                class="timeContainer"
                v-on:mouseenter="mouseover($event,items,items.overmaintext)"
                v-on:mouseleave="leave(items)"
              >
                <span>{{items.timeNodeTime}}</span>
                <span
                  :class="{normalSpan:items.timeNodeStatus=='1',errorSpan:items.timeNodeStatus=='-1',overSpan:items.timeNodeStatus=='0' || items.timeNodeStatus=='2'}"
                >{{items.timeNodeRealityQuality}}</span>
                <ul
                  :id="'floatover'+ items.timeNodeName"
                  class="floatover"
                  v-if="(items.timeNodeStandardQuality || items.rationality)"
                >
                  <!-- <li>
             该时间涉及以下认证指标的统计，可能影响指标最终结果
                  </li>-->
                  <li v-if="items.timeNodeStandardQuality">
                    <div class="floatovertitle">质控指标:{{items.timeNodeStandardQuality}}</div>
                  </li>
                  <li v-if="items.rationality">
                    <div class="floatovertitle">合理性:{{items.rationality}}</div>
                  </li>
                  <!-- <li>
             点击该时点可以高亮显示相关时点
                  </li>-->
                </ul>
              </div>
            </div>
          </div>
          <div
            :class="{item:number != timeDataArr.length-1,itemActive:number != timeDataArr.length-1 && timeDataArr[number+1].deptStatus!='3',itemDept:number == timeDataArr.length-1}"
            v-if="item.deptName && timeDataArr[number].timeNodeViewList.length != 1"
          >
            <div
              :class="{realCircle:(number != timeDataArr.length-1 && timeDataArr[number].deptStatus=='3'),realCircleEnd: (number == timeDataArr.length-1 && timeDataArr[number].deptStatus=='3'),realCircleActive:number != timeDataArr.length-1 && timeDataArr[number].deptStatus!='3',realCircleEndActive:number == timeDataArr.length-1 && timeDataArr[number].deptStatus!='3'}"
            ></div>
            <!--<div class="realCircleActive"></div>-->
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<style scoped lang="scss">
.container {
  width: 100%;
  height: 100%;
  display: flex;
  /*justify-content:center;*/
  background-color: #ffffff;
  margin-top: 10px;
  /*overflow-y: auto;*/
}
.qualityTitlebox {
  font-size: 14px;
  color: #333;
  /*margin-top:18px;*/
  padding-left: 20px;
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
  left: 30px;
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
// li {
//   /*padding-top: 25px;*/
//   /*padding-bottom: 3px;*/
//   /*height: 75px;*/
//   /*padding-left: 150px*/
// }
.item {
  margin-left: 80px;
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
  margin-left: 80px;
  /*min-height: 50px;*/
  /*padding-top: 25px;*/
  width: 150px;
  /*border-left: 4px solid #757575;*/
  position: relative;
  margin-top: 20px;
  border: hidden;
}
.realCircleEndActive {
  border: 6px solid #259e33;
  top: -16px;
  left: -4px;
  position: absolute;
  width: 12px;
  height: 12px;
  border-radius: 6px;
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
  margin-left: 80px;
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
  border-radius: 6px;
  border: 6px solid #323634;
  /*margin-top: 10px;*/
  /*float: left;*/
  top: -16px;
  left: -8px;
  position: absolute;
}
.realCircleActive {
  border: 6px solid #259e33;
  top: -16px;
  left: -8px;
  position: absolute;
  width: 12px;
  height: 12px;
  border-radius: 6px;
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
  width: 70px;
  /*top: -20px;*/
  top: calc(50% - 20px);
  left: -35px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  background-color: #ffffff;
  font-size: 16px;
  font-family: 微软雅黑;
  font-weight: bold;
  color: #151d2e;
  position: absolute;
}
.dept {
  width: 50px;
  top: -30px;
  left: 20px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  background-color: #ffffff;
  font-size: 16px;
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
<script>
import Vue from "vue";
export default {
  name: "timeLine",
  data() {
    return {
      timeSocket: "",
      timeDataArr: [], //存储所有时间节点信息
    };
  },
  props: {
    pk_pat_info: {
      type: String,
      default: "1001A0100000004LQE58",
    },
    record: {
      type: Boolean,
      default: false,
    },
  },
  created() {
    //      this.getTimeData();
    if (!this.record) {
      this.webSocket(this.pk_pat_info);
    }
  },
  mounted() {},
  beforeDestory() {
    this.timeSocket.onclose();
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
        let data = this.pk_pat_info + "timeAxis";
        this.timeSocket.send(data);
      };
      this.timeSocket.onmessage = (evt) => {
        if (evt.data) {
          let data = JSON.parse(evt.data);
          this.timeDataArr = data;
          this.$forceUpdate();
        }
      };
      this.timeSocket.onclose = () => {
        // 关闭 websocket
        this.timeSocket.close();
        console.log("连接已关闭...");
      };
    },
    getTimeData() {
      //      let data = {pk_pat_info:'1001A0100000004LQAI9'};1001A0100000004LQAL7
      let data = { pk_pat_info: this.pk_pat_info };
      // 调用的假的数据进行填充
      this.timeDataArr = [
        {
          pk_pat_info: "1001A0100000004NA6PM",
          coming_way_code: "1",
          is_bypass_emergency: null,
          is_bypass_ccu: null,
          has_ecg_image: null,
          is_reperfusion: null,
          measures: null,
          invasive_strategy: null,
          strategy: null,
          is_ect: null,
          img_examination_none: null,
          diagnosisname: null,
          outcome_code: "2",
          throm_sift_dt: null,
          is_thrombolysis_dt: null,
          screening: null,
          is_thrombolysis: null,
          is_ctnt: null,
          is_notice_imcd: null,
          risk_lamination_ag: null,
          arrived_emergency_time: null,
          bypass_emergency_leave_time: null,
          consultation_date: null,
          ccu_into_date: null,
          ccu_leave_date: null,
          ct_into_date: null,
          ct_leave_date: null,
          patient_arrived_conduit_time: null,
          patient_leave_conduit_time: null,
          phep_ecg_time: null,
          first_mc_time: null,
          ecg_diagnose_time: null,
          report_time: null,
          sampling_time: null,
          hand_time: null,
          balloon_expansion_time: null,
          activate_conduit_time: null,
          start_conduit_time: null,
          throm_start_time_dt: null,
          arrived_hospital_time: null,
          throm_start_time: null,
          timeNodeCode: null,
          timeNodeDate: null,
          attack_time: null,
          help_date: null,
          outhospital_visit_time: null,
          first_doctor_time: null,
          tran_date: null,
          transfer_time: null,
          leave_outhospital_time: null,
          inhospital_admission_time: null,
          leave_department_time: null,
          consultation_time: null,
          diagnosis_time: null,
          aspirin_time: null,
          clopidogrel_time: null,
          ticagrelor_time: null,
          anticoagulation_date: null,
          decision_operation_time: null,
          trmstart_agree_time: null,
          trmsign_agree_time: null,
          start_puncture_time: null,
          trmstart_radiography_time: null,
          trmanticoagulation_date: null,
          end_operation_time: null,
          throm_start_agree_time: null,
          throm_sign_agree_time: null,
          throm_end_time_dt: null,
          ct_notice_date: null,
          ct_finish_date: null,
          ct_scan_date: null,
          ct_report_date: null,
          imcd_notice_date: null,
          anti_treatment_date: null,
          risk_lamination_ag_time: null,
          give_up_treatment: null,
          is_trans_hospital: null,
          leave_time: null,
          transfer_date: null,
          outdiagnosis_time: null,
          outhand_time: null,
          death_time: null,
        },
      ];

      // this.$http
      //   .post(this.host("timeAxisDept/queryTimeAxisDataByPk"), data)
      //   .then(function (res) {
      //     let datajson = res.data;
      //     let backjson = { state: datajson.state, msg: datajson.msg };
      //     if (datajson.state == "1") {
      //       this.timeDataArr = datajson.results;
      //       console.log(this.timeDataArr);
      //     }
      //   })
      //   .catch(function (error) {
      //     console.log(error);
      //   });
    },
  },
};
</script>
