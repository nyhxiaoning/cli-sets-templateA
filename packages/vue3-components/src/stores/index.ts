import { createStore } from 'vuex'

const modulesFiles = import.meta.globEager('./modules/*.ts')
const modules = Object.entries(modulesFiles).reduce((modules: any, [path, mod]: [any, any]) => {
  const moduleName = path.replace(/^\.\/modules\/(.*)\.\w+$/, '$1')
  modules[moduleName] = mod.default
  return modules
}, {})

export default createStore({
  modules,
})
