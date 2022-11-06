import checkboxlib from "./src/checkboxlib.vue";

checkboxlib.install = Vue => {
    Vue.component(checkboxlib.name, checkboxlib);
};

export default checkboxlib;