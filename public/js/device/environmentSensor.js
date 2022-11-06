import { command } from "../command";
class EnvironmentSensor {
  constructor(val, val1) {
    this.deviceId = val
    console.log('val', val)
    console.log('val1', val1)
  }
}
EnvironmentSensor.prototype.getTemperature = function () {
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

EnvironmentSensor.prototype.getHumidity = function () {
  return new Promise((resolve,reject)=>{
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
        resolve(e.result)
      })
      .catch((e) => {
        reject(e.result)
      });
  })
};

EnvironmentSensor.prototype.getLightIntensity = function () {
  let result = {
    errCode: -1,
    error: "",
  };
  return new Promise((resolve,reject)=>{
    command({
      event: "1300003",
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

EnvironmentSensor.prototype.getCoStatus = function () {
  let result = {
    errCode: -1,
    error: "",
  };
  return new Promise((resolve,reject)=>{
    command({
      event: "1300004",
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

EnvironmentSensor.prototype.getCoLevel = function () {
  debugger
  let result = {
    errCode: -1,
    error: "",
  };
  return new Promise((resolve,reject)=>{
    command({
      event: "1300005",
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

EnvironmentSensor.prototype.getSmokeStatus = function () {
  let result = {
    errCode: -1,
    error: "",
  };
  return new Promise((resolve,reject)=>{
    command({
      event: "1300006",
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

EnvironmentSensor.prototype.getSmokeLevel = function () {
  let result = {
    errCode: -1,
    error: "",
  };
  return new Promise((resolve,reject)=>{
    command({
      event: "1300007",
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

window.EnvironmentSensor = EnvironmentSensor;
export default EnvironmentSensor;