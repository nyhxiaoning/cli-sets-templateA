// TODO:这里说明一下
// use实现原理中
// TODO：多次注册一个插件，只能有一个,因为使用indexOf判断
// TODO：vue中注册插件的时候，可以是直接插件是函数，或是插件中有install方法，可以注册函数
// TODO：往参数数组前插入当前vue对象的目的在于这样之后开发插件时就不用单独引入Vue了，减少了包体积，属于一种优化。如上，如果没有这样做的话，上边的插件例子就需要import Vue from 'vue'，而不是直接使用vue，(注意：vue是传进来的参数，只不过我知道那个是vue实例，所以写成了vue)。
// ————————————————
// 版权声明：本文为CSDN博主「ECMAScripter」的原创文章，遵循CC 4.0 BY - SA版权协议，转载请附上原文出处链接及本声明。
// 原文链接：https://blog.csdn.net/Fabulous1111/article/details/88696006
export default function (vue, b, c) {
    console.log(vue);
    vue.prototype.myNoAdd = function (x, y) {
        console.log(x - y);
    };
}