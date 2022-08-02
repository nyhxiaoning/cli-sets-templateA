import { FieldEntity } from "@/entitys/IField";
import { ViewEntity, ViewAccess } from "@/entitys/IView";
import { irInvoke, irSend } from "@/utils/signair/singnair_connector";
import https from "@/utils/https/https";
import { ScreenCofig } from "@/components/data_screen/screen_list_ety";

/**
 * 加载视图
 * @owner 多维表格的唯一标识 
 */
export async function viewSearch(owner: string): Promise<ViewEntity[]> {
    const result = await irInvoke("view/search", { "owner": owner });
    return result as ViewEntity[];
}


/**
 * 创建视图
 * @owner 多维表格的唯一标识 
 * @type 视图类型
 */
export async function viewCreate(owner: string, type: string, access: ViewAccess, name = "新建视图"): Promise<ViewEntity> {
    const result = await irInvoke("view/create", { owner, type, access, name });
    return result as ViewEntity;
}


/**
 * 修改视图
 * @viewId 视图的唯一标识 
 * @name 视图名称
 * @properties 视图的动态属性，不同的视图的动态属性都不相同
 */
export async function viewUpdate(viewId: string, name: string | null, access: null | ViewAccess, properties: any): Promise<void> {
    const param = {
        viewId
    } as any;
    if (properties) param.properties = properties;
    if (name) param.name = name;
    if (access) param.access = access;
    await irInvoke("view/update", param);
}

/**
 * 修改视图是否显示
 * @viewId 视图的唯一标识 
 * @visible 视图是否显示
 */
export async function viewUpdateVisible(viewId: string, visible: boolean): Promise<void> {
    const param = {
        viewId,
        visible
    } as any;
    await irInvoke("view/update", param);
}

/**
 * 删除视图
 * @viewId 多维表格的唯一标识 
 */
export async function viewDelete(viewId: string) {
    await irInvoke("view/delete", { viewId });
}

/**
 * 设置视图的排序配置
 * @param viewId 视图id
 * @param viewSort 视图排序对象
 */
export async function setViewSort(owner: string, viewSort: any) {
    await irSend("view/set_view_sort", owner, viewSort);
}

/**
 * 设置视图的行高配置
 * @param viewId 视图id
 * @param heightIndex 高度索引  1，2，3，4
 */
export async function setViewRowheight(owner: string, heightIndex: number) {
    await irSend("view/set_view_rowheight", owner, heightIndex);
}



/**
 * 设置视图的字段是否可见
 * @param viewId 视图id
 * @param fieldId 字段id
 * @param visible View Visible
 */
export async function setFieldVisible(viewId: string, fieldIds: string[], visible: boolean) {
    await irSend("view/set_field_visible", viewId, fieldIds, visible);
}

/**
 * 设置视图的字段宽度
 * @param viewId 视图id
 * @param width 列宽度
 */
export async function setFieldWidth(owner: string, fieldId: string, width: number) {
    await irSend("view/set_field_width", owner, fieldId, width);
}

/**
 * 设置视图的字段宽度
 * @param viewId 视图id
 * @param fieldId 字段id
 * @param position 字段的顺序号
 */
export async function setFieldPosition(view_id: string, fieldId: string, position: number) {
    await irSend("view/set_field_position", view_id, fieldId, position);
}



/**
 * 设置视图的分组配置
 * @param viewId 视图id
 * @param arg 分组参数 : 
 * @分组参数 { "fieldId" : "xxx","desc" : true }
 */
export async function setViewGroup(owner: string, arg: Array<any>) {
    await irSend("view/set_view_group", owner, arg);
}

/**
 * 创建工作项属性
 * @param field 字段
 */
export async function cretaeField(field: FieldEntity) {
    const parms = {
        name: field.name,
        type: field.type,
        properties: field.properties
    };
    return await https.post("task_field", "create", undefined, parms);
}

/**
 * 为工作项类型添加属性---外部创建工作项属性，
 * @param workId 工作项类型id
 * @param field 字段
 */
export async function originalAddField(workId: string, field: FieldEntity) {
    const parms = {
        "id": workId,
        "field": {
            name: field.name,
            type: field.type,
            properties: field.properties
        }
    };
    return await https.post("task_type", "originaladdfield", undefined, parms);
}
/**
 * 将属性添加到list的所有工作项类型中---替换originalAddField接口
 * @param id 
 * @param fields 
 * @param viewId
 */
 export async function addListField(workId: string, field: FieldEntity,viewId:string) {
    const parms = {
        "list_id": workId,
        "view_id": viewId,
        "field": {
            name: field.name,
            type: field.type,
            properties: field.properties
        }
    };
    return await https.post("list_task_type", "addlistfield", undefined, parms);
}

/** 设置视图的筛选条件 */
export async function setViewFilter(view_id:string,args:ScreenCofig){
    console.log("视图条件",args);
   return await irSend("view/set_view_filter", view_id, JSON.parse(JSON.stringify(args)));
}