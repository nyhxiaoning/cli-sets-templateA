<template>
  <div class="view">
    <div class="nav">
      <headerCom>
        <span slot="left" @click="$router.back()">
          <van-icon name="arrow-left" @click="$router.back()" />
        </span>
        <span>新建</span>
        <span slot="right" @click="onClickRight">保存</span>
      </headerCom>
      <div class="header">
        <van-cell-group>
          <van-field v-model="totle" label="急诊类型" readonly>
            <template slot="right-icon">
              <!-- 替换目前所有的radio的选择的修改页面 -->
              <!-- <label v-for="indexs in 3" :key="indexs">
                性别
                <input type="radio" />
              </label>

              <van-radio-group v-model="radio" direction="horizontal">
                <van-radio name="1">胸痛</van-radio>
                <van-radio name="2">卒中</van-radio>
                <van-radio name="3">创伤</van-radio>
              </van-radio-group>-->
              <a-radio-group :options="plainOptions" :default-value="value1" />
            </template>
          </van-field>
          <van-field :value="value.radio1.number" label="手环编号" clickable input-align="right">
            <template slot="right-icon">
              <van-icon name="arrow" @click="handleShowPicker('number')" />
            </template>
          </van-field>
        </van-cell-group>
      </div>
    </div>
    <div class="content">
      <!-- 胸痛 -->
      <div v-if="radio == 1">
        <van-cell-group>
          <van-field
            v-model="value.radio1.name"
            label="姓名"
            required
            placeholder="请输入文本"
            input-align="right"
          >
            <template slot="right-icon">图片1</template>
            <template slot="right-icon">图片2</template>
          </van-field>
          <!-- <van-field v-model="value.radio1.sex" label="性别" readonly>
            <template slot="extra">
              <label>
                男
                <input type="radio" name="sex" />
              </label>
              <label>
                女
                <input type="radio" name="sex" />
              </label>
            </template>
          </van-field>-->
          <van-field v-model="value.radio1.notime" label="性别" label-width="200px" readonly>
            <template slot="extra">
              <van-radio-group v-model="value.radio1.sex" direction="horizontal">
                <van-radio name="1">男</van-radio>
                <van-radio name="2">女</van-radio>
              </van-radio-group>
            </template>
          </van-field>
          <van-field v-model="value.radio1.age" label="年龄" input-align="right">
            <template slot="right-icon">
              <select style="width:40px;border:none;outline:none;" v-model="value.radio1.ageUnit">
                <option value="1">岁</option>
                <option value="2">月</option>
                <option value="3">天</option>
              </select>
            </template>
          </van-field>
          <van-field label="证件类型" input-align="right" :value="value.radio1.idType" clickable>
            <template slot="right-icon">
              <van-icon name="arrow" @click="handleShowPicker('idType')" />
            </template>
          </van-field>
          <van-field
            v-model="value.radio1.id"
            label="证件号"
            input-align="right"
            v-if="value.radio1.idType == '身份证' || value.radio1.idType == '军官证' || value.radio1.idType == '护照'"
          />
          <van-field v-model="value.radio1.Telephone" label="联系电话" input-align="right" />
          <van-field
            v-model="value.radio1.time"
            label="发病时间"
            placeholder="选择时间"
            input-align="right"
          >
            <template slot="right-icon">
              <van-icon name="arrow" @click="isShow = !isShow" />
              <datetimepicker :field="'radio1'" :is-show="isShow" @choosedata="choosedata"></datetimepicker>
            </template>
          </van-field>
          <van-popup v-model="show" position="bottom" :style="{ height: '40%', width: '100%' }">
            <van-datetime-picker
              v-model="currentDate"
              type="datetime"
              title="选择完整时间"
              :min-date="minDate"
              :max-date="maxDate"
            />
          </van-popup>

          <van-field v-model="value.radio1.notime" label="发病时间无法精确到分钟" label-width="200px" readonly>
            <template slot="right-icon">
              <van-radio-group v-model="value.radio1.precise_time" direction="horizontal">
                <van-radio name="1">是</van-radio>
                <van-radio name="2">否</van-radio>
              </van-radio-group>
            </template>
          </van-field>
          <div v-if="value.radio1.precise_time == 1">
            <van-field :value="value.radio1.time" label="发病区间" input-align="right" readonly>
              <template slot="right-icon">
                <van-icon name="arrow" />
              </template>
            </van-field>
          </div>
          <van-field :value="value.radio1.medical" label="医保类型" input-align="right" clickable>
            <template slot="right-icon">
              <van-icon name="arrow" @click="handleShowPicker('medical')" />
            </template>
          </van-field>
          <van-field v-model="value.radio1.medical_num" label="医保编号" input-align="right" />
          <!-- 病情评估 -->
          <div class="condition">
            <span>病情评估</span>
            <van-radio-group v-model="value.radio1.type_2" direction="horizontal">
              <van-radio icon-size="14px" name="1">持续性胸闷/胸痛</van-radio>
              <van-radio icon-size="14px" name="2">间歇性胸闷/胸痛</van-radio>
              <van-radio icon-size="14px" name="3">症状已缓解</van-radio>
            </van-radio-group>
            <div class="anniu">
              <div
                class="zxlybtn"
                :class="{ zxlybtn2: chooseAfterValue.indexOf(item.text) != -1 }"
                v-for="(item, index) in lyList1"
                :key="index"
                @click="choosely(index, item.text)"
              >
                <span>{{ item.text }}</span>
              </div>
            </div>
          </div>
          <!-- 来院方式 -->
          <div>
            <div class="come">
              <span>来院方式</span>
              <van-radio-group v-model="value.radio1.type_3" direction="horizontal">
                <van-radio icon-size="14px" name="1">呼叫（120/999）出车</van-radio>
                <van-radio icon-size="14px" name="2">转院</van-radio>
                <van-radio icon-size="14px" name="3">自行来院</van-radio>
                <van-radio icon-size="14px" name="4">院内发病</van-radio>
              </van-radio-group>
            </div>
            <div v-if="value.radio1.type_3 == 3">
              <van-field
                v-model="value.radio1.door"
                label="到达本院大门"
                placeholder="选择时间"
                input-align="right"
              >
                <template slot="right-icon">
                  <van-icon name="arrow" @click="isShow1 = !isShow1" />
                  <datetimepicker :field="'radio1'" :is-show="isShow1" @choosedata="choosedata1"></datetimepicker>
                </template>
              </van-field>
              <van-field
                v-model="value.radio1.touch"
                label="首次接触医疗"
                placeholder="选择时间"
                input-align="right"
              >
                <template slot="right-icon">
                  <van-icon name="arrow" @click="isShow2 = !isShow2" />
                  <datetimepicker :field="'radio1'" :is-show="isShow2" @choosedata="choosedata2"></datetimepicker>
                </template>
              </van-field>
              <van-cell-group>
                <van-field
                  v-model="value.radio1.person"
                  label="医护人员"
                  placeholder="请输入文本"
                  input-align="right"
                />
              </van-cell-group>
              <!-- 选项弹出框 -->
              <van-popup v-model="showPicker" round position="bottom">
                <van-picker
                  show-toolbar
                  ref="pickerRef"
                  :title="pickerTitle"
                  :columns="pickerColumns"
                  @cancel="showPicker = false"
                  @confirm="onConfirmPicker"
                />
              </van-popup>
            </div>
          </div>
        </van-cell-group>
      </div>
      <!-- 卒中 -->
      <div v-if="radio == 2">
        <van-cell-group>
          <van-field
            v-model="value.radio2.name"
            label="姓名"
            required
            placeholder="请输入文本"
            input-align="right"
          >
            <template slot="right-icon">图片1</template>
            <template slot="right-icon">图片2</template>
          </van-field>
          <van-field label="性别" readonly v-model="value.radio2.sex">
            <template slot="extra">
              <label>
                男
                <input type="radio" name="1" />
              </label>
              <label>
                女
                <input type="radio" name="2" />
              </label>
            </template>
          </van-field>
          <van-field v-model="value.radio2.age" label="年龄" input-align="right">
            <template slot="extra">岁</template>
          </van-field>
          <van-field v-model="value.radio2.id" label="身份证号" input-align="right" />
          <van-field v-model="value.radio2.telephone" label="联系电话" input-align="right" />
          <van-cell-group>
            <van-field v-model="value.radio2.time" label="发病时间" readonly>
              <template slot="right-icon">
                <van-radio-group v-model="value.radio2.type" direction="horizontal">
                  <van-radio name="1">已知</van-radio>
                  <van-radio name="2">未知</van-radio>
                  <van-radio name="3">酒后卒中</van-radio>
                </van-radio-group>
              </template>
            </van-field>
          </van-cell-group>
          <div v-if="value.radio2.type == 1">
            <van-cell-group>
              <van-field v-model="value.radio2.specific_time" label="具体发病时间" input-align="right" />
            </van-cell-group>
          </div>
          <van-field v-model="value.radio2.medical" label="医保类型" input-align="right" readonly>
            <template slot="right-icon">
              <van-icon name="arrow" />
            </template>
          </van-field>
          <van-field v-model="value.radio2.medical_num" label="医保编号" input-align="right" />
          <div class="condition">
            <span class="zzhuang">症状</span>
            <div class="anniu">
              <div
                class="zxlybtn"
                :class="{ zxlybtn2: chooseAfterValue.indexOf(item.text) != -1 }"
                v-for="(item, index) in lyList2"
                :key="index"
                @click="choosely(index, item.text)"
              >
                <span>{{ item.text }}</span>
              </div>
            </div>
          </div>
          <div>
            <div class="come">
              <span>来院方式</span>
              <van-radio-group v-model="value.radio2.type_2" direction="horizontal">
                <van-radio icon-size="14px" name="1">呼叫（120/999）出车</van-radio>
                <van-radio icon-size="14px" name="2">转院</van-radio>
                <van-radio icon-size="14px" name="3">自行来院</van-radio>
                <van-radio icon-size="14px" name="4">院内发病</van-radio>
              </van-radio-group>
            </div>
            <div v-if="value.radio2.type_2 == 3">
              <van-field v-model="value.radio2.door" label="到达本院大门" readonly>
                <template slot="right-icon">
                  <span>选择时间</span>
                  <van-icon name="arrow" />
                </template>
              </van-field>
              <van-field v-model="value.radio2.department" label="入院科室">
                <template slot="right-icon">
                  <van-icon name="arrow" />
                </template>
              </van-field>
              <van-field
                v-model="value.radio2.person"
                label="接诊护士"
                placeholder="请输入文本"
                input-align="right"
              />
              <van-field v-model="value.radio2.reception_time" label="接诊时间" readonly>
                <template slot="right-icon">
                  <span>选择时间</span>
                  <van-icon name="arrow" />
                </template>
              </van-field>
            </div>
          </div>
        </van-cell-group>
      </div>
      <!-- 创伤 -->
      <div v-if="radio == 3">
        <van-cell-group>
          <van-field
            v-model="value.radio3.name"
            label="姓名"
            required
            placeholder="请输入文本"
            input-align="right"
          >
            <template slot="right-icon">图片1</template>
            <template slot="right-icon">图片2</template>
          </van-field>
          <van-field v-model="value.radio3.sex" label="性别" readonly>
            <template slot="extra">
              <label>
                男
                <input type="radio" name="sex" />
              </label>
              <label>
                女
                <input type="radio" name="sex" />
              </label>
            </template>
          </van-field>
          <van-field v-model="value.radio3.age" label="年龄" input-align="right">
            <template slot="extra">岁</template>
          </van-field>
          <van-field v-model="value.radio3.certificates" label="证件类型">
            <template slot="right-icon">
              <van-icon name="arrow" />
            </template>
          </van-field>
          <van-field
            v-model="value.radio3.id"
            label="证件号"
            placeholder="请输入身份证号码"
            input-align="right"
          />
          <van-field
            v-model="value.radio3.telephone"
            label="联系电话"
            placeholder="请输入联系电话"
            input-align="right"
          />
          <van-field v-model="value.radio3.hurt" label="受伤时间" readonly>
            <template slot="right-icon">
              <button>采集</button>
              <span>选择时间</span>
              <van-icon name="arrow" />
            </template>
          </van-field>
          <van-field v-model="value.radio3.address" label="受伤地址">
            <template slot="right-icon">
              <van-icon name="arrow" />
            </template>
          </van-field>
          <van-field
            v-model="value.radio3.detailed_address"
            label="详细地址"
            placeholder="点击输入"
            input-align="right"
          />
          <van-field v-model="value.radio3.mpds" label="MPDS症状">
            <template slot="right-icon">
              <van-icon name="arrow" />
            </template>
          </van-field>
          <van-field v-model="value.radio3.warning_level" label="预警级别" readonly>
            <template slot="right-icon">
              <van-radio-group v-model="value.radio3.type_3" direction="horizontal">
                <van-radio name="1">红色预警</van-radio>
                <van-radio name="2">黄色预警</van-radio>
                <van-radio name="3">绿色预警</van-radio>
              </van-radio-group>
            </template>
          </van-field>
          <van-field v-model="value.radio3.medical" label="医保类型">
            <template slot="right-icon">
              <van-icon name="arrow" />
            </template>
          </van-field>
          <van-field v-model="value.radio3.medical_num" label="医保编号" input-align="right" />
        </van-cell-group>
      </div>
    </div>
    <div class="foot-add">
      <van-button
        type="primary"
        size="large"
        round
        style="background-color: #3a5ba4"
        @click="save"
      >保存</van-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.view {
  //   position: relative;
  position: absolute;
  top: 17.75vw;
  bottom: 12.5vw;
  left: 0;
  right: 0;
  overflow: auto;
  // 底部的新建保存的按钮
  .foot-add {
    position: fixed;
    bottom: 0px;
    width: 100%;
    height: 52px;
    line-height: 52px;
    background-color: #fff;
    text-align: center;
    .button-mini-height {
      height: 25px;
    }
    .van-button {
      width: 80%;
    }
  }
}
.nav {
  position: fixed;
  top: 0;
  z-index: 999;
  background-color: #efefef;
  // 不写宽度为什么不可以
  width: 100%;
  .header {
    margin-top: 8px;
  }
}
.content {
  margin-top: 15.5vw;
}

/deep/ .van-cell-group {
  background-color: #efefef;
}
/deep/ .van-cell {
  margin: 5px 0;
  padding: 6px 16px;
}

/deep/ .van-hairline--top-bottom::after,
.van-hairline-unset--top-bottom::after,
/deep/ .van-cell::after {
  border-width: 0px 0;
}
/deep/ .van-radio__label {
  margin-left: 8px;
  font-size: 12px;
}
/deep/ .van-field__left-icon .van-icon,
.van-field__right-icon .van-icon {
  display: inline-block;
}
.condition {
  background-color: #fff;
  padding: 8px 16px;
  .zzhuang {
    font-size: 14px;
    display: block;
    margin-bottom: 8px;
  }
  .anniu {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .zxlybtn {
      background-color: #f1f5ff;
      margin-bottom: 5px;
      padding: 5px 8px;
      border-radius: 30px;
      font-size: 14px;
      // flex: none;
      // flex-basis:auto;
      // width: 80px;
    }
    .zxlybtn2 {
      background-color: #42bd58;
      color: #fff;
    }
  }
}
.come {
  padding: 8px 16px;
  background-color: #fff;
}
</style>

<script>
import headerCom from "../components/Header";
// 引入时间组件
import datetimepicker from "../components/Datetimepicker.vue";

// 引入接口封装的方法
import { getDefdocViewByCodes, queryAllDefdoc } from "../api/index";
export default {
  components: { headerCom, datetimepicker },
  data() {
    return {
      // 替换之前不合理的按钮样式
      plainOptions: ["胸痛", "卒中", "创伤"],
      value1: "",
      // 默认不显示
      show: false,
      options: [
        { label: "胸痛", value: "1" },
        { label: "卒中", value: "2" },
        { label: "创伤", value: "3" },
      ],
      // 对象的循环的尝试
      arrObj: [1, 2, 3, 4, 6],
      radioChecked: "1", //默认选中哪一项
      totle: "",
      radio: "1",

      value: {
        // 胸痛
        radio1: {
          number: "", //手环编号
          name: "",
          sex: "1",
          ageUnit: "1", //年龄单位，默认显示岁
          age: "",
          idType: "",
          id: "",
          telephone: "",
          time: "",
          notime: "",
          // type: '1',
          medical: "",
          medical_num: "",
          type_2: "1",
          type_3: "3",
          door: "",
          touch: "",
          person: "",
        },
        radio2: {
          name: "",
          sex: "1",
          age: "",
          id: "",
          telephone: "",
          time: "",
          type: "1",
          specific_time: "",
          medical: "",
          medical_num: "",
          type_2: "3",
          door: "",
          department: "",
          person: "",
          reception_time: "",
        },
        radio3: {
          name: "",
          sex: "",
          age: "",
          certificates: "",
          id: "",
          telephone: "",
          hurt: "",
          address: "",
          detailed_address: "",
          mpds: "",
          warning_level: "",
          type_3: "1",
          medical: "",
          medical_num: "",
        },
      },
      lyList1: [
        { text: "呼吸困难" },
        { text: "腹痛" },
        { text: "齿痛" },
        { text: "肩背痛" },
        { text: "合并出血" },
        { text: "合并心衰" },
        { text: "心慌心悸" },
        { text: "烦躁不安" },
        { text: "不明原因的昏厥" },
        { text: "自汗、大汗淋漓" },
        { text: "合并恶性心律失常" },
        { text: "颈前部束缚感" },
        { text: "乏力" },
        { text: "气喘" },
        { text: "其他" },
      ],
      lyList2: [
        { text: "一侧肢体无力、麻木、笨拙" },
        { text: "一侧面部麻木或口角歪斜" },
        { text: "说话不清或理解语言困难" },
        { text: "双眼向一侧凝视" },
        { text: "一侧或双眼视力丧失或模糊" },
        { text: "既往少见的严重头痛、呕吐" },
        { text: "视物旋转或平衡障碍，眩晕伴呕吐" },
        { text: "意识障碍或抽搐" },
      ],
      chooseAfterValue: [],
      // 时间data的范围
      minDate: new Date(2020, 0, 1),
      maxDate: new Date(2025, 10, 1),
      currentDate: new Date(),
      //   时间组件的显隐
      isShow: false, //发病时间
      isShow1: false, //到达本院大门时间
      isShow2: false, //首次医疗接触的时间
      isShow3: true, //手环编号的显示
      //   isShow4: false, //证件类型的显示
      //   isShow5: false, //医保类型的显示
      //用于存储选中类型的数据
      pickerTitle: "",
      pickerColumns: [],
      showPicker: false,
      idTypeArr: [], //证件类型数组
      DoctorArr: [], //医保类型数组
      handRoundArr: [], //手环编号数组
    };
  },
  //组件创建完成时
  created() {
    // debugger;
    let pThis = this;
    // this.codeGet();
    let codes = {
      code: [
        "JB002_0xx",
        "JB003_0xx",
        "JB005_0xx",
        "JB006_0xx",
        "DQ008_0xx",
        "YBLX",
        "AGEUNITS",
        "CARFOLLOWING",
        "AMBULANCE",
        "FOLLOWNURSE",
        "WHCD",
        "JTSR",
        "JB004_0xx",
        "ATTACK_ZONE",
        "HOSPITAL",
        "STROKE003_ZZ",
        "STROKE004_LYFS",
        "STROKE005_RYKS",
        "STROKE055_CCDW",
        "YJJB",
        "TC01_MPDS",
      ],
    };
    let oneCode = [{ pk_defdoclist: "0001A0100000004JCWC8" }];
    getDefdocViewByCodes(codes).then((res) => {
      // debugger;
      console.log(res);
      //   获取到证件类型集合
      pThis.idTypeArr = res.results[0].JB005_0xx;
      // 获取到医保类型集合
      pThis.DoctorArr = res.results[0].YBLX;
      //   console.log(pThis.DoctorArr);
    });
    queryAllDefdoc(oneCode).then((res) => {
      console.log(res);
      // 获取手环编号集合
      pThis.handRoundArr = res.results;
      console.log(pThis.handRoundArr, "是否能够成功取得数据");
    });
  },
  methods: {
    onClickRight() {
      console.log(111);
    },
    choosely(n, value) {
      if (this.chooseAfterValue.indexOf(value) != -1) {
        this.chooseAfterValue.splice(this.chooseAfterValue.indexOf(value), 1);
      } else {
        this.chooseAfterValue.push(value);
      }
    },
    choosedata(param) {
      this.value[param.field].time = param.time;
      // 将时间组件隐掉
      this.isShow = !this.isShow;
    },
    // 到达本院大门
    choosedata1(param) {
      this.value[param.field].door = param.time;
      // 将时间组件隐掉
      this.isShow1 = !this.isShow1;
    },
    // 首次接触医疗
    choosedata2(param) {
      this.value[param.field].touch = param.time;
      // 将时间组件隐掉
      this.isShow2 = !this.isShow2;
    },
    handleShowPicker(val) {
      console.log(this.DoctorArr);
      //每次执行点击事件都要对pickerColumns进行清空
      this.pickerColumns = [];
      this.showPicker = true;
      if (val == "idType") {
        this.pickerTitle = "证件类型";
        // 对象数组，配置每一列显示的数据
        // 加一个for循环，将idType的每一项加入到pickerColumns里
        for (var i = 0; i < this.idTypeArr.length; i++) {
          this.pickerColumns.push(this.idTypeArr[i].name);
        }
      } else if (val == "medical") {
        // debugger;
        this.pickerTitle = "医保类型";
        for (var i = 0; i < this.DoctorArr.length; i++) {
          console.log(this.DoctorArr[i].name);
          this.pickerColumns.push(this.DoctorArr[i].name);
        }
        console.log(this.pickerColumns);
      } else if (val == "number") {
        this.pickerTitle = "手环编号";
        for (var i = 0; i < this.handRoundArr.length; i++) {
          console.log(this.handRoundArr[i].code);
          this.pickerColumns.push(this.handRoundArr[i].code);
        }
        console.log(this.pickerColumns);
      }
    },
    // 点击确定按钮，将在下拉框选中的值赋给radio1的idType，将其显示在页面中
    onConfirmPicker(values) {
      if (this.$refs.pickerRef.title == "证件类型") {
        this.value.radio1.idType = values;
      } else if (this.$refs.pickerRef.title == "医保类型") {
        this.value.radio1.medical = values;
      } else if (this.$refs.pickerRef.title == "手环编号") {
        this.value.radio1.number = values;
      }
      this.showPicker = false;
    },
    save() {
      console.log("点击输入字段内容");
      console.log(this.value.radio1);
      console.log("输出内容是否正确");
    },
  },
};
</script>
