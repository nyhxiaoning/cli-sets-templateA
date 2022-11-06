const BASE_URL = process.env.VUE_APP_API_BASE_URL
import { request, METHOD } from '@/utils/request'

// 调试-设备下拉
export async function debuggerSelect(id) {
  // return request(`${BASE_URL}/v1/apps/debug`, METHOD.GETID, id);
  return request(`${BASE_URL}/developer/v1/apps/debug`, METHOD.GETID, id);
}
// 调试结果上报
export async function result(data) {
  // return request(`${BASE_URL}/v1/apps/debug`, METHOD.GETID, id);
  return request(`${BASE_URL}/developer/v1/debugging/result`, METHOD.POST, data);
}
// 命令下发执行
export async function execute(data) {
  // return request(`${BASE_URL}/v1/apps/debug`, METHOD.GETID, id);
  return request(`${BASE_URL}/developer/v1/debugging/command/execute`, METHOD.POST, data);
}


export default {
  debuggerSelect,
  result,
  execute
}
