const win = window;
let SDK_READY = 0;
/**
 * 设备类型
 * */
const clientType = {
  ios: [2, 4, 7],
  android: [0, 1, 3, 8, 9, 10],
  windows: [6],
  web: [5]
};
const JeeWeb = {
  OS: 'web', // 客户端类型
  Language: 0, // 客户端语言
  deviceInfo: {
    // 设备信息
    navHeight: 0, // 导航高度
    safeBottomHeight: 0 // 底部安全高度
  },
  // 通道绑定并返回Promise
  use: function(name, data) {
    if (SDK_READY === 1) {
      return new Promise((resolve) => JeeWeb[name](data, (result) => resolve(result)));
    } else {
      const arr = Array.prototype.slice.apply(arguments);
      const [action, ...attribute] = arr;
      if (win.JeeWeb[action]) {
        return new Promise((resolve) =>
          win.JeeWeb[action].apply(win.JeeWeb, [...attribute, (e) => resolve(e)])
        );
      }
    }
  },
  // 发送指令
  command: function(cmd, callback) {
    console.log(`web ---- window.JeeWeb.command(${JSON.stringify(cmd)})`);
    callback &&
      callback({
        errCode: '200',
        errMsg: ''
      });
  },
  load: function(request, callback) {
    console.log(`web ---- window.JeeWeb.load(${JSON.stringify(request)})`);
    callback &&
      callback({
        errCode: '200',
        errMsg: 'true'
      });
  },
  // 打开应用
  open: function(object) {
    console.log('object ====', object);
    win.location = object.appInfo.appUrl;
  },

  getUserProfile: function(obj, callback) {
    console.log(`web ---- window.JeeWeb.load(${JSON.stringify(obj)})`, 6666666666);
    callback &&
      callback({
        errCode: '200',
        errMsg: 'true'
      });
  },

  fetchRelatedDeviceList: function(obj, callback) {
    console.log(`web ---- window.JeeWeb.load(${JSON.stringify(obj)})`, 6666666666);
    callback &&
      callback({
        errCode: '200',
        errMsg: 'true'
      });
  }
};
if (win.JeeWeb) {
  for (const key in win.JeeWeb) {
    JeeWeb[key] = win.JeeWeb[key];
  }
  const client = JeeWeb.OS;
  Object.keys(clientType).map((type) => {
    if (clientType[type].includes(client)) {
      JeeWeb.OS = type;
      SDK_READY = 1;
    }
  });
} else {
  win.JeeWeb = JeeWeb;
}
export default JeeWeb;
