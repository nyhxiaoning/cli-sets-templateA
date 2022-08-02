import { defineStore } from 'pinia';
export const useUserStore = defineStore('storeUser', {
    state() {
        return {
            firstName: 'S',
            lastName: 'L',
            accessToken: 'xxxxxxxxxxxxx',
        }
    },
    // 数据持久化
    persist: {
        enabled: true,
        strategies: [
            {
                key: 'user',  //自定义 Key值
                storage: localStorage,  // 选择存储方式
            },
        ],
    },
})