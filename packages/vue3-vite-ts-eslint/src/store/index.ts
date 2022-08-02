// TODO:迁居导入store组件内容，类似自动引入全局化store
import modules from "./roleStore/autofile"
// import useUserStore  from './roleStore/basic'
// import useCounterStore from 'roleStore/counter'

console.log("%c💡 modules当前的最新打印，用完删除", 'background-color:blue;color:#fff', modules, '此时引入所有');
// 统一导出useStore方法
export default function useStore() {
  return {
    ...modules,
    // user: useUserStore(),
  }
}
console.log('增加使用方法')
// TODO:可以使用但是这样调用链条比较长：
// temp1.world.userStore().count
// 修改一个值temp1.world.userStore().$patch(state=>state.count = 10)