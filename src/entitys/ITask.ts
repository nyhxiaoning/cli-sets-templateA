import { IRow } from "./IRow";

/**
 * 任务实体接口
 */
export interface ITask extends IRow {

    /**创建用户 */
    created_uid: any

    /** 组件id */
    owner: string

    /** 项目id */
    project_id: string

    /** 父节点id */
    parent_id: string
}

/**
 * 任务实体
 */
export class TaskEntity implements ITask {
    constructor() {
        this.fields = []
        this.owner = ""
        this.project_id = ""
        this.parent_id = ""
    }

    parent_id: string;

    created_uid: any;

    owner: string;
    
    project_id: string;

    record_id: string | undefined;

    fields: any[];
}