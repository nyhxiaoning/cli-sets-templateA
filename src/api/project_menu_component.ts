import https from "@/utils/https/https"
import { MenuComponentEntity } from "@/entitys/IMenuComponent"

/**
 * 新增组件
 * @param component 菜单组件
 * @returns 组件id
 */
export async function createComponent(component: MenuComponentEntity): Promise<string> {
    let parms = {
        owner: component.owner,
        logo: component.logo,
        name: component.name,
        type: component.type,
        properties: component.properties,
    }
    let id = await https.post("component", "create", undefined, parms)
    return id;
}

/**
 * 删除组件
 * @param id 组件id
 */
export async function deleteComponent(id: string): Promise<void> {
    await https.post("component", "delete", undefined, { id: id })
}

/**
 * 修改组件
 * @param component 菜单组件
 * @explain 暂时仅可修改图标及名称。
 */
export async function updateComponent(component: MenuComponentEntity): Promise<void> {
    let parms = {
        id: component.id
    } as any
    if (component.logo || "")
        parms.logo = component.logo
    if (component.name || "")
        parms.name = component.name
    await https.post("component", "update", undefined, parms)
}


/**
 *  获取组件详情
 */
export async function browseComponent(id: string): Promise<MenuComponentEntity> {
    let component = await https.get("component", undefined, { id: id })
    return component as MenuComponentEntity;
}


/**
 *  获取组件集合 
 */
export async function getComponents(owner: string): Promise<MenuComponentEntity[]> {
    let components = await https.get("component", "list", { owner: owner })
    return components as MenuComponentEntity[];
}

