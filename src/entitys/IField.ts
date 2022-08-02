/**
 * 字段接口
 */
export interface IField {
  /**
   * 列的id
   */
  id: string | undefined;
  /**
   * 列的名称
   */
  name: string;

  /**
   * 列的类型
   */
  type: string;

  /**
   * 类型名称
   */
  typeName: string;

  /**
   * 该列是否允许编辑
   */
  editable: boolean;

  /**
   * 列的描述信息
   */
  desc: string | undefined;

  /**
   * 扩展属性
   */
  properties: any;
}

/**
 * 字段实体，工作项属性的汇总的实体字段内容
 */
export class FieldEntity implements IField {
  constructor() {
    // this.name = ""
    this.name = '';
    this.type = '';
    this.id = '';
    this.typeName = '';
    this.editable = false;
  }
  typeName: string;
  id: string;
  name: string;
  type: string;
  editable: boolean;
  desc: string | undefined;
  properties: any;
}

/** 列类型 */
export enum ColumnType {
  /**单行文本 */
  string = 'string',
  /**多行文本 */
  text = 'text',
  /**单选 */
  selection = 'selection',
  /**多选 */
  multiselection = 'multiselection',
  /**成员 */
  user = 'user',
  /**日期 */
  datetime = 'datetime',
  /**附件 */
  file = 'file',
  /**数字 */
  numerical = 'numerical',
  /**复选框 */
  boolean = 'boolean',
  /**超链接 */
  uri = 'uri',
  /**修改人 */
  writeuser = 'writeuser',
  /**创建时间 */
  createtime = 'createtime',
  /** 创建人 */
  createuser = 'createuser',
  /**修改时间 */
  writetime = 'writetime',
  /**公式 */
  expression = 'expression',

  /* 新增一个查找引用 */
  findreference = 'findreference',
  /* 新增一个引用属性 */
  quote = 'quote',
  /** 关联字段 */
  relation = 'relation',
}
