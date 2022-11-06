<template>
  <common-layout>
    <div class="layout-content">
        <div class="logo-box">
          <!-- <div class="back-left-box"></div>
          <div class="back-right-box"></div> -->
          <div class="login-box" v-if="isShow == 1">
            <a-tabs default-active-key="1" @change="callbackFun" class="tab-box">
              <a-tab-pane key="1" tab="账号登录">
                <a-form-model
                  ref="ruleForm"
                  :model="form"
                  :rules="rules"
                  :label-col="labelCol"
                  :wrapper-col="wrapperCol">
                  <a-form-model-item prop="userAccount">
                    <a-input v-model="form.userAccount" placeholder="请输入账号">
                      <a-icon slot="prefix" type="user" style="color: #006FD0"/>
                    </a-input>
                  </a-form-model-item>
                  <a-form-model-item prop="password">
                    <a-input v-model="form.password" placeholder="请输入密码" type="password">
                      <img slot="prefix" src="../../assets/img/pass-img-box.svg" alt="" />
                    </a-input>
                  </a-form-model-item>
                  <a-form-model-item class="btn-login-box">
                    <a-button type="primary" @click="handleSubmit" :loading = "logging" style = "width: 100%;" size = "large">
                      登录
                    </a-button>
                  </a-form-model-item>
                  <div class="right-box">还没有账号？<span @click="registerFun(2)">点此注册</span></div>
                </a-form-model>
              </a-tab-pane>
              <a-tab-pane key="2" tab="手机号登录" force-render>
                <a-form-model
                  ref="ruleFormPhone"
                  :model="formPhone"
                  :rules="rulesPhone"
                  :label-col="labelCol"
                  :wrapper-col="wrapperCol">
                  <a-form-model-item prop="userPhone">
                    <a-input v-model="formPhone.userPhone" :maxLength="11" placeholder="请输入手机号">
                      <a-icon slot="prefix" type="tablet" style="color: #006FD0"/>
                    </a-input>
                  </a-form-model-item>
                  <a-form-model-item prop="obtainCode" class="pass-box">
                    <div class="obtain-box">
                      <a-input :maxLength="6" v-model="formPhone.obtainCode" placeholder="请输入验证码" type="obtainCode">
                        <a-icon slot="prefix" type="safety"  style="color: #006FD0;font-size: 17px"/>
                        <!-- <img slot="prefix" src="../../assets/img/pass-img-box.svg" alt="" /> -->
                      </a-input>
                      <div class="obtain-code-box" :style="formPhone.userPhone.length < 11 ? 'color: #999;cursor: auto;' : ''" v-if="formPhone.userPhone.length < 11">获取验证码</div>
                      <div class="obtain-code-box" @click="codeFun('login')" v-if="time == null && formPhone.userPhone.length >= 11">获取验证码</div>
                      <div class="obtain-code-box gray" v-if="time != null && formPhone.userPhone.length >= 11">重新获取 {{time}}s</div>
                    </div>
                  </a-form-model-item>
                  <a-form-model-item class="btn-login-box">
                    <a-button type="primary" @click="phoneHandleSubmit" :loading = "logging" style = "width: 100%;" size = "large">
                      登录
                    </a-button>
                  </a-form-model-item>
                  <div class="right-box">还没有账号？<span @click="registerFun(2)">点此注册</span></div>
                </a-form-model>
              </a-tab-pane>
            </a-tabs> 
          </div>
          <div class="login-box register-box" v-if="isShow == 2">
            <div class="title-box">注册账号 <span>已有账号？<span @click="registerFun(1)">登录</span></span></div>
            <a-form-model
                  ref="ruleFormrRgister"
                  :model="formRgister"
                  :rules="ruleFormRgister"
                  :label-col="labelCol"
                  :wrapper-col="wrapperCol">
                  <a-form-model-item prop="userPhone">
                    <div class="phone-box">
                      <div class="region-box">+86</div>
                      <a-input v-model="formRgister.userPhone" :maxLength="11" placeholder="请输入手机号"></a-input>
                    </div>
                  </a-form-model-item>
                  <a-form-model-item prop="obtainCode" class="pass-box">
                    <div class="obtain-box">
                      <a-input :maxLength="6" v-model="formRgister.obtainCode" placeholder="请输入验证码" type="obtainCode"></a-input>
                      <div class="obtain-code-box" :style="formRgister.userPhone.length < 11 ? 'color: #999;cursor: auto;' : ''" v-if="formRgister.userPhone.length < 11">获取验证码</div>
                      <div class="obtain-code-box" @click="codeFun('register')" v-if="time == null && formRgister.userPhone.length >= 11">获取验证码</div>
                      <div class="obtain-code-box gray" v-if="time != null && formRgister.userPhone.length >= 11">重新获取 {{time}}s</div>
                    </div>
                  </a-form-model-item>
                  <a-form-model-item prop="password" class="input-password-box">
                    <a-input :maxLength="20" @blur="blurFun($event)" @focus="focusFun($event,1)" v-model="formRgister.password" placeholder="请输入密码"></a-input>
                    <div class="tips-pass-box" v-if="tipsShow == 1">
                        <div>
                          <img src="../../assets/img/Frame (1).svg" alt="" v-if="tips1 == 1">
                          <img src="../../assets/img/Frame.svg" alt="" v-if="tips1 == 2">
                          6-20 个字符
                        </div>
                        <div>
                          <img src="../../assets/img/Frame (1).svg" alt="" v-if="tips2 == 1">
                          <img src="../../assets/img/Frame.svg" alt="" v-if="tips2 == 2">
                          只能包含字母、数字以及标点符号(除空格)
                        </div>
                        <div>
                          <img src="../../assets/img/Frame (1).svg" alt="" v-if="tips3 == 1">
                          <img src="../../assets/img/Frame.svg" alt="" v-if="tips3 == 2">
                          字母、数字和标点符号至少包含2种
                        </div>
                    </div>
                  </a-form-model-item>
                  <a-form-model-item prop="aginPassword"  class="input-password-box">
                    <a-input :maxLength="20" @blur="blurFun($event)" @focus="focusFun($event,2)" v-model="formRgister.aginPassword" placeholder="确认密码" ></a-input>
                    <div class="tips-pass-box" v-if="tipsShow == 2">
                      <div>
                        <img src="../../assets/img/Frame (1).svg" alt="" v-if="aginTips1 == 1">
                        <img src="../../assets/img/Frame.svg" alt="" v-if="aginTips1 == 2">
                        6-20 个字符
                      </div>
                      <div>
                        <img src="../../assets/img/Frame (1).svg" alt="" v-if="aginTips2 == 1">
                        <img src="../../assets/img/Frame.svg" alt="" v-if="aginTips2 == 2">
                        只能包含字母、数字以及标点符号(除空格)
                      </div>
                      <div>
                        <img src="../../assets/img/Frame (1).svg" alt="" v-if="aginTips3 == 1">
                        <img src="../../assets/img/Frame.svg" alt="" v-if="aginTips3 == 2">
                        字母、数字和标点符号至少包含2种
                      </div>
                    </div>
                  </a-form-model-item>
                  <div class="checkbox-box">
                    <a-checkbox @change="onChange"></a-checkbox><span>已阅读并同意物栖帐号 <span><a :href="docUrl + '/appendix/OS-agreements.html'" target="_blank">物栖 OS 生态产品合作协议</a></span>
						           、 <span><a :href="docUrl + '/appendix/agreements.html'" target="_blank">服务协议</a></span></span>
                  </div>
                  <a-form-model-item style="margin-top: 18px;margin-bottom: 60px">
                    <a-button type="primary" @click="registerHandleSubmit" :loading = "logging" style = "width: 100%;" size = "large">注册</a-button>
                  </a-form-model-item>
            </a-form-model>
          </div>
          <div class="login-box register-box" v-if="isShow == 3">
            <div class="title-box">完善信息 <span>暂不输入 <span @click="registerFun(3)">跳过</span></span></div>
            <a-form-model
                  ref="ruleFormrInfo"
                  :model="formInfo"
                  :rules="ruleFormInfo"
                  :label-col="labelCol"
                  :wrapper-col="wrapperCol">
                  <a-form-model-item prop="organization">
                    <a-input v-model="formInfo.organization" placeholder="所在学校" type="organization"></a-input>
                  </a-form-model-item>
                  <a-form-model-item>
                    <a-select
                      allowClear
                      v-model="formInfo.industryId"
                      placeholder="请选择行业"
                      style="width: 400px">
                      <a-select-option
                        v-for="industryItem in industryList"
                        :key="industryItem.name"
                        :value="industryItem.code">
                        {{ industryItem.name }}
                      </a-select-option>
                    </a-select>
                  </a-form-model-item>
                  <a-form-model-item prop="email">
                    <a-input :maxLength="60" v-model="formInfo.email" placeholder="请输入邮箱" type="email"></a-input>
                  </a-form-model-item>
                  <a-form-model-item style="margin-top: 30px;margin-bottom: 40px">
                    <a-button type="primary" @click="infoHandleSubmit" :loading = "logging" style = "width: 100%;" size = "large">完成</a-button>
                  </a-form-model-item>
            </a-form-model>
          </div>
        </div>
    </div>
  </common-layout>
</template>

<script>
import CommonLayout from "@/layouts/CommonLayout";
import {
  login, mobileCode, register , industry , registerUserinfo
} from "@/services/user";
import { setAuthorization } from "@/utils/request";
// import {loadRoutes} from '@/utils/routerUtil'
import { mapMutations } from "vuex";
// import md5 from "blueimp-md5";
import { emailCheck, loginPasswordCheck, userPhoneCheck , 
obtainCodeCheck , organizationCheck , emailCheck1 } from '../../utils/decorator'
export default {
  name: "Login",
  components: { CommonLayout },
  data() {
    // 
    this.loginPassword = (rule, value, callback) => {
      if (!value || value == 'undefined') {
        this.aginTips1 = 1;
        this.aginTips2 = 1;
        this.aginTips3 = 1;
        callback('请输入密码')
        return
      } else if(value.length < 6) {
        this.tips1 = 1;
        callback('6-20 个字符')
        return
      } else if(!/^[a-zA-Z0-9\.,.?:;'"!？：“”【】、；‘’，。、']*$/.test(value)) {
        this.tips1 = 2;
        callback('只能包含字母、数字以及标点符号(除空格)')
        return
      }  else if(!/(?!.*\s)(?!^[\u4e00-\u9fa5]+$)(?!^[0-9]+$)(?!^[A-z]+$)(?!^[^A-z0-9]+$)^.{6,20}$/.test(value)) {
      // }  else if(!/^(?!\s)[a-zA-Z0-9\.,.?:;'"!？：“”【】、；‘’，。、']{6,20}$/.test(value)) {
        this.tips1 = 3;
        callback('字母、数字和标点符号至少包含2种')
        return
      } 
     
      if(this.formRgister.password != '' && this.formRgister.aginPassword != '') {
        if(this.formRgister.password != this.formRgister.aginPassword) {
          callback('两次输入的密码不一致，请重新输入')
          return
        }
      }
      callback();
    };
    this.aginLoginPassword = (rule, value, callback) => {
      if (!value || value == 'undefined') {
        this.aginTips1 = 1;
        this.aginTips2 = 1;
        this.aginTips3 = 1;
        callback('请输入密码')
        return
      }  else if(value.length < 6) {
        this.aginTips1 = 1;
        callback('6-20 个字符')
        return
      } else if(!/^[a-zA-Z0-9\.,.?:;'"!？：“”【】、；‘’，。、']*$/.test(value)) {
        this.aginTips2 = 2;
        callback('只能包含字母、数字以及标点符号(除空格)')
        return
      } else if(!/(?!.*\s)(?!^[\u4e00-\u9fa5]+$)(?!^[0-9]+$)(?!^[A-z]+$)(?!^[^A-z0-9]+$)^.{6,20}$/.test(value)) {
        this.aginTips3 = 3;
        callback('字母、数字和标点符号至少包含2种')
        return
      } 
      if(this.formRgister.password != '' && this.formRgister.aginPassword != '') { 
        if(this.formRgister.password != this.formRgister.aginPassword) {
          callback('两次输入的密码不一致，请重新输入')
          return
        } 
      }
      callback();
    };
    return {
      aginPassTips: 1,
      tipsShow: 0,
      tips1: 1,
      tips2: 1,
      tips3: 1,
      aginTips1: 1,
      aginTips2: 1,
      aginTips3: 1,
      docUrl: process.env.VUE_APP_USERAGREEMENT_URL,
      isShow: 1,
      isSend: true, // 展示验证码还是发送验证码
      count: "",
      timer: null, 
      logging: false,
      error: "",
      form: {
        userAccount: '',
        password: '',
      },
      formPhone: {
        userPhone: '',
        obtainCode: '',
      },
      
      formRgister: {
        userPhone: '',
        obtainCode: '',
        password: '',
        aginPassword: '',
      },
      labelCol: { span: 1 },
      wrapperCol: { span: 24 },
      formInfo: {
        organization: '',
        industryId: undefined,
        email: '',
      },
      industryList: [],
      rules: {
        userAccount: [
          {
            validator: emailCheck.bind(this),
            trigger: "blur",
          }
        ],
        password: [
          {
            validator: loginPasswordCheck.bind(this),
            trigger: "blur",
          }
        ],
      },
      rulesPhone: {
        userPhone: [
          {
            validator: userPhoneCheck.bind(this),
            trigger: "blur",
          }
        ],
        obtainCode: [
          {
            validator: obtainCodeCheck.bind(this),
            trigger: "blur",
          }
        ],
      },
      ruleFormRgister: {
        userPhone: [
          {
            validator: userPhoneCheck.bind(this),
            trigger: "change",
          }
        ],
        obtainCode: [
          {
            validator: obtainCodeCheck.bind(this),
            trigger: "blur",
          }
        ],
        password: [
          {
            validator: this.loginPassword,
            trigger: "change",
          }
        ],
        aginPassword: [
          {
            validator: this.aginLoginPassword,
            trigger: "change",
          }
        ],
      },
      ruleFormInfo: {
        organization: [
          {
            validator: organizationCheck.bind(this),
            trigger: "blur",
          }
        ],
        email: [
          {
            validator: emailCheck1.bind(this),
            trigger: "blur",
          }
        ],
      },
      time: null,
      checked: false,
    };
  },
  computed: {
    systemName() {
      return this.$store.state.setting.systemName;
    }
  },
  watch: {
    'formPhone.userPhone': function (newName,oldName) {
      if(newName.length == 0) {
        clearInterval(this.timer);
        this.time = null;
      }
    },
    'formRgister.userPhone': function (newName,oldName) {
      if(newName.length == 0) {
        clearInterval(this.timer);
        this.time = null;
      }
    },
    'formRgister.password': function (newName,oldName) {
      if(newName.length >= 6) {
        this.tips1 = 2;
      } else if(newName.length < 5) {
        this.tips1 = 1;
      } 
      if(newName.length > 0) {
        if (!/^[a-zA-Z0-9\.,.?:;'"!？：“”【】、；‘’，。、']*$/.test(this.formRgister.password)) {
          this.tips2 = 1;
        } else {
          this.tips2 = 2;
        } 
        // !/(?!.*\s)(?!^[\u4e00-\u9fa5]+$)(?!^[0-9]+$)(?!^[A-z]+$)(?!^[^A-z0-9]+$)^.{6,20}$/.test(value)
        if (!/(?!.,.?:;'"!？：“”【】、；‘’，。、'*\s)(?!^[\u4e00-\u9fa5]+$)(?!^[0-9]+$)(?!^[A-z]+$)(?!^[^A-z0-9]+$)^.*$/.test(this.formRgister.password)) {
        // if (!/^(?!\s)[a-zA-Z0-9\.,.?:;'"!？：“”【】、；‘’，。、']{6,20}$/.test(this.formRgister.password)) {
          this.tips3 = 1;
        } else {
          this.tips3 = 2;
        } 
      }
      if(newName != '' && this.formRgister.aginPassword != '') {
        if(newName == this.formRgister.aginPassword) {
          this.$refs.ruleFormrRgister.validateField('password');
          this.$refs.ruleFormrRgister.validateField('aginPassword');
          return
        }
      }
    },
    'formRgister.aginPassword': function (newName,oldName) {
      if(newName.length > 6) {
        this.aginTips1 = 2;
      } else if(newName.length < 6) {
        this.aginTips1 = 1;
      } 
      if(newName.length > 0) {
        if (!/^[a-zA-Z0-9\.,.?:;'"!？：“”【】、；‘’，。、']*$/.test(this.formRgister.aginPassword)) {
          this.aginTips2 = 1;
        } else {
          this.aginTips2 = 2;
        } 
        if (!/(?!.,.?:;'"!？：“”【】、；‘’，。、'*\s)(?!^[\u4e00-\u9fa5]+$)(?!^[0-9]+$)(?!^[A-z]+$)(?!^[^A-z0-9]+$)^.*$/.test(this.formRgister.aginPassword)) {
        // if (!/^[a-zA-Z0-9\.,.?:;'"!？：“”【】、；‘’，。、']{6,20}$/.test(this.formRgister.aginPassword)) {
          this.aginTips3 = 1;
        } else {
          this.aginTips3 = 2;
        } 
      }
      if(newName != '' && this.formRgister.password != '') {
        if(newName == this.formRgister.password) {
          this.$refs.ruleFormrRgister.validateField('password');
          this.$refs.ruleFormrRgister.validateField('aginPassword');
          return
        }
      }
    },
  },
  created() { },
  methods: {
    ...mapMutations("account", ["setUser", "setPermissions", "setRoles"]),
    blurFun(event) {
      this.tipsShow = 0;
    },
    focusFun(event,type) {
      this.tipsShow = type;
    },
    // 切换
    callbackFun(key) {
      this.$refs.ruleFormPhone.resetFields();
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
            if(this.formPhone.userPhone == null) {
              // this.tipsImg = 2;
              // this.tips = '验证码不能为空';
              // this.Resend = 0;
              clearInterval(this.timer);
              this.time = null;
            }
          }
      },1000)
    },
    codeFun(type) {
      localStorage.removeItem('userInfor')
      if(type == 'login') {
        this.$refs.ruleFormPhone.validateField('userPhone',(val) => {
          if(val.length > 0) {
            return
          } else {
            this.$message.success('未注册手机号验证通过后将自动注册');
            this.mobileCodeFun(type,this.formPhone.userPhone);
          }
        })
      } else {
        this.$refs.ruleFormrRgister.validateField('userPhone',(val) => {
          if(val.length > 0) {
            return
          } else {
            this.mobileCodeFun(type,this.formRgister.userPhone);
          }
        })
      }
    },
    // 验证码
    mobileCodeFun(type,mobile) {
      mobileCode({
        type: type,
        mobile: mobile
      }).then(res => {
        if(res.data.statusCode != 200) {
          this.$message.error(res.data.message);
        } else {
          this.timimg();
        }
        console.log(res,'res');
      }).catch(err => {
        console.log(err,'err');
      })
    },
    // 注册
    registerFun(type) {
      this.isShow = type;
      this.time = null;
      clearInterval(this.timer);
      // this.$refs.ruleFormPhone.resetFields();
      // this.$refs.ruleFormrRgister.resetFields();
      if(type == 3) {
        this.$router.push("/application/applicationDebugging");
      }
    },
    onChange(e) {
      this.checked = e.target.checked;
    },
    // 账户登录
    handleSubmit() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.logging = true
          localStorage.removeItem('userInfor')
          login({
            mobile: this.form.userAccount,
            password: this.form.password,
            loginType: 'password',
            "grant_type":"developer_code"
          }).then(res => {
            this.logging = false;
            if(res.data.statusCode == 200) {
              this.afterLogin(res,this.form.userAccount);
            } else {
              this.$message.success(res.data.message == null ? '失败' : res.data.message)
            }
          }).catch(err => {
            console.log(err,'账户');
            this.logging = false;
          })
        } else {
          this.logging = false;
          return false;
        }
      });
    },
    // 手机号登录
    phoneHandleSubmit(type) {
      if(type == 1) {
        this.$refs.ruleFormrRgister.validate(valid => {
          if (valid) {
            this.logging = true
            localStorage.removeItem('userInfor');
              login({
                mobile: this.formRgister.userPhone,
                // code: this.formRgister.obtainCode,
                loginType: 'password',
                password: this.formRgister.password,
                "grant_type": "developer_code"
              }).then(res => {
                this.logging = false;
                if(res.data.statusCode == 200) {
                  // if(res.data.resultValue.loginType == 'core_2005') {
                    this.afterLogin(res,this.formRgister.userPhone,'register');
                  // } else {
                  //   this.afterLogin(res,this.formRgister.userPhone);
                  // }
                } else {
                  this.$message.success(res.data.message == null ? '失败' : res.data.message)
                }
              }).catch(err => {
                console.log(err,'注册');
                this.logging = false
              })
        //     } else {
        //       this.logging = false
        //       return false;
        //     }
          }
        })
      } else {
        this.$refs.ruleFormPhone.validate(valid => {
          if (valid) {
            this.logging = true
            localStorage.removeItem('userInfor');
            login({
              mobile: this.formPhone.userPhone,
              code: this.formPhone.obtainCode,
              loginType: 'code',
              "grant_type":"developer_code"
            }).then(res => {
              this.logging = false;
              if(res.data.statusCode == 200) {
                if(res.data.resultValue.loginType == 'core_2005') {
                  this.afterLogin(res,this.formPhone.userPhone,'code');
                } else {
                  this.afterLogin(res,this.formPhone.userPhone);
                }
              } else {
                this.$message.success(res.data.message == null ? '失败' : res.data.message)
              }
            }).catch(err => {
              console.log(err,'注册');
              this.logging = false
            })
          } else {
            this.logging = false
            return false;
          }
        });
      }
    },
    // 注册
    registerHandleSubmit() {
      this.$refs.ruleFormrRgister.validate(valid => {
        if (valid) {
          if(!this.checked) {
            this.$message.error("请勾选协议");
            return
          }
          this.logging = true
          localStorage.removeItem('userInfor')
          register({
            mobile: this.formRgister.userPhone,
            password: this.formRgister.password,
            code: this.formRgister.obtainCode,
            confirmPassword: this.formRgister.aginPassword,
          }).then(res => {
            this.logging = false;
            if(res.data.statusCode == 200) {
              this.phoneHandleSubmit(1);
              // this.afterLogin(res,this.formRgister.userPhone,'register');
            } else {
              this.$message.success(res.data.message == null ? '失败' : res.data.message)
            }
          }).catch(err => {
            console.log(err,'注册');
            this.logging = false
          })
        } else {
          this.logging = false
          return false;
        }
      });
    },
    // 完善信息
    infoHandleSubmit() {
      this.logging = true;
      registerUserinfo(this.formInfo).then(res => {
        if(res.data.statusCode == 200) {
          this.logging = false;
          this.$router.push("/application/applicationDebugging");
        } else {
          this.logging = false;
          this.$message.success(res.data.message == null ? '失败' : res.data.message)
        }
      }).catch(err => {
        this.logging = false;
        console.log(err,'err');
      })
    },
    // 行业
    industryApiFun() {
      industry().then(res => {
        if(res.data.resultValue.length > 0) {
          this.industryList = res.data.resultValue;
        } else {
          this.industryList = [];
        }
      }).catch(err => {
          console.log(err,'err');
      })
    },
    async afterLogin(res,mobile,type) {
      this.logging = false;
      const loginRes = res.data;
      if (loginRes.statusCode == 200 &&  res.data.resultValue) {
        localStorage.setItem("userInfor", JSON.stringify(loginRes.resultValue));
        localStorage.setItem("userAccount", JSON.stringify(mobile));
        // const {user:{avatar}, permissions, roles} = loginRes.resultValue;
        // this.setPermissions(permissions)
        // this.setRoles(roles)
        // setAuthorization({token: loginRes.data.token, expireAt: new Date(loginRes.data.expireAt)})
        setAuthorization({ token: JSON.stringify(loginRes.resultValue.token) });
        if(type == 'register' || type == 'code') {
          this.isShow = 3;
          this.industryApiFun();
        } else {
          this.$router.push("/application/applicationDebugging");
        }
        // 获取路由配置
        // getRoutesConfig().then(result => {
        // const routesConfig = result.data.data
        // this.$message.success(loginRes.message, 3)
        // })
        // loadRoutes(routesConfig)
        // await loadRoutes('routesConfig')
        // this.form.resetFields("password", '')
      } else {
        this.logging = false;
        this.$message.error(loginRes.message);
      }
    }
  }
};
</script>

<style lang="less" scoped>
.common-layout {
  
  .layout-content {
    width: 100%;
    height: 50%;
    // background: #165DFF;
    position: absolute;
    top: 0;
    z-index: 1;
    overflow: hidden;
    .back-left-box {
      width: 0;
      height: 0;
      border-top: 370px solid #1054F1;
      border-right: 677px solid transparent;
    }
    .back-right-box {
      width: 0;
      height: 0;
      border-bottom: 370px solid #1054F1;
      border-left: 677px solid transparent;
      position: absolute;
      right: 0;
      bottom: 0;
    }
    // margin-top: 100px;
    // display: flex;
    // justify-content: center;
    // align-items: center;
    .logo-box {

      .logo-left {
        // max-width: 950px;
        max-width: 350px;
        .logo-title {
          font-size: 36px;
          font-family: PingFang SC, PingFang SC-Medium;
          font-weight: 500;
          text-align: LEFT;
          color: #333333;
          line-height: 70px;
        }
        .logo-des {
          font-size: 18px;
          // font-family: PingFang SC, PingFang SC-Regular;
          text-align: LEFT;
          color: #666666;
          line-height: 29px;
          margin: 20px 0;
          width: 614px;
        }
        .logo-btn {
          button {
            width: 211px;
            height: 50px;
            border: 1px solid #3293ff;
            border-radius: 3px;
            span {
              font-size: 16px;
            }
          }
        }
      }
    }
  }
  .login-box {
    width: 531px;
    min-height: 439px;
    background: #ffffff;
    border-radius: 8px;
    box-shadow: 0px 12px 10px 0px rgba(6,77,240,0.08), 0px -1px 8px 0px rgba(7,77,237,0.06); 
    // padding: 30px 25px 20px;
    padding: 0 100px;
    border-radius: 8px;
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translateX(-50%) translateY(-50%);
    .title-box {
      height: 100px;
      font-size: 20px;
      font-weight: 700;
      color: #333333;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 15px;
      >span {
        font-size: 14px;
        font-weight: 400;
        text-align: right;
        color: #666666;
        line-height: 14px;
        >span {
          color: #006FD0;
          cursor: pointer;
        }
      }
    }
    .phone-box {
      position: relative;
      .region-box {
        width: 90px;
        height: 40px;
        position: absolute;
        z-index: 3;
        padding-left: 10px;
        font-weight: 400;
        font-size: 14px;
        color: #333333;
        border-right: 1px solid #dfe0e3;
      }
      /deep/ .ant-input {
        padding-left: 100px;
      }
    }
    .tab-box {
      padding-top: 40px;
      /deep/ .ant-tabs-tab-active {
        color: #006FD0;
        font-weight: 700;
        font-size: 20px;
      }
      /deep/ .ant-tabs-ink-bar {
        background-color: #006FD0;
      }
      /deep/ .ant-tabs-tab {
        padding: 12px 0px;
        margin: 0 60px 0 0;
        font-size: 20px;
        color: #006fd0;
      }
    }
    /deep/ .ant-tabs-bar {
      margin: 0 0 40px 0!important;
    }
    .btn-login-box {
      margin-top: 60px;
    }
    .right-box {
      font-size: 14px;
      font-weight: 400;
      color: #666666;
      line-height: 14px;
      text-align: right;
      >span {
        color: #006fd0;
        cursor: pointer;
      }
    }
    // .title-box {
    //   height: 92px;
    //   font-size: 24px;
    //   font-weight: 600;
    //   color: #1d2129;
    //   line-height: 92px;
    //   text-align: center;
    // }
    @media screen and (max-width: 576px) {
      width: 95%;
    }
    @media screen and (max-width: 320px) {
      .captcha-button {
        font-size: 14px;
      }
    }
    .icon {
      font-size: 24px;
      color: @text-color-second;
      margin-left: 16px;
      vertical-align: middle;
      cursor: pointer;
      transition: color 0.3s;

      &:hover {
        color: @primary-color;
      }
    }
    .login-bottom-img {
      display: flex;
      justify-content: center;
    }
  }

}
/deep/ .ant-input {
  width: 330px;
  height: 40px!important;
  background: #fff!important;
  border: 1px solid #d9d9d9!important;
  border-radius: 4px!important;
  // box-shadow: 0px 12px 10px 0px rgba(6,77,240,0.08), 0px -1px 8px 0px rgba(7,77,237,0.06)!important; 
}
/deep/ .ant-input-affix-wrapper .ant-input:not(:first-child) {
  padding-left: 36px;
}
/deep/ .ant-form-item-control{
  line-height: 46px;
}

.register-box {
  width: 600px!important;
  /deep/ .ant-input {
    width: 400px;
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
  .input-password-box {
    position: relative;
    .tips-pass-box {
      position: absolute;
      z-index: 888;
      width: 400px;
      height: 100px;
      background: #ffffff;
      border: 1px solid #dfe0e3;
      border-radius: 4px;
      box-shadow: 0px 4px 10px 0px rgba(0,0,0,0.25); 
      >div {
        >img {
          margin: 0 10px;
        }
        height: 33%;
        line-height: 33px;
        color: #666666;
        font-size: 12px;
      }
    }
  }
  /deep/ .ant-form-item-control {
    line-height: 40px;
  }
  .checkbox-box {
    font-size: 12px;
    font-weight: 300;
    color: #666666;
    line-height: 12px;
    span {
      color: #666666;
      margin-left: 10px;
      >span {
        margin-left: 0;
        color: #006fd0;
        cursor: pointer;
      }
    }
  }
  /deep/ .ant-select-selection {
    width: 400px;
    height: 40px!important;
    background: #ffffff;
    border: 1px solid #dfe0e3;
    border-radius: 4px;
  }
  /deep/ .ant-select-selection__rendered {
    line-height: 40px!important;
  }
</style>
