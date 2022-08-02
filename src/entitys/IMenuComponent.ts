/**
 * 项目菜单组件接口
 */
export interface IMenuComponent {
    /**组件的唯一标识 */
    id: string

    /**组件的名称 */
    name: string
    /**
     * 组件的类型
    */
    type: string

    /**
     * 所属id(本项目绑定菜单id)
     */
    owner: string
    /**
     * 图标的id
     */
    logo: string

    /** 扩展属性 */
    properties: any,
}


/**
 * 项目菜单组件实体
 */
export class MenuComponentEntity implements IMenuComponent {
    constructor() {
        this.id=""
        this.name=""
        this.type=""
        this.owner=""
        this.logo=""
    }
    id: string;
    name: string;
    type: string;
    owner: string;
    logo: string;
    properties: any;
}