import https from "@/utils/https/https"

/** 
 * 设置默认优先级
 * @param id 优先级id
 */
export async function setdefaultPriority(id: string): Promise<void> {
    await https.post("priority", "setdefault", { id })
}

/** 
 * 设置优先级顺序
 * @param id 优先级id
 */
export async function setPrioritySort(id: string, sort: string): Promise<void> {
    await https.post("priority", "setsort", { id, sort })
}

/** 删除优先级 */
export async function deletePriority(id: string) {
    await https.post("priority", "delete", { id })
}


/**
 * 创建优先级
 * @param name 优先级名称
 * @param foreColor 颜色
 * @param description 描述
 */
export async function createPriority(name: string, foreColor: string, description: string): Promise<void> {
    await https.post("priority", "create", undefined, { name, foreColor, description })
}

/**
 * 更新优先级
 * @param params 新数据
 */
export async function updatePriority(params: any): Promise<void> {
    await https.post("priority", "update", undefined, params)
}



/** 通过关键字搜索优先级 */
export async function queryPriority(keyword: string): Promise<any[]> {
    return await https.get<any[]>("priority", "query", { keyword })
}