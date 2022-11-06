import axios from 'axios';
import { Toast } from 'vant';
let laodingCount = 0;

// create an axios instance
const service = axios.create({
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 30000 // request timeout
});

// request interceptor
service.interceptors.request.use(
  (config) => {
    // do something before request is sent
    config.headers['Authorization'] = sessionStorage.token;
    config.headers['Client'] = 'weixin';
    return config;
  },
  (error) => {
    // do something with request error
    console.log(error); // for debug
    return Promise.reject(error);
  }
);

// response interceptor
service.interceptors.response.use(
  (response) => {
    const res = response.data;
    if (response.config.responseType === 'blob') {
      return res;
    }

    // if the custom code is not 20000, it is judged as an error.
    if (res.code !== 200 && response.config.url !== '/feldsher/admin/wecom/user/getUserInfo') {
      Toast.fail(res.message || '服务异常');

      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (res.code === 401) {
        // to re-login
      }
      if (res.code === 511) {
        return res;
      }
      return Promise.reject(new Error(res.message || 'Error'));
    } else {
      return res;
    }
  },
  (error) => {
    laodingCount += -1;
    if (laodingCount <= 0) {
      Toast.clear();
    }
    console.log('err' + error); // for debug
    Toast.fail('服务异常');
    return Promise.reject(error);
  }
);

const request = async function(data, loading = true, complex = false) {
  try {
    if (loading) {
      Toast.loading({
        duration: 0,
        message: '加载中...',
        forbidClick: true
      });
      laodingCount += 1;
    }
    const res_data = await service(data);
    if (loading) {
      laodingCount += -1;
      if (laodingCount <= 0) {
        Toast.clear();
      }
    }
    if (res_data.code !== 200 && !complex) {
      Toast.fail('服务异常');
      return res_data;
    }

    return res_data;
  } catch (error) {
    if (loading) {
      laodingCount += -1;
      if (laodingCount <= 0) {
        Toast.clear();
      }
    }
  }
};

export default request;
