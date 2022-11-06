import { command } from "../command.js";

class RainSensor {}

RainSensor.prototype.getIsRaining = function () {
  console.log('123123123123123123')
  return new Promise((resolve,reject)=>{
    command({
      event: "LED1",
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
        console.log('chenggongle', e)
        resolve(e.result)
      })
      .catch((e) => {
        console.log('shibaile', e)
        reject(e.result)
      });
  })
};

RainSensor.prototype.getPrecipitationLevel = function () {
  return new Promise((resolve,reject)=>{
    // resolve('Light')
    command({
      event: "LED2",
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
        console.log('chengg', e.result)
        resolve(e.result)
      })
      .catch((e) => {
        console.log('shibai', e.result)
        reject(e.result)
      });
  })
};

window.RainSensor = RainSensor;
export default RainSensor;
