// 7、RgbLight RGB多彩灯珠
import command from "../command";

class RgbLightDevice {
    constructor() {
        this.RgbLightRgbColor = "(255,255,255)"; //设置颜色RGB值(int red，int green，int blue)，取值区间（0-255）
        this.RgbLightOnOff = "true"; //设置灯的状态（开/关）
        this.RgbLightFlashMode = "fast" //灯的亮闪频率（快/中/慢）
        this.RgbLightFlashNumber = "" //设置灯的亮闪的总次数
    }
}

// 颜色
RgbLightDevice.prototype.setRgbColor = function(data) {
    console.log(data, "datadata ======")
    let result = {
        errCode: -1,
        error: "",
    };
    return new Promise((resolve, reject) => {
        console.log(data.value, "value========")
        command({
            event: "ZZZZ",
            desc: [
                [{
                    id: 1,
                    type: "int",
                    value: "",
                }],
            ],
        }).then((e) => {
            console.log(e, "eeeeeeeeeeeezzzzzzzzz")
        }).catch((e) => {
            console.log(e, 'err');
            result.error = e.toString();
            reject(result)
        });
        console.log(data, "data ========")
        command({
            event: "700001",
            desc: [
                [{
                    id: 1,
                    type: "int",
                    value: data.value,
                }, ],
            ],
        }).then((e) => {
            console.log(e, 'eeeeee');
            this.RgbLightRgbColor = data.value;
            result.errCode = 1;
            resolve(result)
        }).catch((e) => {
            console.log(e, 'catch');
            result.error = e.toString();
            reject(result)
        });
    })
};
RgbLightDevice.prototype.getRgbColor = function() {
    return this.RgbLightRgbColor;
};

// 灯的状态（开/关）
RgbLightDevice.prototype.setOnOff = function(data) {
    let result = {
        errCode: -1,
        error: "",
    };
    return new Promise((resolve, reject) => {
        command({
            event: "700002",
            desc: [
                [{
                    id: 1,
                    type: "bool",
                    value: data.value,
                }, ],
            ],
        }).then((e) => {
            console.log(e, 'eeeeee');
            this.RgbLightOnOff = data.value;
            result.errCode = 1;
            resolve(result)
        }).catch((e) => {
            console.log(e, 'catch');
            result.error = e.toString();
            reject(result)
        });
    })
};
RgbLightDevice.prototype.getStatus = function() {
    return this.RgbLightOnOff;
};

// 灯的亮闪频率
RgbLightDevice.prototype.setFlashMode = function(data) {
    let result = {
        errCode: -1,
        error: "",
    };
    return new Promise((resolve, reject) => {
        command({
            event: "700004",
            desc: [
                [{
                    id: 1,
                    type: "string",
                    value: data.value,
                }, ],
            ],
        }).then((e) => {
            console.log(e, 'eeeeee');
            this.RgbLightFlashMode = data.value;
            result.errCode = 1;
            resolve(result)
        }).catch((e) => {
            console.log(e, 'catch');
            result.error = e.toString();
            reject(result)
        });
    })

};
RgbLightDevice.prototype.getFlashMode = function() {
    return this.RgbLightFlashMode;
};

//设置灯的亮闪的总次数 
RgbLightDevice.prototype.setFlashNumber = function(data) {
    let result = {
        errCode: -1,
        error: "",
    };
    return new Promise((resolve, reject) => {
        command({
            event: "700003",
            desc: [
                [{
                    id: 1,
                    type: "int",
                    value: data.value,
                }, ],
            ],
        }).then((e) => {
            console.log(e, 'eeeeee');
            this.RgbLightFlashNumber = data.value;
            result.errCode = 1;
            resolve(result)
        }).catch((e) => {
            console.log(e, 'catch');
            result.error = e.toString();
            reject(result)
        });
    })

};


// 获取设置的灯亮度值
RgbLightDevice.prototype.getBrightness = function(data) {
    let result = {
        errCode: -1,
        error: "",
    };
    return new Promise((resolve, reject) => {
        command({
            event: "700006",
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

window.RgbLightDevice = RgbLightDevice;
export default RgbLightDevice;