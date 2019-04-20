
const serveStatic = require('koa-static')
const Koa = require('koa')
const router = require('./router.js')
const views = require('koa-views')
const path = require('path')

function formatStaticPath () {
  let pathSplit = __dirname.split('\/')
  pathSplit.pop()
  let baseUrl = pathSplit.join('/')
  // return baseUrl + '/static'
  return baseUrl
}

let staticPath = formatStaticPath()
console.log(staticPath)
const app = new Koa()
app.use(serveStatic(staticPath))
// app.use( async ctx => {
//   ctx.body = 'Hello World'
// })
app.use(views(path.resolve(__dirname), {
  //不设置的话，模板文件要使用.ejs后缀而不是.htmls后缀
  map: { html: 'ejs' }  
}))

app
  .use(router.routes())
  .use(router.allowedMethods())
app.listen(3000)