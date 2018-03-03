import RequestService from '../common/RequestService'
import { ConfigKeys, configService } from '../common/ConfigService'
import Client from '../../models/Client'
import { camelToSnakeObj } from '../../utils/camelize'
import ClientType from '../../models/ClientType'

interface ClientRegisterForm {
  name: string
  password: string
  website: string
  clientType: ClientType
  redirectUris: string[]
  resourceId: string
}

interface ClientUpdateForm {
  name: string
  website: string
  clientType: ClientType
  redirectUris: string[]
  resourceId: string
}

interface ClientUpdatePasswordForm {
  newPassword: string
  currentPassword: string
}

class ClientService {
  requestService: RequestService

  constructor () {
    this.requestService = new RequestService()
  }

  async login (name: string, password: string): Promise<[string, string]> {
    const url = `${configService.get(ConfigKeys.ApiUrl)}/clients/login`
    const ret = await this.requestService.post(url, null, {
      name,
      password
    }, null).catch(e => {
      throw e
    })
    const sid = ret.sid as string
    const clientId = ret.client_id as string
    const t: [string, string] = [sid, clientId]
    return Promise.resolve(t)
  }

  async logout (token: string): Promise<void> {
    const url = `${configService.get(ConfigKeys.ApiUrl)}/clients/logout`
    await this.requestService.post(url, null, null, token).catch(e => {
      throw e
    })
    return Promise.resolve()
  }

  async register (form: ClientRegisterForm): Promise<void> {
    const url = `${configService.get(ConfigKeys.ApiUrl)}/clients`
    const body = camelToSnakeObj(form)
    await this.requestService.post(url, null, body, null).catch(e => {
      throw e
    })
    return Promise.resolve()
  }

  async get (id: string, token: string): Promise<Client> {
    let url
    if (token) {
      url = `${configService.get(ConfigKeys.ApiUrl)}/clients/${id}/detail`
    } else {
      url = `${configService.get(ConfigKeys.ApiUrl)}/clients/${id}`
    }
    const ret = await this.requestService.get(url, null, token).catch(e => {
      throw e
    })
    return Promise.resolve(new Client(ret))
  }

  async update (id: string, form: ClientUpdateForm, token: string): Promise<void> {
    const url = `${configService.get(ConfigKeys.ApiUrl)}/clients/${id}`
    await this.requestService.put(url, null, camelToSnakeObj(form), token).catch(e => {
      throw e
    })
    return Promise.resolve()
  }

  async updatePassword (id: string, form: ClientUpdatePasswordForm, token: string): Promise<void> {
    const url = `${configService.get(ConfigKeys.ApiUrl)}/clients/${id}`
    await this.requestService.put(url, null, camelToSnakeObj(form), token).catch(e => {
      throw e
    })
    return Promise.resolve()
  }

  async delete (id: string, token: string): Promise<void> {
    const url = `${configService.get(ConfigKeys.ApiUrl)}/clients/${id}`
    await this.requestService.delete(url, null, null, token).catch(e => {
      throw e
    })
    return Promise.resolve()
  }
}

export { ClientService, ClientRegisterForm, ClientUpdateForm, ClientUpdatePasswordForm }
