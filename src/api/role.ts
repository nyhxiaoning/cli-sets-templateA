import { PermissionEntity } from "@/entitys/IPermission";
import https from "@/utils/https/https"
// 角色api

/**
 * 通过关键字索引角色列表
 * - Global 
 * @param kw 关键字
 * @returns 
 */
export async function projectGlobalRoleQuery(kw: string): Promise<RoleEntity[]> {
    return await https.get<RoleEntity[]>("projectglobalrole", "query", { kw });
}


/**
 * 查找角色
 * - Global 
 * @param id 角色id
 * @returns 
 */
export async function browseProjectGlobalRole(id: string): Promise<RoleEntity> {
    return await https.get<RoleEntity>("projectglobalrole", "browse", { id });
}



/**
 * 创建项目角色
 *  - Global 
 * @param name 角色名称
 * @param permissions 权限列表
 * @returns 
 */
export async function createProjectGlobalRole(name: string, permissions: string[] = []): Promise<any> {
    return await https.post("projectglobalrole", "create", undefined, { name, permissions });
}

/**
 * 重命名角色
 * @param id 角色id
 * @param name 新名称
 */
export async function renameRole(id: string, name: string) {
    return await https.post("projectglobalrole", "update", undefined, { id, name });
}

/**
 * 删除项目角色
 *  - Global 
 * @param id 角色id
 * @returns 
 */
export async function deleteProjectGlobalRole(id: string): Promise<any> {
    return await https.post("projectglobalrole", "delete", undefined, { id });
}

/**
 * 修改项目角色
 *  - Global 
 * @param role 角色
 * @returns 
 */
export async function updateProjectGlobalRole(role: RoleEntity): Promise<any> {
    return await https.post("projectglobalrole", "update", undefined, role);
}



/**
 * 列出项目所有可用权限
 * - Global 
 * @param kw 关键字
 * @returns 
 */
export async function permissionList(): Promise<PermissionEntity[]> {
    return await https.get("projectglobalrole", "permissionlist");
}


/**
 * 批量启用权限
 *  - Global 
 * @param permissions 权限
 * @returns 
 */
export async function enablePermission(id: string, permissions: string[]): Promise<any> {
    return await https.post("projectglobalrole", "enablepermission", undefined, { id, permissions });
}


/**
 * 批量关闭权限
 *  - Global 
 * @param permissions 权限
 * @returns 
 */
export async function closePermission(id: string, permissions: string[]): Promise<any> {
    return await https.post("projectglobalrole", "closepermission", undefined, { id, permissions });
}




//项目角色 -----------------------------------------------------------------


/**
 * 通过关键字索引角色列表
 * - Local 
 * @param kw 关键字
 * @returns 
 */
export async function projectRoleQuery(kw: string): Promise<RoleEntity[]> {
    return await https.get<RoleEntity[]>("projectrole", "query", { kw });
}

/**
 * 获取角色绑定的成员
 * - Local 
 * @param id 角色id
 * @returns 
 */
export async function projectRoleMembers(id: string): Promise<RoleEntity[]> {
    return await https.get<RoleEntity[]>("projectrole", "members", { id });
}


/**
 * 创建项目角色
 *  - Local 
 * @param name 角色名称
 * @param permissions 权限列表
 * @returns 
 */
export async function createProjectRole(projectId: string, name: string, permissions: string[] = []): Promise<any> {
    return await https.post("projectrole", "create", undefined, { projectId, name, permissions });
}


/**
 * 删除项目角色
 *  - Local 
 * @param id 角色id
 * @returns 
 */
export async function deleteProjectRole(id: string): Promise<any> {
    return await https.post("projectrole", "delete", { id });
}


/**
 * 重命名角色
 * - Local 
 * @param id 角色id
 * @param name 新名称
 */
export async function renameProjectRole(id: string, name: string) {
    return await https.post("projectrole", "update", undefined, { id, name });
}


/**
 * 获取可用的项目角色
 * - Local 
 * @returns 
 */
export async function getAvailableProjectRole(): Promise<RoleEntity[]> {
    return await https.get<RoleEntity[]>("projectrole", "availableprojectroles");
}

/**
 * 批量添加成员
 * - Local 
 * @param id 角色id
 * @param members 成员id数组
 */
export async function addProjectMembers(id: string, members: string[]) {
    return await https.post("projectrole", "addmember", undefined, { id, members });
}


/**
 * 角色实体
 */
export class RoleEntity {
    constructor() {
        this.tenantId = ""
        this.id = ""
        this.name = ""
        this.permissions = []
    }

    /** 租户id */
    tenantId: string

    /** 角色id */
    id: string

    /** 角色名称 */
    name: string

    /** 权限数组 */
    permissions: Array<string>

    /** 是否系统属性 */
    systef: boolean | undefined
}