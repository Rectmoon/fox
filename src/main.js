import Vue from 'vue'
import App from './App.vue'
import 'iview/dist/styles/iview.css'

import iView from 'iview'
import store from './store'
import router from './router'
import Bus from '@/mixins/bus'
import Notification from '@/components/notification'

Vue.use(Bus)
Vue.use(iView)
Vue.use(Notification)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
