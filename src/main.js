import Vue from 'vue'
import App from './App.vue'
import 'iview/dist/styles/iview.css'

import iView from 'iview'
import store from './store'
import router from './router/index'
import Bus from '@/mixins/bus'
import Notification from '@/components/notification'
import constRoutes from '@/router/constant'
import NotFound from '@/views/404'
import { getMenuData } from '@/api/auth'
import s from '@/utils/storage'

Vue.use(Bus)
Vue.use(iView)
Vue.use(Notification)

Vue.config.productionTip = false

const formatRoutes = function(routes, routeData) {
  if (!routeData) {
    routeData = {
      name: 'home',
      path: '/home',
      component: constRoutes['home'],
      children: []
    }
  }
  routes.length &&
    routes.forEach(route => {
      if (route.component) {
        route.component = constRoutes[route.component]
        routeData.children.push({
          path: route.path,
          name: route.index,
          component: route.component,
          meta: {
            title: route.title
          }
        })
      }
      if (route.children && route.children.length) {
        formatRoutes(route.children, routeData)
      }
    })
  return routeData
}

let isFetchRemote = true

router.beforeEach((to, from, next) => {
  const username = sessionStorage.getItem('username')
  if (!username && to.path !== '/login') {
    next({ path: '/login' })
  } else if (isFetchRemote && to.path !== '/login') {
    getMenuData()
      .then(res => {
        if (res.errno === 0) {
          isFetchRemote = false
          const menuData = res.result
          s.storage.setItem('menudata', JSON.stringify(menuData))
          const routeData = formatRoutes(menuData)
          vm.$router.addRoutes(
            [routeData].concat([
              { name: '404', path: '/404', component: NotFound },
              { path: '*', redirect: '/404' }
            ])
          )
          vm.$router.push({
            path: to.path,
            query: to.query
          })
        } else {
          isFetchRemote = true
        }
        next()
      })
      .catch(err => {
        console.log(err)
      })
  } else {
    next()
  }
})

const vm = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
