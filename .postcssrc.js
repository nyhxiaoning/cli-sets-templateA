// https://github.com/michael-ciniawsky/postcss-load-config
const path = require('path');
module.exports = ({ file }) => {
    // 判断是否是来自于vant中的内容：
    // 我们引入一些第三方库的时候，比如vant，上面配置的exclude去掉，表示全部内容进行vw转换，会遇到这样的问题，因为vant引入的库中使用功能的是375px宽度理想化适配
    // 我们默认的viewportWidth是750的尺寸
    const designWidth = file.dirname.includes(path.join('node_modules', 'vant')) ? 375 : 750;
    //   TODO:这里利用根节点是14px进行转换，转换公式是 14px / viewPortWidth 
    // 转换app7.67之间 px / 7.67 = em
    return {
        plugins: {
            autoprefixer: {}, // 用来给不同的浏览器自动添加相应前缀，如-webkit-，-moz-等等
            "postcss-px-to-viewport": {
                unitToConvert: "px", // 要转化的单位
                viewportWidth: 400, // UI设计稿的宽度420
                unitPrecision: 6, // 转换后的精度，即小数点位数
                propList: ["*"], // 指定转换的css属性的单位，*代表全部css属性的单位都进行转换
                viewportUnit: "vw", // 指定需要转换成的视窗单位，默认vw
                fontViewportUnit: "vw", // 指定字体需要转换成的视窗单位，默认vw
                selectorBlackList: ["wrap"], // 指定不转换为视窗单位的类名，
                minPixelValue: 1, // 默认值1，小于或等于1px则不进行转换
                mediaQuery: true, // 是否在媒体查询的css代码中也进行转换，默认false
                replace: true, // 是否转换后直接更换属性值
                // exclude: [/node_modules/], // 设置忽略文件，用正则做目录名匹配。因为兼容vant，所以这里先进行不处理
                landscape: false // 是否处理横屏情况
            }
        }
    };
};

