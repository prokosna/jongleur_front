import Vue from 'vue'
import Vuex, { ModuleTree } from 'vuex'

import actions from './Action'
import mutations from './Mutation'
import state, { RootState } from './State'

import enduser from './enduser'

Vue.use(Vuex)

const modules: ModuleTree<RootState> = {
  enduser
}

export default new Vuex.Store({
  state,
  actions,
  mutations,
  modules
})
