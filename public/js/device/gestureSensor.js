import command from "../command.js";

class GestureSensor {}

GestureSensor.prototype.getMovingDirection = function () {
  let result = {
    errCode: -1,
    error: "",
  };
  return new Promise((resolve,reject)=>{
    command({
      event: "1100001",
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
        result.errCode = 1;
        resolve(result)
      })
      .catch((e) => {
        result.error = e.toString();
        reject(result)
      });
  })
};

GestureSensor.prototype.getRotationDirection = function () {
  let result = {
    errCode: -1,
    error: "",
  };
  return new Promise((resolve,reject)=>{
    command({
      event: "1100002",
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
        result.errCode = 1;
        resolve(result)
      })
      .catch((e) => {
        result.error = e.toString();
        reject(result)
      });
  })
};

GestureSensor.prototype.getSwingStatus = function () {
  let result = {
    errCode: -1,
    error: "",
  };
  return new Promise((resolve,reject)=>{
    command({
      event: "1100003",
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
        result.errCode = 1;
        resolve(result)
      })
      .catch((e) => {
        result.error = e.toString();
        reject(result)
      });
  })
};

window.GestureSensor = GestureSensor;
export default GestureSensor;
