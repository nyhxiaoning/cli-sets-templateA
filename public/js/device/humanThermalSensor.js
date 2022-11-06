import { command } from "../command.js";
class humanThermalSensorDevice {
    constructor(deviceId) {
      console.log('deviceId', deviceId)
      this.statusBody = true; // true/false 获取状态(存在/不存在热源物体）
    }
}
humanThermalSensorDevice.prototype.getIsExists = function (data) {
    let result = {
        errCode: -1,
        error: "",
    };
    return new Promise((resolve,reject) => {
        command({
            event: "1500001",
            desc: [
                [
                    {
                        id: 1,
                        type: "bool",
                        value: '',
                    },
                ],
            ],
        }).then((e) => {
            console.log(e,'eeeeee');
            this.statusBody = false;
            result.errCode = 1;
            resolve(result)
        }).catch((e) => {
            console.log(e,'catch');
            result.error = e.toString();
            reject(result)
        });
    })
};

window.humanThermalSensorDevice = humanThermalSensorDevice;
export default  humanThermalSensorDevice;
