import https from "@/utils/https/https";
import { MemberEntity } from "@/entitys/IMember";

/**
 * 搜索该企业所有符合条件的成员，如果传入空值则加载企业所有成员
 * @param query 条件
 * @returns 
 */
export async function memberSearch(query: string | undefined): Promise<MemberEntity[]> {
    const members = await https.get("member", "search", { query });
    return members as MemberEntity[];
}


/**
 * 搜索该企业所有符合条件的有效成员
 * @param query 条件
 * @returns 
 */
export async function effectivemember(query: string | undefined=undefined): Promise<MemberEntity[]> {
    const members = await https.get("member", "effectivemember", { query });
    return members as MemberEntity[];
}


/**
 * 获取当前登录用户信息
 * @returns 
 */
export async function getCurrentUserInfo(): Promise<MemberEntity> {
    return await https.get<MemberEntity>("member", "user", undefined);
}

