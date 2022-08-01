import { App } from 'vue'

// 加载 src/components 下全部 vue 文件
const components:any = import.meta.globEager('./**/*.vue');

export default {
    install(app: App) {
        for (let i in components) {
            let component = components[i].default;
            app.component(component.name, component);
        }
    }
}