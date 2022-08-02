import { getCurrentUserInfo } from "@/api/member";

export default {
    namespaced: true,
    state: () => ({
        /** 当前用户数据 */
        currentUser: {
            name: "",
            userId: "",
            email: "",
            profile: "",
            phone: ""
        }
    }),
    mutations: {
        // 设置options
        setOptions(state: any, newValue: any) {
            state.currentUser = newValue;
        }
    },
    actions: {
        /** 自动拉取当前用户信息 */
        async pullCurrentUser(context: any) {
            const _info = await getCurrentUserInfo();
            context.state.currentUser.name = _info.name;
            context.state.currentUser.userId = _info.userId;
            context.state.currentUser.email = _info.email;
            context.state.currentUser.profile = _info.profile;
            context.state.currentUser.phone = _info.phone;
            // sessionStorage.setItem(StorageKeys.currentUser,JSON.stringify(_info))
        }
    },
    getters: {
        currentUser: (state: any) => {
            return state.currentUser;
            // return sessionStorage.getItem(StorageKeys.currentUser)
        }
    }
};