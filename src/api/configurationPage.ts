import { FieldEntity } from '@/entitys/IField';
import https from '@/utils/https/https';

// 通过关键字搜索任务类型
export async function getWorksByKw(str: string): Promise<Array<any>> {
  return await https.get('task_type', `query?keyword=${str}`, undefined);
}
// 创建类型
export async function Create(str: object) {
  return await https.post('task_type', 'create', undefined, str);
}

/**`
 * 删除工作项类型
 * @param id 工作项类型id
 * @returns
 */
export async function deleteWorkItemType(id: string) {
  return await https.post('task_type', 'delete', undefined, { id });
}

// 通过关键字搜索工作项任务状态
export async function stateQuery(str: string): Promise<any[]> {
  return await https.get('task_status', `query?keyword=${str}`, undefined);
}

/**
 * 根据工作项状态id获取状态详情
 * @param id
 * @returns
 */
export async function getStateById(id: string): Promise<any> {
  return await https.get('task_status', undefined, { id });
}

/**
 * 通过分组与关键字搜索任务状态
 * @param groupName  分组名称
 * @param kw 关键子
 * @returns
 */
export async function getStatesByGroups(
  groupName: string,
  kw: string
): Promise<any[]> {
  const parms = {
    name: groupName,
    kw: kw
  };
  return await https.get('task_status', 'group', parms);
}

/**
 * 设置工作项类型默认状态
 * @param taskTypeid 工作项类型id
 * @param initialStatusId 状态id
 */
export async function initialStatus(
  taskTypeid: string,
  initialStatusId: string
): Promise<void> {
  await https.post('task_type', 'initialstatus', undefined, {
    taskTypeid,
    initialStatusId
  });
}

// 获取工作项的分组列表。
export async function getStateGroups(): Promise<string[]> {
  return await https.get('task_status', 'grouplist', undefined);
}

// 创建状态
export async function stateCreate(str: object) {
  return await https.post('task_status', 'create', undefined, str);
}

// 删除状态
export async function deleteState(str: object) {
  return await https.post('task_status', 'delete', undefined, str);
}

/**
 * 排序工作项状态
 * @param id 需要排序的id
 * @param previousId 新位置前一个元素的id
 */
export async function sortState(id: string, group: string, previousId: string) {
  return await https.post('task_status', 'sort', undefined, {
    id,
    group,
    previousId
  });
}

/**
 * 重命名状态分组
 * @param original 原名称
 * @param newName 新名称
 * @returns
 */
export async function renameSatateGroup(original: string, newName: string) {
  return await https.post('task_status', 'renamegroup', undefined, {
    original,
    newName
  });
}

// 编辑状态
export async function updateState(str: object) {
  return await https.post('task_status', 'update', undefined, str);
}

// 通过关键字搜索任务属性

/**
 * 当前的工作项属性内容汇总
 * @param str
 */
export async function attributeQuery(str: string): Promise<Array<FieldEntity>> {
  return await https.get<Array<FieldEntity>>(
    'task_field',
    `query?keyword=${str}`,
    undefined
  );
}

// 通过分组的内容获取工作项状态的列表
export async function getFidlesByGroupName(
  groupName: string,
  kw: string
): Promise<Array<FieldEntity>> {
  const parms = {
    name: groupName,
    kw: kw
  };
  return await https.get<Array<FieldEntity>>('task_field', `group`, parms);
}

// 获取工作项的分组列表
export async function getFieldGroups(): Promise<Array<string>> {
  return await https.get<Array<string>>('task_field', 'grouplist', undefined);
}

/** 创建属性 */
/**
 * 全局项目配置，创建属性页面
 * @param parms
 */
export async function attributeCreate(parms: object) {
  return await https.post('task_field', 'create', undefined, parms);
}
// 删除工作项属性
export async function dltAttribute(str: object) {
  return await https.post('task_field', 'delete', undefined, str);
}
// 编辑工作项属性
export async function updateAttribute(str: object) {
  return await https.post('task_field', 'update', undefined, str);
}

/**
 * 重命名属性分组
 * @param original 原名称
 * @param newName 新名称
 * @returns
 */
export async function renameFieldGroup(original: string, newName: string) {
  return await https.post('task_field', 'renamegroup', undefined, {
    original,
    newName
  });
}

// 为类型添加字段
export async function addField(id: string, fields: string[]) {
  return await https.post('task_type', 'addfield', undefined, { id, fields });
}

// 直接为工作项类型添加属性
export async function originalAddField(id: string, fields: string[]) {
  return await https.post('task_type', 'originaladdfield', undefined, {
    id,
    field: fields
  });
}

// export async function addListField(id: string, fields: string[]) {
//     return await https.post("list_task_type", 'addlistfield', undefined, { id, field: fields });
// }
// 列出类型所绑定的属性
export async function ListField(id: string): Promise<any[]> {
  return await https.get('task_type', 'listfield', { id });
}

//为类型移除字段
export async function RemoveField(id: string, field_id: string) {
  return await https.post('task_type', 'removefield', undefined, {
    id,
    field_id
  });
}

//为类型添加状态
export async function addStatus(
  id: string,
  status_id: string,
  target: string[]
) {
  return await https.post('task_type', 'addstatus', undefined, {
    status_id,
    id,
    target
  });
}

//重命名类型
export async function renameState(id: string, name: string) {
  return await https.post('task_type', 'update', undefined, { id, name });
}

/**
 * 修改工作项类型图标
 * @param id 工作项类型id
 * @param icon 图标id
 * @returns
 */
export async function updateWorkIcon(id: string, logo: string) {
  return await https.post('task_type', 'update', undefined, { id, logo });
}

//列出类型的状态
export async function ListStatus(id: string): Promise<any[]> {
  return await https.get('task_type', 'liststatus', { id });
}

//为类型移除状态
export async function removeStatus(id: string, status_id: string) {
  return await https.post('task_type', 'removestatus', undefined, {
    status_id,
    id
  });
}

//类型 ->属性
export async function AvailableField(id: string, kw = ''): Promise<any[]> {
  return await https.get('task_type', 'availablefield', { id, kw });
}
//类型 ->状态
export async function AvailableStatus(str: string): Promise<any[]> {
  return await https.get('task_type', `availablestatus?id=${str}`, undefined);
}

//列出项目可绑定的工作项类型
export async function AvailableTaskType(str: string) {
  return await https.get(
    'project_setting',
    `AvailableTaskType?menu_id=${str}`,
    undefined
  );
}

/**
 * 设置 对象状态 流转状态
 * @param id
 * @param start_status_id
 * @param target_status_ids
 * @returns
 */
export async function setStatus(
  id: string,
  start_status_id: string,
  target_status_ids: string[]
): Promise<void> {
  return await https.post('task_type', 'setstatus', undefined, {
    id,
    start_status_id,
    target_status_ids
  });
}

/**
 * 获取租户所有工作项类型
 * @returns
 */
export async function getAllTaskTypes(): Promise<any[]> {
  return await https.get('task_type', 'list');
}
