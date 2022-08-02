/** 任务类型接口 */
export interface ITaskType {

    /** 类型id */
    id: string,

    /** 任务类型 */
    type: string,

    /** 任务名称 */
    name: string,

    /** 任务Logo */
    logo: string,

    /** 系统 */
    system: boolean

    /** 字段 */
    fields: ITaskTypeField[]
}

export interface ITaskTypeField {
    /** 唯一标识  */
    id: string
    /** 是否可删除 */
    deletable: boolean
}

/** 任务类型实体 */
export class TaskType implements ITaskType {
    constructor() {
        this.id = ''
        this.type = ''
        this.name = ''
        this.logo = ''
        this.system = false
        this.fields = []
    }
    id: string;
    type: string;
    name: string;
    logo: string;
    system: boolean;
    fields: TaskTypeField[]

}

export class TaskTypeField {
    constructor() {
        this.id = ''
        this.deletable = true
    }
    id: string
    deletable: boolean
}