export default {
  namespaced: true,
  state: {
    name: "task111111111"
  },
  getters: {
    getNewName(state: any) {
      return state.name + "!!!!";
    }
  },
  mutations: {
    updateTaskName(state: any, data: string) {
      state.name = data;
      console.log(data);
    }
  },
  actions:{
    updateTaskName(state: any, data: string) {
      state.name = data;
      console.log(data);
    }
  }
};
