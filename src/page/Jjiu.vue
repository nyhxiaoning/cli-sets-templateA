<template>
  <div class="view">
    <div class="nav">
      <headerCom>
        <van-icon slot="left" name="arrow-left" @click="$router.back()" />
        <span>急救</span>
        <!-- 接口文档page61 -->
        <!-- bars:菜单 -->
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
        <div v-if="tabFlag1" class="tab">
          <div @click="curId_tab1 = 0" :class="{ curr: true, cur: curId_tab1 === 0 }">基本信息</div>
          <div @click="curId_tab1 = 1" :class="{ curr: true, cur: curId_tab1 === 1 }">病情现况</div>
          <div @click="curId_tab1 = 2" :class="{ curr: true, cur: curId_tab1 === 2 }">来院方式</div>
          <div @click="curId_tab1 = 3" :class="{ curr: true, cur: curId_tab1 === 3 }">生命体征</div>
          <div @click="curId_tab1 = 5" :class="{ curr: true, cur: curId_tab1 === 5 }">备注</div>
        </div>
        <div v-if="tabFlag2" class="tab">
          <div @click="curId_tab2 = 0" :class="{ curr: true, cur: curId_tab2 === 0 }">基本信息</div>
          <div @click="curId_tab2 = 1" :class="{ curr: true, cur: curId_tab2 === 1 }">病情现况</div>
          <div @click="curId_tab2 = 2" :class="{ curr: true, cur: curId_tab2 === 2 }">来院方式</div>
          <div @click="curId_tab2 = 3" :class="{ curr: true, cur: curId_tab2 === 3 }">生命体征</div>
          <div @click="curId_tab2 = 4" :class="{ curr: true, cur: curId_tab2 === 4 }">院前溶栓</div>
          <div @click="curId_tab2 = 5" :class="{ curr: true, cur: curId_tab1 === 5 }">备注</div>
        </div>
      </div>
    </div>
    <div class="content">
      <!-- 基本信息 -->
      <div v-show="tabFlag1 ? curId_tab1 === 0 : false || curId_tab2 === 0">
        <van-cell-group>
          <van-field v-model="lists.name" label="姓名" placeholder="点击输入" input-align="right">
            <template slot="right-icon">
              <!-- <img src="" alt="">
              <img src="" alt="">-->
              <span>图片</span>
              <span>图片</span>
            </template>
          </van-field>
          <van-field label="性别" readonly>
            <template slot="right-icon">
              <van-radio-group v-model="lists.gender" direction="horizontal">
                <van-radio name="1" checked>男</van-radio>
                <van-radio name="2">女</van-radio>
              </van-radio-group>
            </template>
          </van-field>
          <van-field label="年龄" v-model="lists.age_value" input-align="right">
            <template slot="extra">岁</template>
          </van-field>
          <!-- 接口数据没做 -->
          <van-field
            v-model="applyForm.id_types"
            label="证件类型"
            ref="id_types"
            input-align="right"
            clickable
          >
            <template slot="right-icon">
              <van-icon name="arrow" @click="handleShowPicker('id_types')" />
            </template>
          </van-field>
          <div v-show="this.basemsg.identifytest == 1">
            <van-field
              v-model="this.basemsg.identifyid"
              label="证件号"
              placeholder="请输入证件号码"
              input-align="right"
            />
          </div>
          <van-field v-model="lists.birthday" label="出生日期" placeholder="点击输入" input-align="right" />
          <!-- 接口数据没做 -->
          <van-field
            v-model="applyForm.nations"
            label="民族"
            ref="nations"
            input-align="right"
            clickable
          >
            <template slot="right-icon">
              <van-icon name="arrow" @click="handleShowPicker('nations')" />
            </template>
          </van-field>
          <van-field
            v-model="lists.contact_phone"
            label="联系电话"
            placeholder="请输入联系电话"
            input-align="right"
          />
          <!-- 接口数据没做 -->
          <van-field label="职业" v-model="lists.occupation" readonly>
            <template slot="right-icon">
              <van-icon name="arrow" @click="handleShowPicker('qualifications')" />
            </template>
          </van-field>
          <!-- 接口数据没做 -->
          <van-field
            v-model="applyForm.qualifications"
            label="文化程度"
            ref="qualifications"
            input-align="right"
            clickable
          >
            <template slot="right-icon">
              <van-icon name="arrow" @click="handleShowPicker('qualifications')" />
            </template>
          </van-field>
          <!-- 接口数据没做 -->
          <van-field
            v-model="applyForm.maritalstatus"
            label="婚姻状况"
            ref="maritalstatus"
            input-align="right"
            clickable
          >
            <template slot="right-icon">
              <van-icon name="arrow" @click="handleShowPicker('maritalstatus')" />
            </template>
          </van-field>
          <van-field label="身高" placeholder="请输入身高" v-model="lists.height" input-align="right">
            <template slot="extra">cm</template>
          </van-field>
          <van-field label="体重" placeholder="请输入体重" v-model="lists.weight" input-align="right">
            <template slot="extra">kg</template>
          </van-field>
          <van-field
            v-model="lists.outpatient_id"
            label="门诊ID"
            placeholder="点击输入"
            input-align="right"
          />
          <van-field
            v-model="lists.inpatient_id"
            label="住院ID"
            placeholder="点击输入"
            input-align="right"
          />
          <!-- 接口数据没做 -->
          <van-field
            v-model="basemsg.attack_time.time"
            label="发病时间"
            placeholder="选择时间"
            input-align="right"
            readonly
          >
            <template slot="right-icon">
              <van-icon name="arrow" @click="isShow1 = !isShow1" />
              <datetimepicker :field="'attack_time'" :is-show="isShow1" @choosedata="choosedata1"></datetimepicker>
            </template>
          </van-field>

          <van-field label="无法精确到时间" readonly>
            <template slot="right-icon">
              <van-radio-group v-model="lists.is_null_attack_detail_time" direction="horizontal">
                <van-radio name="1">是</van-radio>
                <van-radio name="2">否</van-radio>
              </van-radio-group>
            </template>
          </van-field>

          <div v-show="lists.is_null_attack_detail_time == 1">
            <van-field
              v-model="applyForm.attack_zone"
              label="发病区间"
              ref="attack_zone"
              input-align="right"
              clickable
            >
              <template slot="right-icon">
                <van-icon name="arrow" @click="handleShowPicker('attack_zone')" />
              </template>
            </van-field>
          </div>
          <!-- 接口数据没做 -->
          <van-cell-group>
            <van-field label="发病地址" readonly label-width="200px">
              <template slot="right-icon">
                <van-icon name="arrow-down" @click="changeflagg()" />
              </template>
            </van-field>
            <div v-show="flagg==true">
              <van-field label="省" readonly label-width="200px">
                <template slot="right-icon">
                  <van-icon name="arrow" />
                </template>
              </van-field>
              <van-field label="市" readonly label-width="200px">
                <template slot="right-icon">
                  <van-icon name="arrow" />
                </template>
              </van-field>
              <van-field label="区" readonly label-width="200px">
                <template slot="right-icon">
                  <van-icon name="arrow" />
                </template>
              </van-field>
            </div>
          </van-cell-group>
          <van-field
            v-model="lists.attack_address2"
            label="详细地址"
            placeholder="点击输入"
            input-align="right"
          />
          <!-- 接口数据没做 -->
          <van-field
            v-model="applyForm.medical_insurance_types"
            label="医保类型"
            ref="medical_insurance_types"
            input-align="right"
            clickable
          >
            <template slot="right-icon">
              <van-icon name="arrow" @click="handleShowPicker('medical_insurance_types')" />
            </template>
          </van-field>

          <van-field
            v-model="lists.medical_insurance_no"
            label="医保编号"
            placeholder="点击输入"
            input-align="right"
          />
          <van-field label="大病医保" readonly>
            <template slot="right-icon">
              <van-radio-group v-model="lists.dbing" direction="horizontal">
                <van-radio name="1">是</van-radio>
                <van-radio name="2">否</van-radio>
              </van-radio-group>
            </template>
          </van-field>

          <van-field label="COVID-19" readonly style="display: block; ">
            <template slot="input">
              <van-radio-group v-model="lists.COVID" direction="horizontal">
                <van-radio name="1">经筛查后排除</van-radio>
                <van-radio name="2">经筛查后确诊</van-radio>
                <van-radio name="3">未经筛查</van-radio>
              </van-radio-group>
            </template>
          </van-field>

          <van-field v-model="lists.slingno" label="腕带" input-align="right" />
        </van-cell-group>
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
      <!-- 病情现况 -->
      <div v-show="curId_tab1 === 1 || curId_tab2 === 1">
        <van-cell-group>
          <!-- 未找到对应接口 -->
          <van-field v-model="bingqing.zhusu" label="主诉" placeholder="点击输入文本" input-align="right" />
          <van-field label="病情评估" readonly required style="display: block; ">
            <template slot="input">
              <van-radio-group
                v-model="lists.distress_case"
                direction="horizontal"
                v-for="(val,index) in list"
                :key="index"
              >
                <van-radio :name="index+1" @click="clickBtn(index+1)">{{val.title}}</van-radio>
              </van-radio-group>
            </template>
          </van-field>
          <!-- 未处理 -->
          <van-field
            v-model="bingqing.pinggu_list"
            readonly
            label-width="200px"
            style="display: block;"
          >
            <template slot="input">
              <div class="anniu">
                <div
                  class="no_rulesbtn"
                  :class="{
                    no_rulesbtn2: chooseAfterValue.indexOf(item.text) != -1
                  }"
                  v-for="(item, index) in bingqing.pinggu_list1"
                  :key="index"
                  @click="choosely(index, item.text)"
                >
                  <span>{{ item.text }}</span>
                </div>
              </div>
            </template>
          </van-field>
        </van-cell-group>
      </div>
      <!-- 来院方式 -->
      <div v-show="curId_tab1 === 2 || curId_tab2 === 2">
        <van-cell-group>
          <van-field label="来院方式" readonly required style="display: block;">
            <template slot="input">
              <van-radio-group v-model="lists.coming_way_code" direction="horizontal">
                <van-radio name="1" @click="chooseTab1">呼叫（120/999或其他）出车</van-radio>
                <van-radio name="2" @click="chooseTab1">转院</van-radio>
                <van-radio name="3" @click="chooseTab2">自行来院</van-radio>
                <van-radio name="4" @click="chooseTab2">院内发病</van-radio>
              </van-radio-group>
            </template>
          </van-field>
          <!-- 1.呼叫 -->
          <div v-show="lists.coming_way_code == 1">
            <van-cell-group>
              <van-field label="出车单位" readonly required>
                <template slot="right-icon">
                  <van-radio-group v-model="lists.ambulance_department" direction="horizontal">
                    <van-radio name="1">120救护车</van-radio>
                    <van-radio name="2">本院救护车</van-radio>
                    <van-radio name="3">外院救护车</van-radio>
                  </van-radio-group>
                </template>
              </van-field>

              <van-field
                v-model="comoption.help_date.time"
                label="呼救时间"
                placeholder="选择时间"
                input-align="right"
                readonly
                required
              >
                <template slot="right-icon">
                  <van-icon name="arrow" @click="isShow3 = !isShow3" />
                  <datetimepicker :field="'help_date'" :is-show="isShow3" @choosedata="choosedata3"></datetimepicker>
                </template>
              </van-field>

              <van-field label="直接转送上级医院" readonly required label-width="200px">
                <template slot="right-icon">
                  <van-radio-group v-model="lists.is_trans_hospital" direction="horizontal">
                    <van-radio name="1">是</van-radio>
                    <van-radio name="2">否</van-radio>
                  </van-radio-group>
                </template>
              </van-field>
              <div v-show="lists.is_trans_hospital== 1">
                <van-field label="直达导管室" readonly required>
                  <template slot="right-icon">
                    <van-radio-group v-model="lists.is_direct_catheter" direction="horizontal">
                      <van-radio name="1">是</van-radio>
                      <van-radio name="2">否</van-radio>
                    </van-radio-group>
                  </template>
                </van-field>
              </div>

              <van-field
                v-model="comoption.arrived_hospital_time.time"
                label="到达医院大门"
                placeholder="选择时间"
                input-align="right"
                readonly
                required
              >
                <template slot="right-icon">
                  <van-icon name="arrow" @click="isShow4 = !isShow4" />
                  <datetimepicker
                    :field="'arrived_hospital_time'"
                    :is-show="isShow4"
                    @choosedata="choosedata4"
                  ></datetimepicker>
                </template>
              </van-field>
              <van-field
                v-model="comoption.first_mc_time.time"
                label="首次医疗接触"
                placeholder="选择时间"
                input-align="right"
                readonly
                required
              >
                <template slot="right-icon">
                  <van-icon name="arrow" @click="isShow5 = !isShow5" />
                  <datetimepicker
                    :field="'first_mc_time'"
                    :is-show="isShow5"
                    @choosedata="choosedata5"
                  ></datetimepicker>
                </template>
              </van-field>
              <van-field
                v-model="comoption.first_doctor_time.time"
                label="首诊医师接诊"
                placeholder="选择时间"
                input-align="right"
                readonly
                required
              >
                <template slot="right-icon">
                  <van-icon name="arrow" @click="isShow6 = !isShow6" />
                  <datetimepicker
                    :field="'first_doctor_time'"
                    :is-show="isShow6"
                    @choosedata="choosedata6"
                  ></datetimepicker>
                </template>
              </van-field>

              <van-field
                v-model="lists.first_doctor_name   "
                label="医护人员"
                placeholder="点击输入文本"
                input-align="right"
              />
            </van-cell-group>
          </div>
          <!-- 转院 -->
          <div v-show="lists.coming_way_code == 2">
            <van-cell-group>
              <van-field label="医院类型" readonly>
                <template slot="right-icon">
                  <van-radio-group v-model="lists.trans_type" direction="horizontal">
                    <van-radio name="1">网络协作</van-radio>
                    <van-radio name="2">其他医疗机构</van-radio>
                  </van-radio-group>
                </template>
              </van-field>
              <van-field
                v-model="lists.first_doctor_name"
                label="医护名称"
                placeholder="点击输入文本"
                input-align="right"
              />
              <van-field label="直接转送上级医院(转出患者时" readonly required label-width="200px">
                <template slot="right-icon">
                  <van-radio-group v-model="lists.is_trans_hospital " direction="horizontal">
                    <van-radio name="1">是</van-radio>
                    <van-radio name="2">否</van-radio>
                  </van-radio-group>
                </template>
              </van-field>
              <div v-show="lists.is_trans_hospital  == 1">
                <van-field label="直达导管室" readonly required>
                  <template slot="right-icon">
                    <van-radio-group v-model="lists.is_direct_catheter" direction="horizontal">
                      <van-radio name="1">是</van-radio>
                      <van-radio name="2">否</van-radio>
                    </van-radio-group>
                  </template>
                </van-field>
              </div>
              <van-field
                v-model="comoption.first_mc_time2.time"
                label="首次医疗接触"
                placeholder="选择时间"
                input-align="right"
                readonly
                required
              >
                <template slot="right-icon">
                  <van-icon name="arrow" @click="isShow7 = !isShow7" />
                  <datetimepicker
                    :field="'first_mc_time2'"
                    :is-show="isShow7"
                    @choosedata="choosedata7"
                  ></datetimepicker>
                </template>
              </van-field>
              <van-field
                v-model="comoption.outhospital_visit_time.time"
                label="转出医院入门"
                placeholder="选择时间"
                input-align="right"
                readonly
                required
              >
                <template slot="right-icon">
                  <van-icon name="arrow" @click="isShow8 = !isShow8" />
                  <datetimepicker
                    :field="'outhospital_visit_time'"
                    :is-show="isShow8"
                    @choosedata="choosedata8"
                  ></datetimepicker>
                </template>
              </van-field>
              <van-field
                v-model="comoption.transfer_time.time"
                label="决定转院"
                placeholder="选择时间"
                input-align="right"
                readonly
                required
              >
                <template slot="right-icon">
                  <van-icon name="arrow" @click="isShow9 = !isShow9" />
                  <datetimepicker
                    :field="'transfer_time'"
                    :is-show="isShow9"
                    @choosedata="choosedata9"
                  ></datetimepicker>
                </template>
              </van-field>
              <van-field
                v-model="comoption.leave_outhospital_time.time"
                label="转出医院出门"
                placeholder="选择时间"
                input-align="right"
                readonly
                required
              >
                <template slot="right-icon">
                  <van-icon name="arrow" @click="isShow10= !isShow10" />
                  <datetimepicker
                    :field="'leave_outhospital_time'"
                    :is-show="isShow10"
                    @choosedata="choosedata10"
                  ></datetimepicker>
                </template>
              </van-field>
              <van-field
                v-model="comoption.arrived_hospital_time.time"
                label="到达本院大门"
                placeholder="选择时间"
                input-align="right"
                readonly
                required
              >
                <template slot="right-icon">
                  <van-icon name="arrow" @click="isShow11 = !isShow11" />
                  <datetimepicker
                    :field="'arrived_hospital_time'"
                    :is-show="isShow11"
                    @choosedata="choosedata11"
                  ></datetimepicker>
                </template>
              </van-field>
              <van-field
                v-model="comoption.inhospital_admission_time.time"
                label="院内接诊"
                placeholder="选择时间"
                input-align="right"
                readonly
                required
              >
                <template slot="right-icon">
                  <van-icon name="arrow" @click="isShow12 = !isShow12" />
                  <datetimepicker
                    :field="'inhospital_admission_time'"
                    :is-show="isShow12"
                    @choosedata="choosedata12"
                  ></datetimepicker>
                </template>
              </van-field>
              <van-field
                v-model="lists.first_doctor_name"
                label="医护人员"
                placeholder="点击输入文本"
                input-align="right"
              />
            </van-cell-group>
          </div>
          <!-- 自行来院 -->
          <div v-show="lists.coming_way_code == 3">
            <van-cell-group>
              <van-field
                v-model="comoption.arrived_hospital_time3.time"
                label="到达本院大门"
                placeholder="选择时间"
                input-align="right"
                readonly
                required
              >
                <template slot="right-icon">
                  <van-icon name="arrow" @click="isShow13 = !isShow13" />
                  <datetimepicker
                    :field="'arrived_hospital_time3'"
                    :is-show="isShow13"
                    @choosedata="choosedata13"
                  ></datetimepicker>
                </template>
              </van-field>
              <van-field
                v-model="comoption.first_mc_time3.time"
                label="首次医疗接触"
                placeholder="选择时间"
                input-align="right"
                readonly
                required
              >
                <template slot="right-icon">
                  <van-icon name="arrow" @click="isShow14 = !isShow14" />
                  <datetimepicker
                    :field="'first_mc_time3'"
                    :is-show="isShow14"
                    @choosedata="choosedata14"
                  ></datetimepicker>
                </template>
              </van-field>
              <van-field
                v-model="comoption.first_doctor_time3.time"
                label="院内首诊医师接诊"
                placeholder="选择时间"
                input-align="right"
                readonly
                required
              >
                <template slot="right-icon">
                  <van-icon name="arrow" @click="isShow15 = !isShow15" />
                  <datetimepicker
                    :field="'first_doctor_time3'"
                    :is-show="isShow15"
                    @choosedata="choosedata15"
                  ></datetimepicker>
                </template>
              </van-field>
              <van-field
                v-model="lists.first_doctor_name"
                label="医护人员"
                placeholder="点击输入文本"
                input-align="right"
              ></van-field>
            </van-cell-group>
          </div>
          <!-- 院内发病 -->
          <div v-show="lists.coming_way_code == 4">
            <van-cell-group>
              <van-field
                v-model="lists.attack_department"
                label="发病地点"
                placeholder="点击输入文本"
                input-align="right"
                required
              />
              <van-field
                v-model="comoption.first_mc_time4.time"
                label="本次发病后首次医疗接触"
                placeholder="选择时间"
                input-align="right"
                readonly
              >
                <template slot="right-icon">
                  <van-icon name="arrow" @click="isShow16 = !isShow16" />
                  <datetimepicker
                    :field="'first_mc_time4'"
                    :is-show="isShow16"
                    @choosedata="choosedata16"
                  ></datetimepicker>
                </template>
              </van-field>
              <van-field
                v-model="comoption.bypass_emergency_leave_time4.time"
                label="离开发病现场"
                placeholder="选择时间"
                input-align="right"
                readonly
                required
              >
                <template slot="right-icon">
                  <van-icon name="arrow" @click="isShow17 = !isShow17" />
                  <datetimepicker
                    :field="'bypass_emergency_leave_time4'"
                    :is-show="isShow17"
                    @choosedata="choosedata17"
                  ></datetimepicker>
                </template>
              </van-field>
              <van-field
                v-model="lists.first_doctor_name"
                label="本次发病后首次医疗接触人员"
                placeholder="点击输入文本"
                input-align="right"
                label-width="200px"
                required
              />
            </van-cell-group>
          </div>
        </van-cell-group>
      </div>
      <!-- 生命体征 -->
      <div v-show="curId_tab1 === 3 || curId_tab2 === 3">
        <van-cell-group>
          <van-field label="意识" readonly required style="display: block;">
            <template slot="input">
              <van-radio-group v-model="lists.consciousness_type" direction="horizontal">
                <van-radio name="1">清醒</van-radio>
                <van-radio name="2">对语言有反应</van-radio>
                <van-radio name="3">对刺痛有反应</van-radio>
                <van-radio name="4">对任何刺激无反应</van-radio>
              </van-radio-group>
            </template>
          </van-field>

          <van-field label="呼吸" v-model="lists.respiration_rate" required input-align="right">
            <template slot="extra">次/分钟</template>
          </van-field>
          <van-field label="脉搏" v-model="lists.pulse_rate" required input-align="right">
            <template slot="extra">次/分钟</template>
          </van-field>
          <van-field label="心率" v-model="lists.heart_rate" required input-align="right">
            <template slot="extra">次/分钟</template>
          </van-field>
          <van-field label="血压" v-model="lists.blood_sbp" required input-align="right">
            <template slot="extra">mmHg</template>
          </van-field>
          <van-field label="体温" v-model="lists.temperature" input-align="right">
            <template slot="extra">℃</template>
          </van-field>
        </van-cell-group>
        <!-- <van-popup v-model="showPicker4" round position="bottom">
          <van-picker
            show-toolbar
            ref="pickerRef4"
            :title="pickerTitle4"
            :columns="pickerColumns4"
            @cancel="showPicker4 = false"
            @confirm="onConfirmPicker4"
          />
        </van-popup>-->
      </div>
      <!-- 院前溶栓 -->
      <div v-show="curId_tab2 === 4">
        <van-cell-group>
          <van-field label="溶栓筛查" readonly>
            <template slot="right-icon">
              <van-radio-group v-model="lists.screening" direction="horizontal">
                <van-radio name="1">合适</van-radio>
                <van-radio name="2">不合适</van-radio>
                <van-radio name="3">未筛查</van-radio>
              </van-radio-group>
            </template>
          </van-field>
          <div v-show="lists.screening == 1">
            <van-field label="溶栓治疗" readonly>
              <template slot="right-icon">
                <van-radio-group v-model="lists.is_thrombolysis" direction="horizontal">
                  <van-radio name="1">有</van-radio>
                  <van-radio name="2">无</van-radio>
                </van-radio-group>
              </template>
            </van-field>
          </div>
          <div v-show="lists.screening == 2">
            <van-field label="存在禁忌症" readonly>
              <template slot="right-icon">
                <van-radio-group v-model="lists.throm_contraindication" direction="horizontal">
                  <van-radio name="1">是</van-radio>
                  <van-radio name="2">否</van-radio>
                </van-radio-group>
              </template>
            </van-field>
          </div>
          <div v-show="lists.is_thrombolysis==1">
            <van-field label="直达溶栓场所" readonly required>
              <template slot="right-icon">
                <van-radio-group v-model="lists.is_direct" direction="horizontal">
                  <van-radio name="1">是</van-radio>
                  <van-radio name="2">否</van-radio>
                </van-radio-group>
              </template>
            </van-field>
            <van-field label="溶栓场所" readonly required>
              <template slot="right-icon">
                <van-radio-group v-model="lists.throm_treatment_place" direction="horizontal">
                  <van-radio name="1">其它医院</van-radio>
                  <van-radio name="2">救护车</van-radio>
                </van-radio-group>
              </template>
            </van-field>
            <van-field
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
            </van-field>
            <van-field label="溶栓药物" readonly required>
              <template slot="right-icon">
                <van-radio-group v-model="lists.throm_drug_type" direction="horizontal">
                  <van-radio name="1">第一代</van-radio>
                  <van-radio name="2">第二代</van-radio>
                  <van-radio name="3">第三代</van-radio>
                </van-radio-group>
              </template>
            </van-field>
            <van-field label="剂量" readonly required>
              <template slot="right-icon">
                <van-radio-group v-model="lists.throm_drug_code" direction="horizontal">
                  <van-radio name="1">全量</van-radio>
                  <van-radio name="2">半量</van-radio>
                </van-radio-group>
              </template>
            </van-field>
            <van-field label="溶栓再通" readonly required>
              <template slot="right-icon">
                <van-radio-group v-model="lists.is_repatency" direction="horizontal">
                  <van-radio name="1">是</van-radio>
                  <van-radio name="2">否</van-radio>
                </van-radio-group>
              </template>
            </van-field>
          </div>

          <div v-show="lists.is_repatency == 1">
            <van-field
              v-model="throm.start_radiography_time.time"
              label="溶栓后造影"
              placeholder="选择时间"
              input-align="right"
              readonly
            >
              <template slot="right-icon">
                <van-icon name="arrow" @click="isShow22 = !isShow22" />
                <datetimepicker
                  :field="'start_radiography_time'"
                  :is-show="isShow22"
                  @choosedata="choosedata22"
                ></datetimepicker>
              </template>
            </van-field>
          </div>
          <div v-show="lists.is_repatency == 1">
            <van-field label="补救PCI">
              <template slot="right-icon">
                <van-radio-group v-model="throm.is_repci" direction="horizontal">
                  <van-radio name="1">是</van-radio>
                  <van-radio name="2">否</van-radio>
                </van-radio-group>
              </template>
            </van-field>
          </div>
          <div v-show="lists.is_repci == 1">
            <van-field
              v-model="throm.operation_time.time"
              label="实际手术时间"
              placeholder="选择时间"
              input-align="right"
              readonly
            >
              <template slot="right-icon">
                <van-icon name="arrow" @click="isShow23 = !isShow23" />
                <datetimepicker
                  :field="'operation_time'"
                  :is-show="isShow23"
                  @choosedata="choosedata23"
                ></datetimepicker>
              </template>
            </van-field>
          </div>
          <div v-show="lists.is_repci == 1">
            <van-field label="手术场所">
              <template slot="right-icon">
                <van-radio-group v-model="lists.hospital_position" direction="horizontal">
                  <van-radio name="1">本院</van-radio>
                  <van-radio name="2">外院</van-radio>
                </van-radio-group>
              </template>
            </van-field>
          </div>
        </van-cell-group>
      </div>
      <!-- 患者情况备注 -->
      <div v-show="curId_tab1===5||curId_tab2 === 5">
        <van-cell-group>
          <van-field label="患者情况备注" readonly style="display: block; ">
            <template slot="input">
              <van-field
                v-model="lists.patient_remark"
                rows="4"
                autosize
                type="textarea"
                style="border: 1px solid #131f62;"
              />
            </template>
          </van-field>
        </van-cell-group>
      </div>
    </div>
    <div class="footer">
      <van-button round color="#4676FB" size="large" @click="interface3">保存</van-button>
    </div>
  </div>
</template>
<style scoped lang="scss">
@import url("../assets/css/base.scss");

.view {
  position: relative;
  height: 100%;
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
  .content {
    position: absolute;
    top: 71px;
    bottom: 50px;
    left: 0px;
    right: 0px;
    // overflow: auto;
    overflow: scroll;
    .anniu {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      .no_rulesbtn {
        display: inline-block;
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
        display: inline-block;
        background-color: #3a5ba4;
        color: #fff;
      }
    }
  }
  .footer {
    /deep/ .van-button--large {
      width: 100%;
      height: 35px;
    }
    width: 100%;
    height: 13vw;
    padding: 2.5vw 5vw;
    background-color: #fff;
    position: fixed;
    bottom: 0;
  }
}
</style>
<script>
import headerCom from "../components/Header";
// 引入时间组件

import Datetimepicker from "../components/Datetimepicker";
import { getEmergency } from "../api/index.js";
import { saveEmergency } from "../api/index.js";
import { getDefdocViewByCodes } from "../api/index.js";

// Datetimepicker
export default {
  components: { headerCom, Datetimepicker },
  data() {
    return {
      flagg: false,
      //测试保存接口用例
      cvaFirstAidView: {
        pk_task: "1001A0100000004M2ZC5",
        task_state: "5",
        task_source: "1",
        ts_task: "2020-09-17 13:05:23",
        slingno: "",
        name: "211",
        gender: "",
        height: "",
        weight: "",
        nation: "",
        identifyid: "",
        birthday: "",
        phep_ecg_time: "",
        tran_date: "",
        is_null_attack_detail_time: "0",
        age_value: "",
        age_unit: "",
        is_trans_hospital: "0",
        contact_phone: "",
        occupation: "",
        qualifications: "",
        maritalstatus: "",
        id_type: "1",
        province: "1001Z01000000000SHCX",
        city: "1001Z01000000000SHCY",
        area: "1001Z01000000000SHD6",
        attack_address: "",
        attack_time: "2020-09-17 14:17",
        attack_zone: "",
        medical_insurance_type: "",
        medical_insurance_no: "",
        critical_illnesses: "",
        blood_sbp: "",
        blood_dbp: "",
        temperature: "",
        respiration_rate: "",
        pulse_rate: "",
        heart_rate: "",
        distress_case: "",
        help_date: "",
        is_toothache: "0",
        is_painful_shoulder_back: "0",
        is_bellyache: "0",
        is_dyspnea: "0",
        is_heart_attack: "0",
        is_malignant_arrhythmia: "0",
        is_hemorrhage: "0",
        is_unexplained_fainting: "0",
        is_sweating: "0",
        is_flustered: "0",
        is_dysphoria: "0",
        is_throat: "0",
        weak: "",
        asthma: "",
        is_other: "0",
        car_code: "",
        ambulance_department: "1",
        trans_type: "",
        trans_hospital_name: "",
        hospitals_name: "",
        hospital_name: "",
        coming_way_code: "3",
        is_direct_catheter: "",
        arrived_hospital_time: "2020-09-17 13:17",
        outhospital_visit_time: "",
        leave_outhospital_time: "",
        inhospital_admission_time: "",
        attack_department: "",
        leave_department_time: "",
        consultation_time: "",
        start_agree_time: "",
        sign_agree_time: "",
        throm_start_time: "",
        throm_end_time: "",
        start_radiography_time: "",
        is_repci: "",
        operation_time: "",
        hospital_position: "",
        throm_drug_type: "",
        throm_drug_code: "",
        screening: "",
        throm_contraindication: "",
        is_thrombolysis: "",
        is_repatency: "",
        consciousness_type: "",
        cp_diagnosis_code: "",
        other_diagnosis_desc: "",
        destination: "",
        is_direct: "",
        throm_treatment_place: "",
        first_mc_time: "2020-09-30 18:57",
        first_doctor_time: "",
        first_doctor_name: "",
        patient_remark: "",
        ecg_diagnose_time: "",
        transfer_time: "",
        net_transto_basic: "",
        basic_transto_standard: "",
        not_trans: "",
        is_remote_ecgtran: "",
        is_bypass_emergency: "",
        bypass_emergency_code: "",
        nonstop_cath_lab_time: "",
        nonstop_ccu_time: "",
        nonstop_cardiology_time: "",
        nonstop_other_time: "",
        arrived_emergency_time: "",
        bypass_emergency_leave_time: "",
        is_bypass_ccu: "",
        is_drug: "",
        acs_delivery_time: "",
        aspirin_dose: "",
        acs_drug_type: "",
        acs_drug_dose: "",
        remote_ecg_tran_date: "",
        state: "1",
        is_reperfusion: "",
        measures: "",
        tpci_type: "",
        measures_thrombolysis: "",
        strategy: "",
        invasive_strategy: "",
        risk_lamination_ag: "",
        pk_pat_info: "1001A0100000004M2ZC3",
        pk_group: "",
        pk_org: "",
        pk_pat: "1001A0100000004M2ZC2",
        ts_pat: "2020-09-17 13:10:21",
        ts_pat_info: "2020-09-17 13:10:21",
        outpatient_id: "",
        inpatient_id: "",
        pk_emergency: "1001A0100000004M2ZC6",
        ts_emergency: "2020-09-17 13:10:21",
        phep_ecg_image_base64: "",
        pk_treatment: "1001A0100000004M2ZC7",
        ts_treatment: "2020-09-17 13:10:21",
        remote_ecgtran_way: "",
        pk_outcome: "1001A0100000004M2ZC8",
        ts_outcome: "2020-09-17 13:10:22",
        posttype: "2",
      },

      idTypeArr: [], //证件类型数组
      nationArr: [], //民族类型数组
      occupationArr: [], //职业类型数组
      qualificationArr: [], //文化程度类型数组
      maritalstatuArr: [], //婚姻状况类型数组
      medical_insurance_typeArr: [], //医保类型数组
      attack_zoneArr: [], //发病区间数组

      lists: [],
      //基本信息--类型
      applyForm: {
        id_types: "", //证件类型
        nations: "", //民族
        occupations: "", //职业
        qualifications: "", //文化程度
        maritalstatus: "", //婚姻状况
        medical_insurance_types: "", //医保类型
        attack_zone: "", //发病区间
      },
      //用于存储选中类型的数据（基本信息）
      pickerColumns: [],
      pickerTitle: "",
      showPicker: false,
      //用于存储选中类型的数据（生命体征）
      pickerColumns4: [],
      pickerTitle4: "",
      showPicker4: false,
      //基本信息--呼救--对应发病时间
      isShow1: false,
      //来院方式--呼救--呼救时间
      isShow3: false,
      //来院方式--呼救--到达本院大门时间
      isShow4: false,
      //来院方式--呼救--首次医疗接触
      isShow5: false,
      //来院方式--呼救--首诊医师接诊时间
      isShow6: false,
      //来院方式--转院--首次医疗接触时间
      isShow7: false,
      //来院方式--转院--转出医院入门
      isShow8: false,
      //来院方式--转院--决定转院
      isShow9: false,
      //来院方式--转院--转出医院出门
      isShow10: false,
      //来院方式--转院--到达本院大门
      isShow11: false,
      //来院方式--转院--院内接诊
      isShow12: false,
      //来院方式--自行来院--到达本院大门时间
      isShow13: false,
      //来院方式--自行来院--首次医疗接触
      isShow14: false,
      //来院方式--自行来院--首诊医师接诊时间
      isShow15: false,
      //来院方式--院内发病--本次发病后首次医疗接触
      isShow16: false,
      //来院方式--院内发病--离开发病现场
      isShow17: false,
      //院前溶栓--开始知情同意
      isShow18: false,
      //院前溶栓--签署知情同意
      isShow19: false,
      //院前溶栓--开始溶栓
      isShow20: false,
      //院前溶栓--溶栓结束
      isShow21: false,
      //院前溶栓--溶栓后造影
      isShow22: false,
      //院前溶栓--实际手术时间
      isShow23: false,

      //基本信息
      basemsg: {
        //姓名
        name: "",
        //性别
        gender: "1",
        //年龄
        age_value: "",

        //出生日期
        birthday: "",
        //联系电话
        contact_phone: "",
        // 身高
        height: "",
        // 体重
        weight: "",
        // 住院ID
        inpatient_id: "",
        // 门诊ID
        outpatient_id: "",

        //医保编号
        medical_insurance_no: "",
        //证件类型
        // id_type: [
        //   {
        //     text: "未知",
        //     value: "11",
        //   },
        //   {
        //     text: "身份证",
        //     value: "12",
        //   },
        //   {
        //     text: "护照",
        //     value: "13",
        //   },
        // ],
        //接受证件类型
        identifytest: "1",
        //证件号
        identifyid: "",

        //民族
        // nation: [
        //   {
        //     text: "汉族",
        //     value: "21",
        //   },
        //   {
        //     text: "蒙古族",
        //     value: "22",
        //   },
        //   {
        //     text: "回族",
        //     value: "23",
        //   },
        //   {
        //     text: "藏族",
        //     value: "24",
        //   },
        //   {
        //     text: "维吾尔族",
        //     value: "25",
        //   },
        //   {
        //     text: "苗族",
        //     value: "26",
        //   },
        //   {
        //     text: "彝族",
        //     value: "27",
        //   },
        //   {
        //     text: "壮族",
        //     value: "28",
        //   },
        // ],
        //职业
        // occupation: [],
        //文化程度
        // qualification: [
        //   {
        //     text: "大学本、专科或以上",
        //     value: "41",
        //   },
        //   {
        //     text: "高中(包括中专)",
        //     value: "42",
        //   },
        //   {
        //     text: "初中",
        //     value: "43",
        //   },
        //   {
        //     text: "小学",
        //     value: "44",
        //   },
        //   {
        //     text: "文盲",
        //     value: "45",
        //   },
        //   {
        //     text: "不详",
        //     value: "46",
        //   },
        // ],
        //婚姻状况
        // maritalstatu: [
        //   {
        //     text: "未婚",
        //     value: "51",
        //   },
        //   {
        //     text: "已婚",
        //     value: "52",
        //   },
        //   {
        //     text: "丧偶",
        //     value: "53",
        //   },
        //   {
        //     text: "礼仪",
        //     value: "54",
        //   },
        //   {
        //     text: "不详",
        //     value: "55",
        //   },
        // ],

        list7: [{}],
        //发病时间
        attack_time: {
          time: "",
        },
        // 无法精确到时间
        is_null_attack_detail_time: "1",
        // 发病区间
        attack_zone: "",
        //发病地址
        attack_address1: "",
        //详细地址
        attack_address2: "",
        //医保类型
        // medical_insurance_type: [
        //   {
        //     text: "城镇职工医疗保险",
        //     value: "91",
        //   },
        //   {
        //     text: "商业保险",
        //     value: "92",
        //   },
        //   {
        //     text: "公费医疗",
        //     value: "93",
        //   },
        //   {
        //     text: "城镇居民医保",
        //     value: "94",
        //   },
        //   {
        //     text: "新农合医疗",
        //     value: "95",
        //   },
        //   {
        //     text: "自费",
        //     value: "96",
        //   },
        //   {
        //     text: "军免",
        //     value: "97",
        //   },
        //   {
        //     text: "其他",
        //     value: "98",
        //   },
        // ],
        //腕带
        slingno: "",
      },
      //来院方式
      comoption: {
        //来院方式
        coming_way_code: "",
        //呼叫--呼叫出车(出车单位)
        ambulance_department: "",
        //呼叫--呼救时间
        help_date: {
          time: "",
        },
        //呼叫--直接转送上级医院
        destination: "1",
        //呼叫--直达导管室
        nonstop_cath_lab_time: "",
        //呼叫--到达本院大门
        arrived_hospital_time: {
          time: "",
        },
        //呼叫--首次医疗接触时间
        first_mc_time: {
          time: "",
        },
        //呼叫--首诊医师接诊时间
        first_doctor_time: {
          time: "",
        },
        //呼叫--医护人员
        first_doctor_name: "",
        //转院--医院类型
        trans_type: "",
        //转院--医院名称
        hospitals_name: "",
        // hospital_name
        //转院--直接转送上级医院
        destination2: "1",
        //转院--直达导管室
        nonstop_cath_lab_time2: "",
        //转院--首次医疗接触
        first_mc_time2: {
          time: "",
        },
        //转院--转出医院入门
        outhospital_visit_time: {
          time: "",
        },
        //转院--决定转院
        transfer_time: {
          time: "",
        },
        //转院--转出医院出门
        leave_outhospital_time: {
          time: "",
        },
        //转院--到达本院大门
        arrived_hospital_time: {
          time: "",
        },
        //转院--院内接诊
        inhospital_admission_time: {
          time: "",
        },
        //自行来院--到达本院大门
        arrived_hospital_time3: {
          time: "",
        },
        //自行来院--首次医疗接触时间
        first_mc_time3: {
          time: "",
        },
        //自行来院--首诊医师接诊时间
        first_doctor_time3: {
          time: "",
        },
        //自行来院--医护人员
        first_doctor_name3: "",
        //院内发病--发病地点
        attack_address: "",
        //院内发病--本次发病后首次医疗接触
        first_mc_time4: {
          time: "",
        },
        //院内发病--离开发病现场
        bypass_emergency_leave_time4: {
          time: "",
        },
        //院内发病--本次发病后首次医疗接触人员
        first_doctor_name4: "",
      },
      //生命体征
      lifestyle: {
        //意识
        consciousness_type: [
          {
            text: "清醒",
            value: "43",
          },
          {
            text: "对语言有反应",
            value: "44",
          },
          {
            text: "对刺痛有反应",
            value: "45",
          },
          {
            text: "对任何刺激无反应",
            value: "46",
          },
        ],
        //呼吸
        respiration_rate: "",
        //脉搏
        pulse_rate: "",
        //心率
        heart_rate: "",
        //血压
        blood_sbp: "",
        //体温
        temperature: "",
      },
      //院前溶栓
      throm: {
        //溶栓筛查
        screening: "1",
        // 溶栓治疗(存在禁忌症)
        is_thrombolysis: "",
        //存在禁忌症
        throm_contraindication: "",
        // 直达溶栓场所
        is_direct: "",
        // 溶栓场所
        throm_treatment_place: "",
        // 开始知情同意
        start_agree_time: {
          time: "",
        },
        // 签署知情同意
        sign_agree_time: {
          time: "",
        },
        // 开始溶栓
        throm_start_time: {
          time: "",
        },
        // 溶栓结束
        throm_end_time: {
          time: "",
        },
        // 溶栓药物
        throm_drug_type: "",
        // 剂量
        throm_drug_code: "",
        // 溶栓再通
        is_repatency: "",
        // 溶栓后造影
        start_radiography_time: {
          time: "",
        },
        //补救PCI
        is_tppci: "",
        //实际手术时间
        operation_time: {
          time: "",
        },
        //手术场所
        hospital_position: "",
      },

      //病情现况
      allradio: "",
      //  <van-radio name="1">持续性胸闷/胸痛</van-radio>
      //         <van-radio name="2">间歇性胸闷/胸痛</van-radio>
      //         <van-radio name="3">症状已缓解</van-radio>
      list: [
        {
          title: "持续性胸闷/胸痛",
        },
        {
          title: "间歇性胸闷/胸痛",
        },
        {
          title: "症状已缓解",
        },
      ],
      tabFlag1: true, //tab页显隐
      tabFlag2: false,
      curId_tab1: 0, //Tab 内容默认页面变量
      curId_tab2: "",
      chooseAfterValue: [], //选中的按钮
      bingqing: {
        pinggu_list: "",
        //病情现状
        zhusu: "",
        pinggu: "",
        pinggu_list1: [
          { text: "呼吸困难" },
          { text: "腹痛" },
          { text: "齿痛" },
          { text: "肩背痛" },
          { text: "合并恶性心律失常" },
          { text: "合并出血" },
          { text: "合并心衰" },
          { text: "不明原因的昏厥" },
          { text: "自汗、大汗淋漓" },
          { text: "心慌心悸" },
          { text: "烦躁不安" },
          { text: "颈前部束缚感" },
          { text: "乏力" },
          { text: "气喘" },
          { text: "其他" },
        ],
      },
      show_ul: false, // 下拉框显隐
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
    };
  },
  methods: {
    //   发病地址修改flagg
    changeflagg() {
      this.flagg = !this.flagg;
    },
    handleShowPicker(val) {
      //   console.log("this.idTypeArr:", this.idTypeArr);
      //每次执行点击事件都要对pickerColumns进行清空
      this.pickerColumns = [];
      this.showPicker = true;
      if (val == "id_types") {
        this.pickerTitle = "证件类型";
        // 对象数组，配置每一列显示的数据
        // 加一个for循环，将idType的每一项加入到pickerColumns里
        for (var i = 0; i < this.idTypeArr.length; i++) {
          //   this.pickerColumns = this.basemsg.id_type;
          this.pickerColumns.push(this.idTypeArr[i].name);
        }
      } else if (val == "nations") {
        this.pickerTitle = "民族";
        // this.pickerColumns = this.basemsg.nation;
        for (var i = 0; i < this.nationArr.length; i++) {
          //   console.log("asdas", this.nationArr[i].name);
          this.pickerColumns.push(this.nationArr[i].name);
        }
        // console.log("pickerColumns:", this.pickerColumns);
      } else if (val == "occupations") {
        this.pickerTitle = "职业";
        for (var i = 0; i < this.occupationArr.length; i++) {
          //   console.log("asdas", this.occupationArr[i].name);
          this.pickerColumns.push(this.occupationArr[i].name);
        }
        // this.pickerColumns = this.basemsg.occupation;
      } else if (val == "qualifications") {
        this.pickerTitle = "文化程度";
        for (var i = 0; i < this.qualificationArr.length; i++) {
          //   console.log("asdas", this.qualificationArr[i].name);
          this.pickerColumns.push(this.qualificationArr[i].name);
        }
        // this.pickerColumns = this.basemsg.qualification;
        console.log("文化程度:", this.pickerColumns); //有数据
      } else if (val == "maritalstatus") {
        this.pickerTitle = "婚姻状况";
        for (var i = 0; i < this.maritalstatuArr.length; i++) {
          //   console.log("asdas", this.maritalstatuArr[i].name);
          this.pickerColumns.push(this.maritalstatuArr[i].name);
        }
        // this.pickerColumns = this.basemsg.maritalstatu;
      } else if (val == "medical_insurance_types") {
        this.pickerTitle = "医保类型";
        for (var i = 0; i < this.medical_insurance_typeArr.length; i++) {
          //   console.log("asdas", this.medical_insurance_typeArr[i].name);
          this.pickerColumns.push(this.medical_insurance_typeArr[i].name);
        }
        // this.pickerColumns = this.basemsg.medical_insurance_type;
      } else if (val == "attack_zone") {
        this.pickerTitle = "发病区间";
        for (var i = 0; i < this.attack_zoneArr.length; i++) {
          //   console.log("asdas", this.attack_zoneArr[i].name);
          this.pickerColumns.push(this.attack_zoneArr[i].name);
        }
        // this.pickerColumns = this.basemsg.medical_insurance_type;   attack_zoneArr
      } else {
      }
    },
    // 点击确定按钮，将在下拉框选中的值赋给radio1的idType，将其显示在页面中
    onConfirmPicker(values) {
      if (this.$refs.pickerRef.title == "证件类型") {
        if (values == "未知") {
          this.basemsg.identifytest = "0";
        } else if (values == "身份证") {
          this.basemsg.identifytest = "1";
        } else {
          this.basemsg.identifytest = "1";
        }
        this.applyForm.id_types = values;
      } else if (this.$refs.pickerRef.title == "民族") {
        this.applyForm.nations = values;
      } else if (this.$refs.pickerRef.title == "职业") {
        this.applyForm.occupations = values;
      } else if (this.$refs.pickerRef.title == "文化程度") {
        this.applyForm.qualifications = values;
      } else if (this.$refs.pickerRef.title == "婚姻状况") {
        this.applyForm.maritalstatus = values;
      } else if (this.$refs.pickerRef.title == "医保类型") {
        this.applyForm.medical_insurance_types = values;
      } else if (this.$refs.pickerRef.title == "发病区间") {
        this.applyForm.attack_zone = values;
      } else {
      }
      this.showPicker = false;
    },
    //选择发病时间
    choosedata1(param) {
      this.basemsg[param.field].time = param.time;
      this.isShow1 = !this.isShow1;
    },

    //呼救时间
    choosedata3(param) {
      this.comoption[param.field].time = param.time;
      this.isShow3 = !this.isShow3;
    },
    // 到达本院大门
    choosedata4(param) {
      this.comoption[param.field].time = param.time;
      this.isShow4 = !this.isShow4;
    },
    //首次医疗接触
    choosedata5(param) {
      this.comoption[param.field].time = param.time;
      this.isShow5 = !this.isShow5;
    },
    // 首诊医师接诊时间
    choosedata6(param) {
      this.comoption[param.field].time = param.time;
      this.isShow6 = !this.isShow6;
    },
    // 来院方式--转院
    choosedata7(param) {
      this.comoption[param.field].time = param.time;
      this.isShow7 = !this.isShow7;
    },
    choosedata8(param) {
      this.comoption[param.field].time = param.time;
      this.isShow8 = !this.isShow8;
    },
    choosedata9(param) {
      this.comoption[param.field].time = param.time;
      this.isShow9 = !this.isShow9;
    },
    choosedata10(param) {
      this.comoption[param.field].time = param.time;
      this.isShow10 = !this.isShow10;
    },
    choosedata11(param) {
      this.comoption[param.field].time = param.time;
      this.isShow11 = !this.isShow11;
    },
    choosedata12(param) {
      this.comoption[param.field].time = param.time;
      this.isShow12 = !this.isShow12;
    },
    // 来院方式--自行来院
    choosedata13(param) {
      this.comoption[param.field].time = param.time;
      this.isShow13 = !this.isShow13;
    },
    choosedata14(param) {
      this.comoption[param.field].time = param.time;
      this.isShow14 = !this.isShow14;
    },
    choosedata15(param) {
      this.comoption[param.field].time = param.time;
      this.isShow15 = !this.isShow15;
    },
    //来院方式--院内发病--本次发病后首次医疗接触
    choosedata16(param) {
      this.comoption[param.field].time = param.time;
      this.isShow16 = !this.isShow16;
    },
    //来院方式--院内发病--离开发病现场
    choosedata17(param) {
      this.comoption[param.field].time = param.time;
      this.isShow17 = !this.isShow17;
    },
    //院前溶栓--开始知情同意
    choosedata18(param) {
      this.throm[param.field].time = param.time;
      this.isShow18 = !this.isShow18;
    },
    //院前溶栓--签署知情同意
    choosedata19(param) {
      this.throm[param.field].time = param.time;
      this.isShow19 = !this.isShow19;
    },
    //院前溶栓--开始溶栓
    choosedata20(param) {
      this.throm[param.field].time = param.time;
      this.isShow20 = !this.isShow20;
    },
    //院前溶栓--溶栓结束
    choosedata21(param) {
      this.throm[param.field].time = param.time;
      this.isShow21 = !this.isShow21;
    },
    //院前溶栓--溶栓后造影
    choosedata22(param) {
      this.throm[param.field].time = param.time;
      this.isShow22 = !this.isShow22;
    },
    //院前溶栓--实际手术时间
    choosedata23(param) {
      this.throm[param.field].time = param.time;
      this.isShow23 = !this.isShow23;
    },
    //病情现况
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
    },

    // 选中按钮函数
    // 参数：按钮索引值，选中按钮
    choosely(n, value) {
      if (this.chooseAfterValue.indexOf(value) != -1) {
        this.chooseAfterValue.splice(this.chooseAfterValue.indexOf(value), 1);
      } else {
        this.chooseAfterValue.push(value);
      }
    },
    //来院方式里 改变tab页数量函数
    chooseTab1() {
      //5个tab
      this.tabFlag2 = true;
      this.tabFlag1 = false;
      this.curId_tab1 = "";
      this.curId_tab2 = 2;
    },
    chooseTab2() {
      //4个tab
      this.tabFlag2 = false;
      this.tabFlag1 = true;
      this.curId_tab2 = "";
      this.curId_tab1 = 2;
    },
    //点击下拉框 跳转页面函数
    //参数: 索引值
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

    interface1() {
      //   let datas = "1001A0100000004NJTKV";
      let paramsObj = {
        pageLocation: "数据上报",
        pk_pat_info: "1001A0100000004NOVOH",
      };
      this.flag = true;
      getEmergency(paramsObj).then((res) => {
        console.log("res:", res);
        this.lists = res.results[0];
      });
    },
    interface2() {
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

      getDefdocViewByCodes(codes).then((res) => {
        // debugger;

        // 获取到证件类型集合
        this.idTypeArr = res.results[0].JB005_0xx;
        // 民族类型数组
        this.nationArr = res.results[0].JB002_0xx;

        // 职业类型数组
        this.occupationArr = res.results[0].JB006_0xx;

        // 文化程度类型数组
        this.qualificationArr = res.results[0].JB004_0xx;
        // 婚姻状况类型数组
        this.maritalstatuArr = res.results[0].JB003_0xx;
        // 获取到医保类型集合
        this.medical_insurance_typeArr = res.results[0].YBLX;
        // 发病区间
        this.attack_zoneArr = res.results[0].ATTACK_ZONE;
      });
    },
    interface3() {
      let paramsObj = this.cvaFirstAidView;
      this.flag = true;
      saveEmergency(paramsObj).then((res) => {
        console.log("resss:", res);
        this.lists1 = res.results[0];
      });
    },
  },
  created() {
    this.interface1();
    this.interface2();
  },
};
</script>
