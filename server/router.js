const Router = require('koa-router')
const router = new Router()

const MarkDownFile = require('./mardownFile.js')
async function concatTemplet (ctx, next) {
  let mainHTMl = await MarkDownFile.toHTML(ctx)
  let asidHTML = await MarkDownFile.toHTML('/mdsource/_aside.md')
  await ctx.render('template.html',{
    arr:[1,3,8], 
    mainHtml: mainHTMl,
    asidHTML: asidHTML
  })
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
.get('/pages/:item/:subitem', async (ctx, next) => {
  // ctx.body = 'the sub item '
  await concatTemplet(ctx, next)
})
.get('/mdsource', (ctx, next) => {
  ctx.body = 'the md srouce'
})

module.exports = router