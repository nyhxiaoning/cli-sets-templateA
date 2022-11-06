import command from "../command.js";

class ImuGyroscopeIMU {}

ImuGyroscopeIMU.prototype.getYawAngle = function (data) {
  let result = {
    errCode: -1,
    error: "",
  };
  return new Promise((resolve,reject)=>{
    command({
      event: "1000001",
      desc: [
        [
          {
            id: 1,
            type: "float",
            value: data.value,
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

ImuGyroscopeIMU.prototype.getPithAngle = function (data) {
  let result = {
    errCode: -1,
    error: "",
  };
  return new Promise((resolve,reject)=>{
    command({
      event: "1000002",
      desc: [
        [
          {
            id: 1,
            type: "float",
            value: data.value,
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

ImuGyroscopeIMU.prototype.getRollAngle = function (data) {
  let result = {
    errCode: -1,
    error: "",
  };
  return new Promise((resolve,reject)=>{
    command({
      event: "1000003",
      desc: [
        [
          {
            id: 1,
            type: "float",
            value: data.value,
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

ImuGyroscopeIMU.prototype.getAccelerationX = function (data) {
  let result = {
    errCode: -1,
    error: "",
  };
  return new Promise((resolve,reject)=>{
    command({
      event: "1000004",
      desc: [
        [
          {
            id: 1,
            type: "float",
            value: data.value,
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

ImuGyroscopeIMU.prototype.getAccelerationY = function (data) {
  let result = {
    errCode: -1,
    error: "",
  };
  return new Promise((resolve,reject)=>{
    command({
      event: "1000005",
      desc: [
        [
          {
            id: 1,
            type: "float",
            value: data.value,
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

ImuGyroscopeIMU.prototype.getAccelerationZ = function (data) {
  let result = {
    errCode: -1,
    error: "",
  };
  return new Promise((resolve,reject)=>{
    command({
      event: "1000006",
      desc: [
        [
          {
            id: 1,
            type: "float",
            value: data.value,
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

ImuGyroscopeIMU.prototype.getAngularVelocityX = function (data) {
  let result = {
    errCode: -1,
    error: "",
  };
  return new Promise((resolve,reject)=>{
    command({
      event: "1000007",
      desc: [
        [
          {
            id: 1,
            type: "float",
            value: data.value,
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

ImuGyroscopeIMU.prototype.getAngularVelocityY = function (data) {
  let result = {
    errCode: -1,
    error: "",
  };
  return new Promise((resolve,reject)=>{
    command({
      event: "1000008",
      desc: [
        [
          {
            id: 1,
            type: "float",
            value: data.value,
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

ImuGyroscopeIMU.prototype.getAngularVelocityZ = function (data) {
  let result = {
    errCode: -1,
    error: "",
  };
  return new Promise((resolve,reject)=>{
    command({
      event: "1000009",
      desc: [
        [
          {
            id: 1,
            type: "float",
            value: data.value,
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

window.ImuGyroscopeIMU = ImuGyroscopeIMU;
export default ImuGyroscopeIMU;
