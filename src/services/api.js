//跨域代理前缀
// const API_PROXY_PREFIX='/api'
// const BASE_URL = process.env.NODE_ENV === 'production' ? process.env.VUE_APP_API_BASE_URL : API_PROXY_PREFIX
const BASE_URL = process.env.VUE_APP_API_BASE_URL
module.exports = {
    // LOGIN: `${BASE_URL}/login`,
    LOGIN: `${BASE_URL}`,
    PUBLICAPI: `${BASE_URL}/developer`,
    LOGOUT: `${BASE_URL}/auth/oauth/logout`,
    BEFORE_VERIFICATION_CODE: `${BASE_URL}/jeejiorockusermanageruser/usermanageruser/user/sendSpecialVerifyCode`,
    REFRESH_TOKEN: `${BASE_URL}/jeejiorockusermanageruser/usermanageruser/user/refreshToken`,
    FAST_SWITCH_APP: `${BASE_URL}/jeejiocloudopenplatformapp/openplatformapp/app/v2/fastSwitchApp`,
    ROUTES: `${BASE_URL}/routes`,
    GOODS: `${BASE_URL}/goods`,
    GOODS_COLUMNS: `${BASE_URL}/columns`,
    USERS: `${BASE_URL}/v1/users`,//用户
    ORGANIZATION: `${BASE_URL}/v1/organizations`,//组织
    COMPETITION: `${BASE_URL}/v1/competitions`,//比赛
    PERMISSIONS:`${BASE_URL}/v1/permissions`,//权限
    GET_DEVICE_MANAGE: `${BASE_URL}/v1/machine/paginatedList`,
}
