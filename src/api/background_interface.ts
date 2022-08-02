import https from "@/utils/https/https";

//部门视图 搜索部门并返回列表

export async function search(data: string) {
  return await https.get("department", `search?query=${data}`, undefined);
}

//部门视图 创建部门
export async function Create(data: object) {
  return await https.post("department", "create", undefined, data);
}

//部门视图 编辑部门
export async function Update(data: object) {
  return await https.post("department", "update", undefined, data);
}

//部门视图 删除部门
export async function Delete(data:object) {
  return await https.post("department", "delete", undefined, data);
}

// ---------------------------------------------------------------------------

//成员视图 基于部门ID获取，获取部门直属用户列表
export async function find_by_department(data:any) {
  return await https.get("department", `find_by_department?department_id=${data}`, undefined,);
}

//成员视图 添加成员
export async function AddMember(data:any) {
  return await https.post("company", "addmember", undefined, data);
}

//成员视图 搜索企业成员
export async function Searchs(data:any) {
  return await https.get("member", `search?query=${data}`, undefined,);
}

//成员视图 修改成员信息
export async function update(data:any) {
  return await https.post("member","update", undefined, data);
}

//成员视图 删除成员
export async function deletes(data:object) {
  return await https.post("member","delete", undefined, data);
}

//更新成员信息
export async function SetProfile(data:object) {
  return await https.post("member","setprofile", undefined, data);
}