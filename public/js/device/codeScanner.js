import { command } from "../command.js";
class codeScannerDevice {}
codeScannerDevice.prototype.getQRCode = function () {
    let result = {
        errCode: -1,
        error: "",
    };
    return new Promise((resolve,reject) => {
        console.log(this.qrCode,'读取二维码');
        command({
            event: "1600001",
            desc: [
                [
                    {
                        id: 1,
                        type: "struct",
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
codeScannerDevice.prototype.getBarCode = function () {
    let result = {
        errCode: -1,
        error: "",
    };
    return new Promise((resolve,reject) => {
        console.log(this.barCode,'读取条形码');
        command({
            event: "1600002",
            desc: [
                [
                    {
                        id: 1,
                        type: "struct",
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

window.codeScannerDevice = codeScannerDevice;
export default  codeScannerDevice;
