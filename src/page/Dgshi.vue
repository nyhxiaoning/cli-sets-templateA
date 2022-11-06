<template>
  <div class="view">
    <div class="nav">
      <headerCom>
        <van-icon slot="left" name="arrow-left" @click="$router.back()" />
        <span>导管室</span>
      </headerCom>
      <div class="tabbar">
        <div
          @click="curId_tab1 = index"
          :class="{ curr: true, cur: curId_tab1 === index }"
          v-for="(item, index) in list"
          :key="index"
        >{{ item }}</div>
      </div>
    </div>
    <div class="content">
      <!-- 导管室 -->
      <div v-show="curId_tab1 === 0">
        <van-cell-group>
          <!-- 导管室激活 -->
          <van-field
            v-model="daoguanshi.daoguan.time"
            label="导管室激活"
            placeholder="选择时间"
            input-align="right"
            readonly
          >
            <template slot="right-icon">
              <van-icon name="arrow" @click="isShow = !isShow" />
              <datetimepicker :field="'daoguan'" :is-show="isShow" @choosedata="choosedata"></datetimepicker>
            </template>
          </van-field>

          <!-- 患者到达 -->
          <van-field
            v-model="value.arrive.time"
            label="患者到达"
            placeholder="选择时间"
            input-align="right"
            readonly
          >
            <template slot="right-icon">
              <van-icon name="arrow" @click="isShow1 = !isShow1" />
              <datetimepicker :field="'arrive'" :is-show="isShow1" @choosedata="choosedata1"></datetimepicker>
            </template>
          </van-field>

          <van-field
            v-model="daoguanshi.yishi"
            label="介入医师"
            placeholder="点击输入文本"
            input-align="right"
          />
          <!-- 开始穿刺 -->
          <van-field
            v-model="value.chuanc.time"
            label="开始穿刺"
            placeholder="选择时间"
            input-align="right"
            readonly
          >
            <template slot="right-icon">
              <van-icon name="arrow" @click="isShow2 = !isShow2" />
              <datetimepicker :field="'chuanc'" :is-show="isShow2" @choosedata="choosedata2"></datetimepicker>
            </template>
          </van-field>

          <!-- 造影开始 -->
          <van-field
            v-model="value.zaoy.time"
            label="造影开始"
            placeholder="选择时间"
            input-align="right"
            readonly
          >
            <template slot="right-icon">
              <van-icon name="arrow" @click="isShow3 = !isShow3" />
              <datetimepicker :field="'zaoy'" :is-show="isShow3" @choosedata="choosedata3"></datetimepicker>
            </template>
          </van-field>

          <van-field
            v-model="daoguanshi.TIMI"
            label="TIMI血流等级（仅造影时）"
            input-align="right"
            label-width="200px"
          >
            <template slot="right-icon">
              <van-icon name="arrow" />
            </template>
          </van-field>
          <!--术中抗凝给药  -->
          <van-field
            v-model="value.geiy.time"
            label="术中抗凝给药"
            placeholder="选择时间"
            input-align="right"
            readonly
          >
            <template slot="right-icon">
              <van-icon name="arrow" @click="isShow4 = !isShow4" />
              <datetimepicker :field="'geiy'" :is-show="isShow4" @choosedata="choosedata4"></datetimepicker>
            </template>
          </van-field>

          <van-field v-model="daoguanshi.yaowu" label="术中抗凝药物" input-align="right">
            <template slot="right-icon">
              <van-icon name="arrow" />
            </template>
          </van-field>
          <van-field
            v-model="daoguanshi.danwei"
            label="抗凝药物剂量"
            placeholder="单位"
            input-align="right"
          />
          <!-- 手术结束 -->
          <van-field
            v-model="value.shous.time"
            label="手术结束"
            placeholder="选择时间"
            input-align="right"
            readonly
          >
            <template slot="right-icon">
              <van-icon name="arrow" @click="isShow5 = !isShow5" />
              <datetimepicker :field="'shous'" :is-show="isShow5" @choosedata="choosedata5"></datetimepicker>
            </template>
          </van-field>
        </van-cell-group>
      </div>
      <!-- 入路 -->
      <div v-show="curId_tab1 === 1">
        <van-cell-group>
          <van-field label="入路" readonly style="display: block; ">
            <template slot="input">
              <van-radio-group v-model="rulu" direction="horizontal">
                <van-radio name="1">桡动脉（左侧）</van-radio>
                <van-radio name="2">桡动脉（右侧）</van-radio>
                <van-radio name="3">股动脉</van-radio>
                <van-radio name="4">其他</van-radio>
              </van-radio-group>
            </template>
          </van-field>
        </van-cell-group>
      </div>
      <!-- 冠脉造影 -->
      <div v-show="curId_tab1 === 2">
        <div class="img">
          <img src="../assets/static/img/7.png" alt />
        </div>
        <van-cell-group>
          <van-field v-model="zaoying.buwei" label="造影部位" placeholder="点击输入文本" input-align="right" />
          <div class="anniu">
            <div
              class="no_rulesbtn"
              :class="{ no_rulesbtn2: tabAdd.indexOf(item) != -1 }"
              v-for="(item, index) in anniuList"
              :key="index"
              @click="chooseadd(item)"
            >
              <span>{{ index + 1 }}：{{ item.text }}</span>
            </div>
          </div>
        </van-cell-group>
      </div>
      <!-- 器械 -->
      <div v-show="curId_tab1 === 3">
        <van-cell-group>
          <van-field label="腔内影像" required readonly>
            <template slot="right-icon">
              <van-radio-group v-model="qixie.yingxiang" direction="horizontal">
                <van-radio name="1">IVUS</van-radio>
                <van-radio name="2">OCT</van-radio>
                <van-radio name="3">其他</van-radio>
                <van-radio name="4">未做</van-radio>
              </van-radio-group>
            </template>
          </van-field>
          <van-field label="功能检测" required readonly>
            <template slot="extra">
              <van-radio-group v-model="qixie.jiance" direction="horizontal">
                <br />
                <van-radio name="1">FFR</van-radio>
                <van-radio name="2">iFR</van-radio>
                <van-radio name="3">IMR</van-radio>
                <van-radio name="4">其他</van-radio>
                <br />
                <van-radio name="5">未做</van-radio>
              </van-radio-group>
            </template>
          </van-field>
          <van-field label="IABP" required readonly>
            <template slot="right-icon">
              <van-radio-group v-model="qixie.IABP" direction="horizontal">
                <van-radio name="1">是</van-radio>
                <van-radio name="2">否</van-radio>
              </van-radio-group>
            </template>
          </van-field>
          <van-field label="临时起搏器" required readonly>
            <template slot="right-icon">
              <van-radio-group v-model="qixie.qiboqi" direction="horizontal">
                <van-radio name="1">是</van-radio>
                <van-radio name="2">否</van-radio>
              </van-radio-group>
            </template>
          </van-field>
          <van-field label="ECMO" required readonly>
            <template slot="right-icon">
              <van-radio-group v-model="qixie.ECMO" direction="horizontal">
                <van-radio name="1">是</van-radio>
                <van-radio name="2">否</van-radio>
              </van-radio-group>
            </template>
          </van-field>
          <van-field label="左心室辅助装置" required readonly label-width="200px">
            <template slot="right-icon">
              <van-radio-group v-model="qixie.zuoxinshi" direction="horizontal">
                <van-radio name="1">是</van-radio>
                <van-radio name="2">否</van-radio>
              </van-radio-group>
            </template>
          </van-field>
        </van-cell-group>
      </div>
      <!-- 并发症 -->
      <div v-show="curId_tab1 === 4">
        <van-cell-group>
          <van-field label="并发症" readonly style="display: block;" required>
            <template slot="input">
              <div class="anniu">
                <div
                  class="no_rulesbtn"
                  :class="{
                    no_rulesbtn2: chooseAfterValue.indexOf(item.text) != -1
                  }"
                  v-for="(item, index) in anniuList2"
                  :key="index"
                  @click="choosely(item.text)"
                >
                  <span>{{ item.text }}</span>
                </div>
              </div>
            </template>
          </van-field>
        </van-cell-group>
      </div>
    </div>
    <div class="footer">
      <van-button round color="#4676FB" size="large" @click="save">保存</van-button>
    </div>
  </div>
</template>
<style scoped lang="scss">
// @import url("../assets/css/base.scss");
@import url("../assets/css/hackcss.css");
/deep/ .van-radio__icon--checked .van-icon-success::before {
  background-color: black;
  position: absolute;
  right: 26%;
  top: 25%;
  width: 55%;
  height: 55%;
  background-color: #bcc9e4;
  border-radius: 50%;
}
/deep/ .van-radio__icon--checked .van-icon {
  background-color: #fff !important;
}
.content {
  position: absolute;
  top: 71px;
  bottom: 50px;
  left: 0px;
  right: 0px;
  overflow: scroll;
}
.tabbar {
  text-align: center;
  font-weight: 550;
  font-size: 14px;
  height: 30px;
  line-height: 30px;
  background-color: #fff;
  border-bottom: 1px solid #000;
  display: flex;
  .curr {
    flex: auto;
  }
  .cur {
    color: #3a5ba4;
    border-bottom: 1px solid #3a5ba4;
  }
}
.img {
  padding: 10px 0 0 0;
  img {
    width: 100%;
    font-size: 0;
  }
}
.anniu {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  background-color: #fff;
  .no_rulesbtn {
    background-color: #f1f5ff;
    margin: 3px 5px;
    padding: 5px 10px;
    border-radius: 30px;
    font-size: 14px;
    // flex: none;
    // flex-basis:auto;
    // width: 80px;
  }
  .no_rulesbtn2 {
    background-color: #42bd58;
    color: #fff;
  }
}
.footer {
  box-sizing: content-box;
  width: 100%;
  height: 30px;
  padding: 10px 20px;
  background-color: #fff;
  position: fixed;
  bottom: 0;
  /deep/ .van-button--large {
    width: 89%;
    height: 35px;
  }
}
</style>
<script>
import headerCom from "../components/Header";
import Datetimepicker from "../components/Datetimepicker";
import {saveTreatmentView} from '../api/index.js'
export default {
   components: { headerCom, Datetimepicker },
  data() {
    return {
      list: ["导管室", "入路", "冠脉造影", "器械", "术中并发症"], //tab页内容
      curId_tab1: 0, //默认显示的tab页
      isShow:false,
      isShow1:false,
      isShow2:false,
      isShow3:false,
      isShow4:false,
      isShow5:false,
      daoguanshi: {
        //导管室
        jihuo: "",
        daoda: "",
        yishi: "",
        zaoying: "",
        TIMI: "",
        shuzhong: "",
        yaowu: "",
        danwei: "",
        jieshu: "",
        daoguan:{
            time:''
        }
      },
      value:{
          arrive:{
              time:'',
          },
          chuanc:{
              time:'',
          },
          zaoy:{
              time:''
          },
          geiy:{
              time:'',
          },
          shous:{
              time:''
          }
      },
      rulu: "", //入路
      zaoying: "", //造影
      anniuList: [
        {
          text: "右冠近段",
          state: "0"
        },
        {
          text: "右冠中段",
          state: "0"
        },
        {
          text: "右冠远段",
          state: "0"
        },
        {
          text: "后降支(右优势型)",
          state: "0"
        },
        { text: "左主干" },
        { text: "前降支近段" },
        { text: "前降支中段" },
        { text: "前降支远段" },
        { text: "第一对角支" },
        { text: "第二对角支" },
        { text: "旋支近段" },
        { text: "第一钝缘支" },
        { text: "旋支远段" },
        { text: "左室后支" },
        { text: "后降支(左优势型或均衡型)" },
        { text: "中间支" },
        { text: "第三对角支" },
        { text: "第二钝缘支" },
        { text: "第三钝缘支" },
        { text: "锐缘支" },
        { text: "左圆椎支" },
        { text: "右圆椎支" },
        { text: "室间隔支" },
        { text: "左后外侧支" },
        { text: "右后外侧支" },
        { text: "房室沟动脉" },
        { text: "后降支室间支" }
      ],
      chooseAfterValue: [], //被选中按钮
      tabAdd: [], //导管室新tab
      oldLength: "",
      qixie: {
        //器械
        yingxiang: "",
        jiance: "",
        IABP: "",
        qiboqi: "",
        ECMO: "",
        zuoxinshi: ""
      },
      anniuList2: [
        { text: "低血压" },
        { text: "血管夹层" },
        { text: "慢血流/无复流" },
        { text: "恶性心率失常" },
        { text: "心源性休克" },
        { text: "严重缓慢性心律失常" },
        { text: "血栓栓塞" },
        { text: "血管穿孔" },
        { text: "非干预血管急性闭塞" },
        { text: "死亡" },
        { text: "其他" },
        { text: "无" }
      ]
    };
  },
  methods: {
    // 导管室激活
    choosedata(param){
        this.daoguanshi[param.field].time = param.time;
        this.isShow = !this.isShow;
    },
    // 患者到达
    choosedata1(param){
        this.value[param.field].time = param.time;
        this.isShow1 = !this.isShow1;
    },
     // 开始穿刺
    choosedata2(param){
        this.value[param.field].time = param.time;
        this.isShow2 = !this.isShow2;
    },
      // 造影开始
    choosedata3(param){
        this.value[param.field].time = param.time;
        this.isShow3 = !this.isShow3;
    },
     // 术中抗凝给药
    choosedata4(param){
        this.value[param.field].time = param.time;
        this.isShow4 = !this.isShow4;
    },
    // 手术结束
    choosedata5(param){
        this.value[param.field].time = param.time;
        this.isShow5 = !this.isShow5;
    },

    // 选中按钮函数
    // 参数，按钮内容
    choosely(value) {
      if (this.chooseAfterValue.indexOf(value) != -1) {
        this.chooseAfterValue.splice(this.chooseAfterValue.indexOf(value), 1);
      } else {
        this.chooseAfterValue.push(value);
      }
    },
    // 新增tab标签函数
    // 参数： 按钮内容
    chooseadd(value) {
      // 导管室空数组的暂存判断逻辑
      // 如果数组中不存在增加一个

      if (this.tabAdd.indexOf(value) != -1) {
        this.tabAdd.splice(this.tabAdd.indexOf(value), 1);
        value.state = 0;
      } else {
        this.tabAdd.push(value);
        value.state = 1;
      }
      console.log(value.state);

      if ((value.state = 1)) {
        console.log(1111);
        this.list.splice(3, 0, this.tabAdd[this.tabAdd.length - 1].text);
        if (this.list.length > 5) {
          this.list = this.list.slice(this.list.length - 5, this.list.length);
        }
      } else {
        console.log(222);
        this.list.splice(3, 1);
      }
    },
    // 保存
    save(){
        let datas={
            // "angiographic_site":"",
            // "ccu_leave_date":"",
        }
        // 500
        saveTreatmentView(datas).then((res) => {
            console.log(res)
        })
    }
  }
};
</script>
