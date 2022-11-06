import { execute } from '../../../services/debugger'
export const deviceCommand =  function(params) {
  return new Promise((resolve, reject) => {
      let query = {}
      query.appId = window.location.href.split('?')[1].split('=')[1]
      query.ownerid = JSON.parse(localStorage.getItem('userInfor')).userId
      query.deviceId = params.deviceId
      query.command = [{
        event: params.event,
        desc: params.desc
      }]
      execute(query).then(res => {
        if (res.data.statusCode == 200) {
          resolve({
            success: true,
            result: res.data
          })
        } else {
          switch (res.data.statusCode) {
              case 401:
              case 404:
                msg = '设备已离线'
                break;
              case 504:
                msg = '操作超时'
                break;
              case 500:
                msg = '网络异常，请稍后重试'
                break;
              default:
                msg = errMsg
                break;
            }
            reject({
              message: msg || 'error',
              result: res.data
            })
        }
      }).catch((error) => {
        console.log('command catch', error)
        reject(error)
      })
  })
}