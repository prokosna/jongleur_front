import { Action, ActionTree } from 'vuex'
import { AlertType, RootState } from './State'
import { MutationType } from './Mutation'
import { ConfigKeys, configService } from '../services/common/ConfigService'

export class ActionType {
  static UPDATE_ALERT_MESSAGE = 'UPDATE_ALERT_MESSAGE'
}

export interface UpdateAlertMessageCmd {
  type: AlertType,
  message: string,
}

let timer: number = null

const actions: ActionTree<RootState, RootState> = {
  [ActionType.UPDATE_ALERT_MESSAGE]: function ({ commit }, payload: UpdateAlertMessageCmd) {
    if (timer != null) {
      clearTimeout(timer)
    }
    commit(MutationType.UPDATE_ALERT_MESSAGE, { type: payload.type, message: payload.message })
    timer = setTimeout(() => {
      commit(MutationType.UPDATE_ALERT_MESSAGE, { type: null, message: null })
      timer = null
    }, configService.get(ConfigKeys.AlertMessageTimeout))
  }
}

export default actions
