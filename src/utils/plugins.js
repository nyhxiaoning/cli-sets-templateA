// TODO:这里说明一下
// use实现原理中
// TODO：多次注册一个插件，只能有一个
// TODO：vue中注册插件的时候，可以是直接插件是函数，或是插件中有install方法，可以注册函数
export default {
    install (vue, b, c) {
        console.log(vue);
        console.log('bc');
        // TOdo:将方法绑定到全局中
        this.addGlobalMethod(vue);
    },
    // TODO:增加方法
    addGlobalMethod (vue) {
        vue.prototype.myAdd = function (x, y) {
            console.log(x + y);
        };
    },

};