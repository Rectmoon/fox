import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const Login = () => import('@/views/Login.vue')
const Forbidden = () => import('@/views/403.vue')

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/403',
    component: Forbidden
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue')
  }
]

export default new Router({
  routes: routes,
  linkActiveClass: 'link-active'
})
