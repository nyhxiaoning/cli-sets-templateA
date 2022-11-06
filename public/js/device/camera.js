import { command } from "../command.js";
class cameraDevice {};
// 获取图片信息(格式)，图片可能的格式数量较多，设置成可以开发定义的字符串
cameraDevice.prototype.getPhotoFormat = function () {
    let result = {
        errCode: -1,
        error: "",
        // pictureFormat: 'jpg',
    };
    return new Promise((resolve,reject) => {
        resolve(result);
        command({
            event: "1800001",
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
            console.log(result,'resultresultresult');
            resolve(result)
        }).catch((e) => {
            console.log(e,'catch');
            result.error = e.toString();
            reject(result)
        });
    })
};
// 获取图片分辨率 int height, int width
cameraDevice.prototype.photoResolution = function () {
    let result = {
        errCode: -1,
        error: "",
        // pictureResolution: '240*320',
    };
    return new Promise((resolve,reject) => {
        resolve(result);
        command({
            event: "1800002",
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
            console.log(result,'resultresultresult');
            // data.success && data.success(result);
            resolve(result)
        }).catch((e) => {
            console.log(e,'catch');
            result.error = e.toString();
            // data.fail && data.fail(result);
            reject(result)
        });
    })
};
// 获取图片信息(内存大小)
cameraDevice.prototype.getPhotoFileSize = function () {
    let result = {
        errCode: -1,
        error: "",
        // pictureMemorySize: '18.7',
    };
    return new Promise((resolve,reject) => {
        resolve(result);
        command({
            event: "1800003",
            desc: [
                [
                    {
                        id: 1,
                        type: "float",
                        value: '',
                    },
                ],
            ],
        }).then((e) => {
            console.log(e,'eeeeee');
            result.errCode = 1;
            console.log(result,'resultresultresult');
            resolve(result)
        }).catch((e) => {
            console.log(e,'catch');
            result.error = e.toString();
            reject(result)
        });
    })
};
// 获取视频信息(格式)，视频可能的格式数量较多，设置成可以开发定义的字符串
cameraDevice.prototype.getVideoFormat = function () {
    let result = {
        errCode: -1,
        error: "",
        // videoFormat: 'mp4', // 'mp4','avi','mov'
    };
    return new Promise((resolve,reject) => {
        resolve(result);
        command({
            event: "1800004",
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
            console.log(result,'resultresultresult');
            resolve(result)
        }).catch((e) => {
            console.log(e,'catch');
            result.error = e.toString();
            reject(result)
        });
    })
};
// 获取视频分辨率
cameraDevice.prototype.videoResolution = function () {
    let result = {
        errCode: -1,
        error: "",
        // videoResolution: '240*320',
    };
    return new Promise((resolve,reject) => {
        resolve(result);
        command({
            event: "1800005",
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
            console.log(result,'resultresultresult');
            resolve(result)
        }).catch((e) => {
            console.log(e,'catch');
            result.error = e.toString();
            reject(result)
        });
    })
};
// 获取视频信息(内存大小)
cameraDevice.prototype.getVideoFileSize = function () {
    let result = {
        errCode: -1,
        error: "",
        // videoMemorySize: '18.5',
    };
    return new Promise((resolve,reject) => {
        resolve(result);
        command({
            event: "1800006",
            desc: [
                [
                    {
                        id: 1,
                        type: "float",
                        value: '',
                    },
                ],
            ],
        }).then((e) => {
            console.log(e,'eeeeee');
            result.errCode = 1;
            console.log(result,'resultresultresult');
            resolve(result)
        }).catch((e) => {
            console.log(e,'catch');
            result.error = e.toString();
            reject(result)
        });
    })
};
// 获取视频信息(时长)
cameraDevice.prototype.getVideoTime = function () {
    let result = {
        errCode: -1,
        error: "",
        // videoTime: '185',
    };
    return new Promise((resolve,reject) => {
        resolve(result);
        command({
            event: "1800007",
            desc: [
                [
                    {
                        id: 1,
                        type: "time",
                        value: '',
                    },
                ],
            ],
        }).then((e) => {
            console.log(e,'eeeeee');
            result.errCode = 1;
            console.log(result,'resultresultresult');
            resolve(result)
        }).catch((e) => {
            console.log(e,'catch');
            result.error = e.toString();
            reject(result)
        });
    })
};

window.cameraDevice = cameraDevice;
export default  cameraDevice;
