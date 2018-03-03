import RequestService from '../common/RequestService'
import { ConfigKeys, configService } from '../common/ConfigService'
import Resource from '../../models/Resource'
import { camelToSnakeObj, snakeToCamelObj } from '../../utils/camelize'
import Scope from '../../models/Scope'

interface ResourceRegisterForm {
  name: string
  password: string
  website: string
  scope: Scope[]
}

interface ResourceUpdateForm {
  name: string
  website: string
  scope: Scope[]
}

interface ResourceUpdatePasswordForm {
  newPassword: string
  currentPassword: string
}

class ResourceService {
  requestService: RequestService

  constructor () {
    this.requestService = new RequestService()
  }

  async login (name: string, password: string): Promise<[string, string]> {
    const url = `${configService.get(ConfigKeys.ApiUrl)}/resources/login`
    const ret = await this.requestService.post(url, null, {
      name,
      password
    }, null).catch(e => {
      throw e
    })
    const sid = ret.sid as string
    const resourceId = ret.resource_id as string
    const t: [string, string] = [sid, resourceId]
    return Promise.resolve(t)
  }

  async logout (token: string): Promise<void> {
    const url = `${configService.get(ConfigKeys.ApiUrl)}/resources/logout`
    await this.requestService.post(url, null, null, token).catch(e => {
      throw e
    })
    return Promise.resolve()
  }

  async register (form: ResourceRegisterForm): Promise<void> {
    const url = `${configService.get(ConfigKeys.ApiUrl)}/resources`
    const body = camelToSnakeObj(form)
    await this.requestService.post(url, null, body, null).catch(e => {
      throw e
    })
    return Promise.resolve()
  }

  async get (id: string, token: string): Promise<Resource> {
    let url
    if (token) {
      url = `${configService.get(ConfigKeys.ApiUrl)}/resources/${id}/detail`
    } else {
      url = `${configService.get(ConfigKeys.ApiUrl)}/resources/${id}`
    }
    const ret = await this.requestService.get(url, null, token).catch(e => {
      throw e
    })
    return Promise.resolve(new Resource(snakeToCamelObj(ret)))
  }

  async update (id: string, form: ResourceUpdateForm, token: string): Promise<void> {
    const url = `${configService.get(ConfigKeys.ApiUrl)}/resources/${id}`
    await this.requestService.put(url, null, camelToSnakeObj(form), token).catch(e => {
      throw e
    })
    return Promise.resolve()
  }

  async updatePassword (id: string, form: ResourceUpdatePasswordForm, token: string): Promise<void> {
    const url = `${configService.get(ConfigKeys.ApiUrl)}/resources/${id}`
    await this.requestService.put(url, null, camelToSnakeObj(form), token).catch(e => {
      throw e
    })
    return Promise.resolve()
  }

  async delete (id: string, token: string): Promise<void> {
    const url = `${configService.get(ConfigKeys.ApiUrl)}/resources/${id}`
    await this.requestService.delete(url, null, null, token).catch(e => {
      throw e
    })
    return Promise.resolve()
  }
}

export { ResourceService, ResourceRegisterForm, ResourceUpdateForm, ResourceUpdatePasswordForm }
