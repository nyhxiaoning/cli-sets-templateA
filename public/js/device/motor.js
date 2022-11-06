import command from "../command.js";
class motorDevice {
  constructor() {
    this.rotationDirection = "forward"; //默认为前 （前/后/左/右）自己去找产品确认用那些字段
    this.spinVelocityLevel = "fast"; //（快/中/慢）
  }
}

motorDevice.prototype.setRotationDirection = function (data) {
  let result = {
    errCode: -1,
    error: "",
  };
  return new Promise((resolve,reject)=>{
    command({
      event: "300001",
      desc: [
        [
          {
            id: 1,
            type: "int",
            value: data.value,
          },
        ],
      ],
    })
      .then((e) => {
        this.rotationDirection=data.value
        result.errCode = 1;
        resolve(result)
      })
      .catch((e) => {
        result.error = e.toString();
        reject(result)
      });
  })
};

motorDevice.prototype.getRotationDirection = function () {
  return this.rotationDirection;
};

motorDevice.prototype.setSpinVelocityLevel = function (data) {
  let result = {
    errCode: -1,
    error: "",
  };
  return new Promise((resolve,reject)=>{
    command({
      event: "300002",
      desc: [
        [
          {
            id: 1,
            type: "int",
            value: data.value,
          },
        ],
      ],
    })
      .then((e) => {
        this.spinVelocityLevel=data.value
        result.errCode = 1;
        resolve(result)
      })
      .catch((e) => {
        result.error = e.toString();
        reject(result)
      });
  })
};

motorDevice.prototype.getSpinVelocityLevel = function () {
  return this.spinVelocityLevel;
};

window.motorDevice = motorDevice;
export default  motorDevice;
