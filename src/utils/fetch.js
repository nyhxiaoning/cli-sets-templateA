// 将axios接口统一封装起来，调用好用又简洁
import axios from "axios";
// TODO:新增一个自动携带token的机制
import { getTokenAuth } from "./auth";

// TODO:增加loading效果实现。
import { Message } from 'ant-design-vue';
/**
 * @description 创建axios实例
 * @param baseURL 基础url，会在请求url中自动添加前置链接
 * @param timeout 请求超时时间
 */
const service = axios.create({
    // eslint-disable-next-line no-undef
    baseURL: process.env.VUE_APP_BASE_API,
    timeout: 1000 * 8
});

// axios.js
const pendingMap = new Map();
// todo:利用map数据结构，只能有一个唯一值，同时因为map数据结构has方法
// TODO:理解，第一次肯定在里面，第一次接口的触发永远不会取消，第二次再次触发，Map中只有一个有效id和对应取消方法，
// 此时取消方法执行完成，那么只剩下第二次请求发出去，第一次的取消了，如果点击第三次，继续和上面一样循环。

/**
 * 生成每个请求唯一的键（通过当期的url,method,params,data四个参数）
 * @param {*} config 
 * @returns string
 */
function getPendingKey (config) {
    let { url, method, params, data } = config;
    if (typeof data === 'string') data = JSON.parse(data); // response里面返回的config.data是个字符串对象
    return [url, method, JSON.stringify(params), JSON.stringify(data)].join('&');
}

/**
 * 储存每个请求唯一值, 也就是cancel()方法, 用于取消请求。如果当期的请求唯一值，已经存在了，那么给这个请求设置一个取消的方法
 * @param {*} config 
 */
function addPending (config) {
    const pendingKey = getPendingKey(config);
    config.cancelToken = config.cancelToken || new axios.CancelToken((cancel) => {
        if (!pendingMap.has(pendingKey)) {
            pendingMap.set(pendingKey, cancel);
            console.log('pendingMapaddPending', 'addPending', pendingMap);
        }
    });
}

/**
 * 删除重复的请求
 * @param {*} config 
 */
function removePending (config) {
    const pendingKey = getPendingKey(config);
    // TOdo:如果存在这个请求，找到这个请求对应的取消方法，然后出发这个请求方法，同时将这个唯一的取消方法对应的键值删除
    if (pendingMap.has(pendingKey)) {
        const cancelToken = pendingMap.get(pendingKey);

        cancelToken(pendingKey);//执行取消的方法同时下面，进行删除这个主键值id，删除了这一组请求。
        pendingMap.delete(pendingKey);
    }
}



/**
 * @description 请求拦截器
 * 用于处理请求前添加loading、判断是否已保存token，并在每次请求头部添加token
 */
service.interceptors.request.use(
    (config) => {
        // TODO:增加loadding的优化，如果不要loading可以取消false,默认是true
        // TODO:增加请求携带cancelToken的请求，默认是true,如果不想要可以取消这个请求，传参
        if (!config.cancelTokenFlag) {
            config.cancelTokenFlag = true;
        }
        Message.info("加载中...", 1);
        debugger;
        // TODO：判断这次的请求是否有了token，如果有了自动携带token
        // typeof window 为了兼容ssr后台渲染
        if (getTokenAuth() && typeof window !== 'undefined') {
            config.headers.Authorization = getTokenAuth();
        }
        // 对axios参数进行一些操作
        config.cancelTokenFlag && removePending(config);
        addPending(config);
        return config;
    },
    error => {
        // Do something with request error
        console.log(error);
        // for debug
        Promise.reject(error);
    }
);

/**
 * @description 响应拦截器
 * 用于处理loading状态关闭、请求成功回调、响应错误处理
 */
service.interceptors.response.use(
    response => {
        const data = response.data;
        // 全局处理返回码
        if (data.code === 3001) {
            // location.href = 'http://boss.huixiaoer.com'
        }
        removePending(response.config);
        return data;
    },
    error => {
        if (error.response) {
            error.config && removePending(error.config);
            return Promise.reject(error);
            // switch (error.response.status) {
            //   case 401:
            //     console.log("401");
            //     // 登录拦截
            //     break;
            //   case 404:
            //     // Toast('请求资源不存在')
            //     break;
            //   default:
            //     break;
            //   // Toast(error.response.data.message)
            // }
        } else {
            // 请求超时活网络有问题
            if (error.message.includes("timeout")) {
                // Toast('请求超时！请检查网络是否正常')
            } else {
                // Toast('请求失败，请检查网络是否已连接')
            }
        }
        return Promise.reject(error);
    }
);

export default service;