import Vue from 'vue'
import Component from './func-notification'

const NotificationCon = Vue.extend(Component)

const instances = []

let i = 1

const removeInstance = instance => {
  if (!instance) return
  const len = instances.length
  const index = instances.findIndex(item => item.id === instance.id)
  instances.splice(index, 1)
  if (len > 1) {
    const removeHeight = instance.vm.height
    for (let i = index; i < len - 1; i++) {
      instances[i].verticalOffset =
        parseInt(instances[i].verticalOffset) - removeHeight - 16
    }
  }
}

export default options => {
  if (Vue.prototype.$isServer) return

  const { autoClose, ...opts } = options
  const instance = new NotificationCon({
    propsData: { ...opts },
    data: {
      autoClose: !!autoClose ? autoClose : false
    }
  })

  const id = `notification_${i++}`
  instance.id = id
  instance.vm = instance.$mount()
  document.body.appendChild(instance.vm.$el)
  instance.vm.visible = true

  let verticalOffset = 0
  instances.forEach(item => {
    verticalOffset += item.$el.offsetHeight + 16
  })
  verticalOffset += 16
  instance.verticalOffset = verticalOffset
  instances.push(instance)

  instance.vm.$on('closed', () => {
    removeInstance(instance)
    document.body.removeChild(instance.vm.$el)
    instance.vm.$destroy()
  })

  instance.vm.$on('close', () => {
    instance.vm.visible = false
  })

  return instance.vm
}
