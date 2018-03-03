import { ActionTree } from 'vuex'
import { State } from './State'
import { EndUserRegisterForm, EndUserService } from '../../services/enduser/EndUserService'
import { AlertType } from '../State'
import { ActionType } from '../Action'
import { Keys, StorageService } from '../../services/common/StorageService'

const endUserService = new EndUserService()
const storageService = new StorageService()

export class ActionTypeEndUser {
  static REGISTER_END_USER = 'REGISTER_END_USER'
  static LOGIN_AS_END_USER = 'LOGIN_AS_END_USER'
}

const actions: ActionTree<State, State> = {
  [ActionTypeEndUser.REGISTER_END_USER]: async function ({ dispatch, commit }, form: EndUserRegisterForm): Promise<any> {
    try {
      await endUserService.register(form)
      dispatch(ActionType.UPDATE_ALERT_MESSAGE, { type: AlertType.Info, message: 'registerSuccess' }, { root: true })
      return Promise.resolve()
    } catch (e) {
      const msg = e.error || 'unexpectedError'
      dispatch(ActionType.UPDATE_ALERT_MESSAGE, { type: AlertType.Danger, message: msg }, { root: true })
      return Promise.reject(e)
    }
  },
  [ActionTypeEndUser.LOGIN_AS_END_USER]: async function ({ dispatch, commit }, form: { name: string, password: string }): Promise<any> {
    try {
      const [sid, endUserId] = await endUserService.login(form.name, form.password)
      storageService.set(Keys.SessionToken, sid)
      storageService.set(Keys.EndUserId, endUserId)
      dispatch(ActionType.UPDATE_ALERT_MESSAGE, { type: AlertType.Info, message: 'loginSuccess' }, { root: true })
      return Promise.resolve()
    } catch (e) {
      const msg = e.error || 'unexpectedError'
      dispatch(ActionType.UPDATE_ALERT_MESSAGE, { type: AlertType.Danger, message: msg }, { root: true })
      return Promise.reject(e)
    }
  }
}

export default actions
