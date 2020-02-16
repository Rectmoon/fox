function isOneOf (dest) {
  return Array.isArray(dest)
    ? function (name) {
      return name && dest.indexOf(name) >= 0
    }
    : function (name) {
      return name && name === dest
    }
}

function trigger (dest, evt) {
  const params = []
  let len = arguments.length - 2
  while (len-- > 0) params[len] = arguments[len + 2]

  const is = isOneOf(dest)
  this.$children.forEach(function (child) {
    const name = child.$options.name
    if (is(name)) {
      child.$emit.apply(child, [evt].concat(params))
    } else {
      trigger.apply(child, [dest, evt].concat(params))
    }
  })
}

export default {
  methods: {
    // 向上（父组件）冒泡
    dispatch (dest, evt) {
      const params = []
      let len = arguments.length - 2
      while (len-- > 0) params[len] = arguments[len + 2]

      let parent = this.$parent || this.$root
      let name = parent.$options.name
      const is = isOneOf(dest)

      while (parent && !is(name)) {
        parent = parent.$parent
        if (parent) {
          name = parent.$options.name
        }
      }
      if (parent) parent.$emit.apply(parent, [evt].concat(params))
    },
    // 向下（子组件）广播
    broadcast () {
      var args = []
      var len = arguments.length

      while (len--) args[len] = arguments[len]

      trigger.apply(this, args)
    }
  }
}
