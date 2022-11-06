
var deviceManage
async function onloadBle(params) {
  // JeeWeb.showSelectDevicePage({
  //   multiple: true,
  //   success: function(res) {
  //     deviceManage = new deviceManage(res.result)
  //   },
  //   fail: (err) => {
  //     console.log('err', err)
  //   }
  // })
  deviceManage = new deviceManage()
  // Display = new Display()
  // console.log('Display', Display)
}
function handleSteeringGear() {
  console.log('123123', deviceManage.SteeringGear)
  deviceManage.SteeringGear.setRotationDirection('Clockwise').then(res => {
    console.log('res', res)
  })
}
function handleSteeringGearNo() {
  deviceManage.SteeringGear.setRotationDirection('Counterclockwise').then(res => {
    console.log('res', res)
  })
}
function handleSteeringGear2() {
  // console.log('123123', deviceManage.SteeringGear)
  deviceManage.SteeringGear.setRotationAngle(30).then(res => {
    console.log('res', res)
  })
}
function handleSteeringGear3() {
  // console.log('123123', deviceManage.SteeringGear)
  deviceManage.SteeringGear.setRotationAngle(100).then(res => {
    console.log('res', res)
  })
}
function getSteeringGear() {
  deviceManage.SteeringGear.getRotationDirection().then(res => {
    console.log('res', res)
  })
}
function getSteeringGear2() {
  deviceManage.SteeringGear.getRotationAngle().then(res => {
    console.log('res', res)
  })
}

function getIsRaining() {
  // console.log('EnvironmentSensor', deviceManage.EnvironmentSensor)
  deviceManage.RainSensor.getPrecipitationLevel()
  .then(res => {
    console.log('获取温度：', res.value)
  }).catch((res) => {
    console.log('chucuole', res)
  })
}
function getHumidity() {
  deviceManage.EnvironmentSensor.getHumidity()
  .then(res => {
    console.log('获取湿度：', res.value)
  }).catch((res) => {
    console.log('chucuole', res)
  })
}
function setText() {
  let params = {
    value: 'hello word123'
  }
  Display.setText(params).then((res) => {
    console.log('cunshangle', res)
  })
}
onloadBle();