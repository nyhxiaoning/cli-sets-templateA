<template>
  <div class="view">
    <div class="nav">
      <headerCom>
        <van-icon slot="left" name="arrow-left" @click="$router.back()" />
        <span>诊疗</span>
        <!-- 对应接口:/treatment/querytreatmentViewsByPatId -->
        <!-- 对应接口文档页码:page101 -->
        <span slot="right">
          <div @click="show_ul = !show_ul" class="dropdown">
            <van-icon name="bars" size="25" style="margin-top:6px" />
            <ul v-show="show_ul" class="ullist">
              <li
                v-for="(item, index) in menuTitle"
                :key="index"
                @click="Jump(index)"
              >{{ item.Title }}</li>
            </ul>
          </div>
          <!-- <span>222</span> -->
        </span>
      </headerCom>
      <!-- 顶部tab页 -->
      <div class="tabbar">
        <div v-if="tabFlag === '0'" class="tab">
          <div @click="curId_tab = 0" :class="{ curr: true, cur: curId_tab === 0 }">会诊</div>
          <div @click="curId_tab = 1" :class="{ curr: true, cur: curId_tab === 1 }">诊断</div>
        </div>

        <div v-if="tabFlag === '1'" class="tab">
          <div @click="curId_tab = 0" :class="{ curr: true, cur: curId_tab === 0 }">会诊</div>
          <div @click="curId_tab = 1" :class="{ curr: true, cur: curId_tab === 1 }">诊断</div>
          <div @click="curId_tab = 2" :class="{ curr: true, cur: curId_tab === 2 }">初始药物</div>
          <div @click="curId_tab = 3" :class="{ curr: true, cur: curId_tab === 3 }">措施</div>
          <div v-if="tabFlag3 === '1'" class="tab">
            <div @click="curId_tab = 7" :class="{ curr: true, cur: curId_tab === 7 }">院内溶栓</div>
          </div>
        </div>
        <div v-if="tabFlag === '2'" class="tab">
          <div @click="curId_tab = 0" :class="{ curr: true, cur: curId_tab === 0 }">会诊</div>
          <div @click="curId_tab = 1" :class="{ curr: true, cur: curId_tab === 1 }">诊断</div>
          <div @click="curId_tab = 2" :class="{ curr: true, cur: curId_tab === 2 }">初始药物</div>
          <div @click="curId_tab = 4" :class="{ curr: true, cur: curId_tab === 4 }">Grace评估</div>
          <div @click="curId_tab = 5" :class="{ curr: true, cur: curId_tab === 5 }">再次分层</div>
          <div v-if="tabFlag2 != '1'" class="tab">
            <div @click="curId_tab = 6" :class="{ curr: true, cur: curId_tab === 6 }">处理策略</div>
          </div>
          <div v-if="tabFlag2 == '1'" class="tab">
            <div @click="curId_tab = 3" :class="{ curr: true, cur: curId_tab === 3 }">措施</div>
          </div>
          <div v-if="tabFlag2 == '1'" class="tab">
            <div v-if="tabFlag3 == '1'" class="tab">
              <div @click="curId_tab = 6" :class="{ curr: true, cur: curId_tab === 6 }">院内溶栓</div>
            </div>
          </div>
        </div>
      </div>
      <div class="content">
        <!-- 会诊 -->
        <div v-show="curId_tab === 0">
          <van-cell-group>
            <van-field label="心内科会诊" required readonly>
              <template slot="right-icon">
                <van-radio-group v-model="emergencyView.is_notice_imcd" direction="horizontal">
                  <van-radio name="1">是</van-radio>
                  <van-radio name="2">否</van-radio>
                </van-radio-group>
              </template>
            </van-field>
            <div v-show="emergencyView.is_notice_imcd == 1">
              <van-cell-group>
                <van-field label="会诊类型" required readonly>
                  <template slot="right-icon">
                    <van-radio-group v-model="emergencyView.imcd_type" direction="horizontal">
                      <van-radio name="1">现场会诊</van-radio>
                      <van-radio name="2">远程会诊</van-radio>
                    </van-radio-group>
                  </template>
                </van-field>
                <van-field
                  v-model="Time.time1.time"
                  label="通知会诊"
                  placeholder="选择时间"
                  input-align="right"
                  readonly
                >
                  <template slot="right-icon">
                    <van-icon name="arrow" @click="isShow1 = !isShow1" />
                    <datetimepicker :field="'time1'" :is-show="isShow1" @choosedata="choosedata1"></datetimepicker>
                  </template>
                </van-field>
                <van-field
                  v-model="Time.time2.time"
                  label="会诊时间"
                  placeholder="选择时间"
                  input-align="right"
                  readonly
                >
                  <template slot="right-icon">
                    <van-icon name="arrow" @click="isShow2 = !isShow2" />
                    <datetimepicker :field="'time2'" :is-show="isShow2" @choosedata="choosedata2"></datetimepicker>
                  </template>
                </van-field>
              </van-cell-group>
            </div>
          </van-cell-group>
        </div>
        <!-- 诊断 -->
        <div v-show="curId_tab === 1">
          <van-cell-group>
            <van-field label="初步诊断" readonly required style="display: block;flex-wrap:wrap">
              <template slot="input">
                <!-- 出院诊断7个按钮 -->
                <van-radio-group
                  v-model="treatmentView.cp_diagnosis_code"
                  direction="horizontal"
                  v-for="(val, index) in list"
                  :key="index"
                >
                  <van-radio :name="index + 1" @click="clickBtn(index + 1)">
                    {{
                    val.title
                    }}
                  </van-radio>
                </van-radio-group>
              </template>
            </van-field>
            <van-field label="患者自愿放弃后续治疗" required readonly label-width="200px">
              <template slot="right-icon">
                <van-radio-group v-model="treatmentView.give_up_treatment" direction="horizontal">
                  <van-radio name="1">是</van-radio>
                  <van-radio name="2">否</van-radio>
                </van-radio-group>
              </template>
            </van-field>
            <van-field
              v-model="Time.time3.time"
              label="初步诊断时间"
              placeholder="选择时间"
              input-align="right"
              readonly
            >
              <template slot="right-icon">
                <van-icon name="arrow" @click="isShow3 = !isShow3" />
                <datetimepicker :field="'time3'" :is-show="isShow3" @choosedata="choosedata3"></datetimepicker>
              </template>
            </van-field>
            <van-field
              v-model="treatmentView.doctor_name"
              label="医生"
              placeholder="点击输入文本"
              input-align="right"
            ></van-field>
            <!-- STEMI NTEMI UA -->
            <div
              v-show="treatmentView.cp_diagnosis_code == 1||treatmentView.cp_diagnosis_code == 2||treatmentView.cp_diagnosis_code==3 "
            >
              <van-cell-group>
                <van-field label="心功能分级" required readonly>
                  <template slot="right-icon">
                    <van-radio-group v-model="treatmentView.killip_level " direction="horizontal">
                      <van-radio name="1">Ⅰ级</van-radio>
                      <van-radio name="2">Ⅱ级</van-radio>
                      <van-radio name="3">Ⅲ级</van-radio>
                      <van-radio name="4">Ⅳ级</van-radio>
                    </van-radio-group>
                  </template>
                </van-field>
                <van-field label="绕行急诊" required readonly>
                  <template slot="right-icon">
                    <van-radio-group
                      v-model="treatmentView.is_bypass_emergency"
                      direction="horizontal"
                    >
                      <van-radio name="1">是</van-radio>
                      <van-radio name="2">否</van-radio>
                    </van-radio-group>
                  </template>
                </van-field>
                <van-field label="绕行CCU" required readonly>
                  <template slot="right-icon">
                    <van-radio-group v-model="treatmentView.is_bypass_ccu" direction="horizontal">
                      <van-radio name="1">是</van-radio>
                      <van-radio name="2">否</van-radio>
                    </van-radio-group>
                  </template>
                </van-field>
              </van-cell-group>
            </div>
            <!-- 主动脉夹层 -->
            <div v-show="treatmentView.cp_diagnosis_code == 4">
              <van-cell-group>
                <van-field label="影像学检查" required readonly>
                  <template slot="right-icon">
                    <van-checkbox-group v-model="zhudongmai.yingxiangxue" direction="horizontal">
                      <van-checkbox name="1">急诊CT</van-checkbox>
                      <van-checkbox name="2">彩超</van-checkbox>
                      <van-checkbox name="3">MRI</van-checkbox>
                      <van-checkbox @change="changeweizuo" name="4">未做</van-checkbox>
                    </van-checkbox-group>
                  </template>
                </van-field>
                <!-- 急诊CT -->
                <div v-show="zhudongmai.yingxiangxue.indexOf('1') != -1">
                  <van-field
                    v-model="Time.time4.time"
                    label="通知CT室"
                    placeholder="选择时间"
                    input-align="right"
                    readonly
                  >
                    <template slot="right-icon">
                      <van-icon name="arrow" @click="isShow4 = !isShow4" />
                      <datetimepicker
                        :field="'time14'"
                        :is-show="isShow4"
                        @choosedata="choosedata4"
                      ></datetimepicker>
                    </template>
                  </van-field>
                  <van-field
                    v-model="Time.time5.time"
                    label="CT室完成准备"
                    placeholder="选择时间"
                    input-align="right"
                    readonly
                  >
                    <template slot="right-icon">
                      <van-icon name="arrow" @click="isShow5 = !isShow5" />
                      <datetimepicker
                        :field="'time15'"
                        :is-show="isShow5"
                        @choosedata="choosedata5"
                      ></datetimepicker>
                    </template>
                  </van-field>
                  <van-field
                    v-model="Time.time6.time"
                    label="CT扫描开始"
                    placeholder="选择时间"
                    input-align="right"
                    readonly
                  >
                    <template slot="right-icon">
                      <van-icon name="arrow" @click="isShow6 = !isShow6" />
                      <datetimepicker :field="'time6'" :is-show="isShow6" @choosedata="choosedata6"></datetimepicker>
                    </template>
                  </van-field>
                  <van-field
                    v-model="Time.time7.time"
                    label="CT报告时间"
                    placeholder="选择时间"
                    input-align="right"
                    readonly
                  >
                    <template slot="right-icon">
                      <van-icon name="arrow" @click="isShow7 = !isShow7" />
                      <datetimepicker :field="'time7'" :is-show="isShow7" @choosedata="choosedata7"></datetimepicker>
                    </template>
                  </van-field>
                </div>
                <!-- 彩超 -->
                <div v-show="zhudongmai.yingxiangxue.indexOf('2') != -1">
                  <van-cell-group>
                    <van-field
                      v-model="Time.time10.time"
                      label="通知彩超室"
                      placeholder="选择时间"
                      input-align="right"
                      readonly
                    >
                      <template slot="right-icon">
                        <van-icon name="arrow" @click="isShow10 = !isShow10" />
                        <datetimepicker
                          :field="'time10'"
                          :is-show="isShow10"
                          @choosedata="choosedata10"
                        ></datetimepicker>
                      </template>
                    </van-field>
                    <van-field
                      v-model="Time.time11.time"
                      label="彩超检查时间"
                      placeholder="选择时间"
                      input-align="right"
                      readonly
                    >
                      <template slot="right-icon">
                        <van-icon name="arrow" @click="isShow11 = !isShow11" />
                        <datetimepicker
                          :field="'time11'"
                          :is-show="isShow11"
                          @choosedata="choosedata11"
                        ></datetimepicker>
                      </template>
                    </van-field>
                    <van-field
                      v-model="Time.time12.time"
                      label="彩超出结果"
                      placeholder="选择时间"
                      input-align="right"
                      readonly
                    >
                      <template slot="right-icon">
                        <van-icon name="arrow" @click="isShow12 = !isShow12" />
                        <datetimepicker
                          :field="'time12'"
                          :is-show="isShow12"
                          @choosedata="choosedata12"
                        ></datetimepicker>
                      </template>
                    </van-field>
                  </van-cell-group>
                </div>
                <!-- ------------------------- -->
                <van-field
                  v-model="Time.time8.time"
                  label="通知心外会诊"
                  placeholder="选择时间"
                  input-align="right"
                  readonly
                >
                  <template slot="right-icon">
                    <van-icon name="arrow" @click="isShow8 = !isShow8" />
                    <datetimepicker :field="'time8'" :is-show="isShow8" @choosedata="choosedata8"></datetimepicker>
                  </template>
                </van-field>
                <van-field
                  v-model="Time.time9.time"
                  label="心外科会诊"
                  placeholder="选择时间"
                  input-align="right"
                  readonly
                >
                  <template slot="right-icon">
                    <van-icon name="arrow" @click="isShow9 = !isShow9" />
                    <datetimepicker :field="'time9'" :is-show="isShow9" @choosedata="choosedata9"></datetimepicker>
                  </template>
                </van-field>

                <van-field label="夹层类型" required readonly>
                  <template slot="right-icon">
                    <van-radio-group v-model="treatmentView.interlayer_type" direction="horizontal">
                      <van-radio name="1">A型</van-radio>
                      <van-radio name="2">B型</van-radio>
                    </van-radio-group>
                  </template>
                </van-field>
                <van-field label="治疗策略" required readonly style="display: block">
                  <template slot="input">
                    <van-radio-group
                      v-model="treatmentView.treatment_strategy_code"
                      direction="horizontal"
                    >
                      <van-radio name="1">2h紧急介入治疗</van-radio>
                      <van-radio name="2">择期介入治疗</van-radio>
                      <van-radio name="3">保守治疗</van-radio>
                      <van-radio name="4">保守治疗</van-radio>
                      <van-radio name="5">外科手术</van-radio>
                      <van-radio name="6">其它(介入失败转为手术)</van-radio>
                    </van-radio-group>
                  </template>
                </van-field>
              </van-cell-group>
            </div>
            <!-- 肺动脉栓塞 -->
            <div v-show="treatmentView.cp_diagnosis_code == 5">
              <van-cell-group>
                <van-field label="影像学检查" required readonly>
                  <template slot="right-icon">
                    <van-checkbox-group v-model="feidongmai.yingxiangxue" direction="horizontal">
                      <van-checkbox name="1">急诊CT</van-checkbox>
                      <van-checkbox @change="changeweizuo" name="2">未做</van-checkbox>
                    </van-checkbox-group>
                  </template>
                </van-field>
                <div v-show="feidongmai.yingxiangxue.indexOf('1') != -1">
                  <van-field
                    v-model="Time.time14.time"
                    label="通知CT室"
                    placeholder="选择时间"
                    input-align="right"
                    readonly
                    required
                  >
                    <template slot="right-icon">
                      <van-icon name="arrow" @click="isShow14 = !isShow14" />
                      <datetimepicker
                        :field="'time14'"
                        :is-show="isShow14"
                        @choosedata="choosedata14"
                      ></datetimepicker>
                    </template>
                  </van-field>
                  <van-field
                    v-model="Time.time15.time"
                    label="CT室完成准备"
                    placeholder="选择时间"
                    input-align="right"
                    readonly
                    required
                  >
                    <template slot="right-icon">
                      <van-icon name="arrow" @click="isShow15 = !isShow15" />
                      <datetimepicker
                        :field="'time15'"
                        :is-show="isShow15"
                        @choosedata="choosedata15"
                      ></datetimepicker>
                    </template>
                  </van-field>
                  <van-field
                    v-model="Time.time16.time"
                    label="CT扫描开始"
                    placeholder="选择时间"
                    input-align="right"
                    readonly
                  >
                    <template slot="right-icon">
                      <van-icon name="arrow" @click="isShow16 = !isShow16" />
                      <datetimepicker
                        :field="'time16'"
                        :is-show="isShow16"
                        @choosedata="choosedata16"
                      ></datetimepicker>
                    </template>
                  </van-field>

                  <van-field
                    v-model="Time.time17.time"
                    label="CT报告时间"
                    placeholder="选择时间"
                    input-align="right"
                    readonly
                  >
                    <template slot="right-icon">
                      <van-icon name="arrow" @click="isShow17 = !isShow17" />
                      <datetimepicker
                        :field="'time17'"
                        :is-show="isShow17"
                        @choosedata="choosedata17"
                      ></datetimepicker>
                    </template>
                  </van-field>
                </div>
                <van-field label="危险分层" readonly>
                  <template slot="right-icon">
                    <van-radio-group v-model="treatmentView.risk_lamination" direction="horizontal">
                      <van-radio name="1">高危</van-radio>
                      <van-radio name="2">中危</van-radio>
                      <van-radio name="3">低危</van-radio>
                    </van-radio-group>
                  </template>
                </van-field>
                <van-field
                  v-model="Time.time13.time"
                  label="开始抗凝治疗"
                  placeholder="选择时间"
                  input-align="right"
                  readonly
                >
                  <template slot="right-icon">
                    <van-icon name="arrow" @click="isShow13 = !isShow13" />
                    <datetimepicker
                      :field="'time13'"
                      :is-show="isShow13"
                      @choosedata="choosedata13"
                    ></datetimepicker>
                  </template>
                </van-field>

                <van-field label="溶栓筛查" readonly required>
                  <template slot="right-icon">
                    <van-radio-group v-model="treatmentView.screening" direction="horizontal">
                      <van-radio name="1">合适</van-radio>
                      <van-radio name="2">不合适</van-radio>
                      <van-radio name="3">未筛查</van-radio>
                    </van-radio-group>
                  </template>
                </van-field>
                <div v-show="treatmentView.screening == 1">
                  <van-field label="溶栓治疗" readonly required>
                    <template slot="right-icon">
                      <van-radio-group
                        v-model="treatmentView.throm_contraindicatio"
                        direction="horizontal"
                      >
                        <van-radio name="1">是</van-radio>
                        <van-radio name="2">否</van-radio>
                      </van-radio-group>
                    </template>
                  </van-field>
                </div>
                <div v-show="treatmentView.screening == 2">
                  <van-field label="存在禁忌症" readonly required>
                    <template slot="right-icon">
                      <van-radio-group v-model="feidongmai.jinjizheng" direction="horizontal">
                        <van-radio name="1">是</van-radio>
                        <van-radio name="2">否</van-radio>
                      </van-radio-group>
                    </template>
                  </van-field>
                </div>
              </van-cell-group>
            </div>
            <!-- 非ACS心源性胸痛 -->
            <!-- 找不到接口对应字段名 -->
            <div v-show="treatmentView.cp_diagnosis_code == 6">
              <van-cell-group>
                <van-field
                  label="非ACS心源性胸痛类型"
                  readonly
                  style="display: block; width:100%;"
                  required
                >
                  <template slot="input">
                    <div class="anniu">
                      <div
                        class="no_rulesbtn"
                        :class="{
                        no_rulesbtn2: chooseAfterValue.indexOf(item.title) != -1
                      }"
                        v-for="(item, index) in list1"
                        :key="index"
                        @click="choosely(item.title)"
                      >
                        <span>{{ item.title }}</span>
                      </div>
                    </div>
                  </template>
                </van-field>
                <van-field label="处理措施" readonly style="display: block;" required>
                  <template slot="input">
                    <van-radio-group v-model="ACS.chulicuoshi" direction="horizontal">
                      <van-radio name="1">收治入院</van-radio>
                      <van-radio name="2">急诊留观</van-radio>
                      <van-radio name="3">门诊治疗</van-radio>
                      <van-radio name="4">随访</van-radio>
                    </van-radio-group>
                  </template>
                </van-field>
                <van-field
                  v-model="ACS.beihzu"
                  label="患者情况备注"
                  placeholder="点击输入文本"
                  input-align="right"
                />
                <p class="tips">此选择表示胸痛诊疗结束，不再继续跟踪患者的救治情况！</p>
              </van-cell-group>
            </div>
            <!-- 其它非心源性胸痛类型 -->
            <div v-show="treatmentView.cp_diagnosis_code == 7">
              <van-cell-group>
                <!-- 找不到接口对应字段名 -->
                <van-field label="其它非心源性胸痛类型" readonly style="display: block;" required>
                  <template slot="input">
                    <div class="anniu">
                      <div
                        class="no_rulesbtn"
                        :class="{
                            no_rulesbtn2: chooseAfterValue.indexOf(item.title) != -1
                        }"
                        v-for="(item, index) in list2"
                        :key="index"
                        @click="choosely(item.title)"
                      >
                        <span>{{ item.title }}</span>
                      </div>
                    </div>
                  </template>
                </van-field>
                <van-field label="处理措施" readonly style="display: block;" required>
                  <template slot="input">
                    <van-radio-group v-model="qita.chulicuoshi" direction="horizontal">
                      <van-radio name="1">收治入院</van-radio>
                      <van-radio name="2">急诊留观</van-radio>
                      <van-radio name="3">门诊治疗</van-radio>
                      <van-radio name="4">随访</van-radio>
                    </van-radio-group>
                  </template>
                </van-field>
                <van-field
                  v-model="qita.beihzu"
                  label="患者情况备注"
                  placeholder="点击输入文本"
                  input-align="right"
                />
                <p class="tips">此选择表示胸痛诊疗结束，不再继续跟踪患者的救治情况！</p>
              </van-cell-group>
            </div>
            <!-- 待查 -->
            <div v-show="treatmentView.cp_diagnosis_code == 8">
              <van-cell-group>
                <van-field label="处理措施" readonly style="display: block;" required>
                  <template slot="input">
                    <van-radio-group v-model="daicha.chulicuoshi" direction="horizontal">
                      <van-radio name="1">收治入院</van-radio>
                      <van-radio name="2">急诊留观</van-radio>
                      <van-radio name="3">门诊治疗</van-radio>
                      <van-radio name="4">随访</van-radio>
                    </van-radio-group>
                  </template>
                </van-field>
                <van-field
                  v-model="daicha.beihzu"
                  label="患者情况备注"
                  placeholder="点击输入文本"
                  input-align="right"
                />
                <p class="tips">此选择表示胸痛诊疗结束，不再继续跟踪患者的救治情况！</p>
              </van-cell-group>
            </div>
          </van-cell-group>
        </div>
        <!-- 初始药物 -->
        <div v-show="curId_tab === 2">
          <van-cell-group>
            <van-field label="抗血小板治疗" readonly>
              <template slot="right-icon">
                <van-radio-group v-model="treatmentView.is_drug " direction="horizontal">
                  <van-radio name="1">是</van-radio>
                  <van-radio name="2">否</van-radio>
                </van-radio-group>
              </template>
            </van-field>
            <div v-show="treatmentView.is_drug === '1'">
              <van-field label="阿司匹林" readonly class="label1">
                <template slot="right-icon">
                  <van-radio-group v-model="emergencyView.aspirin_dose" direction="horizontal">
                    <van-radio name="1">0mg</van-radio>
                    <van-radio name="2">100mg</van-radio>
                    <van-radio name="3">300mg</van-radio>
                    <van-radio name="4">其他剂量</van-radio>
                  </van-radio-group>
                </template>
              </van-field>
              <van-field label="阿司匹林时间" readonly placeholder="选择时间" input-align="right">
                <template slot="right-icon">
                  <van-icon name="arrow" />
                </template>
              </van-field>
              <van-field label="氯吡格雷" readonly class="label1">
                <template slot="right-icon">
                  <van-radio-group v-model="emergencyView.clopidogrel_dose" direction="horizontal">
                    <van-radio name="1">0mg</van-radio>
                    <van-radio name="2">100mg</van-radio>
                    <van-radio name="3">300mg</van-radio>
                    <van-radio name="4">其他剂量</van-radio>
                  </van-radio-group>
                </template>
              </van-field>
              <van-field label="氯吡格雷时间" placeholder="选择时间" input-align="right">
                <template slot="right-icon">
                  <van-icon name="arrow" />
                </template>
              </van-field>
              <van-field label="替格瑞洛" readonly style="width: auto;display: block;margin: auto;">
                <template slot="right-icon">
                  <van-radio-group v-model="emergencyView.ticagrelor_dose" direction="horizontal">
                    <van-radio name="1">0mg</van-radio>
                    <van-radio name="2">100mg</van-radio>
                    <van-radio name="3">300mg</van-radio>
                    <van-radio name="4">其他剂量</van-radio>
                  </van-radio-group>
                </template>
              </van-field>
              <van-field label="替格瑞洛时间" readonly placeholder="选择时间" input-align="right">
                <template slot="right-icon">
                  <van-icon name="arrow" />
                </template>
              </van-field>
            </div>
            <van-field label="术前抗凝" readonly style="width: auto;display: block;margin: auto;">
              <template slot="right-icon">
                <van-radio-group v-model="yaowu.shuqian" direction="horizontal">
                  <van-radio name="1">是</van-radio>
                  <van-radio name="2">否</van-radio>
                </van-radio-group>
              </template>
            </van-field>
            <div v-show="yaowu.shuqian === '1'">
              <van-field
                label="剂量"
                v-model="treatmentView.anticoagulation_dose"
                readonly
                input-align="right"
              >
                <template slot="right-icon">{{this.treatmentView.anticoagulation_unit}}</template>
              </van-field>
              <!-- 抗凝药物（普通肝素、低分子肝素、比伐卢定、磺达肝癸钠） -->
              <van-field label="抗凝药物" readonly input-align="right">
                <template slot="right-icon">
                  <van-icon name="arrow" />
                </template>
              </van-field>
              <van-field label="抗凝给药时间" readonly placeholder="选择时间" input-align="right">
                <template slot="right-icon">
                  <van-icon name="arrow" />
                </template>
              </van-field>
            </div>
            <van-field label="他汀治疗" readonly>
              <template slot="right-icon">
                <van-radio-group
                  v-model="treatmentView.intensify_statins_treat"
                  direction="horizontal"
                >
                  <van-radio name="1">是</van-radio>
                  <van-radio name="2">否</van-radio>
                </van-radio-group>
              </template>
            </van-field>
            <van-field label="β受体阻滞剂" readonly>
              <template slot="right-icon">
                <van-radio-group
                  v-model="treatmentView.receptor_retardant_using"
                  direction="horizontal"
                >
                  <van-radio name="1">是</van-radio>
                  <van-radio name="2">否</van-radio>
                </van-radio-group>
              </template>
            </van-field>
          </van-cell-group>
        </div>
        <!-- 措施 -->
        <div v-show="curId_tab === 3">
          <van-cell-group>
            <van-field label="再灌注措施" readonly>
              <template slot="right-icon">
                <van-radio-group v-model="treatmentView.is_reperfusion" direction="horizontal">
                  <van-radio name="1">是</van-radio>
                  <van-radio name="2">否</van-radio>
                </van-radio-group>
              </template>
            </van-field>
            <div v-show="treatmentView.is_reperfusion === '1'">
              <van-field label="措施" required readonly style="display: block">
                <template slot="input">
                  <van-radio-group
                    v-model="treatmentView.measures"
                    direction="horizontal"
                    v-for="(val, index) in list5"
                    :key="index"
                  >
                    <van-radio :name="index + 1" @click="clickBtn3(index + 1)">
                      {{
                      val.title
                      }}
                    </van-radio>
                  </van-radio-group>
                </template>
              </van-field>
              <!-- 直接PCI -->
              <div v-show="treatmentView.measures == '1'">
                <van-cell-group>
                  <van-field
                    v-model="treatmentView.measures_doctor_name"
                    label="决定医生"
                    input-align="right"
                    placeholder="点击输入文本"
                  />
                  <van-field
                    label="决定介入手术"
                    readonly
                    required
                    placeholder="选择时间"
                    input-align="right"
                  >
                    <template slot="right-icon">
                      <van-icon name="arrow" />
                    </template>
                  </van-field>
                  <van-field label="启动导管室" readonly required placeholder="选择时间" input-align="right">
                    <template slot="right-icon">
                      <van-icon name="arrow" />
                    </template>
                  </van-field>
                  <van-field
                    label="开始知情同意"
                    readonly
                    required
                    placeholder="选择时间"
                    input-align="right"
                  >
                    <template slot="right-icon">
                      <van-icon name="arrow" />
                    </template>
                  </van-field>
                  <van-field
                    label="签署知情同意"
                    readonly
                    required
                    placeholder="选择时间"
                    input-align="right"
                  >
                    <template slot="right-icon">
                      <van-icon name="arrow" />
                    </template>
                  </van-field>
                </van-cell-group>
              </div>
              <!-- 溶栓 -->
              <div v-show="treatmentView.measures == '2'">
                <van-cell-group>
                  <van-field label="溶栓后措施" readonly required>
                    <template slot="right-icon">
                      <van-radio-group v-model="cuoshi.rongshuanghcs" direction="horizontal">
                        <van-radio name="1">补救PCI</van-radio>
                        <van-radio name="2">溶栓后介入</van-radio>
                      </van-radio-group>
                    </template>
                  </van-field>
                  <div v-show="cuoshi.rongshuanghcs === '1'">
                    <van-field label="决定介入手术" readonly placeholder="选择时间" input-align="right">
                      <template slot="right-icon">
                        <van-icon name="arrow" />
                      </template>
                    </van-field>
                  </div>
                  <van-field label="溶栓筛查" readonly required>
                    <template slot="right-icon">
                      <van-radio-group v-model="cuoshi.shaicha" direction="horizontal">
                        <van-radio name="1">合适</van-radio>
                        <van-radio name="2">不合适</van-radio>
                        <van-radio name="3">未筛查</van-radio>
                      </van-radio-group>
                    </template>
                  </van-field>
                  <div v-show="cuoshi.shaicha === '1'">
                    <van-field label="溶栓治疗" readonly required>
                      <template slot="right-icon">
                        <van-radio-group v-model="cuoshi.zhiliao" direction="horizontal">
                          <van-radio name="1">有</van-radio>
                          <van-radio name="2">无</van-radio>
                        </van-radio-group>
                      </template>
                    </van-field>
                  </div>
                  <div v-show="cuoshi.zhiliao==1">
                    <van-field label="直达溶栓场所" readonly required>
                      <template slot="right-icon">
                        <van-radio-group v-model="treatmentView.is_direct" direction="horizontal">
                          <van-radio name="1">是</van-radio>
                          <van-radio name="2">否</van-radio>
                        </van-radio-group>
                      </template>
                    </van-field>
                    <van-field label="溶栓场所" readonly required>
                      <template slot="right-icon">
                        <van-radio-group
                          v-model="treatmentView.throm_treatment_place"
                          direction="horizontal"
                        >
                          <van-radio name="1">其它医院</van-radio>
                          <van-radio name="2">救护车</van-radio>
                        </van-radio-group>
                      </template>
                    </van-field>
                    <!-- <van-field
                    v-model="throm.start_agree_time.time"
                    label="开始知情同意"
                    placeholder="选择时间"
                    input-align="right"
                    readonly
                    required
                  >
                    <template slot="right-icon">
                      <van-icon name="arrow" @click="isShow18 = !isShow18" />
                      <datetimepicker
                        :field="'start_agree_time'"
                        :is-show="isShow18"
                        @choosedata="choosedata18"
                      ></datetimepicker>
                    </template>
                  </van-field>
                  <van-field
                    v-model="throm.sign_agree_time.time"
                    label="签署知情同意"
                    placeholder="选择时间"
                    input-align="right"
                    readonly
                    required
                  >
                    <template slot="right-icon">
                      <van-icon name="arrow" @click="isShow19 = !isShow19" />
                      <datetimepicker
                        :field="'sign_agree_time'"
                        :is-show="isShow19"
                        @choosedata="choosedata19"
                      ></datetimepicker>
                    </template>
                  </van-field>
                  <van-field
                    v-model="throm.throm_start_time.time"
                    label="开始溶栓"
                    placeholder="选择时间"
                    input-align="right"
                    readonly
                    required
                  >
                    <template slot="right-icon">
                      <van-icon name="arrow" @click="isShow20 = !isShow20" />
                      <datetimepicker
                        :field="'throm_start_time'"
                        :is-show="isShow20"
                        @choosedata="choosedata20"
                      ></datetimepicker>
                    </template>
                  </van-field>
                  <van-field
                    v-model="throm.throm_end_time.time"
                    label="溶栓结束"
                    placeholder="选择时间"
                    input-align="right"
                    readonly
                    required
                  >
                    <template slot="right-icon">
                      <van-icon name="arrow" @click="isShow21 = !isShow21" />
                      <datetimepicker
                        :field="'throm_end_time'"
                        :is-show="isShow21"
                        @choosedata="choosedata21"
                      ></datetimepicker>
                    </template>
                    </van-field>-->
                    <van-field label="溶栓药物" readonly required>
                      <template slot="right-icon">
                        <van-radio-group
                          v-model="treatmentView.throm_drug_type"
                          direction="horizontal"
                        >
                          <van-radio name="1">第一代</van-radio>
                          <van-radio name="2">第二代</van-radio>
                          <van-radio name="3">第三代</van-radio>
                        </van-radio-group>
                      </template>
                    </van-field>
                    <van-field label="剂量" readonly required>
                      <template slot="right-icon">
                        <van-radio-group
                          v-model="treatmentView.throm_drug_code"
                          direction="horizontal"
                        >
                          <van-radio name="1">全量</van-radio>
                          <van-radio name="2">半量</van-radio>
                        </van-radio-group>
                      </template>
                    </van-field>
                    <van-field label="溶栓再通" readonly required>
                      <template slot="right-icon">
                        <van-radio-group
                          v-model="treatmentView.is_repatency"
                          direction="horizontal"
                        >
                          <van-radio name="1">是</van-radio>
                          <van-radio name="2">否</van-radio>
                        </van-radio-group>
                      </template>
                    </van-field>
                  </div>
                  <div v-show="cuoshi.shaicha === '2'">
                    <van-field label="存在禁忌症" readonly required>
                      <template slot="right-icon">
                        <van-radio-group v-model="cuoshi.jingjixiang" direction="horizontal">
                          <van-radio name="1">有</van-radio>
                          <van-radio name="2">无</van-radio>
                        </van-radio-group>
                      </template>
                    </van-field>
                  </div>
                </van-cell-group>
              </div>
              <!-- 择期介入 -->
              <div v-show="treatmentView.measures == '3'">
                <van-cell-group>
                  <van-field
                    label="决定介入手术"
                    readonly
                    required
                    placeholder="选择时间"
                    input-align="right"
                  >
                    <template slot="right-icon">
                      <van-icon name="arrow" />
                    </template>
                  </van-field>
                  <van-field label="造影开始" readonly required placeholder="选择时间" input-align="right">
                    <template slot="right-icon">
                      <van-icon name="arrow" />
                    </template>
                  </van-field>
                </van-cell-group>
              </div>
              <!-- CABG -->
              <div v-show="treatmentView.measures == '4'">
                <van-cell-group>
                  <van-field
                    label="决定CABG"
                    readonly
                    required
                    placeholder="选择时间"
                    input-align="right"
                  >
                    <template slot="right-icon">
                      <van-icon name="arrow" />
                    </template>
                  </van-field>
                  <van-field
                    label="开始CABG"
                    readonly
                    required
                    placeholder="选择时间"
                    input-align="right"
                  >
                    <template slot="right-icon">
                      <van-icon name="arrow" />
                    </template>
                  </van-field>
                </van-cell-group>
              </div>
              <!-- 转运PCI -->
              <div v-show="treatmentView.measures == '5'">
                <van-cell-group>
                  <van-field label="转运PCI" readonly required>
                    <template slot="right-icon">
                      <van-radio-group v-model="cuoshi.PCI" direction="horizontal">
                        <van-radio name="1">转出患者</van-radio>
                        <van-radio name="2">接收患者</van-radio>
                      </van-radio-group>
                    </template>
                  </van-field>
                </van-cell-group>
              </div>
            </div>
            <!-- 无再灌注措施 -->
            <div v-show="treatmentView.is_reperfusion === '2'">
              <van-field label="无再灌注措施" readonly style="display: block;" required>
                <template slot="input">
                  <div class="anniu">
                    <div
                      class="no_rulesbtn"
                      :class="{
                        no_rulesbtn2: chooseAfterValue.indexOf(item.title) != -1
                      }"
                      v-for="(item, index) in list3"
                      :key="index"
                      @click="choosely(item.title)"
                    >
                      <span>{{ item.title }}</span>
                    </div>
                  </div>
                </template>
              </van-field>
            </div>
          </van-cell-group>
        </div>
        <!-- Grace评估 -->
        <div v-show="curId_tab === 4">
          <van-cell-group>
            <van-field readonly label-width="200px" style="display: block;">
              <template slot="input">
                <div class="anniu">
                  <div
                    class="no_rulesbtn"
                    :class="{
                    no_rulesbtn2: chooseAfterValue1.indexOf(item.text) != -1
                  }"
                    v-for="(item, index) in List3"
                    :key="index"
                    @click="choosely1(item.text)"
                  >
                    <span>{{ item.text }}</span>
                  </div>
                </div>
              </template>
            </van-field>
            <van-field label="极高危条件" readonly label-width="200px" style="display: block;">
              <template slot="input">
                <div class="anniu">
                  <div
                    class="no_rulesbtn"
                    :class="{
                    no_rulesbtn2: chooseAfterValue.indexOf(item.text) != -1
                  }"
                    v-for="(item, index) in List4"
                    :key="index"
                    @click="choosely(item.text)"
                  >
                    <span>{{ item.text }}</span>
                  </div>
                </div>
              </template>
            </van-field>
            <div v-show="this.chooseAfterValue==0">
              <van-field
                label="Grace分值"
                v-model="emergencyView.grace_value"
                readonly
                placeholder="分值自动计算"
                label-width="130px"
              >
                <template slot="right-icon">
                  <button>计算</button>
                  <button>评分</button>
                </template>
              </van-field>
            </div>
            <van-field label="NSTE-ACS危险分层" readonly label-width="130px" style="display: block;">
              <template slot="right-icon">
                <van-radio-group v-model="emergencyView.risk_lamination" direction="horizontal">
                  <van-radio name="1">极高危</van-radio>
                  <van-radio name="2">高危</van-radio>
                  <van-radio name="3">中危</van-radio>
                  <van-radio name="4">低危</van-radio>
                </van-radio-group>
              </template>
            </van-field>
          </van-cell-group>
        </div>
        <!-- 再次分层 -->
        <div v-show="curId_tab === 5">
          <van-cell-group>
            <van-field label="再次危险分层" readonly style="display: block">
              <template slot="input">
                <van-radio-group
                  v-model="emergencyView.risk_lamination_ag"
                  direction="horizontal"
                  v-for="(val, index) in list4"
                  :key="index"
                >
                  <van-radio :name="index + 1" @click="clickBtn2(index + 1)">
                    {{
                    val.title
                    }}
                  </van-radio>
                </van-radio-group>
              </template>
            </van-field>
            <div
              v-show="emergencyView.risk_lamination_ag==2 || emergencyView.risk_lamination_ag==3||emergencyView.risk_lamination_ag==4||emergencyView.risk_lamination_ag==5||emergencyView.risk_lamination_ag==6"
            >
              <van-field label="再次危险分层" readonly placeholder="选择时间" input-align="right">
                <template slot="right-icon">
                  <van-icon name="arrow" />
                </template>
              </van-field>
            </div>
          </van-cell-group>
        </div>
        <!-- 处理策略-->
        <div v-show="curId_tab === 6">
          <van-cell-group>
            <van-field label="策略" required readonly style="display: block">
              <template slot="input">
                <van-radio-group
                  v-model="treatmentView.strategy"
                  direction="horizontal"
                  v-for="(val, index) in list7"
                  :key="index"
                >
                  <van-radio :name="index + 1">
                    {{
                    val.title
                    }}
                  </van-radio>
                </van-radio-group>
              </template>
            </van-field>
            <div v-show="treatmentView.strategy==2">
              <van-field label="侵入性策略" required readonly style="display: block">
                <template slot="input">
                  <van-radio-group
                    v-model="treatmentView.is_bypass_ccu"
                    direction="horizontal"
                    v-for="(val, index) in list6"
                    :key="index"
                  >
                    <van-radio :name="index + 1">
                      {{
                      val.title
                      }}
                    </van-radio>
                  </van-radio-group>
                </template>
              </van-field>
            </div>
            <div v-show="treatmentView.is_bypass_ccu==1">
              <van-field
                v-model="treatmentView.measures_doctor_name"
                label="决定医生"
                input-align="right"
                placeholder="点击输入文本"
              />
              <van-field label="决定介入手术" readonly required placeholder="选择时间" input-align="right">
                <template slot="right-icon">
                  <van-icon name="arrow" />
                </template>
              </van-field>
              <van-field label="启动导管室" readonly required placeholder="选择时间" input-align="right">
                <template slot="right-icon">
                  <van-icon name="arrow" />
                </template>
              </van-field>
              <van-field label="开始知情同意" readonly required placeholder="选择时间" input-align="right">
                <template slot="right-icon">
                  <van-icon name="arrow" />
                </template>
              </van-field>
              <van-field label="签署知情同意" readonly required placeholder="选择时间" input-align="right">
                <template slot="right-icon">
                  <van-icon name="arrow" />
                </template>
              </van-field>
            </div>
            <div v-show="treatmentView.is_bypass_ccu==2">
              <van-field label="实际介入治疗" readonly required placeholder="选择时间" input-align="right">
                <template slot="right-icon">
                  <van-icon name="arrow" />
                </template>
              </van-field>
            </div>
          </van-cell-group>
        </div>
        <!-- 院内溶栓-->
        <div v-show="curId_tab === 7">
          <van-cell-group>
            <van-field label="策略" required readonly>
              <template slot="right-icon">
                <van-radio-group v-model="treatmentView.strategy" direction="horizontal">
                  <van-radio name="1">保守治疗（仅药物治疗）</van-radio>
                  <van-radio name="2">侵入性策略</van-radio>
                </van-radio-group>
              </template>
            </van-field>
            <div v-show="treatmentView.strategy==1">
              <van-field label="侵入性策略" required readonly>
                <template slot="right-icon">
                  <van-radio-group v-model="treatmentView.is_bypass_ccu" direction="horizontal">
                    <van-radio name="1">2H紧急介入治疗</van-radio>
                    <van-radio name="2">24H内介入治疗</van-radio>
                    <van-radio name="3">72H内介入治疗</van-radio>
                    <van-radio name="4">择期介入治疗</van-radio>
                    <van-radio name="5">CABG</van-radio>
                  </van-radio-group>
                </template>
              </van-field>
            </div>
            <div v-show="treatmentView.is_bypass_ccu==1">
              <van-field
                v-model="treatmentView.measures_doctor_name"
                label="决定医生"
                input-align="right"
                placeholder="点击输入文本"
              />
              <van-field label="决定介入手术" readonly required placeholder="选择时间" input-align="right">
                <template slot="right-icon">
                  <van-icon name="arrow" />
                </template>
              </van-field>
              <van-field label="启动导管室" readonly required placeholder="选择时间" input-align="right">
                <template slot="right-icon">
                  <van-icon name="arrow" />
                </template>
              </van-field>
              <van-field label="开始知情同意" readonly required placeholder="选择时间" input-align="right">
                <template slot="right-icon">
                  <van-icon name="arrow" />
                </template>
              </van-field>
              <van-field label="签署知情同意" readonly required placeholder="选择时间" input-align="right">
                <template slot="right-icon">
                  <van-icon name="arrow" />
                </template>
              </van-field>
            </div>
            <div v-show="treatmentView.is_bypass_ccu==2">
              <van-field label="实际介入治疗" readonly required placeholder="选择时间" input-align="right">
                <template slot="right-icon">
                  <van-icon name="arrow" />
                </template>
              </van-field>
            </div>
          </van-cell-group>
        </div>
      </div>
      <div class="footer">
        <van-button round color="#4676FB" size="large" @click="interface3">保存</van-button>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
@import url("../assets/css/base.scss");
@import url("../assets/css/hackcss.css");
// hack修改当前的flex布局后不换行的问题
/deep/ .van-field__control--custom {
  flex-wrap: wrap;
}
.view {
  // 菜单
  .dropdown {
    display: inline-block;
    position: relative;
    .ullist {
      width: 170px;
      height: 220px;
      font-size: 12px;
      position: absolute;
      top: 43px;
      left: -122px;
      color: black;
      background-color: #fff;
      z-index: 999;
      text-align: left;
      li {
        height: 30px;
        padding-left: 30px;
        border-bottom: 1px solid #efefef;
      }
      & :last-child {
        border-bottom: none;
      }
      // li:hover {
      //     color: #3A5BA4;
      // }
    }
  }
  position: relative;
  height: 100%;
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
  //   点击的按钮颜色
  .no_rulesbtn2 {
    background-color: #42bd58;
    color: #fff;
  }
}
.tips {
  color: red;
  font-size: 12px;
  padding-left: 13px;
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
/* hack将当前的vant组件的选中radio全部进行替换取代 */
/* /deep/ .van-radio__icon {
  border-color: black;
  border-radius: 50%;
} */
/* /deep/ .van-radio__icon--round {
  color: #000;
} */
</style>
<script>
import { queryTreatmentViewByPatId } from "../api/index.js";
import Datetimepicker from "../components/Datetimepicker";
import headerCom from "../components/Header";
import { saveTreatmentView } from "../api/index.js";

export default {
  components: {
    headerCom,
    queryTreatmentViewByPatId,
    Datetimepicker,
    saveTreatmentView,
  },
  data() {
    return {
      // 测试保存接口数据
      treatmentView: {
        angiographic_site: "",
        ccu_leave_date: "",
        ct_into_date: "",
        ct_leave_date: "",
        patient_leave_conduit_time: "",
        measures_thrombolysis: "",
        measures_doctor_name: "",
        tpci_type: "",
        screening: "",
        strategy: "",
        invasive_strategy: "",
        img_examination_none: "",
        function_test_value: "",
        remote_ecgtran_way: "",
        actual_intervention_date: "",
        throm_sift_dt: "",
        isconductreassessment: "",
        infarct_position_sixteen: "",
        infarct_position_seventeen: "",
        infarct_position_eighteen: "",
        infarct_position_nineteen: "",
        infarct_position_twenty: "",
        infarct_position_twentyone: "",
        measures: "",
        pk_pat_info: "1001A0100000004M2ZNC",
        is_empci: "",
        cardiologist: "",
        consultation_date: "",
        cp_diagnosis_code: "",
        diagnosis_time: "",
        give_up_treatment: "",
        acs_delivery_time: "",
        aspirin_dose: "",
        acs_drug_type: "",
        acs_drug_dose: "",
        intensify_statins_treat: "",
        receptor_retardant_using: "",
        killip_level: "",
        is_emergency_drug: "",
        diagnosis_unit_code_dt: "",
        nstemi_type: "",
        is_cdu: "",
        is_mri: "",
        notice_cdu_time: "",
        cdu_check_date: "",
        check_result_date: "",
        imcd_notice_date: "",
        ecc_consultation_date: "",
        interlayer_type: "",
        treatment_strategy_code: "",
        ccu_into_date: "",
        start_treate_date: "",
        stand_rid_date: "",
        start_operate_agree_time: "",
        sign_operate_agree_time: "",
        other_treatment_measure: "",
        is_ect: "",
        ct_notice_date: "",
        ct_finish_date: "",
        ct_scan_date: "",
        ct_report_date: "",
        risk_lamination: "",
        anti_treatment_date: "",
        throm_radiography_time: "",
        is_repci: "",
        is_emradiography: "",
        is_tpci: "",
        is_elpci: "",
        is_elradiography: "",
        is_cabg: "",
        is_thrombolysis_dt: "",
        is_noreperfusion: "",
        doctor_name: "",
        start_conduit_time: "",
        start_agree_time: "",
        sign_agree_time: "",
        decision_operation_time: "",
        decision_cabg_time: "",
        start_cabg_time: "",
        is_direct: "",
        throm_start_agree_time: "",
        throm_sign_agree_time: "",
        throm_start_time_dt: "",
        throm_end_time_dt: "",
        throm_drug_type_dt: "",
        throm_drug_code_dt: "",
        is_repatency_dt: "",
        perfusion_measure_code: "",
        is_repother: "",
        dtwob_time: "",
        is_delay: "",
        delay_reason_other: "",
        activate_conduit_time: "",
        patient_arrived_conduit_time: "",
        intervention_person: "",
        start_puncture_time: "",
        start_radiography_time: "",
        anticoagulation_date: "",
        anticoagulation_drug: "",
        anticoagulation_dose: "",
        anticoagulation_unit: "",
        balloon_expansion_time: "",
        end_operation_time: "",
        time_interval: "",
        route: "",
        block: "",
        infarct_position_one: "",
        infarct_position_two: "",
        infarct_position_three: "",
        infarct_position_four: "",
        infarct_position_five: "",
        infarct_position_six: "",
        infarct_position_seven: "",
        infarct_position_eight: "",
        infarct_position_nine: "",
        infarct_position_ten: "",
        infarct_position_eleven: "",
        infarct_position_twelve: "",
        infarct_position_thirteen: "",
        infarct_position_fourteen: "",
        infarct_position_fifteen: "",
        narrow_level: "",
        preoperative_timi_level: "",
        postoperative_timi_level: "",
        bracket_thrombus: "",
        branching_sick: "",
        bracket_count: "",
        is_cto: "",
        is_not_culprit_vessel: "",
        narrow_position_one: "",
        narrow_position_two: "",
        narrow_position_three: "",
        narrow_position_four: "",
        narrow_position_five: "",
        remote_ecg_tran_date: "",
        pk_treatment: "1001A0100000004M2ZNG",
        narrow_position_six: "",
        narrow_position_seven: "",
        narrow_position_eight: "",
        narrow_position_nine: "",
        narrow_position_ten: "",
        narrow_position_eleven: "",
        narrow_position_twelve: "",
        narrow_position_thirteen: "",
        narrow_position_fourteen: "",
        narrow_position_fifteen: "",
        intracavity_image: "",
        function_test: "",
        thrombus_suction: "",
        iabp: "",
        pacemaker: "",
        ecmo: "",
        auxiliary_device: "",
        bracket_num: "",
        is_complication_arrhythmia: "",
        is_complication_hypotension: "",
        is_complication_slowflow: "",
        is_complication_interlayer: "",
        is_complication_occlusion: "",
        vascular_perforation: "",
        death: "",
        is_complication_nothing: "",
        another: "",
        ts: "2020-09-17 15:55:37",
        dr: 0,
        createtime: "2020-09-17 15:49:26",
        updatetime: "",
        creator: "lyz",
        pk_group: "1001",
        pk_org: "0001A0100000004KAF4U",
        modifer: "",
        def1: "",
        def2: "",
        def3: "",
        def4: "",
        def5: "",
        def6: "",
        def7: "",
        def8: "",
        def9: "",
        def10: "",
        def11: "",
        def12: "",
        def13: "",
        def14: "",
        def15: "",
        def16: "",
        def17: "",
        def18: "",
        def19: "",
        def20: "",
        infarct_position_twentytwo: "",
        infarct_position_twentythree: "",
        infarct_position_twentyfour: "",
        infarct_position_twentyfive: "",
        infarct_position_twentysix: "",
        infarct_position_twentyseven: "",
        narrow_position_sixteen: "",
        narrow_position_seventeen: "",
        narrow_position_eighteen: "",
        narrow_position_nineteen: "",
        narrow_position_twenty: "",
        narrow_position_twentyone: "",
        narrow_position_twentytwo: "",
        narrow_position_twentythree: "",
        narrow_position_twentyfour: "",
        narrow_position_sixteenfive: "",
        narrow_position_twentysix: "",
        narrow_position_twentyseven: "",
        delay_reasonb: "",
        delay_reasonc: "",
        delay_reasond: "",
        delay_reasone: "",
        delay_reasonf: "",
        delay_reasong: "",
        delay_reasonh: "",
        delay_reasoni: "",
        delay_reasonj: "",
        delay_reasonk: "",
        delay_reasonl: "",
        delay_reasonm: "",
        delay_reasonn: "",
        delay_reasono: "",
        delay_reasonp: "",
        delay_reasonq: "",
        delay_reasonr: "",
        delay_reasons: "",
        delay_reasont: "",
        delay_reasonu: "",
        is_reperfusion: "",
        delay_reasona: "",
        treatment_type: "",
        patient_remark: "",
        respiratory_diseases: "",
        digestive_diseases: "",
        nervous_diseases: "",
        psychosis_diseases: "",
        musculoskeletal_disease: "",
        dermatosis_disease: "",
        other_disease: "",
        throm_contraindication: "",
        cardiogenic_shock: "",
        severe_bradyarrhythmia: "",
        thromboembolism: "",
        is_noreperfusiontwo: "",
        is_noreperfusionthree: "",
        is_noreperfusionfour: "",
        is_noreperfusionfive: "",
        is_noreperfusionsix: "",
        is_noreperfusionseven: "",
        is_noreperfusioneight: "",
      },
      emergencyView: {
        pk_emergency: "1001A0100000004M2ZNF",
        pk_pat_info: "1001A0100000004M2ZNC",
        inhospital_ecg_time: "",
        inhospital_ecg_diagnose_time: "",
        consultation_time: "",
        decision_operation_time: "",
        start_conduit_time: "",
        cardiac_end_time: "",
        ct_notice_date: "",
        ct_report_date: "",
        nyha: "",
        ts: "2020-09-17 15:55:37",
        dr: "0",
        inhospital_ecg_image_base64: "",
        cp_diagnosis_code: "",
        acs_drug_dose: "",
        acs_drug_type: "",
        arrived_hospital_time: "2020-09-17 15:59",
        acs_delivery_time: "",
        has_ecg_image: "",
        no_ecg_image_reason: "",
        remote_ecg_transmission: "",
        tran_date: "",
        is_remote_ecgtran: "",
        is_ctnt: "",
        ctnt_value: "",
        ctnt_unit: "",
        ctnt_status: "",
        is_cr: "",
        cr_value: "",
        is_ddimer: "",
        ddimer: "",
        ddimer_unit: "",
        is_bnp: "",
        bnp: "",
        is_ntprobnp: "",
        ntprobnp: "",
        is_myo: "",
        myo_value: "",
        myo_unit: "",
        is_ckmb: "",
        ckmb_value: "",
        ckmb_unit: "",
        sampling_time: "",
        report_time: "",
        is_notice_imcd: "",
        imcd_type: "",
        notice_imcd_time: "",
        diagnosis_time: "",
        killip_level: "",
        is_bypass_emergency: "",
        is_bypass_ccu: "",
        arrhythmia: "",
        dcm: "",
        icm: "",
        hcm: "",
        carditis: "",
        chd: "",
        avhd: "",
        omi: "",
        ap: "",
        palpitate: "",
        af: "",
        hypertension: "",
        hf: "",
        atrialflutter: "",
        vpc: "",
        apb: "",
        st: "",
        pericarditis: "",
        hydropericardium: "",
        myocardial_bridge: "",
        is_drug: "",
        aspirin_dose: "",
        aspirin_time: "",
        clopidogrel_dose: "",
        clopidogrel_time: "",
        ticagrelor_dose: "",
        ticagrelor_time: "",
        is_anticoagulation: "",
        anticoagulation_drug: "",
        anticoagulation_dose: "",
        anticoagulation_unit: "",
        anticoagulation_date: "",
        intensify_statins_treat: "",
        receptor_retardant_using: "",
        r_aspirin_dose: "",
        r_clopidogrel_dose: "",
        r_ticagrelor_dose: "",
        is_change: "",
        is_arrest: "",
        is_rise: "",
        wgxxjt: "",
        xyxxk: "",
        yzxs: "",
        jxbfz: "",
        sxxlsc: "",
        grace_value: "",
        risk_lamination: "",
        risk_lamination_ag: "",
        risk_lamination_ag_time: "",
        arrived_emergency_time: "",
        bypass_emergency_leave_time: "",
      },
      outcomeView: {
        pk_outcome: "1001A0100000004M2ZNH",
        pk_pat_info: "1001A0100000004M2ZNC",
        is_direct_catheter: "",
        dr: "0",
        ts: "2020-09-17 15:55:37",
      },
      tLViewList: [],
      patEcgView: [],
      cAViewList: [],
      postType: 2,
      // 我是分割线----------------------
      show_ul: false, // 下拉框显隐
      // 菜单
      menuTitle: [
        // 下拉框标题
        {
          Title: "急救信息",
        },
        {
          Title: "检查信息",
        },
        {
          Title: "胸痛诊疗",
        },
        {
          Title: "导管室",
        },
        {
          Title: "患者转归",
        },
        {
          Title: "时间轴",
        },
        {
          Title: "评分",
        },
      ],
      // 接口数据
      emergencyView: {},
      treatmentView: {},
      //   ---------------------我是分割线--------------------------------------
      tabFlag: "0", //tab页（诊断）
      tabFlag2: "0", //tab页（再次危险分层）
      tabFlag3: "0", //tab页（措施）
      curId_tab: 0, //tab页内容
      //会诊--通知会诊
      isShow1: false,
      //会诊--会诊时间
      isShow2: false,
      //诊断--初步诊断时间
      isShow3: false,
      //诊断--主动脉夹层--影像学检查--急诊cT--通知CT室
      isShow4: false,
      //诊断--主动脉夹层--影像学检查--急诊cT--CT室完成时间
      isShow5: false,
      //诊断--主动脉夹层--影像学检查--急诊cT--CT扫描开始
      isShow6: false,
      //诊断--主动脉夹层--影像学检查--急诊cT--CT报告时间
      isShow7: false,
      //诊断--主动脉夹层--影像学检查--通知心外会诊
      isShow8: false,
      //诊断--主动脉夹层--影像学检查--心外科会诊
      isShow9: false,
      //诊断--主动脉夹层--影像学检查--彩超--通知彩超室
      isShow10: false,
      //诊断--主动脉夹层--影像学检查--彩超--彩超检查时间
      isShow11: false,
      //诊断--主动脉夹层--影像学检查--彩超--彩超出结果
      isShow12: false,
      //诊断--肺动脉栓塞--开始抗凝治疗
      isShow13: false,
      //诊断--肺动脉栓塞--影像学检查--急诊cT--通知CT室
      isShow14: false,
      //诊断--肺动脉栓塞--影像学检查--急诊cT--CT室完成时间
      isShow15: false,
      //诊断--肺动脉栓塞--影像学检查--急诊cT--CT扫描开始
      isShow16: false,
      ////诊断--肺动脉栓塞--影像学检查--急诊cT--CT报告时间
      isShow17: false,
      //诊断--肺动脉栓塞--影像学检查--彩超--彩超出结果
      isShow12: false,
      //诊断--肺动脉栓塞--开始抗凝治疗
      isShow13: false,
      //诊断--肺动脉栓塞--影像学检查--急诊cT--通知CT室
      isShow14: false,
      //诊断--肺动脉栓塞--影像学检查--急诊cT--CT室完成时间
      isShow15: false,
      //诊断--肺动脉栓塞--影像学检查--急诊cT--CT扫描开始
      isShow16: false,
      ////诊断--肺动脉栓塞--影像学检查--急诊cT--CT报告时间
      isShow17: false,

      //   时间控件
      Time: {
        time1: {
          time: "",
        },
        time2: {
          time: "",
        },

        time3: {
          time: "",
        },

        time4: {
          time: "",
        },

        time5: {
          time: "",
        },

        time6: {
          time: "",
        },

        time7: {
          time: "",
        },

        time8: {
          time: "",
        },

        time9: {
          time: "",
        },
        time10: {
          time: "",
        },

        time11: {
          time: "",
        },

        time12: {
          time: "",
        },
        time13: {
          time: "",
        },

        time14: {
          time: "",
        },

        time15: {
          time: "",
        },
        time16: {
          time: "",
        },
        time17: {
          time: "",
        },
      },
      huizhen: {
        //会诊
        xinneike: "1",
        leixing: "",
      },
      zhenduan: {
        //初步诊断
        hzziyuan: "",
        yisheng: "",
      },
      yaowu: {
        //初始药物
        kangxue: "",
        asipilin: "",
        lvsigelei: "",
        tigeruiluo: "",
        shuqian: "",
        zhiliao: "",
        βshouti: "",
      },
      cuoshi: {
        //措施
        zaiguangai: "1", //直接pci
        cuoshi: "1",
        yisheng: "",
        rongshuanghcs: "", //溶栓
        shaicha: "",
        zhiliao: "",
        jingjixiang: "",
        PCI: "", //转运PCI
      },
      fenceng: {
        //再次分层
        zaicifenceng: "",
      },
      List3: [
        //评估按钮
        { text: "发病后曾出现心脏骤停" },
        { text: "心电图ST段改变" },
        { text: "心肌坏死标志物升高" },
      ],
      List4: [
        //评估按钮
        { text: "急性心力衰竭" },
        { text: "血液动力学不稳定或心原性休克" },
        { text: "心肌梗死合并机械性并发症" },
        { text: "致命性心律失常或心脏骤停" },
        { text: "反复的ST-T动态演变，尤其是伴随间歇性ST段抬高" },
        { text: "药物治疗无效的反复发作或持续性胸痛" },
      ],
      Grace: {
        NSTE: "",
      },
      zhudongmai: {
        //主动脉夹层
        yingxiangxue: [],
        jiaceng: "",
        celue: "",
      },
      feidongmai: {
        //肺动脉栓塞
        yingxiangxue: [],
        weixian: "",
        rongshuang: "",
        rszhiliao: "",
        jinjizheng: "",
      },
      ua: {
        //ua
        fenji: "",
        jizhen: "",
        ccu: "",
      },
      ACS: {
        //非ACS心源性胸痛
        chulicuoshi: "",
        brizhu: "",
      },
      qita: {
        //其它非心源性胸痛类型
        chulicuoshi: "",
        brizhu: "",
      },
      daicha: {
        //待查
        chulicuoshi: "",
        brizhu: "",
      },
      list: [
        // 八个按钮内容
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
          title: "非ACS心源性胸痛",
        },
        {
          title: "其它非心源性胸痛",
        },
        {
          title: "待查",
        },
      ],
      list1: [
        //非ACS按钮
        {
          title: "心律失常",
        },
        {
          title: "扩张性心肌病",
        },
        {
          title: "缺血性心肌病",
        },
        {
          title: "肥厚型心肌病",
        },
        {
          title: "心肌炎",
        },
        {
          title: "冠心病",
        },
        {
          title: "瓣膜性心脏病",
        },
        {
          title: "陈旧性心肌梗死",
        },
        {
          title: "心绞痛",
        },
        {
          title: "心悸",
        },
        {
          title: "房颤",
        },
        {
          title: "高血压",
        },
        {
          title: "心衰",
        },
        {
          title: "房扑",
        },
        {
          title: "室早",
        },
        {
          title: "房早",
        },
        {
          title: "室上速",
        },
        {
          title: "心包炎",
        },
        {
          title: "心包积液",
        },
        {
          title: "心肌桥",
        },
        {
          title: "透壁性动脉粥样硬化性溃疡",
        },
        {
          title: "主动脉管壁间血肿",
        },
        {
          title: "主动脉瘤",
        },
        {
          title: "张力性气胸",
        },
      ],
      list2: [
        {
          title: "呼吸系统病",
        },
        {
          title: "消化系统病",
        },
        {
          title: "神经系统病",
        },
        {
          title: "肌肉骨骼病",
        },
        {
          title: "皮肤系统病",
        },
        {
          title: "其他",
        },
      ],
      list3: [
        {
          title: "生命体征平稳，无持续缺血表现",
        },
        {
          title: "超过再灌注时间窗",
        },
        {
          title: "高出血风险",
        },
        {
          title: "出血活动期",
        },
        {
          title: "严重肝肾功能不全",
        },
        {
          title: "经济原因限制",
        },
        {
          title: "拒绝或放弃",
        },
        {
          title: "其他原因",
        },
      ],
      list4: [
        // 八个按钮内容
        {
          title: "转为STEMI",
        },
        {
          title: "极高危",
        },
        {
          title: "高危",
        },
        {
          title: "中危",
        },
        {
          title: "低危",
        },
      ],
      list5: [
        // 八个按钮内容
        {
          title: "直接PCI",
        },
        {
          title: "溶栓",
        },
        {
          title: "择期介入",
        },
        {
          title: "CABG",
        },
        {
          title: "转运PCI",
        },
      ],
      list6: [
        {
          title: "2H紧急介入治疗",
        },
        {
          title: "24H内介入治疗",
        },
        {
          title: "72H内介入治疗",
        },
        {
          title: "择期介入治疗",
        },
        {
          title: "CABG",
        },
      ],
      list7: [
        {
          title: "保守治疗（仅药物治疗）",
        },
        {
          title: "侵入性策略",
        },
      ],
      chooseAfterValue: [], //选中按钮 极高危
      chooseAfterValue1: [],
    };
  },
  methods: {
    // 更改tab页函数
    // 参数：八个按钮索引值+1（诊断）
    clickBtn(index) {
      if (index == 1) {
        this.tabFlag = "1";
      } else if (index == 2 || index == 3) {
        this.tabFlag = "2";
      } else {
        this.tabFlag = "0";
      }
    },
    // 再次危险分层
    clickBtn2(index) {
      if (index == 1) {
        this.tabFlag2 = "1";
      } else {
        this.tabFlag2 = "0";
      }
    },
    // 措施
    clickBtn3(index) {
      if (index == 2) {
        this.tabFlag3 = "1";
      } else {
        this.tabFlag3 = "0";
      }
    },
    changeweizuo() {},
    // 选中按钮函数
    // 参数，按钮内容
    // 目的点击按钮有选中效果，改变按钮颜色
    choosely(value) {
      // 之前有这个按钮的title就删除title，实现点击两下取消的效果
      if (this.chooseAfterValue.indexOf(value) != -1) {
        console.log("chooseAfterValue1:", this.chooseAfterValue);
        this.chooseAfterValue.splice(this.chooseAfterValue.indexOf(value), 1);
        console.log("chooseAfterValue2:", this.chooseAfterValue);
      } else {
        // 没有这个按钮就在数组添加这个按钮的title，实现点击效果
        this.chooseAfterValue.push(value);
        console.log("chooseAfterValue3:", this.chooseAfterValue);
      }
    },
    choosely1(value) {
      // 之前有这个按钮的title就删除title，实现点击两下取消的效果
      if (this.chooseAfterValue1.indexOf(value) != -1) {
        console.log("chooseAfterValue1:", this.chooseAfterValue1);
        this.chooseAfterValue1.splice(this.chooseAfterValue1.indexOf(value), 1);
        console.log("chooseAfterValue2:", this.chooseAfterValue1);
      } else {
        // 没有这个按钮就在数组添加这个按钮的title，实现点击效果
        this.chooseAfterValue1.push(value);
        console.log("chooseAfterValue3:", this.chooseAfterValue1);
      }
    },
    Jump(id) {
      switch (id) {
        case 1:
          if (this.tabFlag1) {
            this.curId_tab1 = 1;
          } else {
            this.curId_tab2 = 1;
          }
          break;
        case 2:
          if (this.tabFlag1) {
            this.curId_tab1 = 2;
          } else {
            this.curId_tab2 = 2;
          }
          break;
        case 3:
          if (this.tabFlag1) {
            this.curId_tab1 = 3;
          } else {
            this.curId_tab2 = 3;
          }
          break;
        default:
      }
    },
    // 获取信息
    interface(state, states) {
      //   let datas = "1001A0100000004NOVLC";
      let paramsObj = {
        pageLocation: "数据上报",
        pk_pat_info: "1001A0100000004NOVOH",
      };
      //   let paramsObj = { pk_pat_info: datas };
      this.flag = true;
      queryTreatmentViewByPatId(paramsObj).then((res) => {
        console.log("res:", res);
        // emergencyView:急救信息

        this.emergencyView = res.results[0].emergencyView;
        console.log("emergencyView:", this.emergencyView);
        // treatmentView:诊疗数据
        this.treatmentView = res.results[0].treatmentView;
        console.log("lists:", res.results[0]);
      });
    },
    // 保存信息
    interface3() {
      let data = {
        treatmentView: this.treatmentView,
        emergencyView: this.emergencyView,
        outcomeView: this.outcomeView,
        tLViewList: this.tLViewList,
        patEcgView: this.patEcgView,
        cAViewList: this.cAViewList,
        emergencyObservationView: this.emergencyObservationView,
        postType: 2,
      };

      saveTreatmentView(data).then((res) => {
        console.log("resss:", res);
        this.lists1 = res.results[0];
      });
    },

    //会诊--通知会诊时间
    choosedata1(param) {
      this.Time[param.field].time = param.time;
      this.isShow1 = !this.isShow1;
    },
    //会诊--会诊时间
    choosedata2(param) {
      this.Time[param.field].time = param.time;
      this.isShow2 = !this.isShow2;
    },
    //诊断--初步诊断时间
    choosedata3(param) {
      this.Time[param.field].time = param.time;
      this.isShow3 = !this.isShow3;
    },
    //诊断--主动脉夹层--影像学检查--通知CT室
    choosedata4(param) {
      this.Time[param.field].time = param.time;
      this.isShow4 = !this.isShow4;
    },
    //诊断--主动脉夹层--影像学检查--CT室完成时间
    choosedata5(param) {
      this.Time[param.field].time = param.time;
      this.isShow5 = !this.isShow5;
    },
    //诊断--主动脉夹层--影像学检查--CT扫描开始
    choosedata6(param) {
      this.Time[param.field].time = param.time;
      this.isShow6 = !this.isShow6;
    },
    //诊断--主动脉夹层--影像学检查--CT报告时间
    choosedata7(param) {
      this.Time[param.field].time = param.time;
      this.isShow7 = !this.isShow7;
    },
    //诊断--主动脉夹层--影像学检查--通知心外会诊
    choosedata8(param) {
      this.Time[param.field].time = param.time;
      this.isShow8 = !this.isShow8;
    },
    //诊断--主动脉夹层--影像学检查--心外科会诊
    choosedata9(param) {
      this.Time[param.field].time = param.time;
      this.isShow9 = !this.isShow9;
    },
    //诊断--主动脉夹层--影像学检查--彩超--通知彩超室
    choosedata10(param) {
      this.Time[param.field].time = param.time;
      this.isShow10 = !this.isShow10;
    },
    //诊断--主动脉夹层--影像学检查--彩超--彩超检查时间
    choosedata11(param) {
      this.Time[param.field].time = param.time;
      this.isShow11 = !this.isShow11;
    },
    //诊断--主动脉夹层--影像学检查--彩超--彩超出结果
    choosedata12(param) {
      this.Time[param.field].time = param.time;
      this.isShow12 = !this.isShow12;
    },
    //诊断--肺动脉栓塞--开始抗凝治疗
    choosedata13(param) {
      this.Time[param.field].time = param.time;
      this.isShow13 = !this.isShow13;
    },
    //诊断--肺动脉栓塞--影像学检查--急诊cT--通知CT室
    choosedata14(param) {
      this.Time[param.field].time = param.time;
      this.isShow14 = !this.isShow14;
    },
    //诊断--肺动脉栓塞--影像学检查--急诊cT--CT室完成时间
    choosedata15(param) {
      this.Time[param.field].time = param.time;
      this.isShow15 = !this.isShow15;
    },
    //诊断--肺动脉栓塞--影像学检查--急诊cT--CT扫描开始
    choosedata16(param) {
      this.Time[param.field].time = param.time;
      this.isShow16 = !this.isShow16;
    },
    // 诊断--肺动脉栓塞--影像学检查--急诊cT--CT报告时间
    choosedata17(param) {
      this.Time[param.field].time = param.time;
      this.isShow17 = !this.isShow17;
    },
    save() {
      console.log("aaaaa");
    },
  },
  created() {
    this.interface();
  },
};
</script>
