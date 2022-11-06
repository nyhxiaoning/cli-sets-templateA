import { PUBLICAPI } from "@/services/api";
import { request, METHOD } from "@/utils/request";

// 应用列表
export async function getAppList(data) {
    return request(PUBLICAPI + '/v1/apps/page', METHOD.GET, data);
}
// 删除
export async function deleteApp(data) {
    return request(PUBLICAPI + '/v1/apps', METHOD.DELETE, data);
}
// 新增应用
export async function createdApp(data) {
    return request(PUBLICAPI + '/v1/apps', METHOD.POST, data);
}
// 获取应用信息
export async function getAppInfor(data) {
    return request(PUBLICAPI + '/v1/apps', METHOD.GETID, data);
}
// 更新应用
export async function updateApp(data) {
    return request(PUBLICAPI + '/v1/apps', METHOD.PUT, data);
}
// 上传接口 
export async function uploadZip(data) {
    return request(PUBLICAPI + '/v1/apps/upload', METHOD.POST, data);
}