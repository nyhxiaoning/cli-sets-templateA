<template>
  <div>
    <div class="nav">
      <headerCom>
        <div slot="left" class="left">
          <van-icon name="arrow-left" @click="$router.back()" />
        </div>
        <div class="center">
          <span>{{this.$route.query.name}}</span>
          <span v-if="$route.query.sex==1">男</span>
          <span v-if="$route.query.sex==2">女</span>
          <span>{{this.$route.query.age}}</span>
          <span>{{this.$route.query.type}}</span>
        </div>
      </headerCom>
    </div>
    <div class="content">
      <div class="title">急救信息</div>
      <div class="content_list">
        <ul class="content_ul2" v-for="(item, index) in list" :key="index">
          <li>姓名：{{item.name}}</li>
          <li>性别：{{item.sex}}</li>
          <li>证件类型：{{item.type}}</li>
          <li>证件号：{{item.certificate_num}}</li>
          <li>出生日期：{{item.date}}</li>
          <li>民族：{{item.nation}}</li>
          <li>联系电话：{{item.phone}}</li>
          <li>职业：{{item.occupation}}</li>
          <li>文件程度：{{item.education}}</li>
          <li>婚姻状况：{{item.marital_status}}</li>
        </ul>
        <div class="title" style="border-bottom:1px solid #ccc">病情现况</div>
        <ul class="content_ul1" v-for="(item, index) in illness_state" :key="index">
          <li>
            <span style="color:red">*</span>
            病情评估: {{item.assessment}}
          </li>
        </ul>
        <div class="title" style="border-bottom:1px solid #ccc">基础生命体征</div>
        <ul class="content_ul2" v-for="(item, index) in Basic" :key="index">
          <li>
            <span style="color:red">*</span>
            意识:{{item.cons}}
          </li>
          <li>
            <span style="color:red">*</span>
            呼吸:{{item.breathing}}次/分钟
          </li>
          <li>
            <span style="color:red">*</span>
            脉搏:{{item.pulse}}次/分钟
          </li>
          <li>
            <span style="color:red">*</span>
            心率:{{item.heart_rate}}次/分钟
          </li>
          <li>
            <span style="color:red">*</span>
            血压:{{item.blood_pre}}mmHg
          </li>
        </ul>
      </div>
      <div class="title">检查信息</div>
      <div class="content_list">
        <ul class="content_ul1" v-for="(item, index) in check" :key="index">
          <li>
            <span style="color:red">*</span>
            远程心电图传输: {{item.remote}}
          </li>
          <li>
            <span style="color:red">*</span>
            传输方式: {{item.trans_mode}}
          </li>
        </ul>
      </div>
    </div>
    <div class="footer">
      <van-button round color="#4676FB" size="large">保存</van-button>
    </div>
  </div>
</template>
<style scoped lang="scss">
// @import url("../assets/css/base.scss");
.content {
  .title {
    height: 8vw;
    line-height: 8vw;
    font-size: 16px;
    font-weight: bold;
    padding-left: 2.5vw;
    color: black;
  }
  .content_list {
    background: white;

    .content_ul2,
    .content_ul1 {
      display: block;
      overflow: hidden;
      clear: both;
      padding: 2vw;
      li {
        width: 50%;
        float: left;
        height: 40px;
        line-height: 40px;
        color: black;
      }
    }
    .content_ul1 {
      li {
        width: 100%;
        float: left;
        height: 40px;
        line-height: 40px;
        color: black;
      }
    }
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
export default {
  components: { headerCom },
  data() {
    return {
        // 急救信息
        list:[{
            name:'张三',
            sex:'女',
            type:'身份证',
            certificate_num:'13122199602132226',
            date:'1997-09-29',
            nation:'汉',
            phone:'13176932564',
            occupation:'web',
            education:'本科',
            marital_status:'未婚'
        }],
        // 病情现况
        illness_state:[{
            assessment:'持续性胸闷/胸痛;呼吸困难;'
        }],
        // 基础生命体征
        Basic:[{
            cons:'清醒',
            breathing:'23',
            pulse:'69',
            heart_rate:'28',
            blood_pre:'90/160'
        }],
        // 检查信息
        check:[{
            remote:'接收120/网络医院',
            trans_mode:'实时监控'
        }]
    };
  },
  created(){
      console.log(this.$route.query.name,this.$route.query.sex,this.$route.query.age,this.$route.query.type)
  },
//  mounted() {
//         this.$nextTick(()=>{
//             console.log(this.$refs.listss)
//         })
//     },
};
</script>
