import https from "@/utils/https/https";
import { initCompanyId, setToken } from '@/utils/global_functions';
import StorageKeys from "@/utils/storagekeys";
import signal from "@/utils/signair/signalR";
import store from "@/store";

// 预注册接口
export async function in_logon(data: any) {
  return await https.post("user", "preregister", undefined, data);
}

// 验证注册码接口
export async function sendSms(data: any) {
  return await https.post("user", "verificationregister", undefined, data);
}

// 注册接口
export async function logon(data: any) {
  const result = await https.post("user", "register", undefined, data);
  setToken(result.toString());
}

// 预登录接口
export async function in_login(data: any) {
  return await https.post("user", "prelogin", undefined, data);
}

// 登录接口
export async function login(data: any) {
  const result = await https.post("user", "login", undefined, data);
  setToken(result.toString());
  signal.signal.start();
  sessionStorage.removeItem(StorageKeys.usercompanys);//清除缓存
}

// -----------------
// -----------------

// 预注册
export async function PreRegister(data: object) {
  return await https.post("user", "preregister", undefined, data);
}
// 注册
export async function Register(data: object) {
  const result = await https.post("user", "register", undefined, data);
  setToken(result.toString());
}
// 免密预登录
export async function PreLogin(data: object) {
  return await https.post("user", "prelogin", undefined, data);
}

// 免密登录
export async function Login(data: object) {
  const result = await https.post("user", "login", undefined, data);
  setToken(result.toString());
  await initCompanyId();
  await signal.start();
  sessionStorage.removeItem(StorageKeys.usercompanys);//清除缓存
  store.dispatch("user/pullCurrentUser");
}


/**
 * 密码登录
 * @param data object
 */
export async function passwordLogin(data: object) {
  try {
    const result = await https.post("user", "passwordlogin", undefined, data);
    setToken(result.toString());
    await initCompanyId();
    await signal.start();
    sessionStorage.removeItem(StorageKeys.usercompanys);//清除缓存
    store.dispatch("user/pullCurrentUser");
  } catch (error: any) {
    throw error.msg ? error.msg : error;
  }
}


// 预重置
export async function pre_reset_password(data: object) {
  return await https.post("user", "pre_reset_password", undefined, data);
}
// 获取重置代码
export async function reset_password_code(data: object) {
  return await https.post("user", "reset_password_code", undefined, data);
}
// 重置密码
export async function reset_password(data: object) {
  return await https.post("user", "reset_password", undefined, data);
}

// 更新用户信息
export async function SetUserInfo(data: object) {
  return await https.post("user", "setuserinfo", undefined, data);
}

