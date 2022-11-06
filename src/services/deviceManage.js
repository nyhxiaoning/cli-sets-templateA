import { PUBLICAPI } from "@/services/api";
import { request, METHOD } from "@/utils/request";

// 设备列表
export async function getDevieceManageList(data) {
    return request(PUBLICAPI + '/v1/machine/paginatedList', METHOD.GET, data);
}
// 设备详情
export async function getDevieceDetail(data) {
    return request(PUBLICAPI + '/v1/machine/detail', METHOD.GET, data);
}
// 设备详情-修改设备名称
export async function changeDevieceName(data) {
    return request(PUBLICAPI + '/v1/machine/updateMachineName', METHOD.PUT, data);
}
// 设备列表-当前登录用户已绑定设备数据
export async function getDevieceInfor(data) {
    return request(PUBLICAPI + '/v1/machine/list', METHOD.GET, data);
}
// 设备列表-当前设备在线状态
export async function getDevieceIsOnline(data) {
    return request(PUBLICAPI + '/v1/machine/isOnline', METHOD.GET, data);
}
// 设备列表-修改设备图片
export async function setDevieceUpload(data) {
    return request(PUBLICAPI + '/v1/machine/updateDeviceAvatar', METHOD.POST, data);
}