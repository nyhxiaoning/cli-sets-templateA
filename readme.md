[toc]

笔记链接
[印象笔记学习地址](https://app.yinxiang.com/shard/s37/nl/24388549/11266896-efa2-449b-94ae-823db88dc864)


[极客时间联动学习](https://gitee.com/nyhxiaoning/geek-nodejs.git)

# 导入入门koa2项目
## 创建一个koa2的项目

npm install -g koa-generator koa2 

安装一个koa2脚手架。

koa2 vue-serve -e -c less 

## koa-generator参数

-e使用ejs模板引擎（默认使用pug）[ejs.bootcss.com](https://link.juejin.cn?target=https%3A%2F%2Fejs.bootcss.com)--hbs使用handlebars模板引擎[www.handlebarsjs.cn](https://link.juejin.cn?target=https%3A%2F%2Fwww.handlebarsjs.cn)-H使用 hogan.js 模板引擎[twitter.github.io/hogan.js](https://link.juejin.cn?target=https%3A%2F%2Ftwitter.github.io%2Fhogan.js)-n使用 nunjucks 模板引擎[nunjucks.bootcss.com](https://link.juejin.cn?target=https%3A%2F%2Fnunjucks.bootcss.com)-c指定 css编译器（less|stylus|compass|sass）（默认使用css）-f强制目录不能为空



## 路由和模板位置
koa-generator生成好了路由和模板调用，我们只需要看routes和views两个文件夹。



## 启动项目

npm run start  



localhost:3000

注意这里没有开放ip访问。


## 热更新
这里使用npm  run start

如果修改文件后，需要重启才能看到。

我们可以使用nodemon实现热更新

dev:"nodemon  bin/www"
//配置内容："dev": "./node_modules/.bin/nodemon bin/www",

这里寻址nodemon后启动

## Chrome中调试node

debug："nodemon  --inspect  bin/www"



## 文件的路由分类（routes）
### 父路由放在index中，子路由放在users.js中



## 前面一直没有讲请求中的next是干嘛的，
涉及Koa的洋葱模型，next用来改变中间件的执行顺序。

~~~


const one = (ctx, next) => {
  console.log('👉 one');
  next();
  console.log('<< one');
}
 
const two = (ctx, next) => {
  console.log('👉 two');
  next();
  console.log('<< two');
}
 
const three = (ctx, next) => {
  console.log('👉 three');
  next();
  console.log('<< three');
}
 
app.use(one);
app.use(two);
app.use(three);
 
输出结果：
👉 one
👉 two
👉 three
<< three
<< two
<< one

作者：Maokai
链接：https://juejin.cn/post/7059401467542634533
来源：稀土掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

~~~


# 模板渲染

## ejs的3种常用标签：
~~~
<% code %>：运行 JavaScript 代码，不输出
<%= code %>`：显示转义后的 HTML内容
<%- code %>：显示原始 HTML 内容
在要换行的时候换行的那行要加上%>,在内容书写结束后要加上<%
<% for(var i=0; i<supplies.length; i++) {%>
   <li><%= supplies[i] %></li>
<% } %>
~~~