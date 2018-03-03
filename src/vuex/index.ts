import Vue from 'vue'
import Vuex from 'vuex'

import actions from './Action'
import mutations from './Mutation'
import state from './State'

import enduser from './enduser'

Vue.use(Vuex)

export default new Vuex.Store({
  state,
  actions,
  mutations,
  modules: {
    enduser
  }
})
