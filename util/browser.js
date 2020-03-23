/*
 * @Description: browser tool
 * @Author: liupeng
 * @Date: 2020-03-20 17:24:29
 * @LastEditTime: 2020-03-23 13:24:45
 * @LastEditors: liupeng
 */

;(function(name, definition) {
  // 检测上下文环境是否为AMD或CMD
  var hasDefine = typeof define === 'function'
  // 检测上下文环境是否为Node
  var hasExports = typeof module !== 'function' && module.exports
  if (hasDefine) {
    // AMD环境或CMD环境
    define(definition)
  } else if (hasExports) {
    // 定义为普通Node模块
    module.exports = definition()
  } else {
    // 将模块的执行结果挂在window变量中，在浏览器中this指向window对象
    this[name] = definition()
  }
})('$Pbrowser', function() {
  /**
   * 返回当前url
   * @param { }
   */
  const currentURL = () => window.location.href
  /**
   * 获取url参数
   * @param {*} name
   * @param {*} origin
   */

  function getUrlParam(name, origin = null) {
    let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
    let r = null
    if (origin == null) {
      r = window.location.search.substr(1).match(reg)
    } else {
      r = origin.substr(1).match(reg)
    }
    if (r != null) return decodeURIComponent(r[2])
    return null
  }
  /**
   * 修改url中的参数
   * @param { string } paramName
   * @param { string } replaceWith
   */
  function replaceParamVal(paramName, replaceWith) {
    var oUrl = location.href.toString()
    var re = eval('/(' + paramName + '=)([^&]*)/gi')
    location.href = oUrl.replace(re, paramName + '=' + replaceWith)
    return location.href
  }
  /**
   * 删除url中指定的参数
   * @param { string } name
   */
  function funcUrlDel(name) {
    var loca = location
    var baseUrl = loca.origin + loca.pathname + '?'
    var query = loca.search.substr(1)
    if (query.indexOf(name) > -1) {
      var obj = {}
      var arr = query.split('&')
      for (var i = 0; i < arr.length; i++) {
        arr[i] = arr[i].split('=')
        obj[arr[i][0]] = arr[i][1]
      }
      delete obj[name]
      var url =
        baseUrl +
        JSON.stringify(obj)
          .replace(/[\"\{\}]/g, '')
          .replace(/\:/g, '=')
          .replace(/\,/g, '&')
      return url
    }
  }
  /**
   * 获取窗口可视范围的高度
   * @param {}
   */
  function getClientHeight() {
    let clientHeight = 0
    if (document.body.clientHeight && document.documentElement.clientHeight) {
      clientHeight = document.body.clientHeight < document.documentElement.clientHeight ? document.body.clientHeight : document.documentElement.clientHeight
    } else {
      clientHeight = document.body.clientHeight > document.documentElement.clientHeight ? document.body.clientHeight : document.documentElement.clientHeight
    }
    return clientHeight
  }
  /**
   * 获取窗口可视范围宽度
   * @param {}
   */
  function getPageViewWidth() {
    let d = document,
      a = d.compatMode == 'BackCompat' ? d.body : d.documentElement
    return a.clientWidth
  }
  /**
   * 获取窗口宽度
   * @param {}
   */
  function getPageWidth() {
    let g = document,
      a = g.body,
      f = g.documentElement,
      d = g.compatMode == 'BackCompat' ? a : g.documentElement
    return Math.max(f.scrollWidth, a.scrollWidth, d.clientWidth)
  }
  /**
   * 获取窗口尺寸
   * @param {}
   */
  function getViewportOffset() {
    if (window.innerWidth) {
      return {
        w: window.innerWidth,
        h: window.innerHeight
      }
    } else {
      // ie8及其以下
      if (document.compatMode === 'BackCompat') {
        // 怪异模式
        return {
          w: document.body.clientWidth,
          h: document.body.clientHeight
        }
      } else {
        // 标准模式
        return {
          w: document.documentElement.clientWidth,
          h: document.documentElement.clientHeight
        }
      }
    }
  }
  /**
   * 获取滚动条距顶部高度
   * @param {}
   */
  function getPageScrollTop() {
    let a = document
    return a.documentElement.scrollTop || a.body.scrollTop
  }

  /**
   * 获取滚动条距左边的高度
   * @param {}
   */
  function getPageScrollLeft() {
    let a = document
    return a.documentElement.scrollLeft || a.body.scrollLeft
  }
  /**
   * 开启全屏
   * @param {*} element
   */
  function launchFullscreen(element) {
    if (element.requestFullscreen) {
      element.requestFullscreen()
    } else if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen()
    } else if (element.msRequestFullscreen) {
      element.msRequestFullscreen()
    } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullScreen()
    }
  }
  /**
   * 关闭全屏
   * @param {}
   */
  function exitFullscreen() {
    if (document.exitFullscreen) {
      document.exitFullscreen()
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen()
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen()
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen()
    }
  }

  /**
   * 返回当前滚动条位置
   * @param {}
   */
  const getScrollPosition = (el = window) => ({
    x: el.pageXOffset !== undefined ? el.pageXOffset : el.scrollLeft,
    y: el.pageYOffset !== undefined ? el.pageYOffset : el.scrollTop
  })
  /**
   * 滚动到指定元素区域
   * @param {}
   */
  const smoothScroll = element => {
    document.querySelector(element).scrollIntoView({
      behavior: 'smooth'
    })
  }
  /**
   * 平滑滚动到页面顶部
   * @param {}
   */
  const scrollToTop = () => {
    const c = document.documentElement.scrollTop || document.body.scrollTop
    if (c > 0) {
      window.requestAnimationFrame(scrollToTop)
      window.scrollTo(0, c - c / 8)
    }
  }
  /**
   * http跳转https
   * @param {}
   */
  const httpsRedirect = () => {
    if (location.protocol !== 'https:') location.replace('https://' + location.href.split('//')[1])
  }
  /**
   * 检查页面底部是否可见
   * @param {}
   */
  const bottomVisible = () => {
    return document.documentElement.clientHeight + window.scrollY >= (document.documentElement.scrollHeight || document.documentElement.clientHeight)
  }
  /**
   * 打开一个窗口
   * @param { string } url
   * @param { string } windowName
   * @param { number } width
   * @param { number } height
   */
  function openWindow(url, windowName, width, height) {
    var x = parseInt(screen.width / 2.0) - width / 2.0
    var y = parseInt(screen.height / 2.0) - height / 2.0
    var isMSIE = navigator.appName == 'Microsoft Internet Explorer'
    if (isMSIE) {
      var p = 'resizable=1,location=no,scrollbars=no,width='
      p = p + width
      p = p + ',height='
      p = p + height
      p = p + ',left='
      p = p + x
      p = p + ',top='
      p = p + y
      window.open(url, windowName, p)
    } else {
      var win = window.open(url, 'ZyiisPopup', 'top=' + y + ',left=' + x + ',scrollbars=' + scrollbars + ',dialog=yes,modal=yes,width=' + width + ',height=' + height + ',resizable=no')
      eval('try { win.resizeTo(width, height); } catch(e) { }')
      win.focus()
    }
  }

  var Pbrowser = {
    currentURL: currentURL,
    getScrollPosition: getScrollPosition,
    smoothScroll: smoothScroll,
    scrollToTop: scrollToTop,
    httpsRedirect: httpsRedirect,
    bottomVisible: bottomVisible,
    getUrlParam: getUrlParam,
    replaceParamVal: replaceParamVal,
    funcUrlDel: funcUrlDel,
    getClientHeight: getClientHeight,
    getPageViewWidth: getPageViewWidth,
    getPageWidth: getPageWidth,
    getViewportOffset: getViewportOffset,
    getPageScrollTop: getPageScrollTop,
    getPageScrollLeft: getPageScrollLeft,
    launchFullscreen: launchFullscreen,
    exitFullscreen: exitFullscreen,
    openWindow: openWindow
  }
  return Pbrowser
})
