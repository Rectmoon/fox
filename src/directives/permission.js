import store from '@/store'

export default {
  inserted (el, binding) {
    const { value } = binding
    const roles = store.getters && store.getters.roles
    if (value && value instanceof Array && value.length > 0) {
      const hasPermission = roles.some(role => value.includes(role))
      !hasPermission && el.parentNode && el.parentNode.removeChild(el)
    } else {
      throw new Error("need roles! Like v-permission=\"['admin','editor']\"")
    }
  }
}
