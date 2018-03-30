import { MutationTree } from 'vuex'
import { State } from './State'
import EndUser from '../../models/EndUser'

export class MutationTypeEndUser {
  static SET_END_USER = 'SET_END_USER'
}

const mutations: MutationTree<State> = {
  [MutationTypeEndUser.SET_END_USER]: function (state: State, endUser: EndUser) {
    state.endUser = endUser
  }
}

export default mutations
