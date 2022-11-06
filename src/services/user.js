import {
    LOGIN,
    PUBLICAPI,
    LOGOUT,
    REFRESH_TOKEN,
    ROUTES
} from '@/services/api'
import { request, METHOD, removeAuthorization } from '@/utils/request'

/**
 * 登录服务
 * @param name 账户名
 * @param password 账户密码
 * @returns {Promise<AxiosResponse<T>>}
 */
// export async function login(name, password) {
//   return request(LOGIN, METHOD.POST, {
//     name: name,
//     password: password
//   })
// }
// 登录
export async function login(data) {
    console.log('data', data)
    return request(LOGIN + '/auth/oauth/token', METHOD.POST, data)
}
// 注册
export async function register(data) {
    console.log('data', data)
    return request(PUBLICAPI + '/register', METHOD.POST, data)
}
// 发送验证码
export async function mobileCode(data) {
    return request(PUBLICAPI + '/mobile-code', METHOD.POST, data)
}
// 获取用户信息
export async function userinfo(data) {
    return request(PUBLICAPI + '/v1/users/userinfo', METHOD.GET, data)
}
// 保存用户信息
export async function saveUserInfo(data) {
    return request(PUBLICAPI + '/v1/users/userinfo', METHOD.PUT, data)
}
// 字典表 - 行业
export async function industry(data) {
    return request(PUBLICAPI + '/v1/users/industry', METHOD.GET, data)
}
// 完善信息
export async function registerUserinfo(data) {
    return request(PUBLICAPI + '/v1/users/register-userinfo', METHOD.PUT, data)
}
// 修改密码
export async function updatePassword(data) {
    return request(PUBLICAPI + '/v1/users/password', METHOD.PUT, data)
}
// 修改头像
export async function headPortrait(data) {
    return request(PUBLICAPI + '/v1/users/head-portrait', METHOD.PUT, data)
}
// 刷新token
export async function refreshToken() {
    return request(REFRESH_TOKEN, METHOD.POST)
}
export async function getRoutesConfig() {
    return request(ROUTES, METHOD.GET)
}

/**
 * 退出登录
 */
export function logout() {
    // METHOD.DELETE
    request(LOGOUT, METHOD.DELETE1 ).then((res) => {
        localStorage.removeItem(process.env.VUE_APP_ROUTES_KEY)
        localStorage.removeItem(process.env.VUE_APP_PERMISSIONS_KEY)
        localStorage.removeItem(process.env.VUE_APP_ROLES_KEY)
        localStorage.removeItem('userInfor')
        removeAuthorization()
    })
}
export default {
    login,
    register,
    mobileCode,
    userinfo,
    saveUserInfo,
    industry,
    registerUserinfo,
    updatePassword,
    headPortrait,
    logout,
    getRoutesConfig
}