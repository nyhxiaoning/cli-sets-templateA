import https from "@/utils/https/https";


/** 获取任务模板分组 */
export async function getTaskTemplateGroups(): Promise<Array<any>> {
    return await https.get("tasktemplategroup", "list");
}

/** 新增任务模板分组 */
export async function createTaskTemplateGroup(name: string, taskTypeId: string): Promise<string> {
    return await https.post("tasktemplategroup", "create", undefined, { taskTypeId, name });
}

/** 重命名分组 */
export async function renameGroup(id: string, name: string): Promise<void> {
    await https.post("tasktemplategroup", "update", undefined, { id, name });
}

/** 获取工作项类型列表及任务模板分组列表 */
export async function getGroupNavigation(): Promise<any> {
    return await https.get("tasktemplategroup", "groupnavigation");
}




/** 获取任务模板集合 */
export async function getTaskTemplates(): Promise<Array<any>> {
    return await https.get("tasktemplate", "list");
}


/** 通过关键字列出符合的记录 */
export async function queryTemplates(kw: string): Promise<any> {
    return await https.get("tasktemplate", "query", { kw });
}

/** 通过分组与关键字列出符合的记录 */
export async function queryTemplatesByGroup(group_id: string, kw: string): Promise<any> {
    return await https.get("tasktemplate", "group", { kw, group_id });
}



/** 通过模板id删除任务模板 */
export async function deleteTemplateById(id: string): Promise<Array<any>> {
    return await https.post("tasktemplate", "delete", undefined, { id });
}

/**
 * 创建任务模板
 * @param groupId 分组id
 * @param taskTypeId 任务类型（工序类型）id/
 * @param name 模板名称
 * @param description 描述
 * @returns 
 */
export async function createTemplate(groupId: string, taskTypeId: string, name: string, description: string): Promise<Array<any>> {
    return await https.post("tasktemplate", "create", undefined, { groupId, taskTypeId, name, description });
}



/**
*  更新任务模板
* @param id 模板id
* @param groupId 分组id
* @param taskTypeId 任务类型（工序类型）id/
* @param name 模板名称
* @param description 描述
* @returns 
*/
export async function updateTemplate(id: string, groupId: string, taskTypeId: string, name: string, description: string): Promise<Array<any>> {
    return await https.post("tasktemplate", "update", undefined, { id, groupId, taskTypeId, name, description });
}

/**
 * 排序模板
 * @param id 需要排序的id
 * @param previousId 目标位置前一位的id
 * @param groupId 分组id
 * @returns 
 */
export async function sortTemplate(id: string, previousId: string, groupId: string): Promise<void> {
    return await https.post("tasktemplate", 'sort', undefined, { id, previousId, groupId });
    // return await https.post("tasktemplate", "create", undefined, { groupId, taskTypeId, name, description })
}


