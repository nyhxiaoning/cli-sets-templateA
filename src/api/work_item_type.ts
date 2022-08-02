// import { FieldEntity } from "@/entitys/IField";
import { TaskTypeEntity } from "@/entitys/configs/TaskTypeEntity";
import { TaskType } from "@/entitys/ITaskType";
import https from "@/utils/https/https";

// 工作项类型接口


/**
 * 列出租户所有的工作项类型（项目）
 * @returns 
 */
export async function getAllWorkItemTypes(): Promise<TaskType[]> {
    return await https.get<TaskType[]>("list_task_type", 'all');
}

/**
 * 列出菜单(list)的工作项类型（项目）
 * @param id List`s id
 * @returns 
 */
export async function getListWorkItemTypes(id: string): Promise<any[]> {
    const result= await https.get("list_task_type", 'list', { id });
    return result;
}


/**
 * 列出菜单可用的工作项类型（项目）
 * @param id List`s id
 * @returns 
 */
export async function getAvailable(id: string): Promise<any[]> {
    return await https.get("list_task_type", 'available', { id });
}


/**
 * 绑定工作项到菜单
 * @param menu_id List id
 * @param task_type_id  全局对象
 * @returns 
 */
export async function bindTaskType(menu_id: string, task_type_id: string): Promise<void> {
    return await https.post("list_task_type", 'create', undefined, { menu_id, task_type_id });
}


/**
 * 移除菜单的工作项
 * @param id 工作项类型id
 * @returns 
 */
export async function unbindTaskType(id: string): Promise<void> {
    return await https.post("list_task_type", 'remove', { id });
}



/**
 * 列出工作项类型的工作项属性(项目)
 * @param id List`s id
 * @returns 
 */
export async function getLTaskFields(id: string, kw: string): Promise<any[]> {
    const result = await https.get<any[]>("list_task_type", 'queryfield', { "id": id, "kw": kw });
    return result;
}


/**
 * 列出类型的工作项状态(项目)
 * @param id List`s id
 * @returns 
 */
export async function getLTaskSatates(id: string): Promise<any[]> {
    const result = await https.get<any[]>("list_task_type", 'liststatus', { "id": id });
    return result;
}

/**
 * 根据id列出类型的状态（菜单）
 * @param id List`s id
 * @param status_id 状态id
 * @returns 
 */
 export async function findStatusById(id: string,status_id:string): Promise<any> {
    const result = await https.get<any>("list_task_type", 'findstatus', { id,status_id });
    return result;
}

/**
 * 设置对象状态的流转状态
 * @param id 工作项类型id
 * @param start_status_id 状态id
 * @param target_status_ids 目标状态id数组
 * @returns 
 */
 export async function listTaskTypeUpdateStatus(id: string,start_status_id:string,target_status_ids:string[]): Promise<void> {
    return await https.post("list_task_type", 'setstatus',undefined, { id ,start_status_id,target_status_ids});
}



/**
 * 为工作项添加属性(全局选取)
 * @param id 工作项类型id
 * @param field_ids 全局属性id集合
 * @returns 
 */
export async function addReferenceFields(id: string, field_ids: string[]): Promise<void> {
    return await https.post("list_task_type", 'addreferencefield', undefined, { id, field_ids });
}



/**
 * 为工作项添加属性(本地新增)
 * @param id 工作项类型id
 * @param field 属性数据
 * @returns 
 */
export async function addLWorkItemField(id: string, field: any,global:boolean): Promise<void> {
    return await https.post("list_task_type", 'addfield', undefined, { id, field,global });
}

/**
 * 更新工作项属性(本地)
 * @param id 工作项类型id
 * @param field 属性
 * @returns 
 */
export async function listTaskTypeUpdatefield(id: string, field: any): Promise<void> {
    return await https.post("list_task_type", 'updatefield', undefined, { id, field });
}


/**
 * 移除工作项绑定属性(全局+本地)
 * @param id 工作项类型id
 * @param field_id 属性id
 * @returns 
 */
export async function listTaskTypeRemoveField(id: string, field_id: string): Promise<void> {
    return await https.post("list_task_type", 'removefield', undefined, { id, field_id });
}

/**
 * 为类型移除状态
 * @param id 工作项类型id
 * @param status_id 状态id
 * @returns 
 */
export async function listTaskTypeRemoveStatus(id: string, status_id: string): Promise<void> {
    return await https.post("list_task_type", 'removestatus', undefined, { id, status_id });
}



/**
 * 获取菜单可用的工作项属性(项目)
 * @param id List`s id
 * @returns 
 */
export async function availablefield(id: string, kw: string): Promise<any[]> {
    const result = await https.get<any[]>("list_task_type", 'availablefield', { id, kw });

    return result;
}

/**
 * 获取菜单可用的工作项状态(项目)
 * @param id List`s id
 * @returns 
 */
export async function availablestatus(id: string): Promise<any[]> {
    const result = await https.get<any[]>("list_task_type", 'availablestatus', { "id": id });
    return result;
}


/**
 * 为类型添加工作项状态(项目)
 * @param status_id 状态id
 * @param target 可跳转
 * @returns 
 */
export async function listTaskTypeAddStatus(id: string, status_id: string, target: Array<string>): Promise<void> {
    await https.post("list_task_type", 'addstatus', undefined, { id, status_id, target });
}   


//任务类型

/**
 * 列出工作项绑定的任务类型
 * @param id 菜单工作项类型id
 * @returns 
 */
 export async function getlistTaskRecordType(id: string): Promise<TaskTypeEntity[]> {
    const result = await https.get<any[]>("list_task_type", 'listtaskrecordtype', { "id": id });
    return result;
}


/**
 * 为菜单工作项批量添加任务类型
 * @param id 工作项id
 * @param type_ids 任务类型id数组
 * @returns 
 */
 export async function addTaskRecordType(id: string, type_ids: Array<string>): Promise<void> {
    await https.post("list_task_type", 'addtaskrecordtype', undefined, { id, type_ids });
}   

/**
 * 移除工作项绑定的任务类型
 * @param id 工作项id
 * @param type_id 任务类型id
 * @returns 
 */
 export async function removeTaskRecordType(id: string, type_id:string): Promise<void> {
    await https.post("list_task_type", 'removetaskrecordtype', undefined, { id, type_id });
} 

/**
 * 获取工作项可用的任务类型
 * @param id 工作项类型id
 */
 export async function availableTaskRecordType(id: string,kw:string,group?:string): Promise<TaskTypeEntity[]> {
    const result = await https.get<TaskTypeEntity[]>("list_task_type", 'availabletaskrecordtype', {id ,kw,group});
    return result;
}

/**
 * 设置工作项类型默认状态
 * @param id 工作项类型id
 * @param status_id 状态id
 * @returns 
 */
 export async function listTaskTypeinitialStatus(id: string, status_id:string): Promise<void> {
    await https.post("list_task_type", 'initialstatus', undefined, { id, status_id });
} 


