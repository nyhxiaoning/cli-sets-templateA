var deviceManager
let rainSensor
let steeringGear
window.methods = {
  onloadSdk(deviceArr) {
    deviceManager = new deviceManager(deviceArr)
    rainSensor = deviceManager.getRainSensor('雨水传感器')
    steeringGear = deviceManager.getSteeringGear('舵机')
    console.log('123123123', steeringGear)
    demo()
  }
}

async function demo() {
  console.log('12312313123')
  rainSensor.onReceive(res => {
    if (res.body.status == 'true') {
      steeringGear.setRotationDirection('Clockwise')
      steeringGear.setRotationAngle(20)
      setTimeout(() => {
        steeringGear.setRotationDirection('Counterclockwise')
        steeringGear.setRotationAngle(50)
      }, 1000)
    } else if (res.body.status == 'false') {
      steeringGear.setRotationAngle(0)
    }
  })
}
async function handleDuoJiZheng() {
  console.log('steeringGear', steeringGear)
  steeringGear.setRotationDirection('Clockwise')
}
async function handleDuoJiFan() {
  steeringGear.setRotationDirection('Counterclockwise')
}
async function handleDuoJi30() {
  steeringGear.setRotationAngle(30)
}
async function handleDuoJi0() {
  steeringGear.setRotationAngle(0)
}
async function handleDuoJi50() {
  steeringGear.setRotationAngle(50)
}