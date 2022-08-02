/** 视图可见类型 */
export declare type ViewAccess = 'private' | 'public';
/**
 * 视图实体接口
 */
export interface IView {
    /** 多维表格的唯一标识 */
    tableId: string | undefined
    /** 视图的唯一标识 */
    viewId: String

    /** 视图的名称 */
    name: string | undefined

    /**  视图的动态属性 */
    properties: any | undefined

    /** 视图的类型 */
    type: string | undefined

    /** 是否显示 */
    visible: boolean

    /** view 可见范围 */
    access: ViewAccess
}
/**
 * 视图实体
 */
export class ViewEntity implements IView {
    constructor() {

        this.viewId = "";

        //默认显示
        this.visible = true;
        this.access = "public";
    }
    access: ViewAccess;
    visible: boolean;
    tableId: string | undefined;
    viewId: string;
    name: string | undefined;
    properties: any;
    type: string | undefined;

}