/** 事件总线管理 */
enum MittEnents {
    emitter = "emitter",//事件总线
    companyChange = "companyChange",//公司切换
    menuChange="menuChange",//菜单切换
    irConnectioned="irConnectioned",//ir连接成功后
    irConnectionFailure="irConnectionFailure",//ir连接失败后
    TaskTypeChange='TaskTypeChange',//任务类型改变后调用
}
export default MittEnents