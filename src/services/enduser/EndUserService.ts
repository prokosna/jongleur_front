import RequestService from '../common/RequestService'
import { ConfigKeys, configService } from '../common/ConfigService'
import EndUser from '../../models/EndUser'
import { camelToSnakeObj } from '../../utils/camelize'

enum Gender {
  Female = 'Female',
  Male = 'Male',
  Other = 'Other'
}

interface EndUserRegisterForm {
  name: string
  password: string
  email: string
  givenName: string
  familyName: string
  middleName: string
  nickname: string
  profile: string
  picture: string
  website: string
  gender: Gender
  birthdate: string
  zoneinfo: string
  locale: string
  phoneNumber: string
}

interface EndUserUpdateForm {
  name: string
  email: string
  givenName: string
  familyName: string
  middleName: string
  nickname: string
  profile: string
  picture: string
  website: string
  gender: Gender
  birthdate: string
  zoneinfo: string
  locale: string
  phoneNumber: string
}

interface EndUserUpdatePasswordForm {
  newPassword: string
  currentPassword: string
}

class EndUserService {
  requestService: RequestService

  constructor () {
    this.requestService = new RequestService()
  }

  async login (name: string, password: string): Promise<[string, string]> {
    const url = `${configService.get(ConfigKeys.ApiUrl)}/end_users/login`
    const ret = await this.requestService.post(url, null, {
      name,
      password
    }, null).catch(e => {
      throw e
    })
    const sid = ret.sid as string
    const endUserId = ret.end_user_id as string
    const t: [string, string] = [sid, endUserId]
    return Promise.resolve(t)
  }

  async logout (token: string): Promise<void> {
    const url = `${configService.get(ConfigKeys.ApiUrl)}/end_users/logout`
    await this.requestService.post(url, null, null, token).catch(e => {
      throw e
    })
    return Promise.resolve()
  }

  async register (form: EndUserRegisterForm): Promise<void> {
    const url = `${configService.get(ConfigKeys.ApiUrl)}/end_users`
    const body = camelToSnakeObj(form)
    await this.requestService.post(url, null, body, null).catch(e => {
      throw e
    })
    return Promise.resolve()
  }

  async get (id: string, token: string): Promise<EndUser> {
    let url
    if (token) {
      url = `${configService.get(ConfigKeys.ApiUrl)}/end_users/${id}/detail`
    } else {
      url = `${configService.get(ConfigKeys.ApiUrl)}/end_users/${id}`
    }
    const ret = await this.requestService.get(url, null, token).catch(e => {
      throw e
    })
    return Promise.resolve(new EndUser(ret))
  }

  async update (id: string, form: EndUserUpdateForm, token: string): Promise<void> {
    const url = `${configService.get(ConfigKeys.ApiUrl)}/end_users/${id}`
    await this.requestService.put(url, null, camelToSnakeObj(form), token).catch(e => {
      throw e
    })
    return Promise.resolve()
  }

  async updatePassword (id: string, form: EndUserUpdatePasswordForm, token: string): Promise<void> {
    const url = `${configService.get(ConfigKeys.ApiUrl)}/end_users/${id}`
    await this.requestService.put(url, null, camelToSnakeObj(form), token).catch(e => {
      throw e
    })
    return Promise.resolve()
  }

  async delete (id: string, token: string): Promise<void> {
    const url = `${configService.get(ConfigKeys.ApiUrl)}/end_users/${id}`
    await this.requestService.delete(url, null, null, token).catch(e => {
      throw e
    })
    return Promise.resolve()
  }
}

export { EndUserService, Gender, EndUserRegisterForm, EndUserUpdateForm, EndUserUpdatePasswordForm }
