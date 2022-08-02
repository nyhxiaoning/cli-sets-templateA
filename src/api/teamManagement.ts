import https from "@/utils/https/https"

/**
 * 获取用户组
 * @param str 
 * @returns 
 */
export async function queryUserGroup(str: string): Promise<any[]> {
    return await https.get<Array<any>>("usergroup", `query?keyword=${str}`, undefined);
}

/**
 * 创建用户组
 * @param obj 
 * @returns 
 */
export async function createUserGroup(obj: object) {
    return await https.post("usergroup", 'create', undefined, obj);
}

/**
 * 删除用户组
 * @param obj 
 * @returns 
 */
export async function deleteUserGroup(obj: object) {
    return await https.post("usergroup", 'delete', undefined, obj);
}

/**
 * 编辑用户组
 * @param obj 
 * @returns 
 */
export async function updateUserGroup(obj: object) {
    return await https.post("usergroup", 'update', undefined, obj);
}

/**
 * 通过团队id获取成员信息
 * @param id 
 * @returns 
 */
export async function MembersUserGroup(id: string) {
    return await https.get("usergroup", `members?id=${id}`, undefined);
}

/**
 * 获取企业所有成员
 * @param str 
 * @returns 
 */
export async function searchEnterpriseMember(str: string) {
    return await https.get("member", `search?query=${str}`, undefined);
}

/**
 * 为团队添加成员
 * @param obj 
 * @returns 
 */
export async function addmemberUserGroup(obj: object) {
    return await https.post("usergroup", 'addmember', undefined, obj);
}

/**
 * 删除团队成员
 * @param obj 
 * @returns 
 */
export async function removememberUserGroup(obj: object) {
    return await https.post("usergroup", 'removemember', undefined, obj);
}