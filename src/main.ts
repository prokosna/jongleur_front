import Vue from 'vue'
import VueI18n from 'vue-i18n'
import VModal from 'vue-js-modal'
import App from './App.vue'
import * as message from './message.json'
import router from './router'
import store from './vuex'

const VueLogger = require('vuejs-logger')

Vue.use(VueLogger, {
  logLevel: 'debug'
})

Vue.use(VueI18n)
const i18n = new VueI18n({
  locale: 'ja',
  fallbackLocale: 'en',
  messages: message
})

Vue.use(VModal, { dynamic: true })

new Vue({
  store,
  router,
  i18n,
  el: '#app',
  render: h => h(App)
})
