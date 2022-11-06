import { Toast } from 'vant';
import './util.js';
import JeeWeb from './sdk';

/**
 * @param {object} params  command参数
 * @param {boolean} toast_show 是否展示toast
 * @param {object} toast_config toast配置项同  VantUI
 * @returns {promise}
 */

// loading计数器 防止Loading关闭不合时宜
let laoding_count = 0;

const command = (params, toast_show = true, toast_config) => {
  return new Promise((resolve, reject) => {
    if (toast_show) {
      laoding_count += 1;
    }
    if (laoding_count >= 1) {
      if (toast_config) {
        Toast.loading(toast_config);
      } else {
        Toast.loading({
          duration: 0, // 持续展示 toast
          forbidClick: true,
          message: '加载中'
        });
      }
    }
    console.log('command参数', params);

    JeeWeb.use('command', params)
      .then((res) => {
        console.log('commandOk', JSON.parse(res.result));
        if (toast_show) {
          laoding_count += -1;
        }
        if (laoding_count <= 1) {
          Toast.clear();
        }
        const { errCode, errMsg, result } = res;
        const code = parseInt(errCode, 10);
        if (code === 200) {
          let resultMsg = result;
          if (!resultMsg) {
            resultMsg = '';
            if (errMsg !== '') {
              resultMsg = errMsg;
            }
          }
          const data = Object.keys(resultMsg).length
            ? JSON.parse(resultMsg)
            : JSON.parse(JSON.stringify(resultMsg));
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
          Toast.loading({
            duration: 500, // 持续展示 toast
            forbidClick: true,
            message: msg || '网络异常，请稍后再试'
          });
          reject({
            message: msg || 'error',
            code
          });
        }
      })
      .catch((e) => {
        console.log('commandError', e, params.event);
        if (toast_show) {
          laoding_count += -1;
        }
        if (laoding_count < 1) {
          Toast.loading({
            duration: 500, // 持续展示 toast
            forbidClick: true,
            message: '网络异常，请稍后再试'
          });
        }
        reject(e);
      });
  });
};

export default command;
