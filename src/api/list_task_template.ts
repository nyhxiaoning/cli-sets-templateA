import https from '@/utils/https/https';

/**
 * 列出菜单工作项绑定的任务模板分组
 * @param id list id
 * @param kw 关键字
 */
export async function getListTaskTempGroup(
  id: string,
  kw: string
): Promise<any[]> {
  return await https.get('list_task_type', 'listtasktempgroup', { id, kw });
}

/**
 * 为菜单工作项类型添加任务模板分组
 * @param owner
 * @param name 模板分组名称
 */
export async function addTaskTemplateGroup(
  owner: string,
  name: string
): Promise<void> {
  await https.post('list_task_type', 'addtasktemplategroup', undefined, {
    owner,
    name
  });
}

/**
 * 更新任务模板分组
 * @param id
 * @param owner
 * @param name 模板分组名称
 */
 export async function updateListTaskTempgroup(
  id:string,
  name: string
): Promise<void> {
  await https.post('list_task_type', 'updatetasktempgroup', undefined, {
    id,
    name
  });
}

/**
 * 移除菜单工作项绑定的任务模板分组
 * @param id
 */
export async function removeTaskTempGroup(id: string): Promise<void> {
  await https.post('list_task_type', 'removetasktempgroup', undefined, { id });
}


/**
 * 创建菜单任务模板
 * @param groupId 分组id
 * @param taskTypeId 任务类型（工序类型）id/
 * @param name 模板名称
 * @param description 描述
 */
export async function listAddTaskTemplate(groupId: string, taskTypeId: string, name: string, description: string){
  await https.post('list_task_type', 'addtasktemplate', undefined, { groupId, taskTypeId, name, description});
}


/**
*  更新菜单任务模板
* @param id 模板id
* @param groupId 分组id
* @param taskTypeId 任务类型（工序类型）id/
* @param name 模板名称
* @param description 描述
* @returns 
*/
export async function listUpdateTemplate(id: string, groupId: string, taskTypeId: string, name: string, description: string): Promise<Array<any>> {
  return await https.post("list_task_type", "updatetasktemp", undefined, { id, groupId, taskTypeId, name, description });
}

/**
 * 移除菜单工作项绑定的任务模板
 * @param id
 */
export async function removeTaskTemplate(id: string): Promise<void> {
  await https.post('list_task_type', 'removetasktemplate', undefined, { id });
}

/**
 * 移除菜单工作项绑定的任务模板
 * @param id
 * @param groupId
 * @param previousId
 */
 export async function listTaskTemplateSort(id: string,groupId:string,previousId:string): Promise<void> {
  await https.post('list_task_type', 'tasktemplatesort', undefined, { id,previousId,groupId });
}


/**
 * 列出菜单工作项类型绑定的任务模板
 * @param id
 * @param kw 关键字
 */
export async function listTaskTemplate(id: string,kw:string): Promise<any[]> {
  return await https.get<any>('list_task_type', 'listtasktemplate', { id,kw });
}

/**
 * 获取菜单工作项类型列表及任务模板分组列表
 * @param list_id List id
 * @returns
 */
export async function getListGroupNavigation(list_id: string): Promise<any> {
  return await https.get<any>('list_task_type', 'groupnavigation', { list_id });
}


/**
 * 通过任务的类型列出可用的任务模板
 * @param menuId menuId id
 * @returns
 */
 export async function listTaskTemplateGroup(menuId: string): Promise<any[]> {
  return await https.get<any[]>('list_task_type', 'tasktemplategroup', { menuId });
}



/**
 * 基于任务模板创建记录。
 * @param templateId 模板id
 * @param records 
 */
 export async function listTemplateCreateTask(templateId: string, records:string[]){
  await https.post('list_task_type', 'createtask', undefined, { templateId, records});
}



/**
 * 将任务模板(全局)的分组导入到本地的模板分组
 * @param owner 菜单工作项类型
 * @param groupIds 模板分组id数组
 */
 export async function listTemplateImport(owner: string, groupIds:string[]){
  await https.post('list_task_type', 'import', undefined, { owner, groupIds});
}

/**
 * 列出可用的任务模板(全局)
 * @param id 菜单任务类型id
 * @returns
 */
 export async function getAvailableTemplateGroup(id: string): Promise<any[]> {
  return await https.get<any[]>('list_task_type', 'availablegroup', { id });
}