/**
 * 企业成员接口
 */
export interface IMember {
    /**企业成员唯一标识 */
    id: string
    /** 用户ID */
    userId: string
    /** 用户名称 */
    name: string
    /** 联系电话 */
    phone: string | undefined

    /** email */
    email: string | undefined

    /** 员工编号 */
    employeeNo: string | undefined

    // formalJobDate:string
    /** 离职日期 */
    leaveJobDate: string | undefined

    /** 入职日期 */
    joinDate: string

    /** 启用 */
    isEnable: boolean

    /** 是否为超级管理员 */
    isSuperAdmin: boolean

    /** 是否为管理员 */
    isAdmin: boolean

    /** 职位 */
    jobTitle: string | undefined

    /**头像链接*/
    profile: string | undefined

    /**权限列表 */
    permissions: Array<string>

}

/**
 * 企业成员实体
 */
export class MemberEntity implements IMember {
    constructor() {
        this.id = "";
        this.userId = "";
        this.name = "";
        this.joinDate = '';
        this.isSuperAdmin = false;
        this.isEnable = false;
        this.isAdmin = false;
        this.permissions = [];
    }
    email: string | undefined;
    employeeNo: string | undefined;
    leaveJobDate: string | undefined;
    joinDate: string;
    isEnable: boolean;
    isSuperAdmin: boolean;
    isAdmin: boolean;
    jobTitle: string | undefined;
    permissions: string[];

    id: string;
    userId: string;
    name: string;
    phone: string | undefined;
    profile: string | undefined;

}