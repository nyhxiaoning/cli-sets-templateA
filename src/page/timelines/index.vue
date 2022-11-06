 <template>
  <div class="timeline-panel">
    <van-tabs v-model="active" swipeable>
      <van-tab v-for="index in 3" :title="'选项 ' + index" :key="index">内容 {{ index }}</van-tab>
    </van-tabs>
    <!-- 头部 -->
    <!-- 用移动端的样式写,到时候做出px和rem的转换，同时设置出来滚动条 -->
    <div style="height:10rem">
      <timeline :timeline-list="timelineDatas"></timeline>
    </div>

    <div>
      原来的实现代码
      <timeLine
        :record="checkRecord"
        ref="quailtyverticalTimeaxis"
        :patient_source="'1'"
        :patientID="patientInfor.pk_pat_info"
      ></timeLine>
    </div>
    <!-- tab区域 -->
    <!-- 官方的灵活性太差，不可以自定义图标 -->
    <!-- <div>
      <van-tabs v-model="active" swipeable>
        <van-tab v-for="index in 3" :title="'选项 ' + index" :key="index">内容 {{ index }}</van-tab>
      </van-tabs>
      <van-steps direction="vertical">
        <van-step v-for="item in timelineDatas" :key="item.id">
          <template slot="active-icon">
            <van-icon
              v-if="item.status ==1"
              :name="`icon_steps${item.status}`"
              :class="classObject1(item.status)"
            />
            <van-icon
              v-else-if="item.status ==2"
              :name="`icon_steps${item.status}`"
              :class="classObject2(item.status)"
            />
            <van-icon
              v-else-if="item.status ==3"
              :name="`icon_steps${item.status}`"
              :class="classObject3(item.status)"
            />
          </template>

          <h3 style="color:red;">{{item.title}}</h3>
        </van-step>
      </van-steps>
    </div>-->
  </div>
</template>

<script>
import timeline from "../../components/timeline.vue";
export default {
  components: {
    timeline,
  },
  data() {
    return {
      tabObj: [
        { tabvalue: "1", title: "时间轴" },
        { tabvalue: "1", title: "时间轴" },
        { tabvalue: "1", title: "时间轴" },
      ],
      // 当前的三种不同的状态图标内容
      icon_steps1: "circle",
      // 当前选中的时间轴tab
      activeTime: "1",
      dongtai: [1, 2, 3, 4],
      stepListDatas: [
        {
          name: "",
        },
      ],
      // 初始化当前时间轴的数据内容对象,按照接口文档内容给出
      timelineDatas: [
        { attack_time: "", title: "发病时间", status: "1" },
        { help_date: "", title: "呼救时间", status: "1" },
        {
          first_mc_time: "",
          title: "首次医疗接触",
          status: "1",
        },
        {
          phep_ecg_time: "",
          title: "首份心电图",
          status: "1",
        },
        {
          tran_date: "",
          title: "接收心电图",
          status: "2",
        },
        {
          ecg_diagnose_time: "",
          title: "心电图诊断",
          status: "2",
        },
        {
          arrived_hospital_time: "",
          title: "到达医院大门",
          status: "3",
        },
        {
          first_doctor_time: "",
          title: "首诊医师接诊",
          status: "3",
        },
        {
          blood_time: "",
          title: "抽血完成",
          status: "3",
        },
        {
          report_time: "",
          title: "获得报告",
          status: "3",
        },
        {
          diagnosis_time: "",
          title: "初步诊断",
          status: "3",
        },
      ],
      //急救患者
      cvaFirstAidView: {
        pk_task: "", //任务主键
        task_state: "", //任务状态
        task_source: "", //任务来源
        ts_task: "", //任务时间
        slingno: "", //腕带
        name: "", //姓名
        gender: "", //性别
        height: "", //身高
        weight: "", //体重
        nation: "", //民族
        identifyid: "", //证件号
        birthday: "", //出生日期
        phep_ecg_time: "", //院前首份心电图
        tran_date: "", //接收心电图时间
        is_null_attack_detail_time: "0", //发病时间无法精确到分钟
        age_value: "", //年龄---必填
        age_unit: "", //年龄单位
        is_trans_hospital: "", //本院救护车接诊，直接转送其他医院
        contact_phone: "", //联系人电话
        occupation: "", //职业
        qualifications: "", //文化程度
        maritalstatus: "", //婚姻状况
        id_type: "", //证件类型
        province: "", //发病地址（省）
        city: "", //发病地址（市）
        area: "", //发病地址（区、县）
        attack_address: "", //发病地址---详细地址
        attack_time: "", //TODO:发病时间---必填TODO:
        attack_zone: "", //发病区间
        medical_insurance_type: "", //医保类型
        medical_insurance_no: "", //医保编号
        critical_illnesses: "", //大病医保
        blood_sbp: "", //收缩压
        blood_dbp: "", //舒张压
        temperature: "", //体温
        respiration_rate: "", //呼吸
        pulse_rate: "", //脉搏
        heart_rate: "", //心率
        distress_case: "", //病情评估
        help_date: "", //TODO:呼救时间
        is_toothache: "", //齿痛
        is_painful_shoulder_back: "", //肩背痛
        is_bellyache: 0, //腹痛  选填（1 是 0否,传1，0或空值）
        is_dyspnea: 0, //呼吸困难  选填（1 是 0否,传1，0或空值）
        is_heart_attack: 0, //合并心衰  选填（1 是 0否,传1，0或空值）
        is_malignant_arrhythmia: 0, //恶性心律失常  选填（1 是 0否,传1，0或空值）
        is_hemorrhage: 0, //合并出血  选填（1 是 0否,传1，0或空值）
        is_unexplained_fainting: 0, // 不明原因的昏厥pat_info 9-18添加
        is_sweating: 0, // 自汗、大汗淋漓pat_info 9-18添加
        is_flustered: 0, // 心慌心悸pat_info 9-18添加
        is_dysphoria: 0, // 烦躁不安pat_info 9-18添加
        is_throat: 0, // 颈前部束缚感pat_info 9-18添加
        weak: 0, // 乏力 11-18添加
        asthma: 0, // 气喘 11-18添加
        is_other: 0, //其它  选填（1 是 0否,传1，0或空值）
        car_code: "", //车辆
        ambulance_department: "", //出车单位
        trans_type: "", //转院类型
        trans_hospital_name: "", //转院医院名称
        hospitals_name: "", //医院名称
        hospital_name: "", //医院名称
        coming_way_code: "", //来院方式
        is_direct_catheter: "", //直达导管室
        arrived_hospital_time: "", //到达本院大门时间
        outhospital_visit_time: "", //转出医院大门
        leave_outhospital_time: "", //离开转出医院
        inhospital_admission_time: "", //院内接诊
        attack_department: "", //发病科室
        leave_department_time: "", //离开科室
        consultation_time: "", //床位医院会诊
        start_agree_time: "", //开始知情同意
        sign_agree_time: "", //签署知情同意书
        throm_start_time: "", //开始溶栓
        throm_end_time: "", //溶栓结束
        start_radiography_time: "", //溶栓后造影
        is_repci: "", //补救PCI
        operation_time: "", //实际介入手术
        hospital_position: "", //本院/外院
        throm_drug_type: "", //药物
        throm_drug_code: "", //剂量
        screening: "", //溶栓筛查
        throm_contraindication: "", //存在禁忌症
        is_thrombolysis: "", //溶栓治疗
        is_repatency: "", //溶栓再通（是、否）
        consciousness_type: "", //意识
        cp_diagnosis_code: "", //诊断类型
        other_diagnosis_desc: "", //其他描述
        destination: "", //转送至
        is_direct: "", //直达溶栓场所
        throm_treatment_place: "", //溶栓场所
        first_mc_time: "", //首次医疗接触
        first_doctor_time: "", //首诊医师接诊
        first_doctor_name: "", //医护人员
        patient_remark: "", //患者情况备注
        ecg_diagnose_time: "", //心电图确诊
        transfer_time: "", //决定转院
        net_transto_basic: "", //接收120/网络医院心电图
        basic_transto_standard: "", //传输心电图至协作单位
        not_trans: "", //两者皆无
        is_remote_ecgtran: "", //传输方式
        is_bypass_emergency: "", //绕行急诊
        bypass_emergency_code: "", //直达
        nonstop_cath_lab_time: "", // 直达本院导管室时间
        nonstop_ccu_time: "", // 直达本院CCU时间
        nonstop_cardiology_time: "", // 直达本院心内科病房时间
        nonstop_other_time: "", // 直达其他时间
        arrived_emergency_time: "", //到达时间
        bypass_emergency_leave_time: "", //离开时间
        is_bypass_ccu: "", //绕行CCU
        is_drug: "", //给药
        acs_delivery_time: "", //双联抗血小板用药
        aspirin_dose: "", //阿司匹林
        acs_drug_type: "", //氯吡格雷、替格瑞洛
        acs_drug_dose: "", //给药量
        remote_ecg_tran_date: "", //传输心电图
        state: "", //流程审核
        is_reperfusion: "",
        measures: "",
        tpci_type: "",
        measures_thrombolysis: "",
        strategy: "",
        invasive_strategy: "",
        risk_lamination_ag: "",
      },
    };
  },
  beforeRouteEnter(to, from, next) {
    if (from.name == "followStation" || to.name == "patientRecords") {
      next((vm) => {
        // 通过 `vm` 访问组件实例
        let pk_pat_info = localStorage.getItem("pk_pat_info");
        vm.checkRecord = true;
        vm.$refs.quailtyverticalTimeaxis.getTimeData();
        //            vm.initTimeAxisInfo(pk_pat_info);
      });
    } else {
      next((vm) => {
        // 通过 `vm` 访问组件实例
        let pk_pat_info = localStorage.getItem("pk_pat_info");
        vm.checkRecord = false;
        vm.$refs.quailtyverticalTimeaxis.getTimeData();
        //            vm.initTimeAxisInfo(pk_pat_info);
      });
    }
  },
  computed: {
    classObject1() {
      return function (value) {
        console.log(value);
        return {
          stepsuccess: value == 1,
        };
      };
    },
    classObject2() {
      return function (value) {
        console.log(value);
        return {
          stepsuccess: value == 2,
        };
      };
    },
    classObject3() {
      return function (value) {
        console.log(value);
        return {
          stepsuccess: value == 3,
        };
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.navbar {
}
// 自定义进度条的已完成状态图标
.active-icon {
  width: 30px;
  height: 30px;
  background-color: #f89018;
  border-radius: 15px; /* 图形的半径 */
}
.inactive-icon {
  width: 30px;
  height: 30px;
  background-color: #9eda9e;
  border-radius: 15px; /* 图形的半径 */
}
.out-circle {
  width: 16px;
  height: 16px;
  background: rgba(14, 116, 218, 0.1);
  box-shadow: 0px 4px 12px 0px rgba(0, 0, 0, 0.1);
  /*opacity: 0.1;*/
  border-radius: 50%;
  display: flex;
  align-items: center;

  .in-circle {
    width: 8px;
    height: 8px;
    margin: 0 auto;
    background: rgba(14, 116, 218, 1);
    border-radius: 50%;
    box-shadow: 0px 4px 12px 0px rgba(0, 0, 0, 0.1);
  }
}
</style>>
