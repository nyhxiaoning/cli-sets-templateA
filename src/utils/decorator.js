// 邮箱验证
export function emailCheck(rule, value, callbackFn) {
  const reg = /^[0-9A-Za-z-~!@#$%^&*()_\-+=<>?:"{}|,./;.~`!@#$%^&*()\\_+-={}[\]|\/"':;?>.<,·@#￥%……&*（）！ ’￥……（）（）_ ————【】、”“‘：；？、》。《，']{2,30}$/g
  // const regx = /^[\u4e00-\u9fa5],{0,}$/i
  if (!value || value == 'undefined') {
    callbackFn('请输入用户名')
    return
  } else if (!reg.test(value)) {
    callbackFn('请输入正确的用户名')
    return
  }
  callbackFn()
}
export function emailCheck1(rule, value, callbackFn) {
  const reg = /^[0-9A-Za-z-~!@#$%^&*()_\-+=<>?:"{}|,./;.~`!@#$%^&*()\\_+-={}[\]|\/"':;?>.<,·@#￥%……&*（）！ ’￥……（）（）_ ————【】、”“‘：；？、》。《，']{2,30}$/g
  // const regx = /^[\u4e00-\u9fa5],{0,}$/i
  if (!value || value == 'undefined') {
    callbackFn('请输入邮箱')
    return
  } else if (!reg.test(value)) {
    callbackFn('请输入正确的邮箱')
    return
  }
  callbackFn()
}
// 密码验证
export function passwordCheck(rule, value, callbackFn) {
  const reg = /^[A-Za-z0-9]{6,30}$/g
  if (!value || value == 'undefined') {
    callbackFn('请输入密码')
    return
  } else if (!reg.test(value)) {
    callbackFn('6-30个字符，支持英文区分大小写、数字、符号')
    return
  }
  callbackFn()
}
export function userPhoneCheck(rule, value, callbackFn) {
  const reg = /^[1][0-9]{10}$/g
  if (!value || value == 'undefined') {
    callbackFn('请输入手机号')
    return
  } else if (!reg.test(value)) {
    callbackFn('手机号码格式不正确，请重新输入')
    return
  }
  callbackFn()
}
export function obtainCodeCheck(rule, value, callbackFn) {
  if (!value || value == 'undefined') {
    callbackFn('请输入验证码')
    return
  }
  callbackFn()
}
// 登录密码验证
export function loginPasswordCheck(rule, value, callbackFn) {
  const reg = /^[0-9A-Za-z-~!@#$%^&*()_\-+=<>?:"{}|,./;.~`!@#$%^&*()\\_+-={}[\]|\/"':;?>.<,·@#￥%……&*（）！ ’￥……（）（）_ ————【】、”“‘：；？、》。《，']{5,30}$/g
  if (!value || value == 'undefined') {
    callbackFn('请输入密码')
    return
  } else if (!reg.test(value)) {
    callbackFn('密码格式不对')
    return
  }
  callbackFn()
}
// 姓名验证
export function nameCheck(rule, value, callbackFn) {
  const reg = /^[a-zA-Z\u4e00-\u9fa5]{1,10}$/g
  if(!value || value == 'undefined') {
    callbackFn('请输入姓名')
    return
  } else if(!reg.test(value)){
    callbackFn('10个字符，支持中、文字母')
    return
  }
  callbackFn()
}
// 公司、学校验证
export function organizationCheck(rule, value, callbackFn) {
  const reg = /^[a-zA-Z\u4e00-\u9fa5]{5,25}$/g
  if(!reg.test(value)){
    callbackFn('5-25个字符，支持字母或汉字')
    return
  }
  callbackFn()
}
// 联系方式验证
export function phoneNumberCheck(rule, value, callbackFn) {
  // const reg = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
  const reg = /^1(3|4|5|7|8)\d{9}$/
  if(!value || value == 'undefined') {
    callbackFn('请输入联系方式')
    return
  } else if(!reg.test(value)){
    callbackFn('支持数字、不超过11位、第一位必须是“1”')
    return
  }
  callbackFn()
}