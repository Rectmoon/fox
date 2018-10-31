import { add, remove } from '@/utils/eventListener'

function noop() {}

function ensure(f) {
  return typeof f === 'function' ? f : noop
}

function isServer(vNode) {
  return (
    typeof vNode.componentInstance !== 'undefined' &&
    vNode.componentInstance.$isServer
  )
}

const CONTEXT = '__vueClickoutside__'

export default {
  bind(el, binding, vNode) {
    let handler = binding.value
    function wrappedHandler(event) {
      var target = event.target
      if (!el.contains(target)) el[CONTEXT].callback(event)
    }
    el[CONTEXT] = {
      callback: ensure(handler),
      handler: wrappedHandler
    }
    if (!isServer(vNode)) add(document, 'click', wrappedHandler)
  },
  update: function update(el, binding) {
    el[CONTEXT].callback = ensure(binding.value)
  },
  unbind(el, binding, vNode) {
    if (el[CONTEXT]) {
      let handler = el[CONTEXT].handler
      if (!isServer(vNode)) remove(document, 'click', handler)
    }
  },
  install(Vue) {
    Vue.directive('clickoutside', {
      bind: this.bind,
      update: this.update,
      unbind: this.unbind
    })
  }
}
