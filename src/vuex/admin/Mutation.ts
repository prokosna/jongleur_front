import { MutationTree } from 'vuex'
import { State } from './State'
import Admin from '../../models/Admin'

export class MutationTypeAdmin {
  static SET_ADMIN = 'SET_ADMIN'
}

const mutations: MutationTree<State> = {
  [MutationTypeAdmin.SET_ADMIN]: function (state: State, admin: Admin) {
    state.admin = admin
  }
}

export default mutations
