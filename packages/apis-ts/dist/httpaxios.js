import Connector from "./connector.js";
export class HttpService {
    axios;
    constructor() {
        this.axios = new Connector().getConnector();
    }
    /**
     * post请求
     * @参数 modulename    模块
     * @参数 operation     接口
     * @参数 params  参数 使用parms传参 get方法标准
     * @参数 data   FromBody使用data传参数post方法标准
     */
    async post(modulename, operation, params, data = null) {
        const url = modulename + "/" + operation;
        return this.axios.post(url, data, { params, headers: { "Content-Type": "application/json" } }).then((result) => {
            return this.resultHandle(result);
        }, (error) => {
            console.error("请求报错", {
                "模块": modulename,
                "接口": operation,
                "params": params,
                "body": data
            });
            return Promise.reject(error);
        });
    }
    /**
     * get请求
     * @参数 modulename    模块
     * @参数 operation     接口
     * @参数 params  参数
     */
    async get(modulename, operation, params, data) {
        let url = modulename;
        if (operation)
            url = modulename + "/" + operation;
        const config = {
            params: params
        };
        if (data) {
            config.data = JSON.stringify(data);
            config.headers = {
                "Content-Type": "application/json"
            };
        }
        return this.axios.get(url, config).then((result) => {
            return Promise.resolve(result.data);
            // return this.resultHandle<T>(result);
        }, (error) => {
            return Promise.reject(error);
        });
    }
    /**
     * 上传文件
     * @参数 modulename    模块
     * @参数 operation     接口
     * @参数 formdata FormData对象
     */
    async uploadfile(modulename, operation, formdata) {
        let url = modulename;
        if (operation)
            url = modulename + "/" + operation;
        return this.axios
            .post(url, formdata, {
            headers: { "Content-Type": "multipart/form-data" }
        })
            .then((result) => {
            return this.resultHandle(result);
        }, (error) => {
            return Promise.reject(error);
        });
    }
    /**
     *
     * @参数 res
     * @参数 resolve
     */
    resultHandle(res) {
        if (res.code === 200) {
            return Promise.resolve(res.data);
        }
        else {
            return Promise.reject(res.msg);
        }
    }
}
const serveic = new HttpService();
export default serveic;
