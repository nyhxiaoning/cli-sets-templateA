/**
 * 权限实体接口
 */
export interface IPermission {
    /**权限的唯一标识 */
    id: string
    /**权限名称 */
    name: string
    /** 权限代码 */
    code: string
    /** 权限分组*/
    category: string,
}


/**
 * 权限实体实体
 */
export class PermissionEntity implements IPermission {
    constructor() {
        this.id = "";
        this.name = "";
        this.code = "";
        this.category = "";
    }
    id: string;
    name: string;
    code: string;
    category: string;
}