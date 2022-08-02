import https from "@/utils/https/https"

// 获取用户信息
export async function User() {
    return await https.get("member", "user", undefined);
  }