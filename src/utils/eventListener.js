'use strict'

Object.defineProperty(exports, '__esModule', { value: true })

var passiveSupported = false
try {
  // 不支持 addEventListener 和 Object.defineProperty 的平台，一定不支持 passive 开关
  var options = Object.defineProperty({}, 'passive', {
    get: function() {
      passiveSupported = true
      return undefined
    }
  })
  window.addEventListener('test-passive', null, options)
} catch (err) {
  console.log(err)
}

var isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined'

var _addEventListener = function() {}
var _removeEventListener = function() {}

if (isBrowser) {
  _addEventListener = document.addEventListener // 现代浏览器
    ? function(element, event, handler, options) {
        var ref =
          typeof options === 'boolean' ? { capture: options } : options || {}
        var capture = ref.capture
        if (capture === void 0) capture = false
        var passive = ref.passive
        if (passive === void 0) passive = true
        element.addEventListener(
          event,
          handler,
          passiveSupported ? { capture: capture, passive: passive } : capture
        )
      }
    : // IE 8-
      function(element, event, handler) {
        if (element && event && handler) {
          //element.attachEvent('on' + event, handler);
          element.attachEvent('on' + event, function() {
            //使函数体内this指向element
            return handler.call(element, window.event)
          })
        }
      }

  _removeEventListener = document.removeEventListener
    ? function(element, event, handler) {
        element.removeEventListener(event, handler)
      }
    : function(element, event, handler) {
        element.detachEvent('on' + event, handler)
        element.detachEvent('on' + event, function() {
          return handler.call(element, window.event)
        })
      }
}

var add = _addEventListener
var remove = _removeEventListener

/**
 * 别名
 */
var on = add
var off = remove

exports.add = add
exports.remove = remove
exports.on = on
exports.off = off

/*
参数说明
 1. element  // `DOM` 对象
2. eventType  // 事件类型
3. handler  // 事件句柄
4. options  //  可传递 `boolean` 值表示 ` handler`在事件流的哪个阶段触发。 or传递对象`{capture: Boolean, once: Boolean, passive: Boolean}`  可参考MDN的[addEventListener](https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/addEventListener)

  */
