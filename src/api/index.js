// 配置当前的axios的统一接口报错处理
// 导出这个文件中的request方法TODO:!
// ???????????
import request from "@/utils/fetch";
import qs from "qs";

/**
 * get接口统一管理位置
 * @param {*} params 
 * @returns 
 */
export function example (params) {
    return request({
        url: `admin/group/example`,
        method: "GET",
        params
    });
}
/**
 * 
 * 
 * post的接口的模拟
 * @param {*} data 
 * @param {*} onProgress 
 * @param {*} uid 
 * @returns 
 */
export function upload (data, onProgress, uid) {
    let url = "/api/hotel-end/backend-data-pro/media/upload-file";
    return request({
        url,
        method: "POST",
        data,
        headers: {
            "Content-Type": "application/json"
        },
        onUploadProgress (event) {
            onProgress(event, uid);
        }
    });
}

/**
 * get第一步，获取当前的用户登录权限
 * @param {*} params //TODO：!!!这里使用错误，post使用data参数。get使用params
 * @returns 
 */
export function loginFirst (params) {
    return request({
        url: `mcpc/login`,
        method: "POST",
        params
    });
}
// TODO：增加一个mock测试

/**
 * get第一步，获取当前的用户登录权限TODO:注意这里是错误的
 * @param {*} params 
 * @returns 
 */
export function loginFirstMock (params) {
    return request({
        url: `api/ratings/list`,
        method: "POST",
        params
    });
}
/**
 * 通过POST,获取用户信息
 * @returns 
 */
export function getUserInfo () {
    return request({
        url: `mcpc/getUserInfo`,
        method: "POST",
    });
}


// 优化修改axios传参问题
/**
 * 通过POST,获取患者列表模块
 * @param {*} params
 * @returns
 */
export function getPatViews (params) {
    return request({
        url: `mcpc/patinfo/getPatViews`,
        method: 'post',
        headers: {
            "Content-Type": "application/json"
        },
        data: params
    });
}

/**
 * 通过POST,获取时间轴页--时间轴信息
 * @param {*} params
 * @returns
 */
export function queryTimeAxisDataByPk (params, url) {
    return request({
        url: url,
        method: 'post',
        headers: {
            "Content-Type": "application/json"
        },
        data: params
    });
}
/**
 * 通过POST,获取急救页签下获取急救信息
 * @param {*} params
 * @returns
 */
export function getEmergency (params) {
    return request({
        url: `mcpc/emergency/getEmergency`,
        method: 'post',
        headers: {
            "Content-Type": "application/json"
        },
        data: params
    });
}
/**
 * 通过POST,获取急救页签下获取急救信息2
 * @param {*} params
 * @returns
 */
export function getDefdocViewByCodes (params) {
    return request({
        url: `mcpc/defdoc/getDefdocViewByCodes`,
        method: 'post',
        headers: {
            "Content-Type": "application/json"
        },
        data: params
    });
}
/**
 * 通过POST,急救保存
 * @param {*} params
 * @returns
 */
export function saveEmergency (params) {
    return request({
        url: `mcpc/emergency/saveEmergency`,
        method: 'post',
        headers: {
            "Content-Type": "application/json"
        },
        data: params
    });
}
/**
 * 通过POST,获取诊疗页签下获取诊疗信息
 * @param {*} params
 * @returns
 */
export function queryTreatmentViewByPatId (params) {
    return request({
        url: `mcpc/treatment/queryTreatmentViewByPatId`,
        method: 'post',
        headers: {
            "Content-Type": "application/json"
        },
        data: params
    });
}



// 优化修改axios传参问题
/**
 * 通过POST，获取患者转归页签下获取患者转归信息
 * @param {*} params
 * @returns
 */
export function getOutcome (params) {
    return request({
        url: `mcpc/outcome/getOutcome`,
        method: 'post',
        headers: {
            "Content-Type": "application/json"
        },
        data: params
    });
}

/**
 * 通过POST，检查信息(胸痛诊疗、导管室)页签下保存按钮
 * @param {*} params
 * @returns
 */
export function saveTreatmentView (params) {
    return request({
        url: `mcpc/treatment/saveTreatmentView`,
        method: 'post',
        headers: {
            "Content-Type": "application/json"
        },
        data: params
    });
}

/**
 * 通过POST，新建页面(手环编号)的下拉框展示选项
 * @param {*} params
 * @returns
 */
export function queryAllDefdoc (params) {
    return request({
        url: `mcpc/defdoc/queryAllDefdoc`,
        method: 'post',
        headers: {
            "Content-Type": "application/json"
        },
        data: params
    });
}



