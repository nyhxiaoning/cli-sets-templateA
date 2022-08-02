import Connector from "./connector";
import { AxiosInstance, AxiosRequestConfig } from "axios";

// interface SomeInterface {
//     (modulename: string, operation: string, params: object, data?: any): Promise<object>;
// }

export interface IHttpService {
  axios: AxiosInstance;
  post: {
    (
      modulename: string,
      operation: string,
      params: object,
      data?: any
    ): Promise<object>;
  };
  get: {
    (modulename: string, operation: string, params: object): Promise<object>;
  };
}
export class HttpService implements IHttpService {
  public axios!: AxiosInstance;

  constructor() {
    this.axios = new Connector().getConnector();
  }

  /**
   * post请求
   * @参数 modulename    模块
   * @参数 operation     接口
   * @参数 params  参数
   * @参数 data   FromBody
   */
  public async post(
    modulename: string,
    operation: string,
    params?: object,
    data: any = null
  ): Promise<any> {
    const url = modulename + "/" + operation;
    return this.axios.post(url, data, { params, headers: { "Content-Type": "application/json" } }).then(
      (result) => {
        return this.resultHandle(result);
      },
      (error) => {
        console.error("请求报错", {
          "模块": modulename,
          "接口": operation,
          "params": params,
          "body": data
        });
        return Promise.reject(error);
      }
    );
  }

  /**
   * get请求
   * @参数 modulename    模块
   * @参数 operation     接口
   * @参数 params  参数
   */
  public async get<T = any>(
    modulename: string,
    operation?: string,
    params?: object,
    data?: any
  ): Promise<T> {
    let url = modulename;
    if (operation) url = modulename + "/" + operation;
    const config: AxiosRequestConfig = {
      params: params
    };
    if (data) {
      config.data = JSON.stringify(data);
      config.headers = {
        "Content-Type": "application/json"
      };
    }
    return this.axios.get(url, config).then(
      (result:any) => {
        return Promise.resolve(result.data as T);
        // return this.resultHandle<T>(result);
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }

  /**
   * 上传文件
   * @参数 modulename    模块
   * @参数 operation     接口
   * @参数 formdata FormData对象
   */
  public async uploadfile(
    modulename: string,
    operation: string,
    formdata: FormData
  ): Promise<any> {
    let url = modulename;
    if (operation) url = modulename + "/" + operation;
    return this.axios
      .post(url, formdata, {
        headers: { "Content-Type": "multipart/form-data" }
      })
      .then(
        (result) => {
          return this.resultHandle(result);
        },
        (error) => {
          return Promise.reject(error);
        }
      );
  }

  /**
   *
   * @参数 res
   * @参数 resolve
   */
  public resultHandle<T>(res: any): T | any {
    if (res.code === 200) {
      return Promise.resolve(res.data as T);
    } else {
      return Promise.reject(res.msg);
    }
  }
}

const serveic = new HttpService();

export default serveic;
