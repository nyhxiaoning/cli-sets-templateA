const router = require('koa-router')()

// ----------------------------get部分接口请求
/* 
 * 使用默认的路由访问/
*/
router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2 使用nodemon实现热更新!'
  })
})

/* 
* 使用/string路由访问
*/
router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

/* 
* 使用/json路由访问
*/
router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

/* 
* 获取动态get参数的路由：动态路由
*/

router.get("/get/:id", async (ctx, next) => {
  const { id } = ctx.params;
  ctx.body = `您此时传递的参数是${id}`
})

// -------------------------post接口传递
router.post('/juejin', async (ctx, next) => {
  const { name, id } = ctx.request.body;
  ctx.body = {
    name: `您的用户名名称${name}`,
    id: `${id}`
  }
})



// -----------------------------put接口
router.put('/juejin/:id',async (ctx,next)=>{
  const {  name } = ctx.request.body;
  ctx.body = {
    name: `我要修改的用户名名称${name}`,
  }
})



// -----------------------------del接口
router.del('/juejin/:id',async (ctx,next)=>{
  const {  name } = ctx.request.body;
  ctx.body = {
    name: `我要删除的用户名名称${name}`,
  }
})


module.exports = router
