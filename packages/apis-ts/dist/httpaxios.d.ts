import { AxiosInstance } from "axios";
export interface IHttpService {
    axios: AxiosInstance;
    post: {
        (modulename: string, operation: string, params: object, data?: any): Promise<object>;
    };
    get: {
        (modulename: string, operation: string, params: object): Promise<object>;
    };
}
export declare class HttpService implements IHttpService {
    axios: AxiosInstance;
    constructor();
    /**
     * post请求
     * @参数 modulename    模块
     * @参数 operation     接口
     * @参数 params  参数 使用parms传参 get方法标准
     * @参数 data   FromBody使用data传参数post方法标准
     */
    post(modulename: string, operation: string, params?: object, data?: any): Promise<any>;
    /**
     * get请求
     * @参数 modulename    模块
     * @参数 operation     接口
     * @参数 params  参数
     */
    get<T = any>(modulename: string, operation?: string, params?: object, data?: any): Promise<T>;
    /**
     * 上传文件
     * @参数 modulename    模块
     * @参数 operation     接口
     * @参数 formdata FormData对象
     */
    uploadfile(modulename: string, operation: string, formdata: FormData): Promise<any>;
    /**
     *
     * @参数 res
     * @参数 resolve
     */
    resultHandle<T>(res: any): T | any;
}
declare const serveic: HttpService;
export default serveic;
//# sourceMappingURL=httpaxios.d.ts.map