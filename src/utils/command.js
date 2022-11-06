import { Toast } from 'vant';

// import JeeWeb from '@jeeweb/sdk'
!(function(e, n) { typeof exports == 'object' && typeof module != 'undefined' ? n(exports) : typeof define == 'function' && define.amd ? define(['exports'], n) : n((e = e || self).SmoothDnD = {}); }(this, function(e) { 'use strict'; function i(e) { return (function(e) { if (Array.isArray(e)) return e; }(e)) || n(e) || o(e) || (function() { throw new TypeError('Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'); }()); } function a(e) { return (function(e) { if (Array.isArray(e)) return t(e); }(e)) || n(e) || o(e) || (function() { throw new TypeError('Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'); }()); } function n(e) { if (typeof Symbol != 'undefined' && e[Symbol.iterator] != null || e['@@iterator'] != null) return Array.from(e); } function o(e, n) { if (e) { if (typeof e == 'string') return t(e, n); var o = Object.prototype.toString.call(e).slice(8, -1); return (o = o === 'Object' && e.constructor ? e.constructor.name : o) === 'Map' || o === 'Set' ? Array.from(e) : o === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(o) ? t(e, n) : void 0; } } function t(e, n) { (n == null || n > e.length) && (n = e.length); for (var o = 0, t = new Array(n); o < n; o++)t[o] = e[o]; return t; } var r, c; (c = r = r || {}).IOS = 'ios', c.ANDROID = 'android', c.WINDOWS = 'windows', c.WEB = 'web'; var u = window; function s() { } var l = 0; var f = { ios: [2, 4, 7], android: [0, 1, 3, 8, 9, 10], windows: [1], web: [5] }; var d = { OS: r.WEB, Language: 0, deviceInfo: { navHeight: 0, tabBarHeight: 0, statusBarHeight: 0, safeBottomHeight: 0, haveNotch: !1, screenScale: 3 }, env: 'local', TargetId: '', use: function(e, o) { if (l === 1) return new Promise(function(n) { return d[e](o, function(e) { return n(e); }); }); var n = i(Array.prototype.slice.apply(arguments)); var t = n[0]; var r = n.slice(1); return u.JeeWeb[t] ? new Promise(function(n) { return u.JeeWeb[t].apply(u.JeeWeb, [].concat(a(r), [function(e) { return n(e); }])); }) : ''; }, command: function(e, n) { console.log('web ---- window.JeeWeb.command('.concat(JSON.stringify(e), ')')), n && n({ errCode: '200', errMsg: '' }); }, load: function(e, n) { console.log('web ---- window.JeeWeb.load('.concat(JSON.stringify(e), ')')), n && n({ errCode: '200', errMsg: 'true' }); }, open: function(e) { u.location = e.appInfo.appUrl; }, close: function() { }, chooseImage: function() { var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : { count: 1, maxSize: 1, success: s, fail: s, complete: s }; return console.log('web ---- window.JeeWeb.chooseImage('.concat(JSON.stringify(e), ')')), e; }, chooseVideo: function() { var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : { count: 1, maxSize: 1, maxDuration: 0, success: s, fail: s, complete: s }; return console.log('web ---- window.JeeWeb.chooseVideo('.concat(JSON.stringify(e), ')')), e; }, uploadFile: function() { var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : { filePath: '', progress: s, success: s, fail: s }; return console.log('web ---- window.JeeWeb.uploadFile('.concat(JSON.stringify(e), ')')), e; } }; if (u.JeeWeb) { for (var b in u.JeeWeb) u.JeeWeb.hasOwnProperty(b) && (d[b] = u.JeeWeb[b]); Object.keys(f).map(function(e) { f[e].includes(u.JeeWeb.OS) && (d.OS = e, l = 1); }), u.JeeWeb = d; } else u.JeeWeb = d; e.default = d, Object.defineProperty(e, '__esModule', { value: !0 }); }));

/**
 *
 * @param {object} params  command参数
 * @param {boolean} toast_show 是否展示toast
 * @param {object} toast_config toast配置项同  VantUI
 * @returns {promise}
 */

let laoding_count = 0;

const command = (params, toast_show = true, toast_config) => {
  return new Promise((resolve, reject) => {
    if (toast_show) { laoding_count += 1; }

    if (laoding_count >= 1) {
      if (toast_config) {
        Toast.loading(toast_config);
      } else {
        Toast.loading({
          duration: 30000, // 持续展示 toast
          forbidClick: true,
          message: '加载中'
        });
      }
    }

    console.log('command参数', params);
    JeeWeb.use('command', params)
      .then(res => {
        if (toast_show) { laoding_count += -1; }
        if (laoding_count <= 1) {
          Toast.clear();
        }
        console.log('command返回', JSON.parse(res.result));
        const { errCode, errMsg, result } = res;
        const code = parseInt(errCode, 10);
        if (code === 200) {
          let resultMsg = result;
          // console.log('result-->',result)
          if (!resultMsg) {
            resultMsg = '';
            if (errMsg !== '') {
              resultMsg = errMsg;
            }
          }
          const data = Object.keys(resultMsg).length ? JSON.parse(resultMsg) : JSON.parse(JSON.stringify(resultMsg));
          resolve({
            success: true,
            result: data
          });
        } else {
          console.log('command', res, params.event);
          let msg = '';
          switch (code) {
            case 404:
              msg = '设备已离线';
              break;
            case 504:
              msg = '操作超时';
              break;
            case 500:
              msg = '网络异常，请稍后重试';
              break;
            default:
              msg = errMsg;
              break;
          }
          reject({
            message: msg || 'error',
            code
          });
        }
      }).catch(e => {
        if (toast_show) { laoding_count += -1; }

        if (laoding_count <= 1) {
          Toast.clear();
        }

        console.log('command', e, params.event);
        reject(e);
      });
  });
};

export default command;
