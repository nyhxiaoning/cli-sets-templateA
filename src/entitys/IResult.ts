/**
 * 返回值接口
 */
export interface IResult {
    /** 返回值代码 */
    code: number

    /**  返回得结果 */
    data: any | undefined

    /** 返回值描述 */
    msg: string | undefined

}

/**
 * 返回值实体
 */
export class ResuleEntity implements IResult {
    constructor() {
        this.code = -1
    }
    code: number;
    data: any;
    msg: string | undefined;

}