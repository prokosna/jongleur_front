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
  static DELETE_SELF = 'DELETE_SELF'
}

const actions: ActionTree<State, RootState> = {
  [ActionTypeClient.FETCH_MY_CLIENT]: async function ({ dispatch, commit }): Promise<any> {
    try {
      const id = storageService.get(Keys.ClientId)
      const token = storageService.get(Keys.ClientSessionToken)
      if (!id || !token) {
        storageService.set(Keys.ClientId, null)
        storageService.set(Keys.ClientSessionToken, null)
        dispatch(ActionType.UPDATE_ALERT_MESSAGE, { type: AlertType.Danger, message: 'login_required' }, { root: true })
        return Promise.reject(new Error('login_required'))
      }
      const client = await clientService.get(id, token)
      commit(MutationTypeClient.SET_CLIENT, client)
    } catch (e) {
      if (e && e.status && e.status >= 400 && e.status < 500) {
        storageService.set(Keys.ClientId, null)
        storageService.set(Keys.ClientSessionToken, null)
      }
      const msg = e.data ? e.data.error || 'unexpected_error' : 'unexpected_error'
      dispatch(ActionType.UPDATE_ALERT_MESSAGE, { type: AlertType.Danger, message: msg }, { root: true })
      return Promise.reject(e)
    }
  },
  [ActionTypeClient.REGISTER_CLIENT]: async function ({ dispatch }, form: ClientRegisterForm): Promise<any> {
    try {
      await clientService.register(form)
      dispatch(ActionType.UPDATE_ALERT_MESSAGE, { type: AlertType.Info, message: 'register_success' }, { root: true })
      return Promise.resolve()
    } catch (e) {
      const msg = e.data ? e.data.error || 'unexpected_error' : 'unexpected_error'
      dispatch(ActionType.UPDATE_ALERT_MESSAGE, { type: AlertType.Danger, message: msg }, { root: true })
      return Promise.reject(e)
    }
  },
  [ActionTypeClient.LOGIN_AS_CLIENT]: async function ({ dispatch }, form: { name: string, password: string }): Promise<any> {
    try {
      const [sid, clientId] = await clientService.login(form.name, form.password)
      storageService.set(Keys.ClientSessionToken, sid)
      storageService.set(Keys.ClientId, clientId)
      return Promise.resolve()
    } catch (e) {
      const msg = e.data ? e.data.error || 'unexpected_error' : 'unexpected_error'
      dispatch(ActionType.UPDATE_ALERT_MESSAGE, { type: AlertType.Danger, message: msg }, { root: true })
      return Promise.reject(e)
    }
  },
  [ActionTypeClient.UPDATE_CLIENT]: async function ({ dispatch, commit }, params: { id: string, form: ClientUpdateForm }): Promise<any> {
    try {
      await clientService.update(params.id, params.form, storageService.get(Keys.ClientSessionToken))
      dispatch(ActionType.UPDATE_ALERT_MESSAGE, { type: AlertType.Info, message: 'update_success' }, { root: true })
      const client = await clientService.get(params.id, storageService.get(Keys.ClientSessionToken))
      commit(MutationTypeClient.SET_CLIENT, client)
    } catch (e) {
      if (e && e.status && e.status >= 400 && e.status < 500) {
        storageService.set(Keys.ClientId, null)
        storageService.set(Keys.ClientSessionToken, null)
      }
      const msg = e.data ? e.data.error || 'unexpected_error' : 'unexpected_error'
      dispatch(ActionType.UPDATE_ALERT_MESSAGE, { type: AlertType.Danger, message: msg }, { root: true })
      return Promise.reject(e)
    }
  },
  [ActionTypeClient.UPDATE_CLIENT_PASSWORD]: async function ({ dispatch, commit }, params: { id: string, form: ClientUpdatePasswordForm }): Promise<any> {
    try {
      console.log(params.form)
      await clientService.updatePassword(params.id, params.form, storageService.get(Keys.ClientSessionToken))
      dispatch(ActionType.UPDATE_ALERT_MESSAGE, { type: AlertType.Info, message: 'update_success' }, { root: true })
      const client = await clientService.get(params.id, storageService.get(Keys.ClientSessionToken))
      commit(MutationTypeClient.SET_CLIENT, client)
    } catch (e) {
      if (e && e.status && e.status >= 400 && e.status < 500) {
        storageService.set(Keys.ClientId, null)
        storageService.set(Keys.ClientSessionToken, null)
      }
      const msg = e.data ? e.data.error || 'unexpected_error' : 'unexpected_error'
      dispatch(ActionType.UPDATE_ALERT_MESSAGE, { type: AlertType.Danger, message: msg }, { root: true })
      return Promise.reject(e)
    }
  },
  [ActionTypeClient.DELETE_SELF]: async function ({ dispatch, commit }): Promise<any> {
    try {
      const id = storageService.get(Keys.ClientId)
      await clientService.delete(id, storageService.get(Keys.ClientSessionToken))
      dispatch(ActionType.UPDATE_ALERT_MESSAGE, { type: AlertType.Info, message: 'delete_success' }, { root: true })
      commit(MutationTypeClient.SET_CLIENT, null)
      storageService.set(Keys.ClientId, null)
      storageService.set(Keys.ClientSessionToken, null)
    } catch (e) {
      if (e && e.status && e.status >= 400 && e.status < 500) {
        storageService.set(Keys.ClientId, null)
        storageService.set(Keys.ClientSessionToken, null)
      }
      const msg = e.data ? e.data.error || 'unexpected_error' : 'unexpected_error'
      dispatch(ActionType.UPDATE_ALERT_MESSAGE, { type: AlertType.Danger, message: msg }, { root: true })
      return Promise.reject(e)
    }
  }
}

export default actions
