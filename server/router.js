const Router = require('koa-router')
const router = new Router()

const MarkDownFile = require('./mardownFile.js')
async function concatTemplet (ctx, next) {
  let mainHTMl = await MarkDownFile.toHTML(ctx)
  await ctx.render('template.html',{arr:[1,3,8], mainHtml: mainHTMl})
  // return mainHTMl
}

router.get('/', async (ctx, next) => {
  ctx.body = 'Hello world!'
  // await ctx.render('template.html',{arr:[1,2,3]})
})
.get('/pages', (ctx, next) => {
  ctx.body = 'the page router'
})
.get('/pages/:item', async (ctx, next) => {
  await concatTemplet(ctx, next)
})
.get('/pages/:item/:subitem', (ctx, next) => {
  ctx.body = 'the sub item '
})
.get('/mdsource', (ctx, next) => {
  ctx.body = 'the md srouce'
})

module.exports = router