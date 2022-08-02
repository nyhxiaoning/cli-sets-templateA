import { createStore } from 'vuex';

// 自动化导入
import modules from './modules';
// @ts-ignore
// 创建一个新的 store 实例
const store = createStore({
    modules,
    state: {
        // 增加了在初始化时从缓存中读取公司id的机制
        companyId: localStorage.getItem("companyId"),
        // 当前菜单的id
        selectMenuId: ""
        // idOfTheItem:getIdOfTheItem() as any //当前选中项目的id
    },
    mutations: {
    },
    actions: {
    },
    getters: {
        // 获取到最终的数据结果
        getCompanyId(state:any) {
            return state.companyId;
        }
    }
});

export default store;
