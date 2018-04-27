import Vue from 'vue'
import Vuex, { ModuleTree } from 'vuex'

import actions from './Action'
import mutations from './Mutation'
import state, { RootState } from './State'

import admin from './admin'
import enduser from './enduser'
import client from './client'
import oidc from './oidc'
import resource from './resource'

Vue.use(Vuex)

const modules: ModuleTree<RootState> = {
  admin,
  enduser,
  client,
  oidc,
  resource
}

export default new Vuex.Store({
  state,
  actions,
  mutations,
  modules
})
