<template>
  <div class="view">
    <div class="nav">
      <headerCom>
        <van-icon slot="left" name="arrow-left" @click="$router.back()" />
        <span>检查信息</span>
      </headerCom>
      <div class="tabbar">
        <div @click="curId_tab1 = 0" :class="{ curr: true, cur: curId_tab1 === 0 }">心电图</div>
        <div @click="curId_tab1 = 1" :class="{ curr: true, cur: curId_tab1 === 1 }">实验室检查</div>
      </div>
    </div>
    <div class="content">
      <!-- 心电图 -->
      <div v-show="curId_tab1 === 0" class="xindiantu">
        <!-- <ul class="xindiantu_top">
          <router-link tag="li" to="/" v-for="item in list" :key="item._id">
            <img :src="'../../static/img/' + item._id + '.png'" alt />
            <span>{{ item.title }}</span>
          </router-link>
        </ul>-->
        <ul class="xindiantu_top">
          <li class="one">采集心电图</li>
          <li class="two">查看心电图</li>
          <li class="three">打印</li>
          <li class="four">微信分享</li>
          <li class="five">拍照上传</li>
          <li class="six">提取</li>
        </ul>
        <van-cell-group>
          <van-field label="心电图" readonly>
            <template slot="right-icon">
              <van-radio-group v-model="value.xindiantu.xindiantu1" direction="horizontal">
                <van-radio name="1">是</van-radio>
                <van-radio name="2">否</van-radio>
              </van-radio-group>
            </template>
          </van-field>
          <!-- 心电图选择是 -->
          <div v-show="value.xindiantu.xindiantu1 == 1">
            <van-cell-group>
              <van-field
                v-model="value.xindiantu.time1"
                label="心电图采集"
                placeholder="选择时间"
                input-align="right"
              >
                <template slot="right-icon">
                  <van-icon name="arrow" @click="isShow = !isShow" />
                  <datetimepicker :field="'xindiantu'" :is-show="isShow" @choosedata="choosedata"></datetimepicker>
                </template>
              </van-field>
              <van-field
                v-model="value.xindiantu.time2"
                label="心电图诊断"
                placeholder="选择时间"
                input-align="right"
              >
                <template slot="right-icon">
                  <van-icon name="arrow" @click="isShow1 = !isShow1" />
                  <datetimepicker :field="'xindiantu'" :is-show="isShow1" @choosedata="choosedata1"></datetimepicker>
                </template>
              </van-field>
              <van-field label="远程心电图传输" readonly label-width="200px">
                <template slot="right-icon">
                  <van-radio-group v-model="value.xindiantu.chuanshu" direction="horizontal">
                    <van-radio name="1">是</van-radio>
                    <van-radio name="2">否</van-radio>
                  </van-radio-group>
                </template>
              </van-field>
              <!-- 远程心电图传输 选择 是 -->
              <div v-show="value.xindiantu.chuanshu == 1">
                <van-field
                  v-model="value.xindiantu.time3"
                  label="接收心电图"
                  placeholder="选择时间"
                  input-align="right"
                >
                  <template slot="right-icon">
                    <van-icon name="arrow" @click="isShow2 = !isShow2" />
                    <datetimepicker
                      :field="'xindiantu'"
                      :is-show="isShow2"
                      @choosedata="choosedata2"
                    ></datetimepicker>
                  </template>
                </van-field>
                <van-field
                  :value="value.xindiantu.fangshi"
                  label="传输方式"
                  input-align="right"
                  clickable
                >
                  <template slot="right-icon">
                    <van-icon name="arrow" @click="handleShowPicker('fangshi')" />
                  </template>
                </van-field>
                <!-- 下拉框弹窗 -->
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
              <van-field
                v-model="value.xindiantu.jieguo"
                rows="2"
                autosize
                label="心电图诊断结论"
                type="textarea"
                placeholder="点击输入多行文本"
                label-width="60px"
              />
            </van-cell-group>
          </div>
        </van-cell-group>
      </div>
      <!-- 实验室检查 -->
      <div v-show="curId_tab1 === 1">
        <van-cell-group>
          <van-field label="肌钙蛋白检查" readonly>
            <template slot="right-icon">
              <van-checkbox-group v-model="value.jiancha.result" direction="horizontal">
                <van-checkbox name="a" shape="square">首次</van-checkbox>
                <van-checkbox name="b" shape="square">第二次</van-checkbox>
                <van-checkbox name="c" shape="square">第三次</van-checkbox>
              </van-checkbox-group>
            </template>
          </van-field>
          <van-field label="肌钙蛋白" readonly required>
            <template slot="right-icon">
              <van-radio-group v-model="value.jiancha.jigaidanbai2" direction="horizontal">
                <van-radio name="1">是</van-radio>
                <van-radio name="2">否</van-radio>
              </van-radio-group>
            </template>
          </van-field>
          <!-- 肌钙蛋白选择是 -->
          <div v-show="value.jiancha.jigaidanbai2 == 1">
            <van-cell-group>
              <van-field label="首次肌钙蛋白" readonly required>
                <template slot="right-icon">
                  <van-radio-group v-model="value.jiancha.shouci" direction="horizontal">
                    <van-radio name="1">TnT</van-radio>
                    <van-radio name="2">TnI</van-radio>
                  </van-radio-group>
                </template>
              </van-field>
              <van-field label="数值" required v-model="value.jiancha.jGNumber" input-align="right">
                <template slot="right-icon">
                  <select style="width:100px;" v-model="value.jiancha.shuzhi1">
                    <option value>ug/L</option>
                    <option value="1">ng/mL</option>
                    <option value="2">ng/L</option>
                    <option value="3">pg/mL</option>
                    <option value="3">mg/L</option>
                  </select>
                  <select style="width:100px" v-model="value.jiancha.shuzhi2">
                    <option value>请选择</option>
                    <option value="1">阳性</option>
                    <option value="2">阴性</option>
                  </select>
                </template>
              </van-field>
              <van-field
                v-model="value.jiancha.time1"
                label="首次抽血完成"
                placeholder="选择时间"
                input-align="right"
                required
              >
                <template slot="right-icon">
                  <van-icon name="arrow" @click="isShow3 = !isShow3" />
                  <datetimepicker :field="'jiancha'" :is-show="isShow3" @choosedata="choosedata3"></datetimepicker>
                </template>
              </van-field>
              <van-field
                v-model="value.jiancha.time2"
                label="首次获得报告"
                placeholder="选择时间"
                input-align="right"
                required
              >
                <template slot="right-icon">
                  <van-icon name="arrow" @click="isShow4 = !isShow4" />
                  <datetimepicker :field="'jiancha'" :is-show="isShow4" @choosedata="choosedata4"></datetimepicker>
                </template>
              </van-field>
            </van-cell-group>
          </div>
          <!-- 血清肌酐 -->
          <van-field label="血清肌酐" readonly required>
            <template slot="right-icon">
              <van-radio-group v-model="value.jiancha.xueqing" direction="horizontal">
                <van-radio name="1">是</van-radio>
                <van-radio name="2">否</van-radio>
              </van-radio-group>
            </template>
          </van-field>
          <div v-show="value.jiancha.xueqing == 1">
            <van-cell-group>
              <van-field label="数值" required v-model="value.jiancha.shuzhi3" input-align="right">
                <template slot="extra">umol/L</template>
              </van-field>
            </van-cell-group>
          </div>
          <!-- D-二聚体 -->
          <van-field label="D-二聚体" required>
            <template slot="right-icon">
              <van-radio-group v-model="value.jiancha.erjuti" direction="horizontal">
                <van-radio name="1">是</van-radio>
                <van-radio name="2">否</van-radio>
              </van-radio-group>
            </template>
          </van-field>
          <div v-show="value.jiancha.erjuti == 1">
            <van-cell-group>
              <van-field label="数值" required v-model="value.jiancha.DNumber" input-align="right">
                <template slot="right-icon">
                  <select style="width:100px;" v-model="value.jiancha.shuzhi4">
                    <option value="1">ug/L</option>
                    <option value="2">ng/mL</option>
                    <option value="3">ug/L</option>
                    <option value="4">mg/L</option>
                  </select>
                </template>
              </van-field>
            </van-cell-group>
          </div>
          <!-- BNP -->
          <van-field label="BNP" readonly required>
            <template slot="right-icon">
              <van-radio-group v-model="value.jiancha.BNP" direction="horizontal">
                <van-radio name="1">是</van-radio>
                <van-radio name="2">否</van-radio>
              </van-radio-group>
            </template>
          </van-field>
          <div v-show="value.jiancha.BNP == 1">
            <van-cell-group>
              <van-field label="数值" required v-model="value.jiancha.shuzhi5" input-align="right">
                <template slot="extra">pg/mL</template>
              </van-field>
            </van-cell-group>
          </div>
          <!-- NT-proBNP -->
          <van-field label="NT-proBNP" readonly required>
            <template slot="right-icon">
              <van-radio-group v-model="value.jiancha.proBNP" direction="horizontal">
                <van-radio name="1">是</van-radio>
                <van-radio name="2">否</van-radio>
              </van-radio-group>
            </template>
          </van-field>
          <div v-show="value.jiancha.proBNP == 1">
            <van-cell-group>
              <van-field label="数值" required v-model="value.jiancha.shuzhi6" input-align="right">
                <template slot="extra">pg/mL</template>
              </van-field>
            </van-cell-group>
          </div>
          <!-- Myo -->
          <van-field label="Myo" readonly required>
            <template slot="right-icon">
              <van-radio-group v-model="value.jiancha.Myo" direction="horizontal">
                <van-radio name="1">是</van-radio>
                <van-radio name="2">否</van-radio>
              </van-radio-group>
            </template>
          </van-field>
          <div v-show="value.jiancha.Myo == 1">
            <van-cell-group>
              <van-field label="数值" required v-model="value.jiancha.mNumber" input-align="right">
                <template slot="right-icon">
                  <select style="width:100px;" v-model="value.jiancha.shuzhi7">
                    <option value="1">ng/mL</option>
                    <option value="2">ug/L</option>
                  </select>
                </template>
              </van-field>
            </van-cell-group>
          </div>
          <!-- CKMB -->
          <van-field label="CKMB" readonly required>
            <template slot="right-icon">
              <van-radio-group v-model="value.jiancha.CKMB" direction="horizontal">
                <van-radio name="1">是</van-radio>
                <van-radio name="2">否</van-radio>
              </van-radio-group>
            </template>
          </van-field>
          <div v-show="value.jiancha.CKMB == 1">
            <van-cell-group>
              <van-field label="数值" required v-model="value.jiancha.cNumber" input-align="right">
                <template slot="right-icon">
                  <select style="width:100px;" v-model="value.jiancha.shuzhi8">
                    <option value="1">ng/mL</option>
                    <option value="2">ug/L</option>
                    <option value="3">u/L</option>
                  </select>
                </template>
              </van-field>
            </van-cell-group>
          </div>
        </van-cell-group>
      </div>
    </div>
    <div class="tiqu">提取</div>

    <div class="footer">
      <van-button round color="#4676FB" size="large" @click="saveRelativeDate">保存</van-button>
    </div>
  </div>
</template>
<style scoped lang="scss">
@import url("../assets/css/base.scss");
.xt-right {
  width: 26px;
}
.view {
  position: relative;
  height: 100%;
  .tabbar {
    text-align: center;
    font-weight: 550;
    font-size: 14px;
    height: 30px;
    line-height: 30px;
    background-color: #fff;
    border-bottom: 1px solid #000;
    display: flex;
    // justify-content: space-around;
    .curr {
      flex: 1;
    }
    .cur {
      color: #3a5ba4;
      border-bottom: 1px solid #3a5ba4;
    }
  }
}
.content {
  position: absolute;
  top: 71px;
  bottom: 50px;
  left: 0px;
  right: 0px;
  overflow: scroll;
  .xindiantu_top {
    display: flex;
    flex-wrap: wrap;
    li {
      box-sizing: border-box;
      background-color: #fff;
      width: 25%;
      flex: auto;
      margin: 10px 5px;
      padding: 8px 0 5px 30px;
      display: flex;
      align-items: center;
      img {
        width: 15%;
      }
      span {
        font-size: 14px;
        padding-left: 10px;
      }
    }
  }
}
.tiqu {
  width: 40px;
  height: 40px;
  text-align: center;
  line-height: 40px;
  border-radius: 50%;
  background-color: #3a5ba4;
  position: fixed;
  bottom: 100px;
  right: 0;
  font-size: 12px;
  color: #fff;
}
.one {
  background: url("../../src/assets/static/img/collectheart.png") no-repeat left
    15px;
  height: 42px;
  line-height: 42px;
  padding-left: 25px;
}
.two {
  background: url("../../src/assets/static/img/checkHeart.png") no-repeat left
    12px;
  height: 42px;
  line-height: 42px;
}
.three {
  background: url("../../src/assets/static/img/print.png") no-repeat left 12px;
  height: 42px;
  line-height: 42px;
}
.four {
  background: url("../../src/assets/static/img/weixinshare.png") no-repeat left
    12px;
  height: 42px;
  line-height: 42px;
}
.five {
  background: url("../../src/assets/static/img/collectheart.png") no-repeat left
    12px;
  height: 42px;
  line-height: 42px;
}
</style>
<script>
import headerCom from "../components/Header.vue";
// 引入时间组件
import datetimepicker from "../components/Datetimepicker.vue";
// 引入传输方式的封装的接口
import { getDefdocViewByCodes } from "../api/index";
export default {
  components: { headerCom, datetimepicker },
  data() {
    return {
      curId_tab1: 0, //tab页内容
      list: [
        //图片
        { title: "采集心电图", _id: 1 },
        { title: "查看心电图", _id: 2 },
        { title: "打印", _id: 3 },
        { title: "微信分享", _id: 4 },
        { title: "拍照上传", _id: 5 },
        { title: "提取", _id: 6 },
      ],
      value: {
        xindiantu: {
          //心电图
          xindiantu1: "1",
          time1: "",
          time2: "",
          chuanshu: "",
          time3: "",
          fangshi: "",
          jieguo: "",
        },
        jiancha: {
          //实验室检查
          jigaidanbai1: "",
          jigaidanbai2: "", //肌钙蛋白
          result: [],
          shuzhi1: "",
          shuzhi2: "",
          jGNumber: "", //肌钙蛋白的数值
          time1: "",
          time2: "",
          xueqing: "", //血清肌酐
          shuzhi3: "",
          DNumber: "", //D-二聚体的数值
          erjuti: "", //D-二聚体
          shuzhi4: "1",
          BNP: "", //BNP
          shuzhi5: "",
          proBNP: "", //NT-proBNP
          shuzhi: "",
          Myo: "", //Myo
          mNumber: "", //Myo的数值
          shuzhi7: "1",
          CKMB: "", //CKMB
          cNumber: "", //CKMB的数值
          shuzhi8: "1",
        },
      },

      //日历组件显隐
      isShow: false, //心电图采集时间
      isShow1: false, //心电图诊断时间
      isShow2: false, //接受心电图时间
      isShow3: false, //首次抽血完成时间
      isShow4: false, //首次获得报告时间

      //下拉框弹窗的参数
      showPicker: false, //下拉框参数的显隐
      pickerTitle: "", //下拉框弹窗的标题
      pickerColumns: [], //对象数组，配置每一列显示的数据
      transmission: [], //临时存储传输方式数据
    };
  },
  //在组件创建完成时完成数据请求的操作
  created() {
    let pThis = this;
    let codes = {
      code: [
        "IS_REMOTE_ECGTRAN",
        "XT_ZD001",
        "KILLIPES",
        "ANTICOAGULATION",
        "RISK_LAMINATION",
        "ROUTE",
        "INTRACAVITY_IMAGE",
        "JGDBDW",
        "CT_STATUS",
        "XZCD",
        "TIMI_LEVEL",
        "BRACKET_NUM",
        "ddimer_unit",
        "myo",
        "ckmb",
        "aspirin",
        "clopidogrel",
        "ticagrelo",
      ],
    };
    getDefdocViewByCodes(codes).then((res) => {
      console.log("是否执行");
      console.log(res);
      //   获取到证件类型集合
      pThis.transmission = res.results[0].IS_REMOTE_ECGTRAN;
      console.log(pThis.transmission, "打印出来了");
    });
  },
  methods: {
    handleShowPicker(val) {
      //console.log(this.DoctorArr);
      //每次执行点击事件都要对pickerColumns进行清空
      this.pickerColumns = [];
      this.showPicker = true;
      if (val == "fangshi") {
        this.pickerTitle = "传输方式";
        // 对象数组，配置每一列显示的数据
        // 加一个for循环，将idType的每一项加入到pickerColumns里
        for (var i = 0; i < this.transmission.length; i++) {
          this.pickerColumns.push(this.transmission[i].name);
          console.log(this.pickerColumns, "是否为一个数组");
        }
      }
    },
    // 点击确定按钮，将在下拉框选中的值赋给radio1的idType，将其显示在页面中
    onConfirmPicker(values) {
      if (this.$refs.pickerRef.title == "传输方式") {
        this.value.xindiantu.fangshi = values;
      }
      this.showPicker = false;
    },
    // 图片接口 函数
    // 参数 ： 索引值
    diaojiekou(id) {
      console.log("心电图" + id);
    },
    choosedata(param) {
      //将子组件里的时间赋值给父组件的value.radio.time
      //console.log(param.field);
      this.value[param.field].time1 = param.time;
      // 将时间组件隐掉
      this.isShow = !this.isShow;
    },
    choosedata1(param) {
      this.value[param.field].time2 = param.time;
      // 将时间组件隐掉
      this.isShow1 = !this.isShow1;
    },
    choosedata2(param) {
      this.value[param.field].time3 = param.time;
      // 将时间组件隐掉
      this.isShow2 = !this.isShow2;
    },
    choosedata3(param) {
      this.value[param.field].time1 = param.time;
      // 将时间组件隐掉
      this.isShow3 = !this.isShow3;
    },
    choosedata4(param) {
      this.value[param.field].time2 = param.time;
      // 将时间组件隐掉
      this.isShow4 = !this.isShow4;
    },
    // 参数是否能够打印出来
    saveRelativeDate() {
      console.log("该函数是否执行");
      console.log(this.value.xindiantu, "心电图相关字段");
      console.log(this.value.jiancha, "实验室检查相关字段");
      console.log("函数执行完成");
    },
  },
};
</script>
