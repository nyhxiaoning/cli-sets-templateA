import { command } from "../command.js";

class SteeringGear  {
  constructor() {
    this.rotationDirection = null; //设置舵机旋转方向：顺时针/逆时针, 'Clockwise','Counterclockwise'
    this.rotationAngle = null; //设置舵机旋转角度：0-355度
  }
}
SteeringGear.prototype.setRotationDirection = function (data) {
  return new Promise((resolve,reject)=>{
    command({
      event: 'LED3',
      desc: [
        [
          {
            id: 1,
            type: "string",
            value: data,
          },
        ],
      ],
    })
      .then((e) => {
        this.rotationDirection = data
        resolve(e.result)
      })
      .catch((e) => {
        reject(e.result)
      });
  })
};

SteeringGear.prototype.getRotationDirection = function () {
  return new Promise((resolve,reject)=>{
    command({
      event: 'LED1',
      desc: [
        [
          {
            id: 1,
            type: "string",
            value: '',
          },
        ],
      ],
    })
      .then((e) => {
        resolve(e.result)
      })
      .catch((e) => {
        reject(e.result)
      });
  })
};

SteeringGear.prototype.setRotationAngle = function (data) {
  return new Promise((resolve,reject)=>{
    command({
      event: "LED4",
      desc: [
        [
          {
            id: 1,
            type: "int",
            value: data,
          },
        ],
      ],
    })
      .then((e) => {
        this.rotationAngle = data.value
        resolve(e.result)
      })
      .catch((e) => {
        reject(e.result)
      });
  })
};

SteeringGear.prototype.getRotationAngle = function () {
  return new Promise((resolve,reject)=>{
    command({
      event: 'LED2',
      desc: [
        [
          {
            id: 1,
            type: "string",
            value: '',
          },
        ],
      ],
    })
      .then((e) => {
        resolve(e.result)
      })
      .catch((e) => {
        reject(e.result)
      });
  })
};

window.SteeringGear = SteeringGear;
export default SteeringGear;
