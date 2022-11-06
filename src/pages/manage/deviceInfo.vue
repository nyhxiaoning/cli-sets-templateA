<template>
    <div class="device-info-box">
        <a-card class='device-info'>
            <inner-title :title="titleText" class="inner-title"></inner-title>
            <div class="device-info-content">
                <a-tabs default-active-key="1" @change="callback">
                    <a-tab-pane key="1" tab="设备信息">
                        <div class="device-info-tab">
                            <div class="device-info-top">
                                <div class="device-img-box">
                                    <div class="img-box">
                                        <img :src="avatarImg" alt="" class="avatar-img-box">
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
                                                <a-button><img src="@/assets/set/_Avatar_AvatarEdit.svg" alt="" class="upload-img-box"></a-button>
                                            </a-upload>
                                        </div>
                                    </div>
                                </div>
                                <div class="device-info-main">
                                    <ul style='display:flex;align-items: center;'>
                                        <li v-if='editName' style='margin-bottom:0'>
                                            <div class="li-content-box">
                                                 <a-form-model ref="ruleForm" :model="ruleForm" :rules="rules" class='input-style'>
                                                    <a-form-model-item label="设备名称：" prop="deviceName">
                                                        <a-input v-model="ruleForm.deviceName" type="text" allow-clear />
                                                    </a-form-model-item>
                                                </a-form-model>
                                                <!-- @click="editNameEvent(2)" -->
                                                <p @click="submitForm('ruleForm')" class='edit' style='margin-top:14px;margin-left:8px;'><a-icon type="edit" />保存</p>
                                            </div>
                                        </li>
                                        <li v-else>
                                            <div class="li-content-box">
                                                <div class="li-title">设备名称：</div>
                                                <div class="li-content">{{ruleForm.deviceName}} <p class='edit' @click="editNameEvent(1)"><a-icon type="edit" />修改</p></div>
                                            </div>
                                        </li>
                                        <li>
                                            <div class="li-content-box">
                                                <div class="li-title">产品名称：</div>
                                                <div class="li-content">{{deviceInforObj.productName}}</div>
                                            </div>
                                        </li>
                                        </ul>
                                        <ul>
                                        <li>
                                            <div class="li-content-box">
                                                <div class="li-title">设备型号：</div>
                                                <div class="li-content">{{deviceInforObj.productModel}}</div>
                                            </div>
                                        </li>
                                        <li>
                                            <div class="li-content-box">
                                                <div class="li-title">产品品类：</div>
                                                <div class="li-content">{{deviceInforObj.categoryName}}</div>
                                            </div>
                                        </li>
                                        <li>
                                            <div class="li-content-box">
                                                <div class="li-title">SN：</div>
                                                <div class="li-content">{{deviceInforObj.deviceSn}}<p class='edit' style='color:#999;' :data-clipboard-text="deviceInforObj.deviceSn" id="copyBtn"  @click="copyCode" ><a-icon type="copy" /></p></div>
                                                <!--  -->
                                            </div>
                                        </li>
                                        <li>
                                            <div class="li-content-box">
                                                <div class="li-title">激活时间：</div>
                                                <div class="li-content">{{deviceInforObj.firstActivatetime | dataFormat}}</div>
                                            </div>
                                        </li>
                                        <li>
                                            <div class="li-content-box">
                                                <div class="li-title">当前状态：</div>
                                                <div class="li-content"><i class='dian' :style="deviceInforObj.isOnline == 1 ? 'background: #00B42A;' : 'background: #C9CDD4;'"></i>{{deviceInforObj.isOnline == 1 ? '在线' : '离线'}}<p class='edit'  @click="getOnlinStatus" style='color:#999;'><a-icon type="reload" /></p></div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div class="device-info-middle">
                                <div class="middle-title">设备信息</div>
                                <a-row>
                                    <a-col :span="6">
                                        <div class="col-content">
                                            <span class='col-title'>通讯方式：</span>
                                            <span>{{deviceInforObj.connectType}}</span>
                                        </div>
                                        <div class="col-content" v-for='item,index in firmwareInfoList'>
                                            <span class='col-title'>固件类型{{firmwareInfoList.length == 1 ? '' : index+1  }}：</span>
                                            <span>{{item.typeDesc }}</span>
                                        </div>
                                    </a-col>
                                    <a-col :span="6">
                                        <div class="col-content">
                                            <span class='col-title'>MAC地址：</span>
                                            <span>{{deviceInforObj.deviceMac}}</span>
                                        </div>
                                        <div class="col-content" v-for='item,index in firmwareInfoList'>
                                            <span class='col-title'>固件版本{{firmwareInfoList.length == 1 ? '' : index+1  }}：</span>
                                            <span>{{item.firmwareKey}}-{{item.version}}</span>
                                        </div>
                                    </a-col>
                                    <a-col :span="6">
                                        <div class="col-content">
                                            <span class='col-title'>IP地址：</span>
                                            <span>{{deviceInforObj.deviceIP}}</span>
                                        </div>
                                    </a-col>
                                    <a-col :span="6">
                                       
                                    </a-col>
                                </a-row>
                            </div>
                            <div class="device-info-bottom">
                                <div class="middle-title">设备应用</div>
                                <div class='device-app'>
                                    <ul>
                                        <li v-for='(item,index) in appinfomationList' :key='index+1'>
                                            <div class="app-content">
                                                <div class="app-content-title">
                                                    <img :src="item.imgUrl" alt="">
                                                    <p>{{item.appName}}</p>
                                                </div>
                                                <div class="app-content-des">{{item.shortIntro}}</div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </a-tab-pane>
                    <a-tab-pane key="2" tab="品牌信息" force-render>
                        <div class="brand-infor">
                            <div class="img-box">
                                <img :src="deviceInforObj.brandImg" alt="">
                            </div>
                            <div class="brand-des">
                                <div class="brand-intr"><p class='brand-text'>品牌名称：</p><p>{{deviceInforObj.brandName}}</p></div>
                                <div class="brand-intr"><p class='brand-text'>品牌介绍：</p><p>{{deviceInforObj.brandIntroduction}}</p></div>
                            </div>
                        </div>
                    </a-tab-pane>
                </a-tabs>
            </div>
        </a-card>
    </div>
</template>

<script>
import Clipboard from 'clipboard'
import innerTitle from "@/components/innerTitle/InnerTitle";
import { getDevieceDetail, setDevieceUpload, changeDevieceName, getDevieceIsOnline } from "@/services/deviceManage";
import { parseTime } from "@/utils/util";
export default {
    components: { innerTitle },
    filters: {
        dataFormat(time) {
            return time ? parseTime(time, "{y}-{m}-{d} {h}:{i}:{s}") : "";
        },
    },
    data() {
        let validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入设备名称'));
            } 
            let len = 0;
            for (let i = 0; i < value.length; i++) {
                if (value.charCodeAt(i) > 127 || value.charCodeAt(i) == 94) {
                    len += 2;
                } else {
                    len++;
                }
            }
            if (len > 32 || len < 2) return callback('2-32个字符，1个汉字占两个字节');
            callback();
        };
        return {
            fileFormData: new FormData(),
            avatarImg: '',
            copyConfig:'',
            headers: {
                'Content-Type': 'application/json', // 设置请求头请求格式为JSON
            },
            ruleForm: {
                deviceName: '',
            },
            rules: {
                deviceName: [{ validator: validatePass, trigger: 'blur' }],
            },
            editName: false,
            deviceCode:'',
            deviceInforObj:{},
            appinfomationList:[],
            firmwareInfoList:[],
            productId:'',
            titleText:''
        };
    },
    created(){
        if(this.$route.query.deviceCode){
             this.deviceCode = this.$route.query.deviceCode;
            // this.deviceCode = this.$route.query.deviceCode = '-4000074002100702540';
            this.productId = this.$route.query.productId;
            this.getDevieceDetailData()
        }
    },
    mounted(){
        setTimeout(()=>{
            this.titleText = this.ruleForm.deviceName;
            this.$set(this.$route.meta.page,'breadcrumb',['管理', '设备管理', this.titleText])
        },300)
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    this.saveName()
                } else {
                    console.log('error submit!!');
                return false;
                }
            });
        },
        // 列表
        getDevieceDetailData() {
            let params = {
                deviceCode: this.deviceCode,
            };
            getDevieceDetail(params).then(res => {
                console.log(res,'res-------------');
                if(res.data.statusCode == 200 && res.data.resultValue) {
                    this.deviceInforObj = res.data.resultValue;
                    this.ruleForm.deviceName = this.deviceInforObj.deviceName;
                    this.appinfomationList = this.deviceInforObj.appinfomationList;
                    this.firmwareInfoList = this.deviceInforObj.firmwareInfoList;
                    this.avatarImg = this.deviceInforObj.productImg
                    console.log(res.data.resultValue,'获取设备心情----------')
                }
            }).catch(err => {
                console.log(err,'err');
            })
        },
        // 修改名称
        saveName() {
            let params = {
                deviceCode: this.deviceCode,
                deviceName: this.ruleForm.deviceName,
                productId: this.productId
            };
            changeDevieceName(params).then(res => {
                if(res.data.statusCode == 200) {
                    this.editName = false;
                    this.$nextTick(()=>{
                        this.titleText = this.ruleForm.deviceName;
                        this.$set(this.$route.meta.page,'breadcrumb',['管理', '设备管理', this.titleText])
                    })
                }
            }).catch(err => {
                console.log(err,'err');
            })
        },
        // 设备状态
        getOnlinStatus() {
            let params = {
                deviceCode: this.deviceCode,
                deviceName: this.ruleForm.deviceName,
                productId: this.productId
            };
            getDevieceIsOnline(params).then(res => {
                if(res.data.statusCode == 200 && res.data.resultValue) {
                    this.deviceInforObj.isOnline = res.data.resultValue.isOnline;
                }
            }).catch(err => {
                console.log(err,'err');
            })
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
            console.log(file,'file')
            this.fileFormData.append("file", file);
            this.fileFormData.append("deviceCode", this.deviceCode);
             
            return false;
        },
        handleChange(info) {
            if(this.imgType == 0) {
                const formData = this.fileFormData;
                setDevieceUpload(formData).then(res => {
                    console.log(res,'修改头像res');
                    if(res.data.statusCode == 200 && res.data.resultValue) {
                        this.avatarImg = res.data.resultValue.productImg;
                    } else {
                        this.$message.error(res.data.message);
                    }
                }).catch(err => {
                    console.log(err,'err');
                })
                this.fileFormData = new FormData();
            }
        },
        editNameEvent(num){
            if(num == 1){
                this.editName = true
            } 
        },
        callback(key) {
            console.log(key);
        },
        copyCode () {
            console.log(11111)
            let clipboard = new Clipboard('#copyBtn')
            clipboard.on('success', () => {
                this.$message.success(`复制成功`)
                clipboard.destroy()
            })
            clipboard.on('error', e => {
                // 不支持复制
                console.log('不支持复制')
                // this.$message({ type: 'waning', message: '该浏览器不支持自动复制' })
                // 释放内存
                clipboard.destroy()
            })
        },
    },
}
</script>

<style lang="less" scoped>
    .device-info-box {
        min-width: 1200px;
        .device-info {
            ::v-deep {
                .ant-card-body {
                    padding: 22px 16px;
                }
            }
        }
        .device-info-content {
            margin-top: 18px;
            .ant-tabs {
                ::v-deep {
                    .ant-tabs-nav .ant-tabs-tab-active {
                        color: #006fd0;
                    }
                    .ant-tabs-ink-bar {
                        width: 60px !important;
                        left: 15px;
                        background: #006fd0;
                    }
                }
                // 设备信息
                .device-info-tab {
                    padding-left: 12px;
                    padding-top: 16px;
                    .device-info-top {
                        display: flex;
                        margin-bottom: 30px;
                        position: relative;
                        &::after {
                            position: absolute;
                            left: 0;
                            right: 0;
                            bottom: -1px;
                            display: block;
                            content: "";
                            border-bottom: 1px solid #e5e6eb;
                            height: 1px;
                        }
                        .device-img-box {
                            margin-right: 58px;
                            .img-box {
                                width: 106px;
                                height: 106px;
                                position: relative;
                                .avatar-img-box {
                                    max-width: 100%;
                                    height: 100%;
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
                            // img {
                            //     width: 106px;
                            //     height: 106px;
                            //     background: #f9fafa;
                            //     border-radius: 50%;
                            // }
                        }
                        .device-info-main {
                            width: 880px;
                            ul {
                                overflow: hidden;
                                margin: 0;
                                padding: 0;
                                li {
                                    float: left;
                                    list-style: none;
                                    margin-bottom: 20px;
                                    margin-right: 98px;
                                    min-width: 310px;
                                    .li-content-box {
                                        display: flex;
                                        .edit {
                                            margin-left: 10px;
                                            height: 14px;
                                            font-size: 13px;
                                            font-family: Microsoft YaHei UI, Microsoft YaHei UI-Light;
                                            font-weight: 300;
                                            text-align: CENTER;
                                            color: #006fd0;
                                            line-height: 14px;
                                        }
                                        .li-title {
                                            width: 70px;
                                            height: 14px;
                                            font-size: 14px;
                                            font-family: Microsoft YaHei UI, Microsoft YaHei UI-Regular;
                                            font-weight: 400;
                                            text-align: right;
                                            color: #999999;
                                            line-height: 14px;
                                        }
                                        .li-content {
                                            margin-left: 10px;
                                            // width: 98px;
                                            height: 14px;
                                            font-size: 14px;
                                            font-family: Microsoft YaHei UI, Microsoft YaHei UI-Regular;
                                            font-weight: 400;
                                            text-align: LEFT;
                                            color: #333333;
                                            line-height: 14px;
                                            display: flex;
                                            .dian {
                                                display: inline-block;
                                                border-radius: 50%;
                                                width: 6px;
                                                height: 6px;
                                                background: #cccc;
                                                margin-right: 10px;
                                                margin-top: 5px;
                                            }
                                            .edit {
                                                margin-left: 10px;
                                                height: 14px;
                                                font-size: 13px;
                                                font-family: Microsoft YaHei UI, Microsoft YaHei UI-Light;
                                                font-weight: 300;
                                                text-align: CENTER;
                                                color: #006fd0;
                                                line-height: 14px;
                                            }
                                        }
                                        .input-style {
                                            /deep/.ant-row {
                                                display: flex;
                                                .ant-form-item-label label {
                                                    color: #999999;
                                                }
                                                .ant-input {
                                                    width: 190px;
                                                }
                                            }
                                        }
                                    }
                                }
                            }

                        }
                    }
                    .device-info-middle {
                        margin-bottom: 30px;
                        position: relative;
                        &::after {
                            position: absolute;
                            left: 0;
                            right: 0;
                            bottom: -10px;
                            display: block;
                            content: "";
                            border-bottom: 1px solid #e5e6eb;
                            height: 1px;
                        }
                        
                        .col-content {
                            margin-bottom: 20px;
                            span {
                                font-size: 14px;
                                font-family: Microsoft YaHei UI, Microsoft YaHei UI-Regular;
                                font-weight: 400;
                                text-align: LEFT;
                                color: #333333;
                                line-height: 14px;
                            }
                            .col-title {
                                color: #999999;
                                margin-right: 10px;
                            }
                        }
                        
                    }
                    .device-info-bottom {
                        .device-app {
                            ul {
                                padding: 0;
                                margin: 0;
                                overflow: hidden;
                                li {
                                    float: left;
                                    width: 23.2%;
                                    list-style: none;
                                    margin-right: 16px;
                                    margin-bottom: 30px;
                                    .app-content {
                                        // width: 267px;
                                        height: 130px;
                                        background: #ffffff;
                                        border-radius: 4px;
                                        border: 1px solid #E9E9E9;
                                        padding: 20px 18px;
                                        .app-content-title {
                                            height: 28px;
                                            display: flex;
                                            align-items: center;
                                            img {
                                                width: 28px;
                                                height: 28px;
                                                margin-right: 16px;
                                            }
                                            p {
                                                margin-top: 15px;
                                                height: 16px;
                                                font-size: 14px;
                                                font-family: Microsoft YaHei UI, Microsoft YaHei UI-Bold;
                                                font-weight: 700;
                                                text-align: LEFT;
                                                color: #333333;
                                                line-height: 16px;
                                            }
                                        }
                                        .app-content-des {
                                            margin-left: 44px;
                                            margin-top: 16px;
                                            height: 38px;
                                            font-size: 14px;
                                            font-family: Microsoft YaHei UI, Microsoft YaHei UI-Regular;
                                            font-weight: 400;
                                            text-align: LEFT;
                                            color: #999999;
                                            line-height: 20px;
                                        }
                                    }
                                }
                                li:nth-child(4n) {
                                    margin-right: 0px;
                                }
                            }
                        }
                        
                    }
                    .middle-title {
                        height: 14px;
                        font-size: 14px;
                        font-family: Microsoft YaHei UI, Microsoft YaHei UI-Bold;
                        font-weight: 700;
                        text-align: LEFT;
                        color: #333333;
                        line-height: 14px;
                        margin-bottom: 30px;
                    }
                }
                // 品牌信息
                .brand-infor {
                    display: flex;
                    margin-top: 16px;
                    padding: 0 14px;
                    min-height: 500px;
                    .img-box {
                        margin-right: 30px;
                        img {
                            width: 106px;
                            height: 106px;
                            background: rgba(193,196,202,0.10);
                            border-radius: 50%;
                        }
                    }
                    .brand-des {
                        .brand-intr {
                            display: flex;
                            margin-bottom: 16px;
                            p {
                                height: 14px;
                                font-size: 14px;
                                font-family: Microsoft YaHei UI, Microsoft YaHei UI-Regular;
                                font-weight: 400;
                                text-align: LEFT;
                                color: #333333;
                                line-height: 22px;
                                max-width: 756px;
                                min-width: 70px;
                            }
                            .brand-text {
                                color: #999999;
                                margin-right: 10px;
                            }
                        }
                    }
                }
            }
        }
    }
</style>