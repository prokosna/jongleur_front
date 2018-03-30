import { ActionTree } from 'vuex'
import { State } from './State'
import {
  ClientRegisterForm,
  ClientService,
  ClientUpdateForm,
  ClientUpdatePasswordForm
} from '../../services/client/ClientService'
import { AlertType, RootState } from '../State'
import { ActionType } from '../Action'
import { Keys, StorageService } from '../../services/common/StorageService'
import { MutationTypeClient } from './Mutation'

const clientService = new ClientService()
const storageService = new StorageService()

export class ActionTypeClient {
  static FETCH_MY_CLIENT = 'FETCH_MY_CLIENT'
  static REGISTER_CLIENT = 'REGISTER_CLIENT'
  static LOGIN_AS_CLIENT = 'LOGIN_AS_CLIENT'
  static UPDATE_CLIENT = 'UPDATE_CLIENT'
  static UPDATE_CLIENT_PASSWORD = 'UPDATE_CLIENT_PASSWORD'
}

const actions: ActionTree<State, RootState> = {
  [ActionTypeClient.FETCH_MY_CLIENT]: async function ({ dispatch, commit }): Promise<any> {
    try {
      const id = storageService.get(Keys.ClientId)
      const token = storageService.get(Keys.ClientSessionToken)
      if (!id || !token) {
        storageService.set(Keys.ClientId, null)
        storageService.set(Keys.ClientSessionToken, null)
        dispatch(ActionType.UPDATE_ALERT_MESSAGE, { type: AlertType.Danger, message: 'loginRequired' }, { root: true })
        return Promise.reject(new Error('loginRequired'))
      }
      const client = await clientService.get(id, token)
      commit(MutationTypeClient.SET_CLIENT, client)
    } catch (e) {
      const msg = e.error || 'unexpectedError'
      dispatch(ActionType.UPDATE_ALERT_MESSAGE, { type: AlertType.Danger, message: msg }, { root: true })
      return Promise.reject(e)
    }
  },
  [ActionTypeClient.REGISTER_CLIENT]: async function ({ dispatch }, form: ClientRegisterForm): Promise<any> {
    try {
      await clientService.register(form)
      dispatch(ActionType.UPDATE_ALERT_MESSAGE, { type: AlertType.Info, message: 'registerSuccess' }, { root: true })
      return Promise.resolve()
    } catch (e) {
      const msg = e.error || 'unexpectedError'
      dispatch(ActionType.UPDATE_ALERT_MESSAGE, { type: AlertType.Danger, message: msg }, { root: true })
      return Promise.reject(e)
    }
  },
  [ActionTypeClient.LOGIN_AS_CLIENT]: async function ({ dispatch }, form: { name: string, password: string }): Promise<any> {
    try {
      const [sid, clientId] = await clientService.login(form.name, form.password)
      storageService.set(Keys.ClientSessionToken, sid)
      storageService.set(Keys.ClientId, clientId)
      dispatch(ActionType.UPDATE_ALERT_MESSAGE, { type: AlertType.Info, message: 'loginSuccess' }, { root: true })
      return Promise.resolve()
    } catch (e) {
      const msg = e.error || 'unexpectedError'
      dispatch(ActionType.UPDATE_ALERT_MESSAGE, { type: AlertType.Danger, message: msg }, { root: true })
      return Promise.reject(e)
    }
  },
  [ActionTypeClient.UPDATE_CLIENT]: async function ({ dispatch, commit }, params: { id: string, form: ClientUpdateForm }): Promise<any> {
    try {
      await clientService.update(params.id, params.form, storageService.get(Keys.ClientSessionToken))
      dispatch(ActionType.UPDATE_ALERT_MESSAGE, { type: AlertType.Info, message: 'updateSuccess' }, { root: true })
      const client = await clientService.get(params.id, storageService.get(Keys.ClientSessionToken))
      commit(MutationTypeClient.SET_CLIENT, client)
    } catch (e) {
      const msg = e.error || 'unexpectedError'
      dispatch(ActionType.UPDATE_ALERT_MESSAGE, { type: AlertType.Danger, message: msg }, { root: true })
      return Promise.reject(e)
    }
  },
  [ActionTypeClient.UPDATE_CLIENT_PASSWORD]: async function ({ dispatch, commit }, params: { id: string, form: ClientUpdatePasswordForm }): Promise<any> {
    try {
      console.log(params.form)
      await clientService.updatePassword(params.id, params.form, storageService.get(Keys.ClientSessionToken))
      dispatch(ActionType.UPDATE_ALERT_MESSAGE, { type: AlertType.Info, message: 'updateSuccess' }, { root: true })
      const client = await clientService.get(params.id, storageService.get(Keys.ClientSessionToken))
      commit(MutationTypeClient.SET_CLIENT, client)
    } catch (e) {
      const msg = e.error || 'unexpectedError'
      dispatch(ActionType.UPDATE_ALERT_MESSAGE, { type: AlertType.Danger, message: msg }, { root: true })
      return Promise.reject(e)
    }
  }
}

export default actions
