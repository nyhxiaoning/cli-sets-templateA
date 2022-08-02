// import { session } from "/utils/index";
// import { getUserinfo } from "/api/login";
const state = {
  menus: [],
  user: null,
  token: "",
};

const Obj = {
  namespaced: true,
  state,
  mutations: {
    setData(state:any, obj:any) {
      Object.assign(state, obj);
      // session("common", state);
    },
  },
  getters: {},
  actions: {
    // async getUserinfo({ commit }) {
    //   const { code, data } = await getUserinfo();
    //   if (code == 200) {
    //     commit("setData", {
    //       user: data,
    //     });
    //   }
    // },
  },
};

export default Obj;
