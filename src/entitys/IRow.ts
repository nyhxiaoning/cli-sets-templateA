/**
 * 行实体接口
 */
export interface IRow {
    /** 多维表格的唯一标识 */
    record_id: string | undefined

    /** 字段集合 */
    fields: Array<any>
}

/**
 * 行实体
 */
export class Row implements IRow {
    constructor() {
        this.fields = []
    }

    record_id: string | undefined;

    fields: any[];

    /** 序列化成的表格所需的结构 */
    // toTableRow(): any {
    //     let tableRow = JSON.parse(JSON.stringify(this.fields))
    //     tableRow.record_id = this.record_id
    //     return tableRow
    // }
}