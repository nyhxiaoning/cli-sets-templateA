import https from "@/utils/https/https"
import { ProjectMenuEntity } from "@/entitys/IMenu"

/**
 *  获取菜单集合 
 */
export async function getMenus(owner: string): Promise<ProjectMenuEntity[]> {
    let menus = await https.get("project_menu", "list", { owner: owner })
    return menus as ProjectMenuEntity[];
}

/**
 *  获取菜单集合（包括项目）
 */
 export async function menus(id: string): Promise<ProjectMenuEntity[]> {
    let items = await https.get<ProjectMenuEntity[]>("plan", "menus", { id })
    return items
}


/**
 *  获取菜单详情
 */
export async function browse(owner: string): Promise<ProjectMenuEntity> {
    let menus = await https.get("project_menu", undefined, { owner: owner })
    return menus as ProjectMenuEntity;
}

/** 创建菜单 */
export async function createMenu(menu: ProjectMenuEntity): Promise<ProjectMenuEntity> {
    const parms: any = {
        type: menu.type,
        owner: menu.owner,
        name:menu.name
    }
    if (menu.parentId !== "" && menu.parentId !== null && menu.parentId !== undefined)
        parms.parentId = menu.parentId
    let newMenu = await https.post("project_menu", "create", undefined, parms)
    return newMenu as ProjectMenuEntity
}



/** 更新菜单信息 */
export async function updateMenu(menu: ProjectMenuEntity) {
    await https.post("project_menu", "update", undefined, { id: menu.id, name: menu.name })
}

/** 删除菜单信息 */
export async function deleteMenu(id:string) {
    await https.post("project_menu", "delete", undefined, { id: id })
}