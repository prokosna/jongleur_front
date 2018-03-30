import { MutationTree } from 'vuex'
import { State } from './State'
import Client from '../../models/Client'

export class MutationTypeClient {
  static SET_CLIENT = 'SET_CLIENT'
}

const mutations: MutationTree<State> = {
  [MutationTypeClient.SET_CLIENT]: function (state: State, client: Client) {
    state.client = client
  }
}

export default mutations
