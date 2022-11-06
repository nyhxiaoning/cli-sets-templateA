<template>
  <div class="debuggerPage">
    <div class="debuggerTitle">{{$route.query.appName}}</div>
    <div class="debuggerWrapper">
      <div class="selectWrapper">
        <div class="selectTitle">调试设备</div>
        <div class="formWrapper">
          <a-form-model :model="form" layout="vertical">
            <a-form-model-item :label="item.codeDeviceName" v-for="(item, index) in deviceNameList" :key="index">
              <a-select v-model="item.value" placeholder="请选择设备">
                <a-select-option :value="ele.deviceId" v-for="(ele, inx) in item.bindingDevices" :key="inx + '-label' ">{{ele.deviceName}}</a-select-option>
              </a-select>
            </a-form-model-item>
            <!-- <a-form-model-item label="这里是代码中设备名称">
              <a-select v-model="form.deviceId" placeholder="请选择设备">
                <a-select-option :value="item.codeDeviceName" v-for="(item, index) in deviceNameList" :key="index + '-label'">{{item.codeDeviceName}}</a-select-option>
              </a-select>
            </a-form-model-item> -->
          </a-form-model>
          <div class="formBtnWrapper">
            <a-button type="primary" style="margin-bottom: 16px" @click="hadnleSubmit">保存</a-button>
            <div>更换设备后，请点击保存更新应用</div>
          </div>
        </div>
      </div>
      <div class="deviceWrapper">
        <div class="iframeWrapper" v-if="choicedSelectList.length==0">
          <div class="iframeStyle noDeviceStyle">
            <img src="../../../assets/img/noData.png" class="noDeviceImage">
            <span>应用正在运行中...</span>
          </div>
        </div>
        <div class="iframeWrapper" v-else>
        <!-- <div class="iframeWrapper"> -->
          <!-- :src="'http://10.11.11.40:8080/index2.html'" -->
          <!-- :src="iframeUrl" -->
          <iframe
            :src="iframeUrl"
            id="childFrame"
            scrolling="auto"
            seamless
            class="iframeStyle"
            frameborder="0"
            name="youdaoFrame"
          ></iframe>
        </div>
        <div class="journalWrapper">
          <div class="journalTitle">
            <div class="title">实时日志</div>
            <div class="titleBtnWrapper">
              <a-button type="link" @click="handleClearJournal"> 清空日志 </a-button>
              <a-button type="link" @click="handleHandRefash"> 手动刷新 </a-button>
              <span class="refash">自动刷新</span>
              <a-switch size="small" default-checked @change="handleSwitch"/>
            </div>
          </div>
          <div class="journalBox">
            <div class="boxTitle">
              <a-dropdown :trigger="['click']">
                <span
                  class="ant-dropdown-link"
                  @click="(e) => e.preventDefault()"
                >
                  日志类型<a-icon type="down" style="padding-left: 10px" />
                </span>
                <a-menu slot="overlay">
                  <a-menu-item key="0">
                    <a @click="handleShowAllJournal">全部日志</a>
                  </a-menu-item>
                  <a-menu-item key="1">
                    <a @click="handleShowRightJournal">正确日志</a>
                  </a-menu-item>
                  <a-menu-item key="2">
                    <a @click="handleShowErrJournal">错误日志</a>
                  </a-menu-item>
                </a-menu>
              </a-dropdown>
            </div>
            <div class="journalInfo" v-if="journalType=='all'">
              <p v-for="(item, index) in journalList" :key="index">{{item}}</p>
            </div>
            <div class="journalInfo" v-if="journalType=='success'">
              <p v-for="(item, index) in successJournalList" :key="index">{{item}}</p>
            </div>
            <div class="journalInfo" v-if="journalType=='error'">
              <p v-for="(item, index) in errorJournalList" :key="index">{{item}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { debuggerSelect, execute } from '../../../services/debugger'
import { deviceCommand } from './commandHttp'

export default {
  data() {
    return {
      ws: null, // WebSocket实例
		  time: 5000, // 计时器时间
      form: {},
      deviceNameList: [],
      deviceIdList: [],
      journalList: [],
      successJournalList: [],
      errorJournalList: [],
      noReafshJournalList: [],
      choicedSelectList: [],
      refashFlag: true,
      iframe: null,
      journalType: 'all',
      iframeUrl: '',
      deviceSelectArr: [
        { value: ''},
        { value: ''}
      ],
      onReceiveCall: null
    }
  },
  created(){
    this.getSelectInfo()
    this.initWebSocket()
  },
  destroyed(){  // 调用vue 销毁事件
    let _this=this
    _this.ws.close();
  },
  mounted() {
      // setTimeout(() => {
      //     console.log('77777777777777777')
      //     const iframeWindow = iframe.contentWindow.window.methods;
      //     console.log('123123', iframeWindow)
      // }, 1000)
    
      // setTimeout(() => {
      //   iframe.contentWindow.mounted()
      // },1000)
      // iframe.contentWindow.onreday()  
    // }
  },
  methods:{
    initWebSocket(){
      let that = this
      if (window.WebSocket){
        let url = `wss://${process.env.VUE_APP_API_BASE_URL.split('//')[1]}/developer-ws/ws?appId=1999948`
        // let url = `wss://${process.env.VUE_APP_WS_URL.split('//')[1]}/ws?appId=${this.$route.query.id}`
        // var token = 'ZGV2ZWxvcGVyX2NvZGU6MTIzNDU2'
        let ws = new WebSocket(url)    // 建立连接
        console.log('ws', ws)
        this.ws = ws
        // 服务器连接成功
        ws.onopen = function(){
          console.log('连接成功')
          setInterval(() => {
            ws.send('online') // 给后台发消息
          }, 10000)
        }
        // 服务器连接关闭
        ws.onclose = function(){
          console.log('连接关闭')
        }
        // 服务器连接出错
        ws.onerror = function(e){
          console.log('连接出错', e)
        }
        // 解析信息
        ws.onmessage = function(e){
          console.log(e, '接受消息')
          if (e.data != '连接成功' && e.data != 'online') {
            // let messageInfo = JSON.parse(e.data)
            // that.handleGetMessage(messageInfo)
            let res = {
              body: {
                status: JSON.parse(JSON.parse(e.data).command).status
              }
            }
            that.journalList.push(JSON.parse(JSON.parse(e.data).command))
            that.onReceiveCall(res)
          }
        }
      }
    },
    handleGetMessage(messageInfo) {
      let params = {
        appId: messageInfo.appid,
        ownerid: messageInfo.ownerid,
        deviceId: messageInfo.deviceId,
        command: messageInfo.command
      }
      execute(params).then(res => {
        if (res.data.statusCode == 200) {
          if (this.refashFlag) {
            this.journalList.push(res.data)
          } else {
            this.noReafshJournalList.push(res.data)
          }
        }
      })
    },
    getSelectInfo() {
      debuggerSelect(this.$route.query.id).then(res => {
        if (res.data.statusCode == 200) {
          this.deviceSelectArr = []
          res.data.resultValue.deviceNames.forEach(item => {
            this.deviceSelectArr.push({value: ''})
          })
          this.deviceNameList = res.data.resultValue.deviceNames
          this.iframeUrl = res.data.resultValue.indexUri
        }
      })
    },
    handleChangeDeviceName(val) {
      this.deviceNameList.forEach(item => {
        if (item.codeDeviceName == val) {
          this.deviceIdList = item.bindingDevices
        }
      })
    },
    hadnleSubmit() {
      // for (let i = 0; i < this.deviceNameList.length; i++) {
      //   if (!this.deviceNameList[i].value) {
      //     this.$message.error('未选择设备')
      //   }
      // }
      this.deviceNameList.forEach(item => {
        console.log('item', item)
        if (item.value) {
          this.choicedSelectList = this.choicedSelectList.concat(item.bindingDevices)
          let params = {
            appid: '1999948',
            // appid: '-3009000000001999948',
            ownerid: JSON.parse(localStorage.getItem('userInfor')).userId,
            deviceid: item.value,
            // deviceid: '-4000065002200180117',
            command: JSON.stringify(
              [{
                event: 'IPCV',
                desc: []
              }]
            )
          }
          execute(params).then(res => {
            this.journalList.push(res.data)
          })
        }
      })
      let that = this
      // let params = {
      //   // appid: window.location.href.split('?')[1].split('=')[1],
      //   appid: '1999948',
      //   ownerid: JSON.parse(localStorage.getItem('userInfor')).userId,
      //   // deviceid: item.value,
      //   deviceid: '-4000065018300012857',
      //   command: JSON.stringify(
      //     [{
      //       event: 'IPCV',
      //       desc: []
      //     }]
      //   )
      // }
      // execute(params).then(res => {
      //   this.journalList.push(res.data)
      // })
      setTimeout(() => {
        let that = this
        this.iframe = document.getElementById("childFrame");
        this.iframe.contentWindow.JeeWeb.sendCommand = function(params) {
          return new Promise((resolve, reject) => {
              let query = {}
              query.appid = that.$route.query.id
              query.ownerid = JSON.parse(localStorage.getItem('userInfor')).userId
              query.deviceid = params.deviceId
              query.command = JSON.stringify(
                [{
                  event: params.event,
                  desc: params.desc
                }]
              )
              execute(query).then(res => {
                that.journalList.push(res.data)
                if (res.data.statusCode == 200) {
                  resolve({
                    success: true,
                    result: res.data
                  })
                } else {
                  switch (res.data.statusCode) {
                      case 401:
                      case 404:
                        msg = '设备已离线'
                        break;
                      case 504:
                        msg = '操作超时'
                        break;
                      case 500:
                        msg = '网络异常，请稍后重试'
                        break;
                      default:
                        msg = '系统错误'
                        break;
                    }
                    reject({
                      message: 'error',
                      result: res.data
                    })
                }
              }).catch((error) => {
                console.log('command catch', error)
                reject(error)
              })
          })
        }
        this.iframe.contentWindow.JeeWeb.onReceive = (call)=>{
          this.onReceiveCall = call ? call : ()=>{}
        }
        this.iframe.contentWindow.methods.onloadSdk(this.choicedSelectList)
      }, 1000)
    },
    handleClearJournal() {
      this.journalList = []
      this.noReafshJournalList = []
    },
    handleHandRefash() {
      this.journalList = this.journalList.concat(this.noReafshJournalList)
    },
    handleSwitch(val) {
      if (val) {
        this.refashFlag = true
      } else {
        this.refashFlag = false
      }
    },
    handleShowAllJournal() {
      this.journalType = 'all'
    },
    handleShowRightJournal() {
      this.journalList.forEach((item) => {
        if (item.statusCode == 200) {
          this.successJournalList.push(item)
        }
      })
      this.journalType = 'success'
    },
    handleShowErrJournal() {
      this.journalList.forEach((item) => {
        if (item.statusCode != 200) {
          this.errorJournalList.push(item)
        }
      })
      this.journalType = 'error'
    }
  }
}
</script>

<style lang="less" scoped>
.debuggerPage {
  .debuggerTitle {
    height: 64px;
    background: #ffffff;
    border-radius: 4px;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.04);
    font-size: 20px;
    font-family: Microsoft YaHei UI, Microsoft YaHei UI-Bold;
    font-weight: 700;
    text-align: LEFT;
    color: #333333;
    line-height: 20px;
    width: 100%;
    display: flex;
    align-items: center;
    padding-left: 16px;
  }
  .debuggerWrapper {
    display: flex;
    margin-top: 16px;

    .selectWrapper {
      width: 358px;
      height: 700px;
      background: #ffffff;
      border-radius: 4px;
      box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.04);
      margin-right: 16px;
      flex-shrink: 0;
      .selectTitle {
        font-size: 16px;
        font-family: Microsoft YaHei UI, Microsoft YaHei UI-Bold;
        font-weight: 700;
        text-align: LEFT;
        color: #333333;
        line-height: 15px;
        padding: 24px 0 24px 16px;
        border-bottom: 1px solid #e5e6eb;
      }
      .formWrapper {
        padding: 28px 42px 0 16px;
        .formBtnWrapper {
          margin-top: 300px;
          display: flex;
          flex-direction: column;
          align-items: center;
          font-size: 14px;
          font-family: Microsoft YaHei UI, Microsoft YaHei UI-Regular;
          font-weight: 400;
          text-align: LEFT;
          color: #666666;
          line-height: 14px;
        }
      }
    }
    .deviceWrapper {
      background: #ffffff;
      flex: 1;
      display: flex;
      .iframeWrapper {
        margin: 16px;
        background: url('../../../assets/img/phone-bg.png') no-repeat;
        background-size: contain;
        .iframeStyle {
          width: 375px;
          height: 667px;
        }
        .noDeviceStyle{
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          font-size: 14px;
          font-family: Microsoft YaHei UI, Microsoft YaHei UI-Regular;
          font-weight: 400;
          text-align: LEFT;
          color: #666666;
          line-height: 14px;
          .noDeviceImage{
            width: 44px;
            height: 33px;
            margin-bottom: 20px;
          }
        }
      }
      .journalWrapper {
        border-left: 1px solid #e5e6eb;
        padding: 16px;
        flex: 1;
        .journalTitle {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 16px;
          font-family: Microsoft YaHei UI, Microsoft YaHei UI-Bold;
          font-weight: 700;
          text-align: JUSTIFIED;
          color: #333333;
          line-height: 15px;
          .refash {
            font-size: 14px;
            font-family: Microsoft YaHei UI, Microsoft YaHei UI-Regular;
            font-weight: 400;
            text-align: JUSTIFIED;
            color: #000000;
            line-height: 14px;
            margin-right: 16px;
          }
        }
        .journalBox {
          margin-top: 23px;
          height: 620px;
          background: #212121;
          border-radius: 4px;
          box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.04);
          width: 100%;
          .boxTitle {
            display: flex;
            justify-content: flex-end;
            padding: 24px 16px 24px 0;
            border-bottom: 1px solid rgba(255, 255, 255, 0.2);
            font-size: 14px;
            font-family: Microsoft YaHei UI, Microsoft YaHei UI-Regular;
            font-weight: 400;
            text-align: JUSTIFIED;
            color: #ffffff;
            line-height: 14px;
          }
          .journalInfo {
            height: 560px;
            padding: 16px;
            color: #ffffff;
            overflow-y: auto;
          }
        }
      }
    }
  }
  /deep/.ant-dropdown-menu-item:nth-child(3) {
    height: 40px;
    line-height: 40px;
    
  }
}
</style>