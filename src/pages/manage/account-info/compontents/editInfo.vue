<template>
  <div>
    <!-- <a type="primary" @click="showModal">编辑</a> -->
    <a-modal
      class='edit-dialog'
      title="修改密码"
      :visible="visible"
      :centered="true"
      :confirm-loading="confirmLoading"
      @ok="submitForm('ruleForm')"
      @cancel="resetForm('ruleForm')">
       <a-form-model
            ref="ruleForm" :model="ruleForm" :rules="rules">
            <a-form-model-item prop="mobile">
                <a-input v-model="ruleForm.mobile" placeholder="请输入手机号"></a-input>
            </a-form-model-item>
            <a-form-model-item prop="code" class="pass-box">
                <div class="obtain-box">
                    <a-input :maxLength="6" v-model="ruleForm.code" placeholder="请输入验证码"></a-input>
                    <div class="obtain-code-box" :style="ruleForm.mobile.length < 11 ? 'color: #999;cursor: auto;' : ''" v-if="ruleForm.mobile.length < 11">获取验证码</div>
                    <div class="obtain-code-box" @click="codeFun" v-if="time == null && ruleForm.mobile.length >= 11">获取验证码</div>
                    <div class="obtain-code-box gray" v-if="time != null && ruleForm.mobile.length >= 11">重新获取 {{time}}s</div>
                </div>
            </a-form-model-item>
            <a-form-model-item prop="password">
                <a-input v-model="ruleForm.password" placeholder="请输入密码"></a-input>
            </a-form-model-item>
            <a-form-model-item prop="confirmPassword">
                <a-input v-model="ruleForm.confirmPassword" placeholder="确认密码"></a-input>
            </a-form-model-item>
        </a-form-model>
    </a-modal>
  </div>
</template>
<script>
import { userPhoneCheck , obtainCodeCheck } from '../../../../utils/decorator';
import { mobileCode , updatePassword } from "@/services/user";
export default {
  data() {
     this.loginPassword = (rule, value, callback) => {
      const reg = /^(?!\s)[a-zA-Z0-9\.,.?:;'"!？：“”【】、；‘’，。、']{6,20}$/g;
      if (!value || value == 'undefined') {
        callback('请输入密码')
        return
      } else if (!reg.test(value)) {
        callback('密码设置不符合要求')
        return
      }
      if(this.ruleForm.password != '' && this.ruleForm.confirmPassword != '') {
        if(this.ruleForm.password != this.ruleForm.confirmPassword) {
          callback('两次输入的密码不一致，请重新输入')
          return
        }
      }
      callback();
    };
    this.aginLoginPassword = (rule, value, callback) => {
      const reg = /^(?!\s)[a-zA-Z0-9\.,.?:;'"!？：“”【】、；‘’，。、']{6,20}$/g;
      if (!value || value == 'undefined') {
        callback('请输入密码')
        return
      } else if (!reg.test(value)) {
        callback('密码设置不符合要求')
        // callback('6-20个字符，支持英文区分大小写、数字、符号')
        return
      }
      if(this.ruleForm.password != '' && this.ruleForm.confirmPassword != '') { 
        if(this.ruleForm.password != this.ruleForm.confirmPassword) {
          callback('两次输入的密码不一致，请重新输入')
          return
        }
      }
      callback();
    };
    return {
      visible: false,
      confirmLoading: false,
      id: 0,
      ruleForm: {
        mobile: '',
        code: '',
        password: '',
        confirmPassword: ''
      },
      rules: {
        mobile: [
          {
            validator: userPhoneCheck.bind(this),
            trigger: "blur",
          }
        ],
        code: [
          {
            validator: obtainCodeCheck.bind(this),
            trigger: "blur",
          }
        ],
        password: [
          {
            validator: this.loginPassword,
            trigger: "blur",
          }
        ],
        confirmPassword: [
          {
            validator: this.aginLoginPassword,
            trigger: "blur",
          }
        ],
      },
      layout: {
        labelCol: { span: 6 },
        wrapperCol: { span: 14 },
      },
      timer: null,
      time: null,
    };
  },
  watch: {
    'ruleForm.mobile': function (newName,oldName) {
      if(newName.length == 0) {
        clearInterval(this.timer);
        this.time = null;
      }
    },
    'ruleForm.password': function (newName,oldName) {
      if(newName != '' && this.ruleForm.confirmPassword != '') { 
        if(newName == this.ruleForm.confirmPassword) {
          this.$refs.ruleForm.validateField('password');
          this.$refs.ruleForm.validateField('confirmPassword');
          return
        }
      }
    },
    'ruleForm.confirmPassword': function (newName,oldName) {
      if(newName != '' && this.ruleForm.password != '') { 
        if(newName == this.ruleForm.password) {
          this.$refs.ruleForm.validateField('password');
          this.$refs.ruleForm.validateField('confirmPassword');
          return
        }
      }
    },
  },
  methods: {
    show(){
      this.visible = true;
    },
    clearFun() {
        this.time = null;
        clearInterval(this.timer);
        this.ruleForm.mobile = '';
        this.ruleForm.code = '';
        this.ruleForm.password = '';
        this.ruleForm.confirmPassword = '';
    },
    // 倒计时
    timimg(){
      clearInterval(this.timer);
      this.time = 59;
      this.timer = setInterval(()=>{
      if(this.time != 0 && this.time != null) 
          this.time -= 1;
          if(this.time == 0) {
            this.time = null;
            clearInterval(this.timer);
          }
          if(this.time == 0){
            if(this.ruleForm.mobile == null) {
              // this.tipsImg = 2;
              // this.tips = '验证码不能为空';
              // this.Resend = 0;
              clearInterval(this.timer);
              this.time = null;
            }
          }
      },1000)
    },
    codeFun() {
        this.$refs.ruleForm.validateField('mobile',(val) => {
            if(val.length > 0) {
                return
            } else {
                mobileCode({
                    type: 'update_password',
                    mobile: this.ruleForm.mobile
                }).then(res => {
                    if(res.data.statusCode != 200) {
                        this.$message.error(res.data.message);
                    } else {
                        this.timimg();
                    }
                }).catch(err => {
                    console.log(err,'err');
                })
            }
        })
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
        //   this.$emit('submitDate',this.ruleForm)
            updatePassword(this.ruleForm).then(res => {
                if(res.data.statusCode == 200) {
                    this.visible = false;
                    this.$message.success('修改成功');
                    console.log('修改密码',res)
                } else {
                    this.$message.error(res.data.message);
                }
            }).catch(err => {
                this.visible = false;
                console.log(err,'err');
            })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.visible = false;
    },
    showModal() {
      this.visible = true;
    },
    handleOk(e) {
      this.confirmLoading = true;
      setTimeout(() => {
        this.visible = false;
        this.confirmLoading = false;
      }, 2000);
    },
  },
};
</script>
<style lang="less" scoped>
       .edit-dialog {
        /deep/ .ant-modal-content {
            width: 398px;
        }
        /deep/ .ant-modal-body {
            padding: 30px;
        }
      /deep/.ant-modal-header {
          height: 38px;
          padding: 0!important;
          background: #f0f1f5;
        .ant-modal-title {
            display: flex;
            // justify-content: center;
            font-size: 12px;
            text-align: left;
            color: #333;
            line-height: 38px;
            font-weight: 700;
            padding-left: 17px;
        }
      }
      /deep/ .ant-modal-close-x {
          height: 38px;
          line-height: 38px;
      }
      /deep/.ant-form-item {
          width: 330px;
        height: 40px;
        margin-bottom: 20px;
      }
     
      /deep/.ant-col {
        // width: 117px !important;
        .ant-form-item-required {
          font-size: 14px;
          color: #4e5969;
        }
      }
      /deep/.ant-form-item-label {
        .ant-form-item-required::before {
          content:' '
        }
        .ant-form-item-label > label::after {
          content:' '
        }
      }
      /deep/.ant-form-item-label > label::after{
        content:' '
      }
      /deep/.ant-form-item-children {
        .ant-input {
            width: 330px;
            height: 40px;
            background: #ffffff;
            border: 1px solid #dfe0e3!important;
            border-radius: 4px;
        }
      }
      /deep/.ant-form-explain {
        width: 276px;
      }
      /deep/.has-error {
        .ant-form-item-children {
          .ant-input {
            border: 1px solid red;
          }
        }
      }
      /deep/.ant-modal-footer {
        .ant-btn {
          width: 60px;
          height: 32px;
          background: #f2f3f5;
          border-radius: 2px;
          border: none;
          span {
            font-size: 14px;
            font-family: PingFang SC, PingFang SC-Regular;
            font-weight: 400;
            color: #4e5969;
          }
        }
        .ant-btn-primary {
          background: #006FD0;
          span {
            color: #fff;
          }
        }
      }


.pass-box {
  // /deep/ .ant-input-affix-wrapper {
    //   width: 227px;
    //   input {
      //     width: 227px;
    //   }
    // }
    .obtain-box {
      position: relative;
    }
    .obtain-code-box {
      width: 102px;
      height: 40px;
      text-align: center;
      border-left: 1px solid #dfe0e3;
      position: absolute;
      top: 0;
      right: 0;
      cursor: pointer;
      color: #006fd0;
      font-size: 14px;
    }
    .gray {
      color: #999999;
      cursor: auto;
    }
  }
    }
  
 
</style>