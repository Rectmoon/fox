import Vue from 'vue'
// import App from './App.vue'
// import router from './router'
// import store from './store'
import DomPortal from 'vue-dom-portal'
Vue.use(DomPortal)

Vue.config.productionTip = false

const vm = new Vue({
  template: `
    <div>
      <div v-dom-portal="target">333</div>
    </div>
  `,
  data: {
    target: 'body'
  }
})

// setTimeout(() => {
//   vm.target = '#app'
// }, 500)

// setTimeout(() => {
//   vm.target = false
// }, 1000)

setTimeout(() => {
  console.log(1)
  vm.target = '#ab'
}, 1500)

// new Vue({
//   router,
//   store,
//   render: h => h(App)
// }).$mount('#app')
