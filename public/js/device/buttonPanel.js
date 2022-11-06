import { command } from "../command.js";
class buttonPanelDevice {
    constructor() {
        this.buttonCodesList = [1,2]; // 获取按下的键位码(最高可支持9个按键同时点击)
        // this.keyMode = 'single'; // 按键模式（单击、双击、长按 'single click','double click','long press'）
    }
}
// 按键状态（按下抬起，'up','down'）
buttonPanelDevice.prototype.getEvent = function () {
    let result = {
        errCode: -1,
        error: "",
    };
    return new Promise((resolve,reject) => {
        console.log(this.keyStatus,'按键状态');
        command({
            event: "1700001",
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
            result.errCode = 1;
            resolve(result)
        }).catch((e) => {
            console.log(e,'catch');
            result.error = e.toString();
            reject(result)
        });
    })
};
buttonPanelDevice.prototype.buttonCodes = function () {
    let result = {
        errCode: -1,
        error: "",
    };
    return new Promise((resolve,reject) => {
        console.log(this.buttonCodesList,'获取按下的键位码');
        command({
            event: "1700002",
            desc: [
                [
                    {
                        id: 1,
                        type: "string",
                        value: '',
                    },
                ],
            ],
        }).then((e) => {
            console.log(e,'eeeeee');
            this.buttonCodesList = [];
            console.log(this.buttonCodesList,'this.barCode');
            result.errCode = 1;
            resolve(result)
        }).catch((e) => {
            console.log(e,'catch');
            result.error = e.toString();
            reject(result)
        });
    })
};
buttonPanelDevice.prototype.getButtonMode = function () {
    let result = {
        errCode: -1,
        error: "",
    };
    return new Promise((resolve,reject) => {
        console.log(this.keyMode,'获取按下的键位码');
        command({
            event: "1700003",
            desc: [
                [
                    {
                        id: 1,
                        type: "string",
                        value: '',
                    },
                ],
            ],
        }).then((e) => {
            console.log(e,'eeeeee');
            result.errCode = 1;
            resolve(result)
        }).catch((e) => {
            console.log(e,'catch');
            result.error = e.toString();
            reject(result)
        });
    })
};

window.buttonPanelDevice = buttonPanelDevice;
export default  buttonPanelDevice;
