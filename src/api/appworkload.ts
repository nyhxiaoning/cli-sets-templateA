import https from "@/utils/https/https";

//工时模块API

/**
 * 登记工时
 * @param parms 
 */
export async function registrationTime(parms: any) {
    return await https.post("appworkload", "create", undefined, parms);
}

/**
 * 更新工时
 * @param newValue 
 * @returns 
 */
export async function updateWorkload(newValue: any) {
    return await https.post("appworkload", "update", undefined, newValue);
}