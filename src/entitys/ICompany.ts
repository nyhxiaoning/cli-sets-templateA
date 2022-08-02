/**
 * 企业接口
 */
export interface ICompany {

    /**
    * 企业唯一标识
    */
    tenantId: string | undefined

    /**
     * 企业规模
     */
    scale: number

    /**
     * 企业名称
     */
    name: string | undefined

    /**
     * 行业类型
     */
    industry: string | undefined

    /**
     * 企业图标
     */
    icon: any

    /**
     * 创建日期
     */
    createDate: Date | undefined,

    /**
     * 主管理员
     */
    administrator: string | undefined
}

/**
 * 企业实体
 */
export class CompanyEntity implements ICompany {
    constructor() {
        this.scale = 0;
    }
    tenantId: string | undefined;
    scale: number;
    name: string | undefined;
    industry: string | undefined;
    icon: any;
    createDate: Date | undefined;
    administrator: string | undefined;
}