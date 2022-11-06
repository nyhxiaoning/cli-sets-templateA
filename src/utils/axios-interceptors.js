import Cookie from 'js-cookie'
// 401拦截
const resp401 = {
    /**
     * 响应数据之前做点什么
     * @param response 响应对象
     * @param options 应用配置 包含: {router, i18n, store, message}
     * @returns {*}
     */
    onFulfilled(response, options) {
        const { message } = options
        console.log('4001', response)
        if (response.code === 401) {
            message.error('无此权限')
        }
        return response
    },
    /**
     * 响应出错时执行
     * @param error 错误对象
     * @param options 应用配置 包含: {router, i18n, store, message}
     * @returns {Promise<never>}
     */
    onRejected(error, options) {
        const { message } = options
        const { response } = error
        if (response.status === 401) {
            message.error('无此权限')
        }
        return Promise.reject(error)
    }
}

const resp403 = {
    onFulfilled(response, options) {
        const { message } = options
        if (response.code === 403) {
            message.error('请求被拒绝')
        }
        return response
    },
    onRejected(error, options) {
        const { message } = options
        const { response } = error
        if (response.status === 403) {
            message.error('请求被拒绝')
        }
        return Promise.reject(error)
    }
}
const noLogin = {
    /**
     * 响应数据之前做点什么
     * @param response 响应对象
     * @param options 应用配置 包含: {router, i18n, store, message}
     * @returns {*}
     */
    onFulfilled(response, options) {
        const { router, message } = options
        const code_array = ['not_login']
        if (code_array.includes(response.data.errorCode) ) {
            localStorage.removeItem('userInfor')
            router.push({path: '/login'})
            return message.error('账号已经在其他地方登录')
        }
        return response
    },
    /**
     * 响应出错时执行
     * @param error 错误对象
     * @param options 应用配置 包含: {router, i18n, store, message}
     * @returns {Promise<never>}
     */
    onRejected(error, options) {
        const { router, message } = options
        const { response } = error
        console.log('response', response)
        if (response.data.statusCode === 500 && response.data.errorCode === "not_login") {
          localStorage.removeItem('userInfor')
          message.error('账号已经在其他地方登录')
          return router.push({path: '/login'})
        }
        if (response.status == 401) {
          message.error('无此权限')
        }
        return Promise.reject(error)
    }
}
const reqCommon = {
    /**
     * 发送请求之前做些什么
     * @param config axios config
     * @param options 应用配置 包含: {router, i18n, store, message}
     * @returns {*}
     */
    onFulfilled(config, options) {
        let userInfor = JSON.parse(localStorage.getItem('userInfor'));
        if (userInfor) {
            // console.log(userInfor.owner, userInfor.id, userInfor.token, 'userInfor.tokenuserInfor.tokenuserInfor.token')
            // config.headers.owner = userInfor.owner ? userInfor.owner : 0;
            // config.headers.userId = userInfor.id ? userInfor.id : 0;
            config.headers.Authorization = 'Bearer ' + userInfor.accessToken ? 'Bearer ' + userInfor.accessToken : '';
        } else {
            // if (process.env.NODE_ENV === 'development') {
                config.headers.Authorization = 'Basic ZGV2ZWxvcGVyOjEyMzQ1Ng==';
                // config.headers.userid = '4001234123412346492'
            // } 
            // else if (process.env.NODE_ENV === 'rc') {
            // } else if (process.env.NODE_ENV === 'qa') {
            // } else if (process.env.NODE_ENV === 'prod') {
            // }
        }
        const { message } = options
        const { url, xsrfCookieName } = config
        if (url.indexOf('login') === -1 && xsrfCookieName && !Cookie.get(xsrfCookieName)) {
            message.warning('认证 token 已过期，请重新登录')
        }
        return config
    },
    /**
     * 请求出错时做点什么
     * @param error 错误对象
     * @param options 应用配置 包含: {router, i18n, store, message}
     * @returns {Promise<never>}
     */
    onRejected(error, options) {
        const { message } = options
        message.error(error.message)
        return Promise.reject(error)
    }
}

export default {
    request: [reqCommon], // 请求拦截
    response: [noLogin] // 响应拦截
}