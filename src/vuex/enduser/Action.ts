import { ActionTree } from 'vuex'
import { State } from './State'
import {
  EndUserRegisterForm,
  EndUserService,
  EndUserUpdateForm,
  EndUserUpdatePasswordForm
} from '../../services/enduser/EndUserService'
import { AlertType, RootState } from '../State'
import { ActionType } from '../Action'
import { Keys, StorageService } from '../../services/common/StorageService'
import { MutationTypeEndUser } from './Mutation'

const endUserService = new EndUserService()
const storageService = new StorageService()

export class ActionTypeEndUser {
  static FETCH_MY_END_USER = 'FETCH_MY_END_USER'
  static REGISTER_END_USER = 'REGISTER_END_USER'
  static LOGIN_AS_END_USER = 'LOGIN_AS_END_USER'
  static UPDATE_END_USER = 'UPDATE_END_USER'
  static UPDATE_END_USER_PASSWORD = 'UPDATE_END_USER_PASSWORD'
  static DELETE_SELF = 'DELETE_SELF'
}

const actions: ActionTree<State, RootState> = {
  [ActionTypeEndUser.FETCH_MY_END_USER]: async function ({ dispatch, commit }): Promise<any> {
    try {
      const id = storageService.get(Keys.EndUserId)
      const token = storageService.get(Keys.EndUserSessionToken)
      if (!id || !token) {
        storageService.set(Keys.EndUserId, null)
        storageService.set(Keys.EndUserSessionToken, null)
        dispatch(ActionType.UPDATE_ALERT_MESSAGE, { type: AlertType.Danger, message: 'login_required' }, { root: true })
        return Promise.reject(new Error('login_required'))
      }
      const endUser = await endUserService.get(id, token)
      commit(MutationTypeEndUser.SET_END_USER, endUser)
    } catch (e) {
      if (e && e.status && e.status >= 400 && e.status < 500) {
        storageService.set(Keys.EndUserId, null)
        storageService.set(Keys.EndUserSessionToken, null)
      }
      const msg = e.data ? e.data.error || 'unexpected_error' : 'unexpected_error'
      dispatch(ActionType.UPDATE_ALERT_MESSAGE, { type: AlertType.Danger, message: msg }, { root: true })
      return Promise.reject(e)
    }
  },
  [ActionTypeEndUser.REGISTER_END_USER]: async function ({ dispatch }, form: EndUserRegisterForm): Promise<any> {
    try {
      await endUserService.register(form)
      dispatch(ActionType.UPDATE_ALERT_MESSAGE, { type: AlertType.Info, message: 'register_success' }, { root: true })
      return Promise.resolve()
    } catch (e) {
      const msg = e.data ? e.data.error || 'unexpected_error' : 'unexpected_error'
      dispatch(ActionType.UPDATE_ALERT_MESSAGE, { type: AlertType.Danger, message: msg }, { root: true })
      return Promise.reject(e)
    }
  },
  [ActionTypeEndUser.LOGIN_AS_END_USER]: async function ({ dispatch }, form: { name: string, password: string }): Promise<any> {
    try {
      const [sid, endUserId] = await endUserService.login(form.name, form.password)
      storageService.set(Keys.EndUserSessionToken, sid)
      storageService.set(Keys.EndUserId, endUserId)
      return Promise.resolve()
    } catch (e) {
      const msg = e.data ? e.data.error || 'unexpected_error' : 'unexpected_error'
      dispatch(ActionType.UPDATE_ALERT_MESSAGE, { type: AlertType.Danger, message: msg }, { root: true })
      return Promise.reject(e)
    }
  },
  [ActionTypeEndUser.UPDATE_END_USER]: async function ({ dispatch, commit }, params: { id: string, form: EndUserUpdateForm }): Promise<any> {
    try {
      await endUserService.update(params.id, params.form, storageService.get(Keys.EndUserSessionToken))
      dispatch(ActionType.UPDATE_ALERT_MESSAGE, { type: AlertType.Info, message: 'update_success' }, { root: true })
      const endUser = await endUserService.get(params.id, storageService.get(Keys.EndUserSessionToken))
      commit(MutationTypeEndUser.SET_END_USER, endUser)
    } catch (e) {
      if (e && e.status && e.status >= 400 && e.status < 500) {
        storageService.set(Keys.EndUserId, null)
        storageService.set(Keys.EndUserSessionToken, null)
      }
      const msg = e.data ? e.data.error || 'unexpected_error' : 'unexpected_error'
      dispatch(ActionType.UPDATE_ALERT_MESSAGE, { type: AlertType.Danger, message: msg }, { root: true })
      return Promise.reject(e)
    }
  },
  [ActionTypeEndUser.UPDATE_END_USER_PASSWORD]: async function ({ dispatch, commit }, params: { id: string, form: EndUserUpdatePasswordForm }): Promise<any> {
    try {
      console.log(params.form)
      await endUserService.updatePassword(params.id, params.form, storageService.get(Keys.EndUserSessionToken))
      dispatch(ActionType.UPDATE_ALERT_MESSAGE, { type: AlertType.Info, message: 'update_success' }, { root: true })
      const endUser = await endUserService.get(params.id, storageService.get(Keys.EndUserSessionToken))
      commit(MutationTypeEndUser.SET_END_USER, endUser)
    } catch (e) {
      if (e && e.status && e.status >= 400 && e.status < 500) {
        storageService.set(Keys.EndUserId, null)
        storageService.set(Keys.EndUserSessionToken, null)
      }
      const msg = e.data ? e.data.error || 'unexpected_error' : 'unexpected_error'
      dispatch(ActionType.UPDATE_ALERT_MESSAGE, { type: AlertType.Danger, message: msg }, { root: true })
      return Promise.reject(e)
    }
  },
  [ActionTypeEndUser.DELETE_SELF]: async function ({ dispatch, commit }): Promise<any> {
    try {
      const id = storageService.get(Keys.EndUserId)
      await endUserService.delete(id, storageService.get(Keys.EndUserSessionToken))
      dispatch(ActionType.UPDATE_ALERT_MESSAGE, { type: AlertType.Info, message: 'delete_success' }, { root: true })
      commit(MutationTypeEndUser.SET_END_USER, null)
      storageService.set(Keys.EndUserId, null)
      storageService.set(Keys.EndUserSessionToken, null)
    } catch (e) {
      if (e && e.status && e.status >= 400 && e.status < 500) {
        storageService.set(Keys.EndUserId, null)
        storageService.set(Keys.EndUserSessionToken, null)
      }
      const msg = e.data ? e.data.error || 'unexpected_error' : 'unexpected_error'
      dispatch(ActionType.UPDATE_ALERT_MESSAGE, { type: AlertType.Danger, message: msg }, { root: true })
      return Promise.reject(e)
    }
  }
}

export default actions
