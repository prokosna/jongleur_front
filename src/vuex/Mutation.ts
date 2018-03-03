import { MutationTree } from 'vuex'
import { AlertType, State } from './State'

export class MutationType {
  static UPDATE_ALERT_MESSAGE = 'UPDATE_ALERT_MESSAGE'
}

const mutations: MutationTree<State> = {
  [MutationType.UPDATE_ALERT_MESSAGE]: function (state: State, { type, message }: { type: AlertType, message: string }) {
    state.alertType = type
    state.alertMessage = message
  }
}

export default mutations
