import { add, remove } from '@/utils/eventListener'

const context = '_vueScrollUnique_'
let eventType = 'mousewheel'

if (document.mozHidden && typeof document.mozHidden !== 'undefined') { eventType = 'DOMMouseScroll' }

export default {
  bind (el, binding) {
    const handler = function (event) {
      const scrollTop = el.scrollTop
      const scrollHeight = el.scrollHeight
      const clientHeight = el.clientHeight
      const delta = event.wheelDelta ? event.wheelDelta : -(event.wheelDelta || 0)
      if (
        (delta > 0 && scrollTop <= delta) ||
        (delta < 0 && scrollHeight - clientHeight - scrollTop <= -1 * delta)
      ) {
        el.scrollTop = delta > 0 ? 0 : scrollHeight
        event.preventDefault()
      }
    }
    el[context] = {
      opt: binding.value,
      fn: handler
    }
    add(el, eventType, el[context].fn, { passive: false })
  },
  update (el, binding) {
    binding && binding.value && (el[context].opt = binding.value)
  },
  unbind (el) {
    remove(el, eventType, el[context].fn)
  },

  install (Vue) {
    Vue.directive('scroll-unique', {
      bind: this.bind,
      update: this.update,
      unbind: this.unbind
    })
  }
}
