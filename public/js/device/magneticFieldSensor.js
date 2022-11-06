import command from "../command.js";

class MagneticFieldSensor {}

MagneticFieldSensor.prototype.getIsMagnetic = function () {
  let result = {
    errCode: -1,
    error: "",
  };
  return new Promise((resolve,reject)=>{
    command({
      event: "600001",
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

window.MagneticFieldSensor = MagneticFieldSensor;
export default MagneticFieldSensor;
