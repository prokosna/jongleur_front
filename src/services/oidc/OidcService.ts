import RequestService from '../common/RequestService'
import { ConfigKeys, configService } from '../common/ConfigService'
import { camelToSnakeObj } from '../../utils/camelize'
import RedirectService from '../common/RedirectService'
import Scope from '../../models/Scope'

interface AuthorizeForm {
  responseType: string,
  clientId: string,
  redirectUri: string,
  scope: string,
  state: string,
  nonce: string
}

interface AcceptanceForm {
  accept: boolean,
  grantId: string
}

enum AuthorizeResultType {
  Redirect,
  Acceptance
}

interface RequireRedirect {
  type: AuthorizeResultType.Redirect,
  location: string
}

interface RequireAcceptance {
  type: AuthorizeResultType.Acceptance,
  grantId: string,
  scope: Scope[]
}

type AuthorizeResult = RequireRedirect | RequireAcceptance

class OidcService {
  requestService: RequestService
  redirectService: RedirectService

  constructor () {
    this.requestService = new RequestService()
    this.redirectService = new RedirectService()
  }

  async authorize (form: AuthorizeForm, token: string): Promise<RequireRedirect | RequireAcceptance> {
    const url = `${configService.get(ConfigKeys.ApiUrl)}/oidc/authorize`
    const ret = await this.requestService.get(url, camelToSnakeObj(form), token).catch(e => {
      throw e
    })
    if (ret.status === 'redirect') {
      return Promise.resolve({
        type: AuthorizeResultType.Redirect,
        location: ret.location
      } as RequireRedirect)
    } else if (ret.status === 'require_acceptance') {
      const scope = ret.scope.map((s: { name: string, description: string }) => new Scope(s.name, s.description))
      return Promise.resolve({
        type: AuthorizeResultType.Acceptance,
        grantId: ret.grant_id,
        scope
      } as RequireAcceptance)
    }
    return Promise.reject(new Error('unexpected_error'))
  }

  async accept (form: AcceptanceForm, token: string): Promise<RequireRedirect> {
    const url = `${configService.get(ConfigKeys.ApiUrl)}/oidc/accept`
    const ret = await this.requestService.post(url, null, {
      action: form.accept ? 'accept' : 'cancel',
      grant_id: form.grantId
    }, token).catch(e => {
      throw e
    })
    if (ret.status === 'redirect') {
      return Promise.resolve({
        type: AuthorizeResultType.Redirect,
        location: ret.location
      } as RequireRedirect)
    }
    return Promise.reject(new Error('unexpected_error'))
  }
}

export { OidcService, AuthorizeForm, AcceptanceForm, AuthorizeResultType, RequireRedirect, RequireAcceptance }
