import { FieldEntity } from "@/entitys/IField";
import https from "@/utils/https/https"

//-------------------------全局项目属性接口---------------------------------

/**
 * 创建全局项目属性
 */
export async function createGProjectField(parms: object) {
    return await https.post("projectglobalfield", 'create', undefined, parms);
}

/**
 * 编辑全局项目属性
 * @param parms 
 * @returns 
 */
export async function updateGProjectField(parms: object) {
    return await https.post("projectglobalfield", 'update', undefined, parms);
}



/**
 * 删除全局项目属性
 * @param id 属性id
 * @returns 
 */
export async function deleteGProjectField(id: string) {
    return await https.post("projectglobalfield", 'delete', { id });
}

/**
 * 根据分组和关键字获取列表
 * @param groupName 分组名称
 * @param kw 关键字
 * @returns FieldEntity[]
 */
export async function getGFidlesByGroupAndKw(groupName: string, kw: string): Promise<Array<FieldEntity>> {
    let parms = {
        name: groupName,
        kw: kw
    }
    return await https.get<Array<FieldEntity>>("projectglobalfield", `group`, parms);
}


/**
 * 获取工作项的分组列表
 * 根据group属性进行排重，获得group的分组
 * @returns string[]
 */
export async function getGProjectFieldGroups(): Promise<Array<string>> {
    return await https.get<Array<string>>("projectglobalfield", 'grouplist', undefined);
}

/**
 * 通过关键字搜索任务属性
 * @param kw 关键字
 * @returns 
 */
export async function queryGProjectFields(kw: string): Promise<Array<FieldEntity>> {
    return await https.get<Array<FieldEntity>>("projectglobalfield", "query", { kw });
}

/**
 * 重命名属性分组(全局)
 * @param original 原名称
 * @param newName 新名称
 * @returns 
 */
export async function renameGProjectFieldGroup(original: string, newName: string) {
    return await https.post("projectglobalfield", 'renamegroup', undefined, { original, newName });
}

//-------------------------本地项目属性接口---------------------------------
/**
 * 通过关键字搜索任务属性(本地)
 * @param kw 关键字
 * @returns 
 */
export async function queryLProjectFields(kw: string): Promise<Array<FieldEntity>> {
    return await https.get<Array<FieldEntity>>("projectlocalfield", "query", { kw });
}


/**
 * 创建本地项目属性
 */
export async function createLProjectField(parms: object) {
    return await https.post("projectlocalfield", 'create', undefined, parms);
}


/**
 * 更新本地项目属性
 */
export async function updateLProjectField(parms: object) {
    return await https.post("projectlocalfield", 'update', undefined, parms);
}

/**
 * 删除本地项目属性
 * @param id 属性id
 * @returns 
 */
export async function deleteLProjectField(id: string) {
    return await https.post("projectlocalfield", 'delete', { id });
}



/**
 * 将全局的项目属性添加到本地项目的属性列表中
 * @param id 属性id数组
 * @returns 
 */
export async function referenceLProjectFields(projectId: string, fieldIds: Array<string>) {
    return await https.post("projectlocalfield", 'reference', undefined, { projectId, fieldIds });
}


/**
 * 获取项目可用的全局属性列表 已经添加过的不要再显示再该列表中(本地)
 * @param kw 关键字
 * @returns 
 */
export async function queryLAvailableFields(project_id: string, kw: string): Promise<Array<FieldEntity>> {
    return await https.get<Array<FieldEntity>>("projectlocalfield", "available", { project_id, kw });
}
