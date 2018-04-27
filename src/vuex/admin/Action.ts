import { ActionTree } from 'vuex'
import { State } from './State'
import {
  AdminRegisterForm,
  AdminService,
  AdminUpdateForm,
  AdminUpdatePasswordForm
} from '../../services/admin/AdminService'
import { EndUserService } from '../../services/enduser/EndUserService'
import { ClientService } from '../../services/client/ClientService'
import { ResourceService } from '../../services/resource/ResourceService'
import { AlertType, RootState } from '../State'
import { ActionType } from '../Action'
import { Keys, StorageService } from '../../services/common/StorageService'
import { MutationTypeAdmin } from './Mutation'

const adminService = new AdminService()
const endUserService = new EndUserService()
const clientService = new ClientService()
const resourceService = new ResourceService()
const storageService = new StorageService()

export class ActionTypeAdmin {
  static FETCH_MY_ADMIN = 'FETCH_MY_ADMIN'
  static REGISTER_ADMIN = 'REGISTER_ADMIN'
  static LOGIN_AS_ADMIN = 'LOGIN_AS_ADMIN'
  static UPDATE_ADMIN = 'UPDATE_ADMIN'
  static UPDATE_ADMIN_PASSWORD = 'UPDATE_ADMIN_PASSWORD'
  static DELETE_ADMIN = 'DELETE_ADMIN'
  static DELETE_END_USER = 'DELETE_END_USER'
  static DELETE_CLIENT = 'DELETE_CLIENT'
  static DELETE_RESOURCE = 'DELETE_RESOURCE'
}

const actions: ActionTree<State, RootState> = {
  [ActionTypeAdmin.FETCH_MY_ADMIN]: async function ({ dispatch, commit }): Promise<any> {
    try {
      const id = storageService.get(Keys.AdminId)
      const token = storageService.get(Keys.AdminSessionToken)
      if (!id || !token) {
        storageService.set(Keys.AdminId, null)
        storageService.set(Keys.AdminSessionToken, null)
        dispatch(ActionType.UPDATE_ALERT_MESSAGE, { type: AlertType.Danger, message: 'login_required' }, { root: true })
        return Promise.reject(new Error('login_required'))
      }
      const admin = await adminService.get(id, token)
      commit(MutationTypeAdmin.SET_ADMIN, admin)
    } catch (e) {
      if (e && e.status && e.status >= 400 && e.status < 500) {
        storageService.set(Keys.AdminId, null)
        storageService.set(Keys.AdminSessionToken, null)
      }
      const msg = e.data ? e.data.error || 'unexpected_error' : 'unexpected_error'
      dispatch(ActionType.UPDATE_ALERT_MESSAGE, { type: AlertType.Danger, message: msg }, { root: true })
      return Promise.reject(e)
    }
  },
  [ActionTypeAdmin.REGISTER_ADMIN]: async function ({ dispatch }, form: AdminRegisterForm): Promise<any> {
    try {
      await adminService.register(form)
      dispatch(ActionType.UPDATE_ALERT_MESSAGE, { type: AlertType.Info, message: 'register_success' }, { root: true })
      return Promise.resolve()
    } catch (e) {
      const msg = e.data ? e.data.error || 'unexpected_error' : 'unexpected_error'
      dispatch(ActionType.UPDATE_ALERT_MESSAGE, { type: AlertType.Danger, message: msg }, { root: true })
      return Promise.reject(e)
    }
  },
  [ActionTypeAdmin.LOGIN_AS_ADMIN]: async function ({ dispatch }, form: { name: string, password: string }): Promise<any> {
    try {
      const [sid, adminId] = await adminService.login(form.name, form.password)
      storageService.set(Keys.AdminSessionToken, sid)
      storageService.set(Keys.AdminId, adminId)
      return Promise.resolve()
    } catch (e) {
      const msg = e.data ? e.data.error || 'unexpected_error' : 'unexpected_error'
      dispatch(ActionType.UPDATE_ALERT_MESSAGE, { type: AlertType.Danger, message: msg }, { root: true })
      return Promise.reject(e)
    }
  },
  [ActionTypeAdmin.UPDATE_ADMIN]: async function ({ dispatch, commit }, params: { id: string, form: AdminUpdateForm }): Promise<any> {
    try {
      await adminService.update(params.id, params.form, storageService.get(Keys.AdminSessionToken))
      dispatch(ActionType.UPDATE_ALERT_MESSAGE, { type: AlertType.Info, message: 'update_success' }, { root: true })
      const admin = await adminService.get(params.id, storageService.get(Keys.AdminSessionToken))
      commit(MutationTypeAdmin.SET_ADMIN, admin)
    } catch (e) {
      if (e && e.status && e.status >= 400 && e.status < 500) {
        storageService.set(Keys.AdminId, null)
        storageService.set(Keys.AdminSessionToken, null)
      }
      const msg = e.data ? e.data.error || 'unexpected_error' : 'unexpected_error'
      dispatch(ActionType.UPDATE_ALERT_MESSAGE, { type: AlertType.Danger, message: msg }, { root: true })
      return Promise.reject(e)
    }
  },
  [ActionTypeAdmin.UPDATE_ADMIN_PASSWORD]: async function ({ dispatch, commit }, params: { id: string, form: AdminUpdatePasswordForm }): Promise<any> {
    try {
      console.log(params.form)
      await adminService.updatePassword(params.id, params.form, storageService.get(Keys.AdminSessionToken))
      dispatch(ActionType.UPDATE_ALERT_MESSAGE, { type: AlertType.Info, message: 'update_success' }, { root: true })
      const admin = await adminService.get(params.id, storageService.get(Keys.AdminSessionToken))
      commit(MutationTypeAdmin.SET_ADMIN, admin)
    } catch (e) {
      if (e && e.status && e.status >= 400 && e.status < 500) {
        storageService.set(Keys.AdminId, null)
        storageService.set(Keys.AdminSessionToken, null)
      }
      const msg = e.data ? e.data.error || 'unexpected_error' : 'unexpected_error'
      dispatch(ActionType.UPDATE_ALERT_MESSAGE, { type: AlertType.Danger, message: msg }, { root: true })
      return Promise.reject(e)
    }
  },
  [ActionTypeAdmin.DELETE_ADMIN]: async function ({ dispatch, commit }, params: { id: string }): Promise<any> {
    try {
      await adminService.delete(params.id, storageService.get(Keys.AdminSessionToken))
      dispatch(ActionType.UPDATE_ALERT_MESSAGE, { type: AlertType.Info, message: 'delete_success' }, { root: true })
      if (params.id === storageService.get(Keys.AdminId)) {
        commit(MutationTypeAdmin.SET_ADMIN, null)
        storageService.set(Keys.AdminId, null)
        storageService.set(Keys.AdminSessionToken, null)
      }
    } catch (e) {
      if (e && e.status && e.status >= 400 && e.status < 500) {
        storageService.set(Keys.AdminId, null)
        storageService.set(Keys.AdminSessionToken, null)
      }
      const msg = e.data ? e.data.error || 'unexpected_error' : 'unexpected_error'
      dispatch(ActionType.UPDATE_ALERT_MESSAGE, { type: AlertType.Danger, message: msg }, { root: true })
      return Promise.reject(e)
    }
  },
  [ActionTypeAdmin.DELETE_END_USER]: async function ({ dispatch, commit }, params: { id: string }): Promise<any> {
    try {
      await endUserService.delete(params.id, storageService.get(Keys.AdminSessionToken))
    } catch (e) {
      const msg = e.data ? e.data.error || 'unexpected_error' : 'unexpected_error'
      dispatch(ActionType.UPDATE_ALERT_MESSAGE, { type: AlertType.Danger, message: msg }, { root: true })
      return Promise.reject(e)
    }
  },
  [ActionTypeAdmin.DELETE_CLIENT]: async function ({ dispatch, commit }, params: { id: string }): Promise<any> {
    try {
      await clientService.delete(params.id, storageService.get(Keys.AdminSessionToken))
    } catch (e) {
      const msg = e.data ? e.data.error || 'unexpected_error' : 'unexpected_error'
      dispatch(ActionType.UPDATE_ALERT_MESSAGE, { type: AlertType.Danger, message: msg }, { root: true })
      return Promise.reject(e)
    }
  },
  [ActionTypeAdmin.DELETE_RESOURCE]: async function ({ dispatch, commit }, params: { id: string }): Promise<any> {
    try {
      await resourceService.delete(params.id, storageService.get(Keys.AdminSessionToken))
    } catch (e) {
      const msg = e.data ? e.data.error || 'unexpected_error' : 'unexpected_error'
      dispatch(ActionType.UPDATE_ALERT_MESSAGE, { type: AlertType.Danger, message: msg }, { root: true })
      return Promise.reject(e)
    }
  }
}

export default actions
