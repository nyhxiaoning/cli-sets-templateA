// 9、GameJoystick 游戏操纵杆
import command from "../command.js";

class GameJoystickDevice {
    constructor() {}
}

// 获取垂直按下状态 true/false
GameJoystickDevice.prototype.getStatus = function(data) {
    let result = {
        errCode: -1,
        error: "",
    };
    return new Promise((resolve, reject) => {
        command({
            event: "900001",
            desc: [
                [{
                    id: 1,
                    type: "bool",
                    value: data.value,
                }, ],
            ],
        }).then((e) => {
            console.log(e, 'eeeeee');
            result.errCode = 1;
            resolve(result)
        }).catch((e) => {
            console.log(e, 'catch');
            result.error = e.toString();
            reject(result)
        });
    })
};


// 获取按压模式(单击、双击、长按）
GameJoystickDevice.prototype.getMode = function(data) {
    let result = {
        errCode: -1,
        error: "",
    };
    return new Promise((resolve, reject) => {
        command({
            event: "900002",
            desc: [
                [{
                    id: 1,
                    type: "string",
                    value: data.value,
                }, ],
            ],
        }).then((e) => {
            console.log(e, 'eeeeee');
            result.errCode = 1;
            resolve(result)
        }).catch((e) => {
            console.log(e, 'catch');
            result.error = e.toString();
            reject(result)
        });
    })
};


// getPositioninformationX
GameJoystickDevice.prototype.getPositioninformationX = function(data) {
    let result = {
        errCode: -1,
        error: "",
    };
    return new Promise((resolve, reject) => {
        command({
            event: "900003",
            desc: [
                [{
                    id: 1,
                    type: "float",
                    value: data.value,
                }, ],
            ],
        }).then((e) => {
            console.log(e, 'eeeeee');
            result.errCode = 1;
            resolve(result)
        }).catch((e) => {
            console.log(e, 'catch');
            result.error = e.toString();
            reject(result)
        });
    })

};

//获取Y轴数值信息
GameJoystickDevice.prototype.getPositioninformationY = function(data) {
    let result = {
        errCode: -1,
        error: "",
    };
    return new Promise((resolve, reject) => {
        command({
            event: "900004",
            desc: [
                [{
                    id: 1,
                    type: "float",
                    value: data.value,
                }, ],
            ],
        }).then((e) => {
            console.log(e, 'eeeeee');
            result.errCode = 1;
            resolve(result)
        }).catch((e) => {
            console.log(e, 'catch');
            result.error = e.toString();
            reject(result)
        });
    })

};

GameJoystickDevice.prototype.getDirection = function(data) {
    let result = {
        errCode: -1,
        error: "",
    };
    return new Promise((resolve, reject) => {
        command({
            event: "900005",
            desc: [
                [{
                    id: 1,
                    type: "string",
                    value: data.value,
                }, ],
            ],
        }).then((e) => {
            console.log(e, 'eeeeee');
            result.errCode = 1;
            resolve(result)
        }).catch((e) => {
            console.log(e, 'catch');
            result.error = e.toString();
            reject(result)
        });
    })

};

window.GameJoystickDevice = GameJoystickDevice;
export default GameJoystickDevice;