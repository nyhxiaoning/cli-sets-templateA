/**
 * 菜单接口-弃用
 */
export interface IMenu {
    /**菜单的唯一标识 */
    id: string
    /**菜单的父级节点标识 */
    parentId: string | undefined
    /**菜单的名称 */
    name: string
    /**
     * 菜单的类型
     * @catalog 目录, 
     * @list 表格,
     * @doc 文档
    */
    type: string
    /** 扩展字段 */
    extend: any,
    children: MenuEntity[]
}

/**
 * 菜单接口
 */
export interface IProjectMenu {
    /**菜单的唯一标识 */
    id: string
    /**菜单的父级节点标识 */
    parentId: string | undefined
    /**菜单的名称 */
    name: string
    /**
     * 菜单的类型
     * @catalog 目录, 
     * @list 表格,
     * @doc 文档
    */
    type: string
    /**
     * 所有者id
     */
    owner: string
    /**
     * 图标的id
     */
    logo: string
    /** 扩展字段 */
    extend: any,
    children: MenuEntity[]
}



/**
 * 菜单项实体-弃用
 */
export class MenuEntity implements IMenu {
    constructor(id: string) {
        this.id = id;
        this.name = "";
        this.type = "";
        this.children = []
    }
    children: MenuEntity[];
    id: string;
    parentId: string | undefined;
    name: string;
    type: string;
    extend: any
}



/**
 * 项目菜单项实体
 */
export class ProjectMenuEntity implements IProjectMenu {
    constructor(id: string) {
        this.id = id;
        this.name = "";
        this.type = "";
        this.owner = "";
        this.logo = "";
        this.children = []
    }
    owner: string;
    logo: string;
    children: MenuEntity[];
    id: string;
    parentId: string | undefined;
    name: string;
    type: string;
    extend: any
}