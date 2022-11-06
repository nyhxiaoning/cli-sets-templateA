// @ts-ignore //忽略提示
import html2canvas from "./html2canvas.esm.js";
export var canvasEvent = function (id, color) {
    if (id === void 0) { id = ''; }
    if (color === void 0) { color = '#fff'; }
    return new Promise(function (resolve, reject) {
        html2canvas(document.querySelector(id), {
            //允许图片跨域
            useCORS: true,
            taintTest: false,
            logging: true,
            //背景颜色
            backgroundColor: color,
            // 如果需要合成的数据超过页面-出现滚动条，需要打开这些
            // width: window.screen.availWidth,//显示窗口canvas的宽度
            // windowWhidth: document.body.scrollWidth,//获取x方向滚动条内容
            // windowHeight: $("#box").get(0).offsetHeight,//获取y方向滚动条内容
            // x: 0,//页面滚动
            // y: window.pageYOffset////页面滚动
        }).then(function (canvas) {
            var url = canvas.toDataURL('image/png');
            resolve(url);
        }).catch(function () { reject(); });
    });
};
//# sourceMappingURL=canvas.js.map