import { command } from "../command.js";
class knobDevice {};
// 获取旋转方向 （顺时针、逆时针，['clockwise','counterclockwise']）
knobDevice.prototype.getRotationDirection = function () {
    let result = {
        errCode: -1,
        error: "",
        knobDirectionRotation: 'clockwise',
    };
    return new Promise((resolve,reject) => {
        command({
            event: "1900001",
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
// 获取档位(20个档位=360度）
knobDevice.prototype.getPosition = function () {
    let result = {
        errCode: -1,
        error: "",
        gear: '2',
    };
    return new Promise((resolve,reject) => {
        command({
            event: "1900002",
            desc: [
                [
                    {
                        id: 1,
                        type: "int",
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
// 获取按钮状态(是否按压)
knobDevice.prototype.getIsPressed = function () {
    let result = {
        errCode: -1,
        error: "",
        press: true,
    };
    return new Promise((resolve,reject) => {
        command({
            event: "1900003",
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
// 获取按键模式（单击、双击、长按 'single click','double click','long press'）
knobDevice.prototype.getButtonMode = function () {
    let result = {
        errCode: -1,
        error: "",
        // buttonMode: 'single click',
    };
    return new Promise((resolve,reject) => {
        command({
            event: "1900004",
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

window.knobDevice = knobDevice;
export default  knobDevice;
