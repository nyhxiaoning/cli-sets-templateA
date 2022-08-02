// import { ElMessage } from "element-plus";
// import vrouter from "@/router";
// import { removeToken } from "@/utils/global_functions";
/**
    * 握手错误
    * @param res  响应回调,根据不同响应进行不同操作
    */
export function errorHandle(res, others = undefined) {
    console.debug("错误==>", res, others);
    if (others)
        console.debug("错误相关数据", others);
    // 状态码判断
    switch (res.code) {
        case 400:
            // ElMessage({
            //     message: res.msg,
            //     type: 'error'
            // });
            break;
        case 401:
            // removeToken();
            // ElMessage({
            //     message: res.msg,
            //     type: 'error'
            // });
            break;
        case 403:
            // ElMessage({
            //     message: res.msg,
            //     type: 'error'
            // });
            break;
        case 404:
            // ElMessage({
            //     message: '请求的资源不存在',
            //     type: 'warning'
            // });
            break;
        default:
            // ElMessage({
            //     message: res.msg,
            //     type: 'warning'
            // });
            console.error("请求报错：", res);
    }
}
