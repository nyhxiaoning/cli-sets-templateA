import https from '@/utils/https/https';
import { TaskType } from '@/entitys/ITaskType';
import { TaskTypeEntity } from '@/entitys/configs/TaskTypeEntity';
import { FieldEntity } from '@/entitys/IField';

// /** 通过关键字搜索任务类型 */
// export async function getTask(kw?: string): Promise<TaskType[]> {
//     let result = await https.get("task_type", "query", kw ? { keyword: kw } : undefined)
//     return result as TaskType[];
// }

/** 通过关键字搜索项目配置任务类型 */
export async function getTaskType(menu_id: string): Promise<TaskType[]> {
  const result = await https.get('project_menu', 'listtasktype', { menu_id });
  return result as TaskType[];
}

export async function getListCollection(
  type: string,
  content: string
): Promise<string[]> {
  const result = await https.get('task_field', 'getlistcollection', {
    type,
    content
  });
  return result;
}

// 根据传入的 List id获取list的所有属性/api/v{version}/task_field/getlistfieldcollection

/**
 * 根据传入的 List id获取list的所有属性
 * @param list_id 当前的list类型列表的内容
 */
export async function getListFieldCollection(
  list_id: string
): Promise<FieldEntity[]> {
  const result = await https.get<FieldEntity[]>('task_field', 'getlistfieldcollection', {
    list_id
  });
  return result;
}

/**
 * 获取当前租户所有的工作项属性
 */
export async function getTaskFiledList(): Promise<string[]> {
  const result = await https.get('task_field', 'list', {});
  return result;
}

/** 通过关键字列出符合的任务类型
 * @param kw 关键字
 */
export async function queryTaskTypes(kw: string): Promise<TaskTypeEntity[]> {
  const data = await https.get<TaskTypeEntity[]>('taskrecordtype', 'query', {
    kw
  });
  return data;
}

/** 通过关键字列出符合的任务分组
 * @param name 分组名称
 * @param kw 关键字
 */
export async function queryTaskTypeByGroup(
  name: string,
  kw: string
): Promise<TaskTypeEntity[]> {
  return await https.get<TaskTypeEntity[]>('taskrecordtype', 'group', {
    name,
    kw
  });
}

/**
 * 修改分组名称
 * @param original 原始
 * @param newName 新名称
 */
export async function renameGroup(
  original: string,
  newName: string
): Promise<void> {
  return await https.post('taskrecordtype', 'renamegroup', undefined, {
    original,
    newName
  });
}

/** 获取任务类型分组集合 */
export async function getTaskTypeGroups(): Promise<string[]> {
  return await https.get<string[]>('taskrecordtype', 'grouplist');
}

/** 通过任务类型id删除任务类型*/
export async function deleteTaskType(id: string): Promise<string[]> {
  return await https.post('taskrecordtype', 'delete', { id });
}

/** 创建任务类型*/
export async function createTaskType(type: TaskTypeEntity): Promise<any> {
  const parm = {
    name: type.name,
    description: type.description,
    color: type.color,
    group: type.group
  };
  return await https.post('taskrecordtype', 'create', undefined, parm);
}

/** 修改任务类型*/
export async function updateTaskType(type: TaskTypeEntity): Promise<any> {
  return await https.post('taskrecordtype', 'write', undefined, type);
}

/**
 * 通过状态栏方式列出记录
 * @param owner 所有者id（组件id）
 * @param _arguments 参数
 * 
 *  @example 示例 {
   "arguments": [
       {
           "id": 1514774619322716160,
           "fields": [
               "status",
               "type"
           ]
       }
   ],
   "owner": "gJQxo3GMz4El3"
  }
 */
export async function statusbar(
  owner: string,
  _arguments: any[]
): Promise<any[]> {
  const result = await https.post('apptask', 'statusbar', undefined, {
    owner,
    arguments: _arguments
  });
  console.error('statusbar', result);
  const rows = result.map((row_obj: any) => {
    const parms = JSON.parse(JSON.stringify(row_obj.fields));
    parms.record_id = row_obj.record_id;
    parms.parent_id = row_obj.parent_id;
    parms['filePath'] = [parms.record_id];
    return parms;
  });
  return rows;
}

/**
 * 通过 list_id 选取记录
 * @param list_id 当前的表单list
 * @param kw 当前的关键字查询
 */
export async function selectedRecord(list_id: string, kw = '') {
  const result = await https.get('apptask', 'selectedrecord', {
    list_id,
    kw
  });
  return result;
}

/** 验证公式 */
export async function formulacheck(expression: string, field = '') {
  const result = await https.post('apptask', 'formulacheck', undefined, {
    expression,
    field
  });
  return result;
}

/**
 * 获取所有可用的表单
 * 主要用于关联字段的选取
 * @param kw 关键字
 */
export async function getModelList(kw: string): Promise<any[]> {
  const result = https.get<any[]>('apptask', 'getmodellist', { kw });
  return result;
}
