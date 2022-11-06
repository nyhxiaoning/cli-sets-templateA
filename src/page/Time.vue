<template>
  <div class="view">
    <div class="nav">
      <headerCom>
        <div slot="left" class="left">
          <van-icon name="arrow-left" @click="$router.back()" />
        </div>
        <div class="center">
          <span>{{ this.$route.query.name }}</span>
          <span v-if=" this.$route.query.gender=='1'">男</span>
          <span v-else>女</span>
          <span>{{ this.$route.query.age_value }}</span>
          <span>{{ this.$route.query.dcp_diagnosis_code }}</span>
        </div>
      </headerCom>
      <div class="tabbar">
        <div @click="curId_tab1 = 0" :class="{ curr: true, cur: curId_tab1 === 0 }">时间轴</div>
        <div @click="curId_tab1 = 1" :class="{ curr: true, cur: curId_tab1 === 1 }">时间节点</div>
        <div @click="curId_tab1 = 2" :class="{ curr: true, cur: curId_tab1 === 2 }">质控</div>
      </div>
    </div>
    <div class="content">
      <!-- 时间轴 -->
      <div v-show="curId_tab1 == 0">
        <!-- 调用components\timeline\newverticalTimeaxisquality.vue -->
        <!-- 在组件中绑定data数据的vlaue2,在自定义标签中传递要传递的值 -->
        <styletimeline :patientID="pk_pat_info"></styletimeline>
      </div>
      <!-- 时间节点 -->
      <div v-show="curId_tab1 == 1">
        <van-cell-group>
          <van-field label="发病时间" v-model="Time_node.attack_time.time" input-align="right">
            <template slot="right-icon">
              <van-icon name="clear" />
            </template>
          </van-field>
          <van-field v-model="Time_node.help_date.time" label="呼救时间" input-align="bottom">
            <template slot="right-icon">
              <van-icon name="clear" />
            </template>
          </van-field>
          <!-- 使用时间弹窗 -->
          <van-field
            v-model="Time_node.first_mc_time.time"
            label="首次医疗接触"
            placeholder="选择时间"
            input-align="right"
            readonly
          >
            <template slot="right-icon">
              <van-icon name="arrow" @click="isShow1 = !isShow1" />
              <datetimepicker :field="'first_mc_time'" :is-show="isShow1" @choosedata="choosedata1"></datetimepicker>
            </template>
          </van-field>
          <van-field
            v-model="Time_node.time1.time"
            label="首份心电图"
            placeholder="选择时间"
            input-align="right"
            readonly
          >
            <template slot="right-icon">
              <van-icon name="arrow" @click="isShow2 = !isShow2" />
              <datetimepicker :field="'time1'" :is-show="isShow2" @choosedata="choosedata2"></datetimepicker>
            </template>
          </van-field>
          <van-field
            v-model="Time_node.time2.time"
            label="心电图诊断"
            placeholder="选择时间"
            input-align="right"
            readonly
          >
            <template slot="right-icon">
              <van-icon name="arrow" @click="isShow3 = !isShow3" />
              <datetimepicker :field="'time2'" :is-show="isShow3" @choosedata="choosedata3"></datetimepicker>
            </template>
          </van-field>

          <van-field
            v-model="Time_node.decision_operation_time.time"
            label="接收心电图"
            placeholder="选择时间"
            input-align="right"
            readonly
          >
            <template slot="right-icon">
              <van-icon name="arrow" @click="isShow4 = !isShow4" />
              <datetimepicker
                :field="'decision_operation_time'"
                :is-show="isShow4"
                @choosedata="choosedata4"
              ></datetimepicker>
            </template>
          </van-field>

          <van-field
            v-model="Time_node.time3.time"
            label="到达医院大门"
            placeholder="选择时间"
            input-align="right"
            readonly
          >
            <template slot="right-icon">
              <van-icon name="arrow" @click="isShow5 = !isShow5" />
              <datetimepicker :field="'time3'" :is-show="isShow5" @choosedata="choosedata5"></datetimepicker>
            </template>
          </van-field>

          <van-field
            v-model="Time_node.time4.time"
            label="首诊医师接诊"
            placeholder="选择时间"
            input-align="right"
            readonly
          >
            <template slot="right-icon">
              <van-icon name="arrow" @click="isShow6 = !isShow6" />
              <datetimepicker :field="'time4'" :is-show="isShow6" @choosedata="choosedata6"></datetimepicker>
            </template>
          </van-field>

          <van-field
            v-model="Time_node.time5.time"
            label="抽血完成"
            placeholder="选择时间"
            input-align="right"
            readonly
          >
            <template slot="right-icon">
              <van-icon name="arrow" @click="isShow7 = !isShow7" />
              <datetimepicker :field="'time5'" :is-show="isShow7" @choosedata="choosedata7"></datetimepicker>
            </template>
          </van-field>
          <van-field
            v-model="Time_node.time6.time"
            label="获得报告"
            placeholder="选择时间"
            input-align="right"
            readonly
          >
            <template slot="right-icon">
              <van-icon name="arrow" @click="isShow8 = !isShow8" />
              <datetimepicker :field="'time6'" :is-show="isShow8" @choosedata="choosedata8"></datetimepicker>
            </template>
          </van-field>
          <van-field
            v-model="Time_node.time7.time"
            label="通知会诊"
            placeholder="选择时间"
            input-align="right"
            readonly
          >
            <template slot="right-icon">
              <van-icon name="arrow" @click="isShow9 = !isShow9" />
              <datetimepicker :field="'time7'" :is-show="isShow9" @choosedata="choosedata9"></datetimepicker>
            </template>
          </van-field>
          <van-field
            v-model="Time_node.time8.time"
            label="会诊时间"
            placeholder="选择时间"
            input-align="right"
            readonly
          >
            <template slot="right-icon">
              <van-icon name="arrow" @click="isShow10 = !isShow10" />
              <datetimepicker :field="'time8'" :is-show="isShow10" @choosedata="choosedata10"></datetimepicker>
            </template>
          </van-field>
          <van-field
            v-model="Time_node.dcreate_date.time"
            label="初步诊断时间"
            placeholder="选择时间"
            input-align="right"
            readonly
          >
            <template slot="right-icon">
              <van-icon name="arrow" @click="isShow11 = !isShow11" />
              <datetimepicker
                :field="'dcreate_date'"
                :is-show="isShow11"
                @choosedata="choosedata11"
              ></datetimepicker>
            </template>
          </van-field>
          <van-field
            v-model="Time_node.time9.time"
            label="阿司匹林时间"
            placeholder="选择时间"
            input-align="right"
            readonly
          >
            <template slot="right-icon">
              <van-icon name="arrow" @click="isShow12 = !isShow12" />
              <datetimepicker :field="'time9'" :is-show="isShow12" @choosedata="choosedata12"></datetimepicker>
            </template>
          </van-field>
          <van-field
            v-model="Time_node.time10.time"
            label="氯吡格雷"
            placeholder="选择时间"
            input-align="right"
            readonly
          >
            <template slot="right-icon">
              <van-icon name="arrow" @click="isShow13 = !isShow13" />
              <datetimepicker :field="'time10'" :is-show="isShow13" @choosedata="choosedata13"></datetimepicker>
            </template>
          </van-field>
          <van-field
            v-model="Time_node.decision_operation_time.time"
            label="决定介入手术"
            placeholder="选择时间"
            input-align="right"
            readonly
          >
            <template slot="right-icon">
              <van-icon name="arrow" @click="isShow14 = !isShow14" />
              <datetimepicker
                :field="'decision_operation_time'"
                :is-show="isShow14"
                @choosedata="choosedata14"
              ></datetimepicker>
            </template>
          </van-field>

          <van-field
            v-model="Time_node.time11.time"
            label="启动导管室"
            placeholder="选择时间"
            input-align="right"
            readonly
          >
            <template slot="right-icon">
              <van-icon name="arrow" @click="isShow15 = !isShow15" />
              <datetimepicker :field="'time11'" :is-show="isShow15" @choosedata="choosedata15"></datetimepicker>
            </template>
          </van-field>

          <van-field
            v-model="Time_node.time12.time"
            label="开始知情同意"
            placeholder="选择时间"
            input-align="right"
            readonly
          >
            <template slot="right-icon">
              <van-icon name="arrow" @click="isShow16 = !isShow16" />
              <datetimepicker :field="'time12'" :is-show="isShow16" @choosedata="choosedata16"></datetimepicker>
            </template>
          </van-field>

          <van-field
            v-model="Time_node.time13.time"
            label="签署知情同意"
            placeholder="选择时间"
            input-align="right"
            readonly
          >
            <template slot="right-icon">
              <van-icon name="arrow" @click="isShow17 = !isShow17" />
              <datetimepicker :field="'time13'" :is-show="isShow17" @choosedata="choosedata17"></datetimepicker>
            </template>
          </van-field>

          <van-field
            v-model="Time_node.time14.time"
            label="导管室激活"
            placeholder="选择时间"
            input-align="right"
            readonly
          >
            <template slot="right-icon">
              <van-icon name="arrow" @click="isShow18 = !isShow18" />
              <datetimepicker :field="'time14'" :is-show="isShow18" @choosedata="choosedata18"></datetimepicker>
            </template>
          </van-field>

          <van-field
            v-model="Time_node.time15.time"
            label="手术结束"
            placeholder="选择时间"
            input-align="right"
            readonly
          >
            <template slot="right-icon">
              <van-icon name="arrow" @click="isShow19 = !isShow19" />
              <datetimepicker :field="'time15'" :is-show="isShow19" @choosedata="choosedata19"></datetimepicker>
            </template>
          </van-field>

          <van-field
            v-model="Time_node.time16.time"
            label="导丝通过时间"
            placeholder="选择时间"
            input-align="right"
            readonly
          >
            <template slot="right-icon">
              <van-icon name="arrow" @click="isShow20 = !isShow20" />
              <datetimepicker :field="'time16'" :is-show="isShow20" @choosedata="choosedata20"></datetimepicker>
            </template>
          </van-field>
        </van-cell-group>
      </div>
      <!-- 质控 -->
      <div v-show="curId_tab1 == 2">
        <div
          style="font-size: 14px;display: flex;margin-left: 0; background-color: #F3F5FB; height: 50px; align-items: center; justify-content: flex-end;"
        >
          <div style="display: flex; align-items: center; margin-right: 15px; height: 50px;">
            <span
              style="margin-right: 10px;width: 15px; height: 15px;display: inline-block;border-radius: 50%;background-color: #259e33;"
            ></span>正常
          </div>
          <div style="display: flex; align-items: center; margin-right: 15px; height: 50px;">
            <span
              style="margin-right: 10px;width: 15px;height: 15px;display: inline-block;border-radius: 50%;background-color: #ff9900;"
            ></span>超标
          </div>
          <div style="display: flex; align-items: center; margin-right: 15px; height: 50px;">
            <span
              style="margin-right: 10px; width: 15px;height: 15px;display: inline-block;border-radius: 50%;background-color: #ff0000;"
            ></span>负值
          </div>
        </div>
        <!-- 时间轴列表的展示内容 -->
        <div style="height: 100vh;">
          <van-row type="flex" justify="space-between" align="bottom">
            <div v-for="items in lists" :key="items.id">
              <van-col span="7">
                <van-field :label="items.name"></van-field>
                <van-field :label="items.firstTime"></van-field>
                <div style="height: 20px;background-color:#F3F5FB;"></div>
              </van-col>
              <van-col span="6">
                <van-field :label="items.name"></van-field>
                <van-field :label="items.firstTime2"></van-field>
                <div style="height: 20px;background-color: #F3F5FB;"></div>
              </van-col>
              <van-col span="4">
                <van-field :label="items.name"></van-field>
                <van-field :label="items.standValue"></van-field>
                <span style="height: 20px;"></span>

                <div style="height: 20px;background-color: #F3F5FB;"></div>
              </van-col>
              <van-col span="4">
                <van-field :label="items.name"></van-field>
                <van-field :label="items.releaseValue"></van-field>

                <div style="height: 20px;background-color: #F3F5FB;"></div>
              </van-col>
              <van-col span="3">
                <van-field :label="items.name"></van-field>
                <van-field :label="items.resultValue" class="resultValueCss" style="color: #fff;"></van-field>
                <!-- 用一个笨办法：样式移动,做一个浮动，然后飘 -->
                <div style="float: left;margin-top: -30px;margin-left: 20px;">
                  <template v-if="items.resultValue == 1">
                    <van-icon
                      name="circle"
                      color="rgb(37, 158, 51)"
                      style="background-color:;color:rgb(37, 158, 51); border-radius: 50%;"
                    />
                  </template>
                  <template v-if="items.resultValue == 2">
                    <van-icon
                      name="circle"
                      color="rgb(255, 153, 0)"
                      style="background-color:rgb(255, 153, 0);color:rgb(255, 153, 0); border-radius: 50%;"
                    />
                  </template>
                  <template v-if="items.resultValue == 3">
                    <van-icon
                      name="circle"
                      color="red"
                      style="background-color:red;color:red; border-radius: 50%;"
                    ></van-icon>
                  </template>
                </div>
                <div style="height: 20px;background-color: #F3F5FB;"></div>
              </van-col>
            </div>
          </van-row>
        </div>
      </div>
    </div>
    <div class="footer">
      <div v-show="curId_tab1 === 1 ">
        <van-button round color="#4676FB" size="large" @click="save">保存</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import Datetimepicker from "../components/Datetimepicker";
import headerCom from "../components/Header";
import styletimeline from "@/components/timeline/newverticalTimeaxisquality.vue";
// import bus from "../main.js";

// 注册自定义标签,名字是上面引进来的 headerCom.vue, styletimeline.vue 名字必须一样  ，之后就可以用了
export default {
  components: { headerCom, styletimeline, Datetimepicker },
  data() {
    return {
      // 质控
      listsHead: ["首次医疗接触", "首份心电图", "标准值", "实际值", "结果"],
      lists: [
        {
          name: "首次医疗时间",
          firstTime: "20210010",
          name2: "首份心电图",
          firstTime2: "210211110",
          name3: "标准值",
          standValue: "12",
          name4: "实际值",
          releaseValue: "11",
          name5: "结果",
          resultValue: "2",
        },
        {
          name: "首次医疗时间",
          firstTime: "20210010",
          name2: "首份心电图",
          firstTime2: "210211110",
          name3: "标准值",
          standValue: "12",
          name4: "实际值",
          releaseValue: "11",
          name5: "结果",
          resultValue: "3",
        },
        {
          name: "首次医疗时间",
          firstTime: "20210010",
          name2: "首份心电图",
          firstTime2: "210211110",
          name3: "标准值",
          standValue: "12",
          name4: "实际值",
          releaseValue: "11",
          name5: "结果",
          resultValue: "2",
        },
        {
          name: "首次医疗时间",
          firstTime: "20210010",
          name2: "首份心电图",
          firstTime2: "210211110",
          name3: "标准值",
          standValue: "12",
          name4: "实际值",
          releaseValue: "11",
          name5: "结果",
          resultValue: "3",
        },
        {
          name: "首次医疗时间",
          firstTime: "20210010",
          name2: "首份心电图",
          firstTime2: "210211110",
          name3: "标准值",
          standValue: "12",
          name4: "实际值",
          releaseValue: "11",
          name5: "结果",
          resultValue: "1",
        },
        {
          name: "首次医疗时间",
          firstTime: "20210010",
          name2: "首份心电图",
          firstTime2: "210211110",
          name3: "标准值",
          standValue: "12",
          name4: "实际值",
          releaseValue: "11",
          name5: "结果",
          resultValue: "2",
        },
        {
          name: "首次医疗时间",
          firstTime: "20210010",
          name2: "首份心电图",
          firstTime2: "210211110",
          name3: "标准值",
          standValue: "12",
          name4: "实际值",
          releaseValue: "11",
          name5: "结果",
          resultValue: "1",
        },
        {
          name: "首次医疗时间",
          firstTime: "20210010",
          name2: "首份心电图",
          firstTime2: "210211110",
          name3: "标准值",
          standValue: "12",
          name4: "实际值",
          releaseValue: "11",
          name5: "结果",
          resultValue: "1",
        },
        {
          name: "首次医疗时间",
          firstTime: "20210010",
          name2: "首份心电图",
          firstTime2: "210211110",
          name3: "标准值",
          standValue: "12",
          name4: "实际值",
          releaseValue: "11",
          name5: "结果",
          resultValue: "2",
        },
      ],
      //   lists: [],
      //时间轴传参值
      pk_pat_info: this.$route.query.pk_pat_info,
      loading: false,
      finished: false,
      refreshing: false, //刷新赋值的触发值
      curId_tab1: 0,
      //   时间节点字段
      Time_node: {
        //发病时间
        attack_time: {
          name: "发病时间",
          time: "",
        },
        //呼救时间
        help_date: {
          name: "呼救时间",
          time: "",
        },
        //首次医疗接触
        first_mc_time: {
          name: "首次医疗接触",
          time: "",
        },
        //院内首份心电图
        time1: {
          time: "",
        },
        // 心电图诊断
        time2: {
          time: "",
        },
        //接收心电图
        decision_operation_time: {
          time: "",
        },
        //到达医院大门时间
        time3: {
          time: "",
        },
        //首诊医生接诊时间
        time4: {
          time: "",
        },
        // 抽血完成
        time5: {
          time: "",
        },
        // 获得报告
        time6: {
          time: "",
        },
        // 通知会诊
        time7: {
          time: "",
        },
        // 会诊时间
        time8: {
          time: "",
        },
        //	初步诊断时间
        dcreate_date: {
          time: "",
        },
        // 阿司匹林时间
        time9: {
          time: "",
        },
        // 氯毗格雷
        time10: {
          time: "",
        },
        // 决定介入手术
        decision_operation_time: {
          time: "",
        },
        // 启动导管室
        time11: {
          time: "",
        },
        // 开始知情同意
        time12: {
          time: "",
        },
        // 签署知情同意
        time13: {
          time: "",
        },
        // 导管室激活
        time14: {
          time: "",
        },
        // 手术结束
        time15: {
          time: "",
        },
        // 导丝通过时间
        time16: {
          time: "",
        },
      },
      // 同时下面使用三个进行对应三个不同日期组件
      isShow1: false,
      isShow2: false,
      isShow3: false,
      isShow4: false,
      isShow5: false,
      isShow6: false,
      isShow7: false,
      isShow8: false,
      isShow9: false,
      isShow10: false,
      isShow11: false,
      isShow12: false,
      isShow13: false,
      isShow14: false,
      isShow15: false,
      isShow16: false,
      isShow17: false,
      isShow18: false,
      isShow19: false,
      isShow20: false,
      //兄弟传值
      //   timeval: {
      //     time1: {
      //       time: this.Time_node.first_mc_time.time,
      //       name: this.Time_node.first_mc_time.name3,
      //     },
      //   },
    };
  },
  methods: {
    // 保存方法
    save() {
      //   var data = {
      //     //   后端参:前端值
      //     timeNodeCode: this.Time_node.decision_operation_time.time,
      //   };
      //   console.log(data);
    //   this.bus.$emit("val", this.Time_node.first_mc_time);
    },
    choosedata1(param) {
      console.log(param);
      this.Time_node[param.field].time = param.time;
      // console.log(this.value[param.field]);
      this.isShow1 = !this.isShow1;
    },
    choosedata2(param) {
      this.Time_node[param.field].time = param.time;
      this.isShow2 = !this.isShow2;
    },
    choosedata3(param) {
      this.Time_node[param.field].time = param.time;
      this.isShow3 = !this.isShow3;
    },
    choosedata4(param) {
      this.Time_node[param.field].time = param.time;
      this.isShow4 = !this.isShow4;
    },
    choosedata5(param) {
      this.Time_node[param.field].time = param.time;
      this.isShow5 = !this.isShow5;
    },
    choosedata6(param) {
      this.Time_node[param.field].time = param.time;
      this.isShow6 = !this.isShow6;
    },
    choosedata7(param) {
      this.Time_node[param.field].time = param.time;
      this.isShow7 = !this.isShow7;
    },
    choosedata8(param) {
      this.Time_node[param.field].time = param.time;
      this.isShow8 = !this.isShow8;
    },
    choosedata9(param) {
      this.Time_node[param.field].time = param.time;
      this.isShow9 = !this.isShow9;
    },
    choosedata10(param) {
      this.Time_node[param.field].time = param.time;
      this.isShow10 = !this.isShow10;
    },
    choosedata11(param) {
      this.Time_node[param.field].time = param.time;
      this.isShow11 = !this.isShow11;
    },
    choosedata12(param) {
      this.Time_node[param.field].time = param.time;
      this.isShow12 = !this.isShow12;
    },
    choosedata13(param) {
      this.Time_node[param.field].time = param.time;
      this.isShow13 = !this.isShow13;
    },
    choosedata14(param) {
      this.Time_node[param.field].time = param.time;
      this.isShow14 = !this.isShow14;
    },
    choosedata15(param) {
      this.Time_node[param.field].time = param.time;
      this.isShow15 = !this.isShow15;
    },
    choosedata16(param) {
      this.Time_node[param.field].time = param.time;
      this.isShow16 = !this.isShow16;
    },
    choosedata17(param) {
      this.Time_node[param.field].time = param.time;
      this.isShow17 = !this.isShow17;
    },
    choosedata18(param) {
      this.Time_node[param.field].time = param.time;
      this.isShow18 = !this.isShow18;
    },
    choosedata19(param) {
      this.Time_node[param.field].time = param.time;
      this.isShow19 = !this.isShow19;
    },
    choosedata20(param) {
      this.Time_node[param.field].time = param.time;
      this.isShow20 = !this.isShow20;
    },
  },

  mounted() {
    // console.log(
    //   "--------------------------------------------patientobj",
    //   this.$patientobj,
    //   this.$YearDay,
    //   "YearDay"
    // );
    this.$YearDay = "22212121211";
    // console.log("------- this.$patientobj,", this.$patientobj);
    // console.log("0-----------------------------this.$YearDay", this.$YearDay);

    // TODO:localStrage传值
    // console.log(
    //   "localstrage----------------------------patientLists",
    //   JSON.parse(localStorage.getItem("patientLists"))
    // );
    this.$nextTick(() => {
      let tagcss = document.getElementsByClassName("resultValueCss");
      //   console.log(tagcss, "00000000000000tagcass");
    });
  },
};
</script>
<style scoped lang="scss">
.view {
  position: relative;
  height: 100%;
  /* 增加相关的vant的实现table的样式展示 */
  table {
    position: relative;
    color: #86939e;
    font-size: 15px;
    border: 0px solid #000;
    min-height: 100%;
    text-align: center;
    white-space: nowrap;
    td {
      border-bottom: 1px solid #eee;
      white-space: nowrap;
      height: 0.86rem;
      line-height: 0.86rem;
      padding: 0 0.2rem;
      white-space: nowrap;
    }
  }
  .vant-table-personal-style {
    display: flex;
    .van-cell__title span {
      flex: 0.2;
      padding: 10px;
    }
  }
  .nav {
    .center {
      span {
        padding-right: 10px;
      }
    }
  }
  .content {
    position: absolute;
    top: 17.75vw;
    bottom: 12.5vw;
    left: 0px;
    right: 0px;
    overflow: auto;
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
      flex: 1;
    }
    .cur {
      color: #3a5ba4;
      border-bottom: 1px solid #3a5ba4;
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
}
</style>