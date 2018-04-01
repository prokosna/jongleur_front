import { ActionTree } from 'vuex'
import { State } from './State'
import {
  ResourceRegisterForm,
  ResourceService,
  ResourceUpdateForm,
  ResourceUpdatePasswordForm
} from '../../services/resource/ResourceService'
import { AlertType, RootState } from '../State'
import { ActionType } from '../Action'
import { Keys, StorageService } from '../../services/common/StorageService'
import { MutationTypeResource } from './Mutation'

const resourceService = new ResourceService()
const storageService = new StorageService()

export class ActionTypeResource {
  static FETCH_MY_RESOURCE = 'FETCH_MY_RESOURCE'
  static REGISTER_RESOURCE = 'REGISTER_RESOURCE'
  static LOGIN_AS_RESOURCE = 'LOGIN_AS_RESOURCE'
  static UPDATE_RESOURCE = 'UPDATE_RESOURCE'
  static UPDATE_RESOURCE_PASSWORD = 'UPDATE_RESOURCE_PASSWORD'
}

const actions: ActionTree<State, RootState> = {
  [ActionTypeResource.FETCH_MY_RESOURCE]: async function ({ dispatch, commit }): Promise<any> {
    try {
      const id = storageService.get(Keys.ResourceId)
      const token = storageService.get(Keys.ResourceSessionToken)
      if (!id || !token) {
        storageService.set(Keys.ResourceId, null)
        storageService.set(Keys.ResourceSessionToken, null)
        dispatch(ActionType.UPDATE_ALERT_MESSAGE, { type: AlertType.Danger, message: 'loginRequired' }, { root: true })
        return Promise.reject(new Error('loginRequired'))
      }
      const resource = await resourceService.get(id, token)
      commit(MutationTypeResource.SET_RESOURCE, resource)
    } catch (e) {
      const msg = e.error || 'unexpectedError'
      dispatch(ActionType.UPDATE_ALERT_MESSAGE, { type: AlertType.Danger, message: msg }, { root: true })
      return Promise.reject(e)
    }
  },
  [ActionTypeResource.REGISTER_RESOURCE]: async function ({ dispatch }, form: ResourceRegisterForm): Promise<any> {
    try {
      await resourceService.register(form)
      dispatch(ActionType.UPDATE_ALERT_MESSAGE, { type: AlertType.Info, message: 'registerSuccess' }, { root: true })
      return Promise.resolve()
    } catch (e) {
      const msg = e.error || 'unexpectedError'
      dispatch(ActionType.UPDATE_ALERT_MESSAGE, { type: AlertType.Danger, message: msg }, { root: true })
      return Promise.reject(e)
    }
  },
  [ActionTypeResource.LOGIN_AS_RESOURCE]: async function ({ dispatch }, form: { name: string, password: string }): Promise<any> {
    try {
      const [sid, resourceId] = await resourceService.login(form.name, form.password)
      storageService.set(Keys.ResourceSessionToken, sid)
      storageService.set(Keys.ResourceId, resourceId)
      dispatch(ActionType.UPDATE_ALERT_MESSAGE, { type: AlertType.Info, message: 'loginSuccess' }, { root: true })
      return Promise.resolve()
    } catch (e) {
      const msg = e.error || 'unexpectedError'
      dispatch(ActionType.UPDATE_ALERT_MESSAGE, { type: AlertType.Danger, message: msg }, { root: true })
      return Promise.reject(e)
    }
  },
  [ActionTypeResource.UPDATE_RESOURCE]: async function ({ dispatch, commit }, params: { id: string, form: ResourceUpdateForm }): Promise<any> {
    try {
      await resourceService.update(params.id, params.form, storageService.get(Keys.ResourceSessionToken))
      dispatch(ActionType.UPDATE_ALERT_MESSAGE, { type: AlertType.Info, message: 'updateSuccess' }, { root: true })
      const resource = await resourceService.get(params.id, storageService.get(Keys.ResourceSessionToken))
      commit(MutationTypeResource.SET_RESOURCE, resource)
    } catch (e) {
      const msg = e.error || 'unexpectedError'
      dispatch(ActionType.UPDATE_ALERT_MESSAGE, { type: AlertType.Danger, message: msg }, { root: true })
      return Promise.reject(e)
    }
  },
  [ActionTypeResource.UPDATE_RESOURCE_PASSWORD]: async function ({ dispatch, commit }, params: { id: string, form: ResourceUpdatePasswordForm }): Promise<any> {
    try {
      console.log(params.form)
      await resourceService.updatePassword(params.id, params.form, storageService.get(Keys.ResourceSessionToken))
      dispatch(ActionType.UPDATE_ALERT_MESSAGE, { type: AlertType.Info, message: 'updateSuccess' }, { root: true })
      const resource = await resourceService.get(params.id, storageService.get(Keys.ResourceSessionToken))
      commit(MutationTypeResource.SET_RESOURCE, resource)
    } catch (e) {
      const msg = e.error || 'unexpectedError'
      dispatch(ActionType.UPDATE_ALERT_MESSAGE, { type: AlertType.Danger, message: msg }, { root: true })
      return Promise.reject(e)
    }
  }
}

export default actions
