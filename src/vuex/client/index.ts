import actions from './Action'
import mutations from './Mutation'
import state, { State } from './State'
import { RootState} from '../State'
import { Module } from 'vuex'

const module: Module<State, RootState> = {
  namespaced: true,
  state,
  actions,
  mutations
}

export default module
