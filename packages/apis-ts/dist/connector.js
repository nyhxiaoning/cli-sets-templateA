import axios from "axios";
// import { ElMessage } from "element-plus";
// import { Router } from 'vue-router';
// import vrouter from "@/router";
import { getToken } from "./global_token";
// import store from "@/store";
import { errorHandle } from "./responseCode";
/** jsonBigint object  */
// const JSONbig = require('json-bigint')({ storeAsString: true });
export class Connector {
    axios;
    // private router: Router = vrouter;
    constructor() {
        this.axios = axios.create({
            // baseURL: "http://sps.3mzz.cn/dev/v1",
            // baseURL: process.env.VUE_APP_API_PATH + "/api/v1",
            baseURL: "/api/v1",
            // TODO:如果axios不配置，这里默认是什么？默认就是当前的host地址，
            // TODO:这样可以被正常的vite中代理
            // TODO:配置当前的请求动态和，不要在axios这里设置，这样代理会出现问题
            // transformResponse: [
            //     function (data) {
            //         try {
            //             // 如果转换成功则返回转换的数据结果
            //             const res = JSONbig.parse(data);
            //             return res;
            //         } catch (err) {
            //             // 如果转换失败，则包装为统一数据格式并返回
            //             console.log(err);
            //             return {
            //                 data
            //             };
            //         }
            //     }
            // ]
        });
        this.init();
    }
    getConnector() {
        return this.axios;
    }
    //初始化配置
    init() {
        this.axios.defaults.headers.post["Content-Type"] = 'application/x-www-form-urlencoded';
        //请求拦截器
        this.axios.interceptors.request.use((config) => {
            // 登录流程控制中，根据本地是否存在token判断用户的登录情况
            // 但是即使token存在，也有可能token是过期的，所以在每次的请求头中携带token
            // 后台根据携带的token判断用户的登录情况，并返回给我们对应的状态码
            // if (config.headers.isJwt) {
            //     const token = localStorage.getItem('id_token');
            //     if (token) {
            //         config.headers.Authorization = 'Bearer ' + token;
            //     }
            // }'   
            // config.headers?["Content-Type"]=""
            const token = getToken();
            // TODO:三种平台可能参数不一致，真实情况这里到时候配置一下
            if (token) {
                config.headers.user_access_token = token;
                // config.headers!.tenant_access_token = store.getters.getCompanyId;
            }
            else {
                // this.router.replace('/login')
            }
            return config;
        }, (error) => {
            console.log(error);
        });
        //响应拦截器
        this.axios.interceptors.response.use((res) => {
            //缓存token
            // if (res.headers.authorization) {
            //     localStorage.setItem('id_token', res.headers.authorization);
            // } else {
            //     if (res.data && res.data.token) {
            //         localStorage.setItem('id_token', res.data.token);
            //     }
            // }
            const { code } = res.data;
            if (code === 200) {
                return Promise.resolve(res.data);
            }
            else if (res.status === 10000) {
                // this.router.replace('/login');
                window.open("", "_blank");
            }
            else {
                // errorHandle(res.data);
                console.error("Request错误", {
                    "url": res.config.url,
                    "method": res.config.method,
                    "form-data": res.config.data,
                    "result-data": res.data
                });
                // ElMessage({
                //     message: res.data.msg,
                //     type: 'error'
                // });
                return Promise.reject(res.data);
            }
        }, (error) => {
            const { response } = error;
            if (response) {
                // 请求已发出，但是不在2xx的范围
                // TODO:报错的时候处理一下报错码
                errorHandle(response.data);
                console.debug("error", error);
                return Promise.reject(response.data);
            }
            else {
                // 处理断网的情况
                // eg:请求超时或断网时，更新state的network状态
                // network状态在app.vue中控制着一个全局的断网提示组件的显示隐藏
                // 关于断网组件中的刷新重新获取数据，会在断网组件中说明
                // ElMessage({
                //     message: '网络连接异常,请稍后再试!',
                //     type: 'warning'
                // });
            }
        });
    }
}
export default Connector;
