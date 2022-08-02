import https from "@/utils/https/https"
import StorageKeys from "@/utils/storagekeys"

// 获取用户所在企业列表
export async function UserCompanys():Promise<any[]> {
    let data= await https.get("company", "usercompanys");
    return data as any[]
  }

// 创建企业
export async function Register(data: any) {
  const result = await https.post("company", "register", undefined, data);
  sessionStorage.removeItem(StorageKeys.usercompanys)//清除缓存
  return result
}

// 加入企业
export async function JoinCompany(data: any) {
  return await https.post("company", "joincompany", undefined, data);
}

// 预解散企业
export async function PreCancellation() {
 return await https.post("company", "precancellation", undefined);
}

// 确认解散企业
export async function Cancellation(data:object) {
  return await https.post("company", "cancellation", undefined, data);
}

//获取企业管理员的联系电话
export async function GetCompanyContact():Promise<any> {
  return await https.get<any>("company", "getcompanycontact", undefined,);
}

//获取企业信息
export async function Get() {
  return await https.get("company", undefined,);
}

//修改企业数据
export async function Update(data:object) {
  return await https.post("company", "update", undefined, data);
}