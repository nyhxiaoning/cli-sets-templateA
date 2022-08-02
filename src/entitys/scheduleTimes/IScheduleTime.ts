import { IFile } from "@/entitys/IFile"

/**
 * 工时对象接口
 */
export interface IScheduleTime {

    /**
     * 工时id
     */
    id: string

    /**
     * 创建用户
     */
    createdUId: string

    /**
     * 创建时间
     */
    createdTime: string

    /**
     * 最后修改用户的id
     */
    lastModifiedUId: string

    /**
     * 最后修改时间
     */
    lastModifiedTime: string

    /**
     * 任务id
     */
    taskId: string

    /**
     * 登记用户id
     */
    userId: string


    /**
     * 报告时间
     */
    reportDate: string

    /**
     * 工时
     */
    duration: number

    /**
     * 完成度
     */
    completeness: number

    /**
     * 工作描述
     */
    description: string

    /**
     * 附件列表
     */
    attachments: IFile[]
}


/**
 * 工时对象接口实现
 */
export class ScheduleTimeEntity implements IScheduleTime{
    constructor(){
        this.id=''
        this.createdUId=''
        this.createdTime=''
        this.lastModifiedUId=''
        this.lastModifiedTime=''
        this.taskId=''
        this.userId=''
        this.reportDate=''
        this.duration=0
        this.completeness=0
        this.description=''
        this.attachments=[]
    }
    id: string
    createdUId: string
    createdTime: string
    lastModifiedUId: string
    lastModifiedTime: string
    taskId: string
    userId: string
    reportDate: string
    duration: number
    completeness: number
    description: string
    attachments: IFile[]
    
}