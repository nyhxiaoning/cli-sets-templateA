import command from "../command.js";

class LowPressurePump  {
  constructor() {
    this.pumpMode = null; //设定低压水泵出水量档位（大/中/小）
  }
}

LowPressurePump.prototype.setPumpMode = function (data) {
  let result = {
    errCode: -1,
    error: "",
  };
  return new Promise((resolve,reject)=>{
    resolve(true)
  //   command({
  //     event: "500001",
  //     desc: [
  //       [
  //         {
  //           id: 1,
  //           type: "string",
  //           value: data.result,
  //         },
  //       ],
  //     ],
  //   })
  //     .then((e) => {
  //       result.errCode = 1;
  //       this.pumpMode=data.value
  //       resolve(result)
  //     })
  //     .catch((e) => {
  //       result.error = e.toString();
  //       reject(result)
  //     });
  })
};

LowPressurePump.prototype.getPumpMode = function () {
  return this.pumpMode;
};

window.LowPressurePump = LowPressurePump;
export default LowPressurePump;
