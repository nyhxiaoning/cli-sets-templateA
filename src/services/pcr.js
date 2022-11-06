const BASE_URL = process.env.VUE_APP_API_BASE_URL
import { request, METHOD } from '@/utils/request'

// 概览-一分钟竞速赛排名
export async function detail(id) {
  return request(`${BASE_URL}/pcr/v1/records`, METHOD.GETID, id);
}
// 概览-性别分布
export async function list(data) {
  return request(`${BASE_URL}/pcr/v1/records/page`, METHOD.GET, data);
}

export default {
  detail,
  list
}
