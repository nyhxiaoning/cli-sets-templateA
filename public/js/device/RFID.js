import { command } from "../command.js";
class rfldDevice {
  constructor() {
    this.setUpIdString = "21343421"; // 设定id串
    this.obtainIdString = "21343421"; // 获取id串
  }
}
rfldDevice.prototype.setIDString = function (data) {
  let result = {
    errCode: -1,
    error: "",
  };
  return new Promise((resolve,reject) => {
    command({
      event: "1400002",
      desc: [
        [
          {
            id: 1,
            type: "void",
            value: data.value,
          },
        ],
      ],
    }).then((e) => {
      console.log(e,'eeeeee');
      // if(e.errCode==200){}
      this.obtainIdString = data.value;
      result.errCode = 1;
      resolve(result)
    }).catch((e) => {
      console.log(e,'catch');
      result.error = e.toString();
      reject(result)
    });
  })
};
rfldDevice.prototype.getIDString = function (data) {
  return new Promise((resolve,reject) => {
    command({
      event: "1400001",
      desc: [
        [
          {
            id: 1,
            type: "string",
            value: '123',
          },
        ],
      ],
    }).then((e) => {
        console.log(e,'eeeeee');
        // if(e.errCode==200){}
        this.obtainIdString = data.value;
        result.errCode = 1;
        resolve(result)
      }).catch((e) => {
        console.log(e,'catch');
        result.error = e.toString();
        reject(result)
      });
  })
};

window.rfldDevice = rfldDevice;
export default  rfldDevice;
