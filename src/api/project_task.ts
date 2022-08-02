import { ScreenCofig } from '@/components/data_screen/screen_list_ety';
import { FieldEntity } from '@/entitys/IField';
import { TaskEntity } from '@/entitys/ITask';
import { irInvoke } from '@/utils/signair/singnair_connector';

export function processingTaskRow(rowData: any): any {
  const parms = JSON.parse(JSON.stringify(rowData.fields));
  parms.record_id = rowData.record_id;
  parms.parent_id = rowData.parent_id;
  parms['filePath'] = [parms.record_id];
  return parms;
}

/**
 * 获取任务数据
 * @owner 任务组件的唯一标识
 * @condition 可选，搜索条件
 */
export async function searchTask(
  owner: string,
  condition: ScreenCofig | null = null
): Promise<any[]> {
  let config: ScreenCofig | null = null;
  if (condition) {
    const ruleOut = ['empty', 'notEmpty', 'isRepeat'];
    config = JSON.parse(JSON.stringify(condition)) as ScreenCofig;
    const res = config?.conditions?.filter(x => {
      const symbol = ruleOut.find(y => y === x.symbol);
      if (symbol) {
        return true;
      } else {
        return x.value?.length > 0;
      }
    });
    config.conditions = res;
  }
  const result = await irInvoke<Array<any>>('task/search', {
    owner: owner,
    condition: config
  });
  const rows = result.map(row_obj => processingTaskRow(row_obj));
  return rows;
}

/**
 * 获取列的集合
 * @owner 任务组件的唯一标识
 */
export async function getFieldCollection(
  owner: string
): Promise<FieldEntity[]> {
  const result = await irInvoke<FieldEntity[]>('task/getfieldcollection', {
    owner
  });
  return result;
}

/**
 * 创建任务
 * @owner 任务组件的唯一标识
 * @project_id 项目编号
 * @title 任务名称
 * @type 任务类型的id
 */
export async function createRow(
  owner: string,
  project_id: string,
  title: string,
  type: string,
  parent_id: string | undefined = undefined
): Promise<any> {
  const parms = { owner, project_id, title, type, parent_id };
  const result = await irInvoke<TaskEntity>('task/create', parms);
  const task = JSON.parse(JSON.stringify(result.fields));
  task.record_id = result.record_id;
  task.parent_id = result.parent_id;
  // let path = [result.record_id]
  // if (result.parent_id && result.parent_id !== '') path.unshift(result.parent_id)
  // task["filePath"] = path
  return task;
}

/**
 * 更新单元格
 * @rowId 行的唯一标识
 * @fieldId 列的id
 * @value 单元格的值
 */
export async function updateCell(rowId: string, fieldId: string, value: any) {
  await irInvoke('task/updatecell', { rowId, fieldId, value });
}

/**
 * 变更任务父级
 * @rowId 行的唯一标识
 * @parentId 目标父级id
 */
export async function setParent(rowId: string, parentId: string | null) {
  await irInvoke('task/setparent', { rowId, parentId });
}

/**
 * 删除任务
 * @rowId 行的唯一标识
 */
export async function deleteRow(rowId: string) {
  await irInvoke('task/delete', { rowId });
}

/**
 * 获取关联字段可用的下拉列表
 * @depend_on 关联的表单id
 * @id 任务id
 * @kw 可空,搜索关键字
 */
export async function getRelationlist(
  depend_on: string,
  id: string,
  kw?: string
): Promise<any[]> {
  const parm = { depend_on, id } as any;
  if (kw) parm.kw = kw;
  return await irInvoke('task/relation_list', parm);
}
