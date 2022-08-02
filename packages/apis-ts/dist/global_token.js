// import { UserCompanys } from "@/api/departments";
// import { CompanyEntity } from "@/entitys/ICompany";
// import store from "@/store";
/**
 * 获取缓存token
 */
export function getToken() {
    const token = localStorage.getItem('token');
    return token;
}
/**
 * 移除缓存token
 */
export function removeToken() {
    localStorage.removeItem('token');
}
/**
 * 设置缓存token
 */
export function setToken(token) {
    //缓存token
    if (token) {
        localStorage.setItem('token', token);
    }
}
/**
 * 是否有token
 */
export function hasToken() {
    let token = localStorage.getItem("token");
    if (token && token !== null && token !== undefined && token !== "")
        return true;
    else
        return false;
}
// export async function initCompanyId() {
//     // 登录成功调用企业列表接口 获取唯一标识
//     let conpanyId = localStorage.getItem("companyId");
//     let token = getToken();
//     if (token !== "" && token !== undefined && token !== null) {
//         let value = await UserCompanys();
//         let companys = value as CompanyEntity[]
//         if (conpanyId) {
//             let index = companys.findIndex((x) => x.tenantId === conpanyId);
//             if (index !== -1) {
//                 store.commit("changeCompanyId", conpanyId);
//             } else {
//                 store.commit("changeCompanyId", companys.first().tenantId);
//             }
//         }
//         else {
//             store.commit("changeCompanyId", companys.first().tenantId);
//         }
//     }
// }
