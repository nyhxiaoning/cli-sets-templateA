<template>
  <div class="view">
    <div class="nav">
      <headerCom>
        <van-icon slot="left" name="arrow-left" @click="$router.back()" />
        <span>患者转归</span>
      </headerCom>
      <!-- 顶部tab页 -->
      <div class="tabbar">
        <div v-if="tabFlag1" class="tab">
          <div @click="curId_tab1=0" :class="{'curr':true ,'cur':curId_tab1===0}">基本信息</div>
          <div @click="curId_tab1=1" :class="{'curr':true , 'cur':curId_tab1===1}">住院用药</div>
          <div @click="curId_tab1=2" :class="{'curr':true , 'cur':curId_tab1===2}">出院信息</div>
        </div>
        <div v-if="tabFlag2" class="tab">
          <div @click="curId_tab2=0" :class="{'curr':true ,'cur':curId_tab2===0}">基本信息</div>
          <div @click="curId_tab2=1" :class="{'curr':true ,'cur':curId_tab2===1}">危险因素</div>
          <div @click="curId_tab2=2" :class="{'curr':true ,'cur':curId_tab2===2}">合并疾病</div>
          <div @click="curId_tab2=3" :class="{'curr':true ,'cur':curId_tab2===3}">检查结果</div>
          <div @click="curId_tab2=4" :class="{'curr':true ,'cur':curId_tab2===4}">住院用药</div>
        </div>
      </div>
    </div>
    <div class="content">
      <!-- 基本信息 -->
      <div v-show="tabFlag1? curId_tab1===0 : false">
        <!-- 出院诊断7个按钮 -->
        <div>
          <van-cell-group>
            <van-field label="出院诊断" readonly required style="display: block; ">
              <template slot="input">
                <van-radio-group
                  v-model="allradio"
                  direction="horizontal"
                  v-for="(val,index) in list"
                  :key="index"
                >
                  <van-radio :name="index+1" @click="clickBtn(index+1)">{{val.title}}</van-radio>
                </van-radio-group>
              </template>
            </van-field>
          </van-cell-group>
        </div>
        <!-- STEMI, NTEMI, UA  -->
        <!-- <div v-show="valueFlag1">
                    1111111111111111111111111111
        </div>-->
        <!-- 主动脉夹层 肺动脉栓塞 -->
        <div v-if="valueFlag2">
          <van-cell-group>
            <van-field
              v-model="value.radio4.time"
              label="确诊时间"
              placeholder="选择时间"
              input-align="right"
              readonly
              required
            >
              <template slot="right-icon">
                <van-icon name="arrow" @click="isShow = !isShow" />
                <datetimepicker :field="'radio4'" :is-show="isShow" @choosedata="choosedata"></datetimepicker>
              </template>
            </van-field>
          </van-cell-group>                              
        </div>
        <!-- 心源性胸痛 -->
        <div v-if="valueFlag3">
          <van-cell-group>
            <van-field
              v-model="value.radio6.time"
              label="确诊时间"
              placeholder="选择时间"
              input-align="right"
              readonly
            >
              <template slot="right-icon">
                <van-icon name="arrow" @click="isShow = !isShow" />
                <datetimepicker :field="'radio6'" :is-show="isShow" @choosedata="choosedata"></datetimepicker>
              </template>
            </van-field>
            <van-field
              v-model="value.radio6.noacs"
              label="心源性胸痛类型"
              readonly
              required
              label-width="200px"
              style="display: block;"
            >
              <template slot="input">
                <div class="anniu">
                  <div
                    class="no_rulesbtn"
                    :class="{no_rulesbtn2:chooseAfterValue.indexOf( item.text )!=-1}"
                    v-for="(item,index) in lyList2"
                    :key="index"
                    @click="choosely(index, item.text)"
                  >
                    <span>{{item.text}}</span>
                  </div>
                </div>
              </template>
            </van-field>
          </van-cell-group>
        </div>
        <!-- 其它非心源性胸痛 -->
        <div v-if="valueFlag4">
          <van-cell-group>
            <van-field
              v-model="value.radio7.time"
              label="确诊时间"
              placeholder="选择时间"
              input-align="right"
              readonly
              required
            >
              <template slot="right-icon">
                <van-icon name="arrow" @click="isShow = !isShow" />
                <datetimepicker :field="'radio7'" :is-show="isShow" @choosedata="choosedata"></datetimepicker>
              </template>
            </van-field>
            <van-field
              v-model="value.radio7.noxinyx"
              label="其它非心源性胸痛类型"
              readonly
              required
              label-width="200px"
              style="display: block;"
            >
              <template slot="input">
                <div class="anniu">
                  <div
                    class="no_rulesbtn"
                    :class="{no_rulesbtn2:chooseAfterValue.indexOf( item.text )!=-1}"
                    v-for="(item,index) in lyList3"
                    :key="index"
                    @click="choosely(index, item.text)"
                  >
                    <span>{{item.text}}</span>
                  </div>
                </div>
              </template>
            </van-field>
          </van-cell-group>
        </div>
      </div>
      <!-- 住院用药 -->
      <div v-show="curId_tab1===1 || curId_tab2===4">
        <van-cell-group>
          <van-field label="降糖药物" readonly>
            <template slot="right-icon">
              <van-radio-group v-model="medication.jiangtang" direction="horizontal">
                <van-radio name="1">是</van-radio>
                <van-radio name="0">否</van-radio>
              </van-radio-group>
            </template>
          </van-field>
          <div v-show="medication.jiangtang==1">
            <van-field label="药物名称" readonly style="display: block;">
              <template slot="input">
                <div class="anniu">
                  <div
                    class="no_rulesbtn"
                    :class="{no_rulesbtn2:chooseAfterValue.indexOf( item.text )!=-1}"
                    v-for="(item,index) in zyList"
                    :key="index"
                    @click="choosely(index, item.text)"
                  >
                    <span>{{item.text}}</span>
                  </div>
                </div>
              </template>
            </van-field>
          </div>
          <van-field label="口服抗凝药物" readonly>
            <template slot="right-icon">
              <van-radio-group v-model="medication.koufukang" direction="horizontal">
                <van-radio name="1">是</van-radio>
                <van-radio name="0">否</van-radio>
              </van-radio-group>
            </template>
          </van-field>
          <div v-show="medication.koufukang==1">
            <van-field label="药物名称" readonly style="display: block;">
              <template slot="input">
                <label v-for="(item, index) in radioData1" :key="index">
                  <input type="radio" v-model="radioname1" :value="item.name" />
                  {{item.name}}
                </label>
              </template>
            </van-field>
          </div>
          <van-field label="PCSK9" readonly>
            <template slot="right-icon">
              <van-radio-group v-model="medication.PCSK9" direction="horizontal">
                <van-radio name="1">是</van-radio>
                <van-radio name="0">否</van-radio>
              </van-radio-group>
            </template>
          </van-field>
          <div v-show="medication.PCSK9==1">
            <van-field label="药物名称" readonly>
              <template slot="right-icon">
                <van-radio-group v-model="medication.PCSK9yaowu" direction="horizontal">
                  <van-radio name="1">阿利西尤单抗</van-radio>
                  <van-radio name="2">依洛尤单抗</van-radio>
                </van-radio-group>
              </template>
            </van-field>
            <van-field label="单次剂量" v-model="medication.jiliang" input-align="right">
              <template slot="extra">mg</template>
            </van-field>
          </div>
        </van-cell-group>
      </div>
      <!-- 出院信息 -->
      <div v-show="curId_tab1===2">
        <van-cell-group>
          <van-field label="住院天数" v-model="chuyuanxinxi.tianshu" input-align="right" required>
            <template slot="extra">天</template>
          </van-field>
          <van-field label="总费用" v-model="chuyuanxinxi.feiyong" input-align="right" required>
            <template slot="extra">元</template>
          </van-field>
          <van-field label="出院或30天转归" readonly style="display: block;" required label-width="200px">
            <template slot="input">
              <van-radio-group v-model="chuyuanxinxi.zhuangui" direction="horizontal">
                <van-radio name="1">出院</van-radio>
                <van-radio name="2">转送其它医院</van-radio>
                <van-radio name="3">院内继续救治</van-radio>
                <van-radio name="4">死亡</van-radio>
              </van-radio-group>
            </template>
          </van-field>
          <!-- 出院 -->
          <div v-show="chuyuanxinxi.zhuangui==1">
            <van-cell-group>
              <van-field label="离院宣教" readonly style="display: block;">
                <template slot="input">
                  <div class="anniu">
                    <div
                      class="no_rulesbtn"
                      :class="{no_rulesbtn2:chooseAfterValue.indexOf( item.text )!=-1}"
                      v-for="(item,index) in cyList"
                      :key="index"
                      @click="choosely(index, item.text)"
                    >
                      <span>{{item.text}}</span>
                    </div>
                  </div>
                </template>
              </van-field>
              <!-- 出院时间 -->
              <van-field
                label="出院时间"
                v-model="chuyuanxinxi.chuyuan.time"
                readonly
                required
                placeholder="选择时间"
                input-align="right"
              >
                <template slot="right-icon">
                  <!-- <van-icon name="arrow" /> -->
                  <van-icon name="arrow" @click="isShow1 = !isShow1" />
                  <datetimepicker
                    :field1="'chuyuanxinxi'"
                    :field="'chuyuan'"
                    :field3="'time'"
                    :is-show="isShow1"
                    @choosedata="chuyuan"
                  ></datetimepicker>
                </template>
              </van-field>

              <!-- <van-field
                  v-model="value.radio8.time"
                  label="传输心电图"
                  placeholder="选择时间"
                  input-align="right"
                  readonly
                >
                  <template slot="right-icon">
                    <van-icon name="arrow" @click="isShow8 = !isShow8" />
                    <datetimepicker :field="'radio8'" :is-show="isShow8" @choosedata="choosedata8"></datetimepicker>
                  </template>
              </van-field>-->

              <van-field label="治疗结果" readonly style="display: block;">
                <template slot="right-icon">
                  <van-radio-group
                    v-model="chuyuanxinxi.chuyuan.jieguo"
                    direction="horizontal"
                    style="margin-left:-"
                  >
                    <van-radio name="1">治愈</van-radio>
                    <van-radio name="2">好转</van-radio>
                    <van-radio name="3">自动离院</van-radio>
                    <van-radio name="4">其它原因离院</van-radio>
                  </van-radio-group>
                </template>
              </van-field>

              <!-- <van-field label="随访周期" readonly style="display: block;">
                <template slot="button">
                  <van-radio-group v-model="chuyuanxinxi.chuyuan.zhouqi" direction="horizontal">
                    <van-radio name="1">出院一个月</van-radio>
                    <van-radio name="2">出院三个月</van-radio>
                    <van-radio name="3">出院六个月</van-radio>
                    <van-radio name="4">出院一年</van-radio>
                  </van-radio-group>
                </template>
              </van-field>-->

              <van-field label="随访周期" readonly style="display: block;" required>
                <template slot="input">
                  <van-radio-group v-model="chuyuanxinxi.chuyuan.zhouqi" direction="horizontal">
                    <van-radio name="1">出院一个月</van-radio>
                    <van-radio name="2">出院三个月</van-radio>
                    <van-radio name="3">出院六个月</van-radio>
                    <van-radio name="4">出院一年</van-radio>
                  </van-radio-group>
                </template>
              </van-field>

              <div
                v-show="chuyuanxinxi.chuyuan.zhouqi==1 || chuyuanxinxi.chuyuan.zhouqi==2 || chuyuanxinxi.chuyuan.zhouqi==3 || chuyuanxinxi.chuyuan.zhouqi==4"
              >
                <div v-if="chuyuanxinxi.chuyuan.zhouqi==1">出院一个月</div>
                <div v-else-if="chuyuanxinxi.chuyuan.zhouqi==2">出院三个月</div>
                <div v-else-if="chuyuanxinxi.chuyuan.zhouqi==3">出院六个月</div>
                <div v-else-if="chuyuanxinxi.chuyuan.zhouqi==4">出院一年</div>
                <van-cell-group>
                  <van-field label="随访方式" readonly>
                    <template slot="right-icon">
                      <van-icon name="arrow" />
                    </template>
                  </van-field>
                  <van-field label="随访模板" readonly>
                    <template slot="right-icon">
                      <van-icon name="arrow" />
                    </template>
                  </van-field>
                  <van-field label="随访医生" readonly>
                    <template slot="right-icon">
                      <van-icon name="arrow" />
                    </template>
                  </van-field>
                </van-cell-group>
              </div>
              <van-field
                label="患者情况备注"
                v-model="chuyuanxinxi.chuyuan.beizhu"
                placeholder="点击输入文本"
                input-align="right"
              ></van-field>
            </van-cell-group>
          </div>
          <!-- 转送其它医院 -->
          <div v-show="chuyuanxinxi.zhuangui==2">
            <van-cell-group>
              <!-- <van-field label="车辆" readonly>
                <template slot="right-icon">
                  <van-icon name="arrow" />
                </template>
              </van-field>-->

              <van-field
                v-model="applyForm.cars"
                label="车辆"
                ref="cars"
                input-align="right"
                clickable
              >
                <template slot="right-icon">
                  <van-icon name="arrow" @click="handleShowPicker('cars')" />
                </template>
              </van-field>
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

              <van-field label="离院宣教" readonly style="display: block;">
                <template slot="input">
                  <div class="anniu">
                    <div
                      class="no_rulesbtn"
                      :class="{no_rulesbtn2:chooseAfterValue.indexOf( item.text )!=-1}"
                      v-for="(item,index) in cyList"
                      :key="index"
                      @click="choosely(index, item.text)"
                    >
                      <span>{{item.text}}</span>
                    </div>
                  </div>
                </template>
              </van-field>

              <van-field
                v-model="value.radio2.time"
                label="离开本院大门"
                placeholder="选择时间"
                input-align="right"
                readonly
              >
                <template slot="right-icon">
                  <van-icon name="arrow" @click="isShow2 = !isShow2" />
                  <datetimepicker :field="'radio2'" :is-show="isShow2" @choosedata="choosedata2"></datetimepicker>
                </template>
              </van-field>
              <van-field
                label="医院名称"
                v-model="chuyuanxinxi.zhuanyuan.yiyuanname"
                placeholder="点击输入文本"
                input-align="right"
              ></van-field>
              <van-field label="网络医院" readonly>
                <template slot="right-icon">
                  <van-radio-group
                    v-model="chuyuanxinxi.zhuanyuan.wangluoyiyuan"
                    direction="horizontal"
                  >
                    <van-radio name="1">是</van-radio>
                    <van-radio name="0">否</van-radio>
                  </van-radio-group>
                </template>
              </van-field>
              <van-field label="转运PCI" readonly>
                <template slot="right-icon">
                  <van-radio-group v-model="lists.is_trans_pci" direction="horizontal">
                    <van-radio name="1">是</van-radio>
                    <van-radio name="0">否</van-radio>
                  </van-radio-group>
                </template>
              </van-field>
              <div v-show="lists.is_trans_pci==1">
                <van-field label="直达导管室" readonly>
                  <template slot="right-icon">
                    <van-radio-group
                      v-model="chuyuanxinxi.zhuanyuan.daoguanshi"
                      direction="horizontal"
                    >
                      <van-radio name="1">是</van-radio>
                      <van-radio name="0">否</van-radio>
                    </van-radio-group>
                  </template>
                </van-field>
                <!-- 实际介入手术 -->
                <van-field
                  v-model="lists.decision_operation_time"
                  label="实际介入手术"
                  placeholder="选择时间"
                  input-align="right"
                  readonly
                >
                <template slot="right-icon">
                    <van-icon name="arrow" @click="isShow3 = !isShow3" />
                    <datetimepicker :field="'radio3'" :is-show="isShow3" @choosedata="choosedata3"></datetimepicker>
                  </template>
                </van-field>

                <van-field
                  v-model="value.radio5.time"
                  label="导丝通过时间"
                  placeholder="选择时间"
                  input-align="right"
                  readonly
                >
                  <template slot="right-icon">
                    <van-icon name="arrow" @click="isShow5 = !isShow5" />
                    <datetimepicker :field="'radio5'" :is-show="isShow5" @choosedata="choosedata5"></datetimepicker>
                  </template>
                </van-field>
              </div>
              <van-field label="传输心电图至协作单位（转出患者）" readonly required label-width="230px">
                <template slot="right-icon">
                  <van-radio-group
                    v-model="chuyuanxinxi.zhuanyuan.xindiantu"
                    direction="horizontal"
                  >
                    <van-radio name="1">是</van-radio>
                    <van-radio name="0">否</van-radio>
                  </van-radio-group>
                </template>
              </van-field>
              <div v-show="chuyuanxinxi.zhuanyuan.xindiantu==1">
                <!-- <van-field label="传输心电图" readonly placeholder="选择时间" input-align="right">
                  <template slot="right-icon">
                    <van-icon name="arrow" />
                  </template>
                </van-field>-->

                <van-field
                  v-model="value.radio8.time"
                  label="传输心电图"
                  placeholder="选择时间"
                  input-align="right"
                  readonly
                >
                  <template slot="right-icon">
                    <van-icon name="arrow" @click="isShow8 = !isShow8" />
                    <datetimepicker :field="'radio8'" :is-show="isShow8" @choosedata="choosedata8"></datetimepicker>
                  </template>
                </van-field>

                <van-field label="传输方式" readonly>
                  <template slot="right-icon">
                    <van-radio-group
                      v-model="lists.trans_way"
                      direction="horizontal"
                    >
                      <van-radio name="1">实时监控</van-radio>
                      <van-radio name="2">微信群</van-radio>
                      <van-radio name="3">其他</van-radio>
                    </van-radio-group>
                  </template>
                </van-field>
              </div>
              <van-field label="溶栓后24h内造影" readonly required label-width="200px">
                <template slot="right-icon">
                  <van-radio-group
                    v-model="lists.after_thrombolysis_radiography"
                    direction="horizontal"
                  >
                    <van-radio name="1">是</van-radio>
                    <van-radio name="0">否</van-radio>
                  </van-radio-group>
                </template>
              </van-field>
              <div v-show="lists.after_thrombolysis_radiography==1">
                <!-- <van-field label="造影开始" readonly required placeholder="选择时间" input-align="right">
                  <template slot="right-icon">
                    <van-icon name="arrow" />
                  </template>
                </van-field>-->

                <van-field
                  v-model="value.radio10.time"
                  label="造影开始"
                  placeholder="选择时间"
                  input-align="right"
                  readonly
                >
                  <template slot="right-icon">
                    <van-icon name="arrow" @click="isShow10 = !isShow10" />
                    <datetimepicker
                      :field="'radio10'"
                      :is-show="isShow10"
                      @choosedata="choosedata10"
                    ></datetimepicker>
                  </template>
                </van-field>
              </div>
              <van-field
                label="患者情况备注"
                v-model="chuyuanxinxi.zhuanyuan.beizhu"
                placeholder="点击输入文本"
                input-align="right"
              ></van-field>
            </van-cell-group>
          </div>
          <!-- 院内继续救治 -->
          <div v-show="chuyuanxinxi.zhuangui==3">
            <van-cell-group>
              <van-field label="离院宣教" readonly style="display: block;">
                <template slot="input">
                  <div class="anniu">
                    <div
                      class="no_rulesbtn"
                      :class="{no_rulesbtn2:chooseAfterValue.indexOf( item.text )!=-1}"
                      v-for="(item,index) in cyList"
                      :key="index"
                      @click="choosely(index, item.text)"
                    >
                      <span>{{item.text}}</span>
                    </div>
                  </div>
                </template>
              </van-field>

              <!-- 转科时间 -->
              <!-- <van-field label="转科时间" readonly required placeholder="选择时间" input-align="right">
                <template slot="right-icon">
                  <van-icon name="arrow" />
                </template>
              </van-field>-->

              <van-field
                v-model="value.radio11.time"
                label="转科时间"
                placeholder="选择时间"
                input-align="right"
                readonly
                required
              >
                <template slot="right-icon">
                  <van-icon name="arrow" @click="isShow11 = !isShow11" />
                  <datetimepicker :field="'radio11'" :is-show="isShow11" @choosedata="choosedata11"></datetimepicker>
                </template>
              </van-field>

              <van-field
                label="接诊科室"
                v-model="chuyuanxinxi.yuannei.jiezhen"
                placeholder="点击输入文本"
                input-align="right"
              ></van-field>
              <van-field
                label="转科原因描述"
                v-model="chuyuanxinxi.yuannei.zhuanke"
                placeholder="点击输入文本"
                input-align="right"
              ></van-field>
              <van-field
                label="患者情况备注"
                v-model="chuyuanxinxi.yuannei.beizhu"
                placeholder="点击输入文本"
                input-align="right"
              ></van-field>
            </van-cell-group>
          </div>
          <!-- 死亡 -->
          <div v-show="chuyuanxinxi.zhuangui==4">
            <van-cell-group>
              <!-- 死亡时间 -->
              <!-- <van-field label="死亡时间" readonly placeholder="选择时间" input-align="right">
                <template slot="right-icon">
                  <van-icon name="arrow" />
                </template>
              </van-field>-->
              <van-field
                v-model="value.radio12.time"
                label="死亡时间"
                placeholder="选择时间"
                input-align="right"
                readonly
                required
              >
                <template slot="right-icon">
                  <van-icon name="arrow" @click="isShow12 = !isShow12" />
                  <datetimepicker :field="'radio12'" :is-show="isShow12" @choosedata="choosedata12"></datetimepicker>
                </template>
              </van-field>

              <van-field label="死亡原因" readonly>
                <template slot="right-icon">
                  <van-radio-group v-model="chuyuanxinxi.siwang.time" direction="horizontal">
                    <van-radio name="1">心源性</van-radio>
                    <van-radio name="2">非心源性</van-radio>
                  </van-radio-group>
                </template>
              </van-field>
              <van-field
                label="描述"
                v-model="chuyuanxinxi.siwang.miaoshu"
                placeholder="点击输入文本"
                input-align="right"
              ></van-field>
              <van-field
                label="患者情况备注"
                v-model="chuyuanxinxi.siwang.beizhu"
                placeholder="点击输入文本"
                input-align="right"
              ></van-field>
            </van-cell-group>
          </div>
        </van-cell-group>
      </div>
      <!-- 基本信息 -->
      <div v-show="tabFlag2? curId_tab2===0 : false">
        <div>
          <!-- 七个选项 -->
          <van-cell-group>
            <van-field label="出院诊断" readonly required style="display: block; ">
              <template slot="input">
                <van-radio-group
                  v-model="allradio"
                  direction="horizontal"
                  v-for="(val,index) in list"
                  :key="index"
                >
                  <van-radio :name="index+1" @click="clickBtn(index+1)">{{val.title}}</van-radio>
                </van-radio-group>
              </template>
            </van-field>
          </van-cell-group>
        </div>
        <van-cell-group>
          <van-field
            v-model="value.radio1.time"
            label="确诊时间"
            placeholder="选择时间"
            input-align="right"
            required
          >
            <template slot="right-icon">
              <van-icon name="arrow" />
            </template>
          </van-field>

          <van-field label="院内新发心力衰竭" label-width="200px" required>
            <template slot="right-icon">
              <van-radio-group v-model="value.radio1.type1" direction="horizontal">
                <van-radio name="1">是</van-radio>
                <van-radio name="0">否</van-radio>
              </van-radio-group>
            </template>
          </van-field>
          <!-- NYHA分级 -->
          <div v-if="value.radio1.type1==1">
            <van-field label="NYHA分级" readonly required>
              <template slot="right-icon">
                <van-radio-group v-model="value.radio1.fenj" direction="horizontal">
                  <van-radio name="1">Ⅰ</van-radio>
                  <van-radio name="2">Ⅱ</van-radio>
                  <van-radio name="3">Ⅲ</van-radio>
                  <van-radio name="4">Ⅳ</van-radio>
                </van-radio-group>
              </template>
            </van-field>
          </div>
          <van-field label="ARNI" required>
            <template slot="right-icon">
              <van-radio-group v-model="value.radio1.type2" direction="horizontal">
                <van-radio name="1">是</van-radio>
                <van-radio name="0">否</van-radio>
              </van-radio-group>
            </template>
          </van-field>
          <!-- <van-field label="性别" v-model="value.radio1.cishu" is-link @focus="showTimeFlag = true"></van-field> -->
          <!-- 展示动态下拉框内容 -->
          <van-action-sheet
            v-model="showTimeFlag"
            :actions="sexes"
            :round="false"
            @select="onSelectFn"
          />
          <div v-if="value.radio1.type2==1">
            <van-field label="服用频次">
              <template slot="right-icon">
                <select style="width:100px;" v-model="value.radio1.cishu">
                  <option value>请选择</option>
                  <option value="1">1次</option>
                  <option value="2">2次</option>
                  <option value="3">3次</option>
                  <option value="4">4次</option>
                </select>
                <select style="width:100px" v-model="value.radio1.tianshu">
                  <option value>请选择</option>
                  <option value="1">每日</option>
                  <option value="2">每周</option>
                  <option value="3">每月</option>
                </select>
              </template>
            </van-field>
            <van-field v-model="value.radio1.jiliang" label="单次剂量" input-align="right">
              <template slot="extra">mg</template>
            </van-field>
          </div>
          <van-field
            v-model="value.radio1.bingfz"
            label="住院期间并发症"
            readonly
            required
            label-width="200px"
            style="display: block;"
          >
            <template slot="input">
              <div class="anniu">
                <div
                  class="no_rulesbtn"
                  :class="{no_rulesbtn2:chooseAfterValue.indexOf( item.text )!=-1}"
                  v-for="(item,index) in lyList1"
                  :key="index"
                  @click="choosely(index, item.text)"
                >
                  <span>{{item.text}}</span>
                </div>
              </div>
            </template>
          </van-field>
        </van-cell-group>
      </div>
      <!-- 危险因素 -->
      <div v-show="curId_tab2===1">
        <van-cell-group>
          <van-field label="高血压" readonly require>
            <template slot="right-icon">
              <van-radio-group v-model="weixian.gaoxueya" direction="horizontal">
                <van-radio name="1">是</van-radio>
                <van-radio name="0">否</van-radio>
              </van-radio-group>
            </template>
          </van-field>
          <van-field label="高脂血症" readonly required>
            <template slot="right-icon">
              <van-radio-group v-model="weixian.gaozhixuezheng" direction="horizontal">
                <van-radio name="1">是</van-radio>
                <van-radio name="0">否</van-radio>
              </van-radio-group>
            </template>
          </van-field>
          <van-field label="糖尿病" readonly required>
            <template slot="right-icon">
              <van-radio-group v-model="weixian.tangniaobing" direction="horizontal">
                <van-radio name="1">是</van-radio>
                <van-radio name="0">否</van-radio>
              </van-radio-group>
            </template>
          </van-field>
          <van-field label="吸烟" readonly required>
            <template slot="right-icon">
              <van-radio-group v-model="lists.smoking" direction="horizontal">
                <van-radio name="1">是</van-radio>
                <van-radio name="0">否</van-radio>
              </van-radio-group>
            </template>
          </van-field>
          <div v-show="lists.smoking==1">
            <van-field label="吸烟" readonly required>
              <template slot="right-icon">
                <van-radio-group v-model="lists.smoking_status" direction="horizontal">
                  <van-radio name="1">已戒烟</van-radio>
                  <van-radio name="2">当前仍吸烟</van-radio>
                </van-radio-group>
              </template>
            </van-field>
          </div>
          <van-field label="肥胖" readonly required>
            <template slot="right-icon">
              <van-radio-group v-model="weixian.feipang" direction="horizontal">
                <van-radio name="1">是</van-radio>
                <van-radio name="0">否</van-radio>
              </van-radio-group>
            </template>
          </van-field>
          <van-field value="早发CVD家族史(男＜55岁，女＜60岁)" readonly required>
            <template slot="right-icon">
              <van-radio-group v-model="weixian.feipang" direction="horizontal">
                <van-radio name="1">是</van-radio>
                <van-radio name="0">否</van-radio>
              </van-radio-group>
            </template>
          </van-field>
        </van-cell-group>
      </div>
      <!-- 合并疾病 -->
      <div v-show="curId_tab2===2">
        <van-cell-group>
          <van-field label="冠心病" readonly required>
            <template slot="right-icon">
              <van-radio-group v-model="hebinjibing.guanxinbing" direction="horizontal">
                <van-radio name="1">是</van-radio>
                <van-radio name="0">否</van-radio>
              </van-radio-group>
            </template>
          </van-field>
          <div v-show="hebinjibing.guanxinbing==1">
            <van-field label="血运重建" readonly>
              <template slot="right-icon">
                <van-radio-group v-model="hebinjibing.xueyun" direction="horizontal">
                  <van-radio name="1">是</van-radio>
                  <van-radio name="0">否</van-radio>
                </van-radio-group>
              </template>
            </van-field>
          </div>
          <van-field label="心房颤动" readonly required>
            <template slot="right-icon">
              <van-radio-group v-model="lists.af_type" direction="horizontal">
                <van-radio name="1">是</van-radio>
                <van-radio name="0">否</van-radio>
              </van-radio-group>
            </template>
          </van-field>
          <div v-show="hebinjibing.xinfang==1">
            <van-field label="分型" readonly>
              <template slot="right-icon">
                <van-radio-group
                  v-model="hebinjibing.fenxing"
                  direction="horizontal"
                  style="margin-left:-17vw"
                >
                  <van-radio name="1">阵发性</van-radio>
                  <van-radio name="2">持续性</van-radio>
                  <van-radio name="3">长程持续性</van-radio>
                  <van-radio name="4">永久性</van-radio>
                </van-radio-group>
              </template>
            </van-field>
          </div>
          <van-field label="慢性心力衰竭" readonly required>
            <template slot="right-icon">
              <van-radio-group v-model="lists.slow_heart_failure" direction="horizontal">
                <van-radio name="1">是</van-radio>
                <van-radio name="0">否</van-radio>
              </van-radio-group>
            </template>
          </van-field>
          <div v-show="lists.slow_heart_failure==1">
            <van-field label="NYHA分级" readonly required>
              <template slot="right-icon">
                <van-radio-group v-model="lists.nyha_level" direction="horizontal">
                  <van-radio name="1">Ⅰ</van-radio>
                  <van-radio name="2">Ⅱ</van-radio>
                  <van-radio name="3">Ⅲ</van-radio>
                  <van-radio name="4">Ⅳ</van-radio>
                </van-radio-group>
              </template>
            </van-field>
          </div>
          <van-field label="脑血管疾病" readonly required>
            <template slot="right-icon">
              <van-radio-group v-model="lists.brian_vascellum" direction="horizontal">
                <van-radio name="1">是</van-radio>
                <van-radio name="0">否</van-radio>
              </van-radio-group>
            </template>
          </van-field>
          <div v-show="hebinjibing.naoxueguan==1">
            <van-field label="描述" readonly required>
              <template slot="right-icon">
                <van-radio-group v-model="hebinjibing.miaoshu" direction="horizontal">
                  <van-radio name="1">缺血性</van-radio>
                  <van-radio name="2">出血性</van-radio>
                </van-radio-group>
              </template>
            </van-field>
          </div>
          <van-field label="外周动脉疾病" readonly required>
            <template slot="right-icon">
              <van-radio-group v-model="lists.peripheral_artery_disease" direction="horizontal">
                <van-radio name="1">是</van-radio>
                <van-radio name="0">否</van-radio>
              </van-radio-group>
            </template>
          </van-field>
          <van-field label="主动脉瘤" readonly required>
            <template slot="right-icon">
              <van-radio-group v-model="lists.aortic_aneurysm" direction="horizontal">
                <van-radio name="1">是</van-radio>
                <van-radio name="0">否</van-radio>
              </van-radio-group>
            </template>
          </van-field>
          <van-field label="COPD" readonly required>
            <template slot="right-icon">
              <van-radio-group v-model="lists.copd" direction="horizontal">
                <van-radio name="1">是</van-radio>
                <van-radio name="0">否</van-radio>
              </van-radio-group>
            </template>
          </van-field>
          <van-field label="慢性肾病" readonly required>
            <template slot="right-icon">
              <van-radio-group v-model="lists.chronic_kidney_disease" direction="horizontal">
                <van-radio name="1">是</van-radio>
                <van-radio name="0">否</van-radio>
              </van-radio-group>
            </template>
          </van-field>
          <van-field label="贫血" readonly required>
            <template slot="right-icon">
              <van-radio-group v-model="lists.anemia" direction="horizontal">
                <van-radio name="1">是</van-radio>
                <van-radio name="0">否</van-radio>
              </van-radio-group>
            </template>
          </van-field>
          <van-field label="消化性溃疡" readonly required>
            <template slot="right-icon">
              <van-radio-group v-model="lists.peptic_ulcer" direction="horizontal">
                <van-radio name="1">是</van-radio>
                <van-radio name="0">否</van-radio>
              </van-radio-group>
            </template>
          </van-field>
          <van-field label="甲状腺功能异常" readonly required>
            <template slot="right-icon">
              <van-radio-group v-model="lists.thyroid_disease" direction="horizontal">
                <van-radio name="1">是</van-radio>
                <van-radio name="0">否</van-radio>
              </van-radio-group>
            </template>
          </van-field>
          <van-field label="恶性肿瘤" readonly required>
            <template slot="right-icon">
              <van-radio-group v-model="lists.malignant_tumor" direction="horizontal">
                <van-radio name="1">是</van-radio>
                <van-radio name="0">否</van-radio>
              </van-radio-group>
            </template>
          </van-field>
        </van-cell-group>
      </div>
      <!-- 检查结果 -->
      <div v-show="curId_tab2===3">
        <van-cell-group>
          <van-field label="72h内肌钙蛋白" readonly required label-width="200px">
            <template slot="right-icon">
              <van-radio-group v-model="lists.troponin_72h" direction="horizontal">
                <van-radio name="1">是</van-radio>
                <van-radio name="0">否</van-radio>
              </van-radio-group>
            </template>
          </van-field>
          <div v-show="jiancha.roujigai==1">
            <van-field label="肌钙蛋白" readonly>
              <template slot="right-icon">
                <van-radio-group v-model="lists.troponin_72h_type" direction="horizontal">
                  <van-radio name="1">TNT</van-radio>
                  <van-radio name="2">TNI</van-radio>
                </van-radio-group>
              </template>
            </van-field>
            <van-field label="最高值" readonly required>
              <template slot="right-icon">
                <select v-model="lists.ctni_max_value_unit">
                  <option value>ug/L</option>
                  <option value="1">ng/mL</option>
                  <option value="2">ng/L</option>
                  <option value="3">pg/mL</option>
                  <option value="3">mg/L</option>
                </select>
              </template>
            </van-field>
          </div>
          <van-field label="脑钠肽" readonly required>
            <template slot="right-icon">
              <van-radio-group v-model="lists.bnp" direction="horizontal">
                <van-radio name="1">是</van-radio>
                <van-radio name="0">否</van-radio>
              </van-radio-group>
            </template>
          </van-field>
          <div v-show="lists.bnp==1">
            <van-field label="脑钠肽" readonly required>
              <template slot="right-icon">
                <van-radio-group v-model="lists.bnp_type" direction="horizontal">
                  <van-radio name="1">BNP</van-radio>
                  <van-radio name="2">NT-proBNP</van-radio>
                </van-radio-group>
              </template>
            </van-field>
            <van-field label="最高值" input-align="right" v-model="lists.bnp_value">
              <template slot="extra">pg/mL</template>
            </van-field>
          </div>
          <van-field label="总胆固醇（TC）" readonly required label-width="200px">
            <template slot="right-icon">
              <van-radio-group v-model="lists.tc" direction="horizontal">
                <van-radio name="1">是</van-radio>
                <van-radio name="0">否</van-radio>
              </van-radio-group>
            </template>
          </van-field>
          <div v-show="lists.tc==1">
            <van-field label="数值" input-align="right" v-model="lists.tc_value" required>
              <template slot="extra">mmol/L</template>
            </van-field>
          </div>
          <van-field label="高密度脂蛋白（HDL-C）" readonly required label-width="200px">
            <template slot="right-icon">
              <van-radio-group v-model="lists.hdl_c" direction="horizontal">
                <van-radio name="1">是</van-radio>
                <van-radio name="0">否</van-radio>
              </van-radio-group>
            </template>
          </van-field>
          <div v-show="lists.hdl_c==1">
            <van-field label="数值" input-align="right" v-model="lists.hdl_c_value" required>
              <template slot="extra">mmol/L</template>
            </van-field>
          </div>
          <van-field label="低密度脂蛋白（LDL-C）" readonly required label-width="200px">
            <template slot="right-icon">
              <van-radio-group v-model="lists.ldl_c" direction="horizontal">
                <van-radio name="1">是</van-radio>
                <van-radio name="0">否</van-radio>
              </van-radio-group>
            </template>
          </van-field>
          <div v-show="lists.ldl_c==1">
            <van-field label="数值" input-align="right" v-model="lists.ldl_c_value" required>
              <template slot="extra">mmol/L</template>
            </van-field>
          </div>
          <van-field label="超声心动图" readonly required>
            <template slot="right-icon">
              <van-radio-group v-model="lists.ucg" direction="horizontal">
                <van-radio name="1">是</van-radio>
                <van-radio name="0">否</van-radio>
              </van-radio-group>
            </template>
          </van-field>
          <div v-show="lists.ucg==1">
            <van-field label="LVEF" input-align="right" v-model="lists.lvef" required>
              <template slot="extra">%（诊疗过程中最低值）</template>
            </van-field>
            <van-field label="室壁瘤" readonly>
              <template slot="right-icon">
                <van-radio-group v-model="lists.vntricular_aneurysm" direction="horizontal">
                  <van-radio name="1">是</van-radio>
                  <van-radio name="0">否</van-radio>
                </van-radio-group>
              </template>
            </van-field>
            <van-field label="局部室壁活动异常" readonly>
              <template slot="right-icon">
                <van-radio-group v-model="lists.part_vntricular" direction="horizontal">
                  <van-radio name="1">是</van-radio>
                  <van-radio name="0">否</van-radio>
                </van-radio-group>
              </template>
            </van-field>
          </div>
        </van-cell-group>
      </div>
      <!-- <div v-show="curId_tab2===4">b555</div> -->
    </div>
    <div class="footer">
      <van-button round color="#4676FB" size="large" @click="save">保存</van-button>
    </div>
  </div>
</template>
<style scoped lang="scss">
.view {
  position: relative;
  height: 100%;
}
.content {
  position: absolute;
  top: 71px;
  bottom: 50px;
  left: 0px;
  right: 0px;
  overflow: auto;
  // overflow: scroll;
}
// 每项缝隙的背景颜色
/deep/ .van-cell-group {
  background-color: #efefef;
}
/deep/ .van-cell {
  margin: 5px 0;
  padding: 6px 16px;
}
// 修改单选框和按钮的display：flex 避免一行
/deep/ .van-field__control--custom {
  flex-wrap: wrap;
}
.tabbar {
  text-align: center;
  font-weight: 550;
  font-size: 14px;
  height: 30px;
  line-height: 30px;
  background-color: #fff;
  border-bottom: 1px solid #000;
  .tab {
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
.anniu {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .no_rulesbtn {
    background-color: #f1f5ff;
    margin: 3px 5px;
    padding: 5px 8px;
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
import { getOutcome } from "../api/index.js";
export default {
  components: { headerCom, Datetimepicker },
  data() {
    return {
    pickerColumns: [],
    pickerTitle: "",
    showPicker:false,
    //基本信息--类型
    applyForm: {
        cars: "", //车辆
    },
    //车辆
    car: [
        {
            text: "京A00004",
            value: "51",
        },
        {
            text: "京A00005",
            value: "52",
        },
        {
            text: "京A00006",
            value: "53",
        },
    ],
      // 控制下拉框的展示位置
      showTimeFlag: false,
      // 控制展示相关的内容
      sexchoice: "男",
      sexes: [
        { name: "男" },
        { name: "男2" },
        { name: "男4" },
        { name: "男3" },
      ],
      // 控制tab页内容显隐变量
      curId_tab1: 0,
      curId_tab2: 0,
      // tab页显隐变量
      tabFlag1: true,
      tabFlag2: false,
      // 展示当前的三级菜单内容的展示
      // valueFlag1:false,
      valueFlag2: true,
      valueFlag3: false,
      valueFlag4: false,
      // 日历组件显隐
      isShow: false,
      isShow1: false,
      isShow2: false,
      isShow3: false,
      isShow5: false,
      isShow8: false,
      isShow10: false,
      isShow11: false,
      isShow12: false,
      // -------基本信息 字段
      value: {
        // STEMI NTEMI UA 字段
        radio1: {
          time: "",
          type1: "1",
          fenj: "",
          type2: "1",
          cishu: "",
          tianshu: "",
          bingfz: "",
        },
        // 离开本院大门时间
         radio2: {
          time: "",
        },
         // 实际介入时间
         radio3: {
          time: "",
        },  
        radio9: {
          time: "",
        },
        // 主动脉夹层 肺动脉栓塞 字段
        radio4: {
          time: "",
        },
         // 导丝通过时间
        radio5: {
          time: "",
        },
        // 心源性胸痛 字段
        radio6: {
          time: "",
          noacs: "",
        },
        // 其它非心源性胸痛 字段
        radio7: {
          time: "",
          noxinyx: "",
        },
        // 传输心电图 字段
        radio8: {
          time: "",
        },
        // 造影开始 字段
        radio10: {
          time: "",
        },
        // 转科时间 字段
        radio11: {
          time: "",
        },
        //死亡时间 字段
        radio12: {
          time: "",
        },
      },
      // 七个按钮内容
      list: [
        {
          title: "STEMI",
        },
        {
          title: "NTEMI",
        },
        {
          title: "UA",
        },
        {
          title: "主动脉夹层",
        },
        {
          title: "肺动脉栓塞",
        },
        {
          title: "心源性胸痛",
        },
        {
          title: "其它非心源性胸痛",
        },
      ],
      // 七个按钮
      allradio: "",
      // 基本信息 住院期间并发症 按钮内容
      lyList1: [
        { text: "休克" },
        { text: "机械性并发症" },
        { text: "感染" },
        { text: "缺血性卒中" },
        { text: "血栓" },
        { text: "再发心梗" },
        { text: "TIA" },
        { text: "恶性心律失常" },
        { text: "呼吸衰竭" },
        { text: "肾衰竭" },
        { text: "出血" },
        { text: "死亡" },
        { text: "无" },
      ],
      // 基本信息 心源性胸痛类型 按钮内容
      lyList2: [
        { text: "心律失常" },
        { text: "扩张性心肌病" },
        { text: "缺血性心肌病" },
        { text: "肥厚型心肌病" },
        { text: "心肌炎" },
        { text: "冠心病" },
        { text: "瓣膜性心脏病" },
        { text: "陈旧性心肌梗死" },
        { text: "心绞痛" },
        { text: "心悸" },
        { text: "房颤" },
        { text: "高血压" },
        { text: "心衰" },
        { text: "房扑" },
        { text: "室早" },
        { text: "房早" },
        { text: "室上速" },
        { text: "心包炎" },
        { text: "心包积液" },
        { text: "心肌桥" },
        { text: "透壁性动脉粥样硬化性溃疡" },
        { text: "主动脉管壁间血肿" },
        { text: "主动脉瘤" },
        { text: "张力性气胸" },
      ],
      // 基本信息 其它非心源性胸痛类型 按钮内容
      lyList3: [
        { text: "呼吸系统病" },
        { text: "消化系统病" },
        { text: "神经系统病" },
        { text: "肌肉骨骼病" },
        { text: "皮肤系统病" },
        { text: "其他" },
      ],
      // 住院用药 降糖药物药物名称 按钮
      zyList: [
        { text: "磺脲类" },
        { text: "双胍类" },
        { text: "胰岛素及胰岛素类似物" },
        { text: "DPP-4抑制剂" },
        { text: "GLP-1受体激动剂" },
        { text: "SGLT-2抑制剂" },
        { text: "α糖苷酶抑制剂" },
        { text: "其他" },
      ],
      // 所有被点击的按钮内容
      chooseAfterValue: [],
      // ------住院用药 字段
      medication: {
        // 降糖药物
        jiangtang: 1,
        // 口服抗凝药物
        koufukang: 1,
        PCSK9: 1,
        // PCSK9的药物名称
        PCSK9yaowu: 1,
        // 单次剂量
        jiliang: "",
      },
      // 住院用药 口服抗凝药物名称 radio
      radioData1: [
        { name: "华法林" },
        { name: "达比加群酯" },
        { name: "利伐沙班" },
        { name: "阿哌沙班" },
        { name: "其它" },
      ],
      radioname1: "华法林",
      // --------出院信息
      chuyuanxinxi: {
        // 天数
        tianshu: "",
        // 总费用
        feiyong: "",
        // 30天转归
        zhuangui: "2",
        // ---出院
        chuyuan: {
          time: "",
          jieguo: "",
          zhouqi: "",
          beizhu: "",
        },
        // ---转院
        zhuanyuan: {
          // 医院名称
          yiyuanname: "",
          wangluoyiyuan: "",
          pci: "1",
          // 导管室
          daoguanshi: "",
          // 心电图
          xindiantu: "1",
          // 传输方式
          csfangshi: "",
          // 溶栓后
          rongshuan: "1",
          // 备注
          beizhu: "",
        },
        // ---院内继续救治
        yuannei: {
          jiezhen: "",
          zhuanke: "",
          beizhu: "",
        },
        // ---死亡
        siwang: {
          time: "",
          miaoshu: "",
          beizhu: "",
        },
      },
      // 出院信息 转送其它医院 按钮
      cyList: [
        { text: "未宣教" },
        { text: "戒烟" },
        { text: "规律坚持服药" },
        { text: "遵医嘱随访治疗" },
        { text: "生活起居心血管危险因素控制、调护" },
        { text: "生活起居调护" },
      ],
      // --------危险因素
      weixian: {
        gaoxueya: "",
        gaoxuezhizheng: "",
        tangniaobing: "",
        xiyan: "1",
        xiyan2: "",
        feipang: "",
      },
      // ---------合并疾病
      hebinjibing: {
        guanxinbing: "1",
        xinfang: "1",
        manxing: "1",
        naoxueguan: "1",
        waizhou: "",
        zhudong: "",
        COPD: "",
        shenbing: "",
        pingxue: "",
        kuiyang: "",
        jiazhuang: "",
        exing: "",
        // 二级data
        xueyun: "",
        fenxing: "",
        NYHA: "",
        miaoshu: "",
      },
      // ---------检查结果
      jiancha: {
        roujigai: "1",
        naonatai: "1",
        TC: "1",
        HDL_C: "1",
        LDL_C: "1",
        chaosheng: "1",
        // 二级data
        jigai: "",
        zuigaozhi: "1",
        naonatai2: "",
        zuigaozhi2: "",
        shuzhi: "",
        shuzhi2: "",
        shuzhi3: "",
        LVEF: "",
        shibiliu: "",
        jubu: "",
      },
      lists:{},
    };
  },
  // computed: {
  //     Show() {
  //         return this.isShow = !this.isShow
  //     }
  // },
  // 控制tab页，三级页面显隐函数
  // 参数：七个按钮索引值
  methods: {

    handleShowPicker(val) {
      this.showPicker = true;
       if (val == "cars") {
        this.pickerTitle = "车辆";
        this.pickerColumns = this.car;
      } else { }
    },
    onConfirmPicker(values) {
      if (this.$refs.pickerRef.title == "车辆") {
        this.applyForm.cars = values.text;
      } else {
      }
      this.showPicker = false;
    },


   

    // 相关的select的选择性别人
    onSelectFn(item) {
      this.showTimeFlag = false;
      this.sexchoice = item.name;
    },
    clickBtn(value) {
      if (value == 1 || value == 2 || value == 3) {
        this.valueFlag1 = true;
        this.valueFlag3 = false;
        this.valueFlag2 = false;
        this.valueFlag4 = false;
        this.tabFlag1 = false;
        this.tabFlag2 = true;
      } else if (value == 4 || value == 5) {
        this.valueFlag2 = true;
        this.valueFlag3 = false;
        this.valueFlag4 = false;
        this.valueFlag1 = false;
        this.tabFlag1 = true;
        this.tabFlag2 = false;
      } else if (value == 6) {
        this.valueFlag3 = true;
        this.valueFlag4 = false;
        this.valueFlag2 = false;
        this.valueFlag1 = false;
        this.tabFlag1 = true;
        this.tabFlag2 = false;
      } else if (value == 7) {
        this.valueFlag4 = true;
        this.valueFlag3 = false;
        this.valueFlag2 = false;
        this.valueFlag1 = false;
        this.tabFlag1 = true;
        this.tabFlag2 = false;
      }
      // console.log(this.value.radio1.type2);
      // console.log(this.value.radio1.shuaij);
      // console.log(this.value.radio1.type1);
    },
    // 选中按钮函数
    // 参数：按钮索引值，按钮
    choosely(n, value) {
      if (this.chooseAfterValue.indexOf(value) != -1) {
        this.chooseAfterValue.splice(this.chooseAfterValue.indexOf(value), 1);
      } else {
        this.chooseAfterValue.push(value);
      }
    },
    // 保存方法
    save() {
      console.log(111);
    },
    // 出院时间
    chuyuan(param){
        this.chuyuanxinxi[param.field].time = param.time;
        this.isShow1 = !this.isShow1;
    },
    choosedata(param) {
      this.value[param.field].time = param.time;
      this.isShow = !this.isShow;
    },
    // 离开本院大门时间
    choosedata2(param) {
      this.value[param.field].time = param.time;
      this.isShow2 = !this.isShow2;
    },
    // 实际介入时间
    choosedata3(param) {
      this.value[param.field].time = param.time;
      this.isShow3 = !this.isShow3;
    },
    // 导丝通过时间
     choosedata5(param) {
      this.value[param.field].time = param.time;
      this.isShow5 = !this.isShow5;
    },
    // 传输心电图
    choosedata8(param) {
      this.value[param.field].time = param.time;
      this.isShow8 = !this.isShow8;
    },
    // 造影开始
    choosedata10(param) {
      this.value[param.field].time = param.time;
      this.isShow10 = !this.isShow10;
    },
    // 转科时间
    choosedata11(param) {
      this.value[param.field].time = param.time;
      this.isShow11 = !this.isShow11;
    },
      // 死亡时间
    choosedata12(param) {
      this.value[param.field].time = param.time;
      this.isShow12 = !this.isShow12;
    },

  },
  created() {
    //   console.log(this.$route.query.info);
    let datas={
        pk_pat_info:'1001A0100000004MYB77'
        // pk_pat_info:'1001A0100000004NN9KW'
    }
    
    // this.$http.post('mcpc/outcome/getOutcome',datas).then(res=> {
    //     console.log(res); 
    //     this.lists=res.data.results[0]
    //     console.log(this.lists)
    // })

    getOutcome(datas).then((res) => {
        console.log(res); 
        this.lists=res.results[0]
        console.log(this.lists)
        console.log(this.lists.nyha_level)
    });
  },
};
</script>
