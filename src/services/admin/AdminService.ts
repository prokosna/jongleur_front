import RequestService from '../common/RequestService'
import { ConfigKeys, configService } from '../common/ConfigService'
import Admin from '../../models/Admin'
import { camelToSnakeObj } from '../../utils/camelize'

interface AdminRegisterForm {
  name: string
  password: string
}

interface AdminUpdateForm {
  name: string
}

interface AdminUpdatePasswordForm {
  newPassword: string
  currentPassword: string
}

class AdminService {
  requestService: RequestService

  constructor () {
    this.requestService = new RequestService()
  }

  async login (name: string, password: string): Promise<[string, string]> {
    const url = `${configService.get(ConfigKeys.ApiUrl)}/admins/login`
    const ret = await this.requestService.post(url, null, {
      name,
      password
    }, null).catch(e => {
      throw e
    })
    const sid = ret.sid as string
    const adminId = ret.admin_id as string
    const t: [string, string] = [sid, adminId]
    return Promise.resolve(t)
  }

  async logout (token: string): Promise<void> {
    const url = `${configService.get(ConfigKeys.ApiUrl)}/admins/logout`
    await this.requestService.post(url, null, null, token).catch(e => {
      throw e
    })
    return Promise.resolve()
  }

  async register (form: AdminRegisterForm): Promise<void> {
    const url = `${configService.get(ConfigKeys.ApiUrl)}/admins`
    const body = camelToSnakeObj(form)
    await this.requestService.post(url, null, body, null).catch(e => {
      throw e
    })
    return Promise.resolve()
  }

  async get (id: string, token: string): Promise<Admin> {
    const url = `${configService.get(ConfigKeys.ApiUrl)}/admins/${id}`
    const ret = await this.requestService.get(url, null, token).catch(e => {
      throw e
    })
    return Promise.resolve(new Admin(ret))
  }

  async update (id: string, form: AdminUpdateForm, token: string): Promise<void> {
    const url = `${configService.get(ConfigKeys.ApiUrl)}/admins/${id}`
    await this.requestService.put(url, null, camelToSnakeObj(form), token).catch(e => {
      throw e
    })
    return Promise.resolve()
  }

  async updatePassword (id: string, form: AdminUpdatePasswordForm, token: string): Promise<void> {
    const url = `${configService.get(ConfigKeys.ApiUrl)}/admins/${id}`
    await this.requestService.put(url, null, camelToSnakeObj(form), token).catch(e => {
      throw e
    })
    return Promise.resolve()
  }

  async delete (id: string, token: string): Promise<void> {
    const url = `${configService.get(ConfigKeys.ApiUrl)}/admins/${id}`
    await this.requestService.delete(url, null, null, token).catch(e => {
      throw e
    })
    return Promise.resolve()
  }
}

export { AdminService, AdminRegisterForm, AdminUpdateForm, AdminUpdatePasswordForm }
