import Vue from 'vue'
import VueLogger from 'vuejs-logger'
import App from './App.vue'

import router from './router'
import store from './store'

Vue.use(VueLogger, {
  logLevel: 'debug'
})

new Vue({
  store,
  router,
  el: '#app',
  render: h => h(App)
})
