import https from "@/utils/https/https"

// 获取系统提供的项目模板
export async function Query(str:string) {
    return await https.get("sprint", `query?keyword=${str}`, undefined);
}
// 获取该项目的团队成员
export async function TeamMember(str:string) {
    return await https.get("project", `teammember?id=${str}`, undefined);
}
// 创建迭代
export async function Create(str:object) {
    return await https.post("sprint",'create', undefined,str);
}
// 删除迭代
export async function Delete(str:string) {
    return await https.post("sprint",`delete?id=${str}`, undefined);
}
// 修改迭代
export async function Update(str:object) {
    return await https.post("sprint",'update', undefined, str);
}

// 开始迭代任务
export async function Start(str:string) {
    return await https.post("sprint",`start?id=${str}`, undefined);
}

// 结束迭代任务
export async function End(str:string) {
    return await https.post("sprint",`end?id=${str}`, undefined);
}