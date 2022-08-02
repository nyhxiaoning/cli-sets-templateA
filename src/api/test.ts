import https from  "~/utils/https/https";


/**
 * 获取系统提供的项目模板
 * @param parms 
 */

export async function getTermQuery(str:string) {
    return await https.get("sprint", `query?keyword=${str}`, undefined);
}

/**
 * 更新工时
 * @param newValue 
 * @returns 
 */
export async function updateWorkload(newValue: any) {
    return await https.post("appworkload", "update", undefined, newValue);
}
