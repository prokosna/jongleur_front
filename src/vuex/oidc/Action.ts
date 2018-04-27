import { ActionTree } from 'vuex'
import { State } from './State'
import { RootState } from '../State'
import { Keys, StorageService } from '../../services/common/StorageService'
import RedirectService from '../../services/common/RedirectService'
import {
  AcceptanceForm,
  AuthorizeForm,
  AuthorizeResultType,
  OidcService,
  RequireAcceptance
} from '../../services/oidc/OidcService'

const oidcService = new OidcService()
const redirectService = new RedirectService()
const storageService = new StorageService()

export class ActionTypeOidc {
  static AUTHORIZE = 'AUTHORIZE'
  static ACCEPT = 'ACCEPT'
}

const actions: ActionTree<State, RootState> = {
  [ActionTypeOidc.AUTHORIZE]: async function ({ dispatch, commit }, form: AuthorizeForm): Promise<RequireAcceptance> {
    try {
      const token = storageService.get(Keys.EndUserSessionToken)
      if (!token) {
        return Promise.resolve(null)
      }
      const ret = await oidcService.authorize(form, token)
      switch (ret.type) {
        case AuthorizeResultType.Redirect:
          redirectService.redirect(ret.location, null, 1000)
          // Already redirected
          return Promise.reject(null)
        case AuthorizeResultType.Acceptance:
          return Promise.resolve(ret)
      }
      return Promise.reject(new Error('unexpected_error'))
    } catch (e) {
      if (e.status === 401) {
        // Login is required
        return Promise.resolve(null)
      }
      if (e && e.status && e.status >= 400 && e.status < 500) {
        storageService.set(Keys.EndUserId, null)
        storageService.set(Keys.EndUserSessionToken, null)
      }
      return Promise.reject(e)
    }
  },
  [ActionTypeOidc.ACCEPT]: async function ({ dispatch, commit }, form: AcceptanceForm): Promise<void> {
    try {
      const token = storageService.get(Keys.EndUserSessionToken)
      if (!token) {
        // Should be logged in
        return Promise.reject(new Error('unexpected_error'))
      }
      const ret = await oidcService.accept(form, token)
      switch (ret.type) {
        case AuthorizeResultType.Redirect:
          redirectService.redirect(ret.location, null, 1000)
          // Already redirected
          return Promise.reject(null)
      }
      return Promise.reject(new Error('unexpected_error'))
    } catch (e) {
      if (e && e.status && e.status >= 400 && e.status < 500) {
        storageService.set(Keys.EndUserId, null)
        storageService.set(Keys.EndUserSessionToken, null)
      }
      return Promise.reject(e)
    }
  }
}

export default actions
