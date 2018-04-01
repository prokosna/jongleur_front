import { MutationTree } from 'vuex'
import { State } from './State'
import Resource from '../../models/Resource'

export class MutationTypeResource {
  static SET_RESOURCE = 'SET_RESOURCE'
}

const mutations: MutationTree<State> = {
  [MutationTypeResource.SET_RESOURCE]: function (state: State, resource: Resource) {
    state.resource = resource
  }
}

export default mutations
