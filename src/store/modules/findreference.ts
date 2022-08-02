export default {
  namespaced: true,
  state: {
    // 配置一个进入工作项选项的创建方式UI
    selectConfigType: "large",
    // 本文件记录所有的列配置的属性文件。
    // name:'quote'查找引用和引用属性
    name: "findreference",
    //  获取当前的任务视图
    collections: [],
    //   获取任务表格下的list数据
    listOneChild: [],
    listTwoChild: [],
    listThreeChild: [],
    listFourChild: [],
    // 当前的查找引用操作过的一条数据记录，用于点击返回和回溯
    resultCollectionList: [],
    // 当前用户的操作的表格id:项目id
    userOperationTableMenuId: "" as string,
    // 记录当前的查找引用的总对象此时存储内容
    conditionReferenceValues: {} as any,
    // 记录当前的查找引用的总对象此时存储内容
    conditionQuoteValues: {} as any
  },
  mutations: {
    /**
     *
     * @param state
     * @param data 配置一个进入工作项选项的创建方式，如果通过配置进入风格是small，如果是通过外面，直接是large
     */
    setSelectConfigType(state: any, data: any) {
      state.selectConfigType = data;
    },
    /**
     *
     * @param state 当前的查找引用的数据存储
     * @param data 当前的查找引用的任务视图数据
     */
    updateCollections(state: any, data: any) {
      const tempData = [] as any;
      //
      data.forEach((items: { name: any; id: any }) => {
        tempData.push({
          label: items.name,
          value: items.id,
          ...items
        });
      });
      state.collections = tempData;
    },
    /**
     *
     * @param state
     * @param data 当前的更新查找引用下的表格list
     */
    updateLists(state: any, data: any) {
      const tempData = [] as any;
      data.forEach((items: { name: any; id: any }) => {
        tempData.push({
          label: items.name,
          value: items.id,
          ...items
        });
      });
      state.listOneChild = tempData;
    },
    /**
     *
     * @param state
     * @param data 同步当前的查找引用结果集合
     */
    backupResultCollectList(state: any, data: any) {
      state.resultCollectionList.push(data);
      console.log("-----------此时数据清空了吗", data);
    },
    clearResultCollectList(state: any, data: any) {
      // 2表示删除清空
      state.resultCollectionList = [];
      console.log("-----------此时这里调用了clearResultCollectList吗");
    },
    /**
     * 当前用户的操作的表格：数据同步
     * @param state
     * @param data
     */
    backupOperationTableMenuId(state: any, data: any) {
      console.log(data, "-------------00000000000当前的menuId获取");
      state.userOperationTableMenuId = data;
    },
    /**
     * 实时更新最新的更新条件：查找引用对象
     * @param state
     * @param data
     */
    updateConditionReferenceValuesFn(state: any, data: any) {
      state.conditionReferenceValues = data;
    },
    /**
     * 实时更新最新的更新条件：查找引用对象
     * @param state
     * @param data
     */
    updateConditionQuoteValuesFn(state: any, data: any) {
      state.conditionQuoteValues = data;
    }
  },
  actions: {}
};
