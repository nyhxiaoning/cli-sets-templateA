import https from "../httpaxios";//导入https方法

// 模拟获取当前的权限
type IUser = {
    username: string;
    password: string;
}

/**
 * 获取用户信息11
 */
export async function getUser<T>(data: string): Promise<T> {
    return await https.get("user", `search?id=${data}}`, undefined)

}

/**
 * 创建一个用户
 * @param data 
 * @returns 
 */
export async function createUser<T>(data: IUser): Promise<T> {
    return await https.post("user", "createuser", undefined, data)
}