import { MutationTree } from 'vuex'
import { AlertType, RootState } from './State'

export class MutationType {
  static UPDATE_ALERT_MESSAGE = 'UPDATE_ALERT_MESSAGE'
  static UPDATE_LOGGED_IN_AS = 'UPDATE_LOGGED_IN_AS'
}

const mutations: MutationTree<RootState> = {
  [MutationType.UPDATE_ALERT_MESSAGE]: function (state: RootState, { type, message }: { type: AlertType, message: string }) {
    state.alertType = type
    state.alertMessage = message
  },
  [MutationType.UPDATE_LOGGED_IN_AS]: function (state: RootState, role: string) {
    state.loggedInAs = role
  }
}

export default mutations
