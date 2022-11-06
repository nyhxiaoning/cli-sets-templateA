const TOKEN_KEY = "__KEY";

export function getTokenAuth () {
    return localStorage.getItem(TOKEN_KEY);
}