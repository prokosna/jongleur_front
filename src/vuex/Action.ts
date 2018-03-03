import { ActionTree } from 'vuex'
import { AlertType, State } from './State'
import { MutationType } from './Mutation'
import { ConfigKeys, configService } from '../services/common/ConfigService'

export class ActionType {
  static UPDATE_ALERT_MESSAGE = 'UPDATE_ALERT_MESSAGE'
}

export interface UpdateAlertMessageCmd {
  type: AlertType,
  message: string,
}

const actions: ActionTree<State, State> = {
  [ActionType.UPDATE_ALERT_MESSAGE]: function ({ commit }, payload: UpdateAlertMessageCmd) {
    commit(MutationType.UPDATE_ALERT_MESSAGE, { type: payload.type, message: payload.message })
    // setTimeout(() => {
    //   commit(MutationType.UPDATE_ALERT_MESSAGE, { type: null, message: null })
    // }, configService.get(ConfigKeys.AlertMessageTimeout))
  }
}

export default actions
