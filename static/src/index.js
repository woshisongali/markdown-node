

function getQueryString(urlSearch, name) { 
  if (!urlSearch) { return null }
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
  var r = urlSearch.substr(1).match(reg); 
  if (r != null) return r[2]; 
  return null; 
} 
var page = {
  init () {
    console.log('start')
    this.bindEvent()
    this.linkBlank()
    this.asideScroll()
  },

  linkBlank () {
    let links = $('.main-box a')
    console.log(links.length)
    links.each(function () {
      console.log('look linke')
      $(this).attr('target', '_blank')
    })
  },

  asideScroll () {
    let url = window.location.href
    let formatUrl = url.split('\/').slice(3).join('\/')
    if (!formatUrl) { return }
    let linkele = $('a[href="/' + formatUrl +'"]')
    if (linkele.length === 0) {
      return
    }
    // let top = linkele.offset().top
    linkele.parent().addClass('active')
    let scrollTop = localStorage.getItem("asideTop") || 0
    $('.main-aside').scrollTop(scrollTop)
  },
  restoreAsideTop () {
    let scrollTop = $('.main-aside').scrollTop()
    localStorage.setItem("asideTop", scrollTop)
  },
  bindEvent () {
    let self = this
    function createTitle () {
      let str = ''
      let url = window.location.href.split('#')[0]
      // 去掉http的头和域名
      let formatUrl = url.split('\/').slice(3).join('\/')
      
      const eles = $('h1, h2, h3, h4, h5, h6')
      // const eles = $('h4')
      console.log(eles.length)
      for (let i = 0, len = eles.length; i < len; i++) {
        str += '- [' + eles[i].innerHTML + '](/' + formatUrl + '?#id=true)' + '\n'
      }
      console.log(str)
    }
    $('#dealMarkDown').on('click', function (e) {
      let target = e.target || e.srcElement
      var operatstr = target.getAttribute('data-opera')
      switch (operatstr) {
        case 'createTitle':
        createTitle()
        break
        default:
      }
    })

    $('.main-aside').on('click', function (e) {
      self.restoreAsideTop()
      let target = e.target || e.srcElement
      let url
      if (target.tagName.toLowerCase() === 'a') {
        url = target.getAttribute('href')
        url = url ? decodeURIComponent(url) : null
      } else {
        return
      }
      let id = getQueryString(url.split('?')[1], 'id')
      let titlele = $('#' + id)
      if (titlele.length === 0) {
        titlele = $(document.getElementById(id))
      }
      if (titlele.length === 0) { return}
      let top = titlele.offset().top
      document.documentElement.scrollTop = top 
      document.body.scrollTop = top
      $('.main-aside li').removeClass('active')
      // console.log($(this).parent())
      $(target).parent().addClass('active')
      
    })
  }
}

$(document).ready(function () {
  page.init()
})