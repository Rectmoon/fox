const home = () => import('@/views/Home.vue')
const page1 = () => import('@/views/Page1.vue')
const page2 = () => import('@/views/Page2.vue')
const page3 = () => import('@/views/Page3.vue')
const page4 = () => import('@/views/Page4.vue')
const message = () => import('@/views/Message.vue')
const addMessage = () => import('@/views/AddMessage.vue')

export default {
  home,
  page1,
  page2,
  page3,
  page4,
  message,
  addMessage
}
