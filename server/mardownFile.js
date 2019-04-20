const MarkdwonIt = require('markdown-it')
const path = require('path')
const fs = require('fs')

const md = new MarkdwonIt({
  html: true,
  linkify: true,
  typographer: true
})

function readFileMD (path) {
  return new Promise(function (resolve, reject) {
    fs.readFile(path, function (err, data) {
      if (err) {
        return console.error(err)
      }
      let html = md.render(data.toString())
      resolve(html)
      // console.log('get the file' + data.toString())
    })
  })
}

async function toHTML (ctx) {
  let html
  // let html = markdwon.toHTML('Hello *world*')
  let baseUrl = path.resolve(__dirname)
  let urlToArr = baseUrl.split('\/')
  urlToArr.pop()
  baseUrl = urlToArr.join('/')
  let orginMdPath = ctx.path ? ctx.path.replace(/pages/, 'mdsource') : ''
  console.log('look this' + orginMdPath)
  let mdpath = './server/test.md'
  html = await readFileMD(mdpath)
  return html
}

module.exports = {
  toHTML
}