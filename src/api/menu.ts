import https from "@/utils/https/https";
import { MenuEntity, ProjectMenuEntity } from "@/entitys/IMenu";

/**
 *  获取菜单集合 
 */
export async function getMenus(): Promise<MenuEntity[]> {
    const menus = await https.get("menu");
    return menus as MenuEntity[];
}



/**
 *  获取菜单信息 
 */
export async function getMenu(id: string): Promise<MenuEntity> {
    const menu = await https.get("menu", "browse", { id });
    return menu as MenuEntity;
}


/**
 * 新建菜单
 */
export async function createMenus(menu: MenuEntity): Promise<MenuEntity> {
    const data = {
        name: menu.name,
        type: menu.type
    } as any;
    if (menu.parentId !== "" && menu.parentId !== null && menu.parentId !== undefined)
        data.parentId = menu.parentId;
    const newmenu = await https.post("menu", "create", undefined, data);
    return newmenu as MenuEntity;
}

/**
 * 删除菜单
 * @参数 菜单Id
 */
export async function removeMenu(id: string) {
    await https.post("menu", "delete", undefined, { 'id': id });
}

/** 更新菜单 */
export async function updateMenu(menu: MenuEntity) {
    await https.post("menu", "update", undefined, { id: menu.id, name: menu.name });
}