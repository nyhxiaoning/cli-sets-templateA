// 8、MicrophoneAndSpeaker 麦克风与喇叭
import command from "../command.js";

class microphoneAndSpeakerDevice {
    constructor() {
        this.repeatNumber = "3" //int  设定声音片段重复播放次数
    }
}

// 获取垂直按下状态 true/false
microphoneAndSpeakerDevice.prototype.repeatNumber = function(data) {
        let result = {
            errCode: -1,
            error: "",
        };
        return new Promise((resolve, reject) => {
            command({
                event: "800001",
                desc: [
                    [{
                        id: 1,
                        type: "int",
                        value: data.value,
                    }, ],
                ],
            }).then((e) => {
                console.log(e, 'eeeeee');
                this.repeatNumber = data.value;
                result.errCode = 1;
                resolve(result)
            }).catch((e) => {
                console.log(e, 'catch');
                result.error = e.toString();
                reject(result)
            });
        })
    }
    // };获取设定的声音片段重复播放次数
microphoneAndSpeakerDevice.prototype.getRepeatNumber = function(data) {
    return this.repeatNumber;

};


// 获取按压模式(单击、双击、长按）
microphoneAndSpeakerDevice.prototype.volume = function(data) {
    let result = {
        errCode: -1,
        error: "",
    };
    return new Promise((resolve, reject) => {
        command({
            event: "800002",
            desc: [
                [{
                    id: 1,
                    type: "int",
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
microphoneAndSpeakerDevice.prototype.getSoundClip = function(data) {
    let result = {
        errCode: -1,
        error: "",
    };
    return new Promise((resolve, reject) => {
        command({
            event: "800003",
            desc: [
                [{
                    id: 1,
                    type: "struct",
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
microphoneAndSpeakerDevice.prototype.getDuration = function(data) {
    let result = {
        errCode: -1,
        error: "",
    };
    return new Promise((resolve, reject) => {
        command({
            event: "800004",
            desc: [
                [{
                    id: 1,
                    type: "time",
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


microphoneAndSpeakerDevice.prototype.getVolume = function(data) {
    let result = {
        errCode: -1,
        error: "",
    };
    return new Promise((resolve, reject) => {
        command({
            event: "800006",
            desc: [
                [{
                    id: 1,
                    type: "int",
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

window.microphoneAndSpeakerDevice = microphoneAndSpeakerDevice;
export default new microphoneAndSpeakerDevice();