let Modules = require.context("./device", true, /\.js$/);
console.log('Modules', Modules)
const deviveObj = {}
for (const key of Modules.keys()) {
  const keyArr = key.split('/')
  keyArr.shift() // 移除.
  deviveObj[keyArr.join('.').replace(/\.js$/g, '')] = Modules(key)
}
class deviceManage{
  constructor(arr){
    this.onReceive=(callBack) => {
      window.JeeWeb.onReceive((res) => {
        callBack(res)
      })
    }
    let deviceArr = []
    if (window.deviceArr&&window.deviceArr.length>0) {
      deviceArr = window.deviceArr
    } else {
      deviceArr = arr
    }
    // 产品简码
    let deviceTypeObj = {
      'QZIO': 'EnvironmentSensor',
      'JSYH': 'SteeringGear',
      'BZBX': 'LowPressurePump',
      'JSYG': 'Display',
      'DEJA': 'RainSensor',
      'JHWK': 'HumanThermalSensor',
      '2EX8': 'HumanThermalSensor'
    }
    for (const key in deviveObj) {
      deviceArr.map((item)=>{
        if(deviceTypeObj[item.productId]){
          deviceManager.prototype['get'+deviceTypeObj[item.productId]]=(params)=>{
            // return new deviveObj[key].default()
            return new deviveObj[deviceTypeObj[item.productId]].default(item.deviceId)
          }
        }
      })
    }
  }
}


window.deviceManage = deviceManage;
export default deviceManage;