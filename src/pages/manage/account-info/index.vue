<template>
    <header-layout>
        <div class="infor-box">
            <div class="title-info-box">
                <div class="head-portrait-box">
                    <div class="img-box">
                        <img :src="form.headPortrait" alt="" class="avatar-img-box">
                        <div class="upload-box">
                            <a-upload
                                ref="imageRefs"
                                name="file"
                                class="avatar-uploader"
                                :show-upload-list="false"
                                action=""
                                :headers="headers"
                                accept='image/jpg,image/jpeg,image/png'
                                @change="handleChange"
                                :beforeUpload="beforeUpload">
                                <a-button><img src="../../../assets/set/_Avatar_AvatarEdit.svg" alt="" class="upload-img-box"></a-button>
                            </a-upload>
                        </div>
                    </div>
                </div>
                <div class="content-box">
                    <div class="content-row-box">
                        <div class="row-box">
                            <span >账号：</span>
                            <span>{{form.userPhone}}</span>
                        </div>
                        <div class="row-box">
                            <span >邮箱：</span>
                            <span>{{form.email == '' ? '--' : form.email}}</span>
                        </div>
                    </div>
                    <div class="content-row-box">
                        <div class="row-box">
                            <span>注册时间：</span>
                            <span v-if="form.registerTime == null || form.registerTime == ''">--</span>
                            <span v-else>{{form.registerTime | dataFormat}}</span>
                        </div>
                       <div class="row-box">
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="info-content-box">
                <a-tabs default-active-key="1" @change="callback" class="tab-box">
                    <a-tab-pane key="1" tab="基本信息">
                        <a-form-model
                            ref="ruleForm"
                            :model="form"
                            :rules="rules"
                            :label-col="labelCol"
                            :wrapper-col="wrapperCol">
                            <a-form-model-item label="所在公司：" prop="organization">
                                <a-input v-model="form.organization" placeholder="请输入公司/账号"></a-input>
                            </a-form-model-item>
                            <a-form-model-item label="所在行业：" prop="industryId">
                                <a-select
                                allowClear
                                v-model="form.industryId"
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
                            <a-form-model-item label="职位：" prop="position">
                                <a-input v-model="form.position" placeholder="请输入职位"></a-input>
                            </a-form-model-item>
                            <a-form-model-item label="昵称：" prop="nickname">
                                <a-input v-model="form.nickname" placeholder="请输入昵称"></a-input>
                            </a-form-model-item>
                            <a-form-model-item label="性别：" prop="gender">
                                <a-radio-group name="角色" v-model="form.gender" @change="radioChange">
                                    <a-radio :value="1">男</a-radio>
                                    <a-radio :value="2">女</a-radio>
                                    <a-radio :value="3">未知</a-radio>
                                </a-radio-group>
                            </a-form-model-item>
                            <a-form-model-item label="生日：" prop="userBirthday">
                                <!-- @change="onChange"  v-model="form.userBirthday" -->
                                <a-date-picker
                                    :value="windowIndate == 0 ? null : moment(windowIndate, 'YYYY-MM-DD')"
                                    :defaultValue="windowIndate == 0 ? null : moment(windowIndate, 'YYYY-MM-DD')"
                                    @change="windowIndateChange"/>
                            </a-form-model-item>
                            <a-form-model-item label="个性签名：" prop="signature">
                                <a-textarea v-model="form.signature" placeholder="请输入您的个人简介，最多不超过40个字。" auto-size />
                            </a-form-model-item>
                            <a-form-model-item class="btn-login-box">
                                <a-button type="primary" @click="handleSubmit" :loading = "logging">保存</a-button>
                            </a-form-model-item>
                        </a-form-model>
                    </a-tab-pane>
                    <a-tab-pane key="2" tab="安全设置">
                        <div class="password-module">
                            <div class="edit">登录密码</div>
                            <div class="des">
                                已设置。密码6-20位字符，只能包含大小写字母、数字以及标点符号（！@#¥%^&*()等非空格）
                                <p>
                                    <a @click="editDialog"><img src="../../../assets/set/general_pen-fill.svg" alt="" /><span>修改</span></a>
                                </p>
                            </div>
                        </div>
                    </a-tab-pane>
                </a-tabs>
            </div>
            <edit-info ref="baseDialog"></edit-info>
        </div>
    </header-layout>
</template>

<script>
import HeaderLayout from "@/layouts/HeaderLayout.vue";
import EditInfo from './compontents/editInfo.vue';
import { industry , userinfo , headPortrait , saveUserInfo } from "@/services/user";
import { parseTime } from "@/utils/util";
import moment from "moment";
import { organizationCheck } from '../../../utils/decorator'
export default {
    components: {
        HeaderLayout,
        EditInfo,
    },
    inject: ['reload'],
    data() {
        /** 用户名校验 */
        const nameValidator = (rule, value, callback) => {
            if (!value || value == 'undefined') {
                callback('请输入昵称')
                return
            } 
            let len = 0;
            for (let i = 0; i < value.length; i++) {
                if (value.charCodeAt(i) > 127 || value.charCodeAt(i) == 94) {
                    len += 2;
                } else {
                    len++;
                }
            }
            if (len > 32) return callback('2-32个字符，1个汉字占两个字节');
            callback();
        };
        /** 个性签名校验 */
        const signatureValidator = (rule, value, callback) => {
            let len = 0;
            for (let i = 0; i < value.length; i++) {
                if (value.charCodeAt(i) > 127 || value.charCodeAt(i) == 94) {
                    len += 2;
                } else {
                    len++;
                }
            }
            if (len > 40) return callback('40个字符，1个汉字占两个字节');
            callback();
        };
        return {
            windowIndate: '',
            headPortrait: 'https://devstorage.jeejio.com/initialImgs/imgs/userdefaultheadimg.png',
            logging: false,
            form: {
                organization: '',
                industryId: undefined,
                gender: 3,
                userBirthday: '',
                signature: '',
            },
            headers: {
                'Content-Type': 'application/json', // 设置请求头请求格式为JSON
            },
            labelCol: { span: 1 },
            wrapperCol: { span: 24 },
            industryList: [],
            fileFormData: new FormData(),
            rules: {
                organization: [
                    {
                        validator: organizationCheck.bind(this),
                        trigger: "blur",
                    }
                ],
                nickname: [
                    {
                        validator: nameValidator,
                        trigger: "change",
                    }
                ],
                signature: [
                    {
                        validator: signatureValidator,
                        trigger: "change",
                    }
                ],
            },
            imgType: 0,
        }
    },
    filters: {
        dataFormat(time) {
            return time ? parseTime(time, "{y}-{m}-{d} {h}:{i}:{s}") : "";
        },
    },
    methods: {
        moment,
        callback() {

        },
       windowIndateChange(date, dateString) {
			this.windowIndate = dateString;
		},
        beforeUpload(file, fileList) {
            let isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'|| file.type === 'image/jpg';
            if (!isJpgOrPng) {
                this.imgType = 1;
                this.$message.error('格式错误，只能上传jpg、jpeg、png');
                return;
            } else {
                this.imgType = 0;
            }
            this.fileFormData.append("file", file);
            return false;
        },
        handleChange(info) {
            if(this.imgType == 0) {
                const formData = this.fileFormData;
                headPortrait(formData).then(res => {
                    console.log(res,'修改头像res');
                    if(res.data.statusCode != 200) {
                        this.$message.error(res.data.message);
                    } else {
                        this.reload();
                    }
                }).catch(err => {
                    console.log(err,'err');
                })
                this.fileFormData = new FormData();
            }
        },
        // 角色
        radioChange(e) {
            console.log(e.target.value,'--------')
        },
        // 保存
        handleSubmit() {
            this.$refs.ruleForm.validate(valid => {
                if (valid) {
                    this.logging = true;
                    var date,time2 
                    date = new Date(this.windowIndate);
                    time2 = date.valueOf();
                    saveUserInfo({
                        organization: this.form.organization,
                        industryId: this.form.industryId,
                        position: this.form.position,
                        nickname: this.form.nickname,
                        gender: this.form.gender,
                        birthday: time2,
                        signature: this.form.signature,
                    }).then(res => {
                        this.logging = false;
                        console.log(res,'res');
                        if(res.data.statusCode == 200) {
                            this.userinfoApiFun();
                        } else {
                            this.$message.error(res.data.message);
                        }
                    }).catch(err => {
                        this.logging = false;
                        console.log(err,'err');
                    })
                }
            })
        },
        // 修改
        editDialog() {
            this.$refs.baseDialog.show();
            this.$refs.baseDialog.clearFun();
        },
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
        userinfoApiFun() {
            userinfo().then(res => {
                if(res.data.resultValue) {
                    this.form = res.data.resultValue;
                    this.form.gender = res.data.resultValue.gender == 0 ? 3 : res.data.resultValue.gender;
                    let a = res.data.resultValue.mobile.slice(2,5);
                    let b = res.data.resultValue.mobile.slice(9,13);
                    this.form.userPhone = a + '****' + b;
                    this.form.industryId = (res.data.resultValue.industryId == '' || res.data.resultValue.industryId == null) 
                    ? undefined : res.data.resultValue.industryId;
                    this.windowIndate = res.data.resultValue.birthday == 0 ? '' : parseTime(res.data.resultValue.birthday)
                    this.form.headPortrait = res.data.resultValue.headPortrait == null ? 'https://devstorage.jeejio.com/initialImgs/imgs/userdefaultheadimg.png' : res.data.resultValue.headPortrait
                    localStorage.setItem('headPortrait',res.data.resultValue.headPortrait)
                } 
            }).catch(err => {
                console.log(err,'err');
            })
        }
    },
    mounted() {
        // 获取基本信息
        this.userinfoApiFun();
        // 行业
        this.industryApiFun();

        // var myDate = new Date();
        // myDate.getFullYear(); 

        // let getMonthData = myDate.getMonth()+1;   // 月
        // let getMonth = getMonthData.toString().length < 2 ? "0" + getMonthData : getMonthData.toString();
        // let getDay = myDate.getDate().toString().length < 2 ? "0" + myDate.getDate() : myDate.getDate().toString();

        // this.windowIndate = myDate.getFullYear() + '-' + getMonth +'-' + getDay

    }
}
</script>

<style lang="less" scoped>
    .infor-box {
        margin: 16px 116px;
        .title-info-box {
            width: 100%;
            height: 128px;
            border-radius: 4px; 
            background: #fff;
            display: flex;
            .head-portrait-box {
                width: 170px;
                padding-left: 30px;
                display: flex;
                align-items: center;
                .img-box {
                    width: 64px;
                    height: 64px;
                    position: relative;
                    border: 1px solid #f0f2f5;
                    border-radius: 50%;
                    .avatar-img-box {
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                         border-radius: 50%;
                    }
                    .upload-box {
                        width: 64px;
                        height: 20px;
                        position: absolute;
                        bottom: 0;
                        /deep/ .ant-btn {
                            margin-left: 44px;
                            line-height: 0;
                            width: 20px;
                            height: 20px;
                            padding: 0;
                            border-radius: 50%;
                            border: none;
                        }
                    }
                }
            }
            .content-box {
                display: flex;
                align-items: center;
                .content-row-box {
                    .row-box {
                        span:nth-child(1) {
                            font-size: 14px;
                            color: #999999;
                        }
                        span:nth-child(2) {
                            width: 250px;
                            display: inline-block;
                            vertical-align: top;
                            font-size: 14px;
                            color: #333333;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                            padding-left: 8px;
                        }
                    }
                }
                .row-box:nth-child(2) {
                    margin-top: 20px;
                }
            }
        }
        .info-content-box {
            margin-top: 16px;
            background: #fff;
            border-radius: 4px;
            box-shadow: 0px 4px 4px 0px rgba(0,0,0,0.04); 
            padding-left: 30px;
        }
        /deep/ .ant-tabs-nav-container {
            height: 70px;
            
        }
        /deep/ .ant-tabs-tab {
            height: 70px!important;
            line-height: 80px;
            padding: 0;
            color: rgba(0,0,0,0.65);
            font-size: 14px;
            font-weight: 400;
        }
        /deep/ .ant-tabs-bar {
            margin: 0 0 30px 0;
            border-bottom: 1px solid #e8e8e8;
        }
        /deep/ .ant-tabs-nav .ant-tabs-tab-active {
            color: #006fd0;
            font-weight: 700;
        }
        /deep/ .ant-row {
            display: flex;
        }
        /deep/ .ant-input {
            width: 400px;
            height: 40px!important;
            background: #f7f8fa;
            border-radius: 4px;
        }
        /deep/ .ant-select-selection {
            width: 400px;
            height: 40px!important;
            background: #f7f8fa;
            border: 1px solid #f7f8fa;
            border-radius: 4px;
        }
        /deep/ .ant-select-selection__rendered {
            line-height: 40px;
        }
        /deep/ .ant-btn {
            margin-left: 79px;
        }
        .password-module {
            border-radius: 4px;
            background: #fff;
            padding: 0 24px 24px 24px;
            .des {
                font-size: 14px;
                font-weight: 400;
                color: #1d2129;
                display: flex;
                justify-content: space-between;
                p {
                    margin: 0;
                    display: flex;
                    justify-content: space-between;
                    img {
                        width: 20px;
                        margin-right: 7px;
                        margin-top: -3px;
                    }
                    span {
                        font-size: 14px;
                        font-weight: 400;
                        color: #165dff;
                    }
                }
            }
        }
        .edit {
            width: 100%;
            margin-bottom: 15px;
            font-size: 14px;
            font-weight: 700;
            color: #000000;
            line-height: 22px;
            
        }
          /deep/ .ant-col-1 {
        min-width: 70px!important;
    }   
    }   
</style>