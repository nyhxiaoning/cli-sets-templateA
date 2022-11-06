import { __assign } from "tslib";
//1.引入vue
// import Vue from 'vue'
//2.引入axios库
import axiosNew from 'axios';
import { config } from '@/utils/config'; //引入公用文件
axiosNew.defaults.timeout = 3000; //请求超时时间
axiosNew.interceptors.request.use(//请求拦截
function (//请求拦截
config) {
    // config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
    // let token =sessionStorage.getItem('token');
    // let token=store.getters.getToken;
    // if (token) {//如果有token给请求头加上
    //     config.headers.common['token'] =token
    // }
    return config;
}, function (err) {
    return Promise.reject(err);
});
axiosNew.interceptors.response.use(function (response) {
    // try{
    //     let {token}=response.data;
    //     if(token){//将登陆的返回的token保存下来
    //         store.dispatch('tokenChange',token);
    //     }
    // }catch(err){
    //     console.log("在相应拦截这边其他请求不需要取token",err)
    // };
    // if(response.data.code==10001||response.data.code==402){//如果token为空或者过期，跳到登录
    //     store.dispatch('tokenChange',"");
    //     router.push({path:"/login"});
    // }
    return response;
}, function (err) {
    return Promise.reject(err);
});
// axiosNew.defaults.baseURL=""
var axios = function (_a) {
    var _b = _a === void 0 ? {} : _a, path = _b.path, _c = _b.method, method = _c === void 0 ? "GET" : _c, _d = _b.data, data = _d === void 0 ? {} : _d;
    return new Promise(function (resolve, reject) {
        var datas = { params: __assign({}, data) };
        if (method === "POST")
            datas = __assign({ data: data });
        axiosNew(__assign({ url: "".concat(config.host).concat(path), method: method }, datas)).then(function (res) {
            resolve(res.data);
        }).catch(function (err) { resolve(-1); });
    });
};
export default axios;
//# sourceMappingURL=request.js.map