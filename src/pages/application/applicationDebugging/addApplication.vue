<template>
    <div class="add-application-box">
      <a-card class='add-application'>
        <inner-title :title="headTitle" style='padding:0 16px'></inner-title>
        <div class="line"></div>
        <div class="add-application-content">
          <a-form-model
            ref="ruleForm"
            :model="form"
            :rules="rules"
            :label-col="labelCol"
            :wrapper-col="wrapperCol"
            class='form-content'
          >
            <a-form-model-item ref="name" label="应用名称" prop="name">
              <a-input
                :maxLength='20'
                allow-clear
                v-model="form.name"
                @blur="
                  () => {
                    $refs.name.onFieldBlur();
                  }
                "
              />
            </a-form-model-item>
            <a-form-model-item label="上传应用" prop="fileName" class='file-zip' ref='zipRef'>
               <!-- prop="flieZip" -->
              <a-upload 
                :before-upload="beforeUpload" 
                :remove="handleRemove" 
                :multiple="false" 
                :file-list="fileList"
                :headers="headers"
                @change="handleChange"
              >
                <a-button >
                  <a-icon type="upload" /> 点击上传
                </a-button>
              </a-upload>
              <div v-if='this.form.fileName && this.form.fileName != " "' class="file-show-box">
                <div class="show-file">
                  <img src="@/assets/img/file.png" alt="">
                  <p>{{this.form.fileName}}</p>
                </div>
                <p class='delete' @click='deleteFile'><img src="@/assets/img/delete.png" alt=""></p>
              </div>
            </a-form-model-item>
            <a-form-model-item label="应用描述" prop="desc">
              <a-input v-model="form.desc" type="textarea" :maxLength='30' />
            </a-form-model-item>
            <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
              <a-button style="margin-right: 10px;color:#666;" @click="resetForm">
                取消
              </a-button>
              <a-button type="primary" @click="onSubmit">
                保存
              </a-button>
            </a-form-model-item>
          </a-form-model>
        </div>
      </a-card>
    </div>
</template>

<script>
import innerTitle from "@/components/innerTitle/InnerTitle";
import { getAppInfor, uploadZip, createdApp, updateApp } from "@/services/application";
export default {
  components: { innerTitle },
  data() {
    let validateName = (rule, value, callback) => {
      const reg = /^[\u4E00-\u9FA5A-Za-z0-9_]+$/;
      if (value === '') {
          callback(new Error('请输入应用名称'));
      } else if (!reg.test(value)) {
        callback('应用名称不符合规范')
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
      if (len > 20 || len < 4) return callback('4-20个字符，1个汉字占两个字节');
      callback();
    };
    let validateFile = (rule, value, callback) => {
      console.log(value,'ppppppppppppp')
      if (value === '') {
        callback(new Error('请上传小应用'));
      } 
      callback();
    };
    let validateDesc = (rule, value, callback) => {
      let len = 0;
      for (let i = 0; i < value.length; i++) {
          if (value.charCodeAt(i) > 127 || value.charCodeAt(i) == 94) {
              len += 2;
          } else {
              len++;
          }
      }
      if (len > 30) return callback('最多输入30个字符，1个汉字占两个字节');
      callback();
    };
    return {
      id: 0,
      headTitle:'',
      headers: {
        'Content-Type': 'application/json', // 设置请求头请求格式为JSON
      },
      fileList: [],
      uploading: false,
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      other: '',
      form: {
        name: '',
        desc: '',
        fileName:''
      },
      rules: {
        name: [
          { required: true, min: 4, max: 20, validator: validateName, trigger: 'blur' },
        ],
        fileName:[{ required: true, message: '请上传小应用',validator: validateFile, trigger: 'change' }],
        desc: [{ required: false, validator: validateDesc, trigger: 'blur' }],
      },
      fileFormData: new FormData(),
      isUpload: false, // 判断是否上传，用于区别修改应用false没有上传 true上传
      fileZipObj:{},
      imgType:0,
    };
  },
  watch: {
    'form.fileName': {
      handler (val) {
        console.log(val,'jianting')
        if (val.length) {
          this.$refs.zipRef.clearValidate();
        }
      },
      deep: true
    }
  },
  created(){},
  mounted(){
    if(this.$route.query.appId){
      this.headTitle = '编辑应用';
      this.id = this.$route.query.appId;
      this.$set(this.$route.meta.page,'breadcrumb',['应用', '应用调试', '编辑应用'])
      this.getInfor()
    } else {
      this.headTitle = '新增应用'
      this.$set(this.$route.meta.page,'breadcrumb',['应用', '应用调试', '新增应用'])
    }
  },
  methods: {
    // 获取详情
    getInfor(){
      getAppInfor(this.id)
      .then((res) => {
        console.log('获取应用详情',res)
        if (res.data.statusCode === 200 && res.data.resultValue) {
          let data = res.data.resultValue;
          this.form.name = data.appName;
          this.form.desc = data.appDescribe;
          this.form.fileName = data.fileName;
        } else {
          this.$message.error(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
        // this.$message.error("系统异常");
      });
    },
    // 上传应用
    createdAppInfor(){
      let param = {
        appName: this.form.name,
        appDescribe: this.form.desc,
        fileInfoRequest: this.fileZipObj
      }
      createdApp(param)
      .then((res) => {
        console.log('获取应用详情',res)
        if (res.data.statusCode === 200) {
          this.$router.push({
            path: "/application/debugger",
            query: {
              id: res.data.resultValue.appId,
              appName: this.form.name
            },
          })
        } else {
          this.$message.error(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
        // this.$message.error("系统异常");
      });
    },
    // 更新应用
    updateAppInfor(){

      let param = {}
      if(this.isUpload){
          param = {
          appId: this.id,
          appName: this.form.name,
          appDescribe: this.form.desc,
          fileInfoRequest: this.fileZipObj
        }
      } else {
        param = {
          appId: this.id,
          appName: this.form.name,
          appDescribe: this.form.desc
        }
      }
      updateApp(param)
      .then((res) => {
        console.log('获取应用详情',res)
        if (res.data.statusCode === 200) {
          this.$router.push({
            path: "/application/debugger",
            query: {
              id: this.id,
              appName: this.form.name
            },
          })
        } else {
          this.$message.error(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
        // this.$message.error("系统异常");
      });
    },
    // 文件移除
    handleRemove (file) {
      const index = this.fileList.indexOf(file)
      const newFileList = this.fileList.slice()
      newFileList.splice(index, 1)
      this.fileList = newFileList
    },
    // 删除文件
    deleteFile(){
      this.form.fileName = ''
    },
    beforeUpload(file, fileList) {
      if((file.name).indexOf('.zip') == -1){
        this.$message.error('格式错误，只能上传zip');
        return;
      } 
      // let isJpgOrPng = file.type === 'application/zip';
      // if (!isJpgOrPng) {
      //     this.imgType = 1;
      //     this.$message.error('格式错误，只能上传zip');
      //     return;
      // } else {
      //     this.imgType = 0;
      // }
      console.log(file,'file')
            // this.fileList = [...this.fileList, file]
            this.fileFormData.append("file", file);
            return false;
        },
       handleChange(info) {
            // if(this.imgType == 0) {
                const formData = this.fileFormData;
                uploadZip(formData).then(res => {
                    console.log(res,'修改头像res');
                    if(res.data.statusCode == 200 && res.data.resultValue) {
                      let data = res.data.resultValue;
                      this.fileZipObj = {
                        deviceNames:data.deviceVoList,
                        fileExtName:data.fileExtName,
                        fileIv:data.fileIv,
                        fileKey:data.fileKey,
                        fileName:data.fileName,
                        filePath:data.filePath,
                        fileSize:data.fileSize,
                        indexUri:data.indexUri,
                        signature:data.signature,
                        fileSize:data.fileSize,
                      };
                      this.isUpload = true;
                      this.form.fileName = data.fileName;
                      this.$refs.zipRef.clearValidate();
                    } else {
                      this.isUpload = false
                      this.$message.error(res.data.message);
                    }
                }).catch(err => {
                    console.log(err,'err');
                })
                this.fileFormData = new FormData();
            // }
        },
    onSubmit() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          if(this.id){
            this.updateAppInfor()
          } else {
            this.createdAppInfor()
          }
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm() {
      this.$router.push({
        path: 'applicationDebugging',
      })
      // this.$refs.ruleForm.resetFields();
    },
  },
}
</script>

<style lang="less" scoped>
  .add-application-box {
    .add-application {
      ::v-deep {
      .ant-card-body {
          padding: 22px 0px;
        }
      }
    }
    .line {
      width: 100%;
      margin-top: 22px;
      border-bottom: 1px solid #e5e6eb;
    }
    .add-application-content {
      display: flex;
      justify-content: center;
      margin-top: 30px;
      .form-content {
        width: 50%;
        ::v-deep {
          .ant-col-14 {
            .ant-input {
              width: 400px !important;
              height: 40px;
            }
          }
        }
        ::v-deep {
            .ant-col-14 {
              width: 400px !important;
            }
          }
        .file-zip {
          .ant-form-item-children .ant-btn {
            width: 110px;
            height: 32px;
            background: #006fd0 !important;
            border-radius: 4px;
            color: #fff;
            i {
              color: #fff;
            } 
          }
          .file-show-box {
            position: relative;
            margin-top: 24px;
            // background: #f7f8fa;
            .show-file {
              width: 400px;
              height: 40px;
              background: #f7f8fa;
              display: flex;
              align-items: center;
              border-radius: 4px;
              p {
                margin-top: 10px;
              }
              img {
                width: 16px;
                height: 16px;
                display: inline-block;
                margin: 0 10px;
              }
            }
            .delete {
              z-index: 2;
              position: absolute;
              top:0;
              right: -20px;
              img {
                width: 12px;
                display: inline-block;
              }
            }
          }
        }
        .ant-form-item-children .ant-btn-primary {
          background: #006fd0 !important;
        }
        ::v-deep {
          .ant-upload-list {
            div {
              margin-bottom: 15px;
            }
          }
          .ant-upload-list-item-info {
            height: 40px;
            width: 400px;
            background: #f7f8fa;
            border-radius: 4px;
            
            span {
              display: flex;
              align-items: center;
              i {
                padding-left: 10px;
                padding-top: 8px;
              }
              span {
                padding-left: 30px;
              }
            }
          }
        }
      }
    }
  }
</style>