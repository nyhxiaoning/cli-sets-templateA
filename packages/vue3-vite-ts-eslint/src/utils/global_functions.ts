
/**
 * 获取缓存token
 */
export function getToken(): string | null {
    const token = localStorage.getItem('token');
    return token;
}

/**
 * 移除缓存token
 */
export function removeToken(): void {
    localStorage.removeItem('token');
}

/**
 * 设置缓存token
 */
export function setToken(token: string) {
    //缓存token
    if (token) {
        localStorage.setItem('token', token);
    }
}

/**
 * 是否有token
 */
export function hasToken(): boolean {
    const token = localStorage.getItem("token");
    if (token && token !== null && token !== undefined && token !== "") return true;
    else return false;
}
