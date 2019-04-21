const MarkdwonIt = require('markdown-it')
const path = require('path')
const fs = require('fs')
const hljs = require('highlight.js')

const md = new MarkdwonIt({
  html: true,
  linkify: true,
  typographer: true,
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return '<pre class="hljs"><code>' +
               hljs.highlight(lang, str, true).value +
               '</code></pre>';
      } catch (__) {}
    }

    return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>';
  }
})

const linkCreateId = function (md, params) {
  md.inline.ruler.before('link', 'link_addid', function replace(state) {
    let src = state.src
    if (~src.indexOf('#id=true')) {
      let reg = /^\[(.+)\]/
      let result = src.match(reg)
      if (result && result[1]) {
        src = src.replace('#id=true', '#id=' + result[1])
        state.posMax = src.length
        state.src = src
      }
    }
    // console.log(state)
  })
}
md
  .use(linkCreateId, 'to createsfddd')

function readFileMD (path) {
  return new Promise(function (resolve, reject) {
    fs.readFile(path, function (err, data) {
      if (err) {
        return console.error(err)
      }
      let boxString = data.toString()
      let html = md.render(boxString)
      resolve(html)
      // console.log('get the file' + data.toString())
    })
  })
}

async function toHTML (ctx) {
  let html
  let mdpath
  // let html = markdwon.toHTML('Hello *world*')
  let baseUrl = path.resolve(__dirname)
  let urlToArr = baseUrl.split('\/')
  urlToArr.pop()
  baseUrl = urlToArr.join('/')
  if (typeof ctx === 'string') {
    mdpath = `${baseUrl}${ctx}`
  } else {
    let orginMdPath = ctx.path ? ctx.path.replace(/pages/, 'mdsource') : ''
    // console.log('look this' + orginMdPath)
    // let mdpath = './server/test.md'
    mdpath = `${baseUrl}${orginMdPath}`
  }
  html = await readFileMD(mdpath)
  return html
}

module.exports = {
  toHTML
}