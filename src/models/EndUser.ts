import { camelToSnake } from '../utils/camelize'
import AcceptedClient from './AcceptedClient'

class EndUser {
  id: string
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
  gender: string
  birthdate: Date
  zoneinfo: string
  locale: string
  phoneNumber: string
  acceptedClients: AcceptedClient[]
  createdAt: Date
  updatedAt: Date
  authenticatedAt: Date

  constructor (obj: any) {
    this.id = obj.id
    this.name = obj.name
    this.password = obj.password
    this.email = obj.email
    this.givenName = obj.givenName
    this.familyName = obj.familyName
    this.middleName = obj.middleName
    this.nickname = obj.nickname
    this.profile = obj.profile
    this.picture = obj.picture
    this.website = obj.website
    this.gender = obj.gender
    this.birthdate = obj.birthdate ? new Date(obj.birthdate) : null
    this.zoneinfo = obj.zoneinfo
    this.locale = obj.locale
    this.phoneNumber = obj.phoneNumber
    this.acceptedClients = obj.acceptedClients ? obj.acceptedClients.map((v: any) =>
      new AcceptedClient(v.clientId, v.scope)) : null
    this.createdAt = obj.created_at ? new Date(obj.created_at) : null
    this.updatedAt = obj.updated_at ? new Date(obj.updated_at) : null
    this.authenticatedAt = obj.authenticated_at ? new Date(obj.authenticated_at) : null
  }

  toJson (): string {
    const obj: any = {}
    Object.keys(this).forEach((key: keyof EndUser) => {
      obj[camelToSnake(key)] = this[key]
    })
    return JSON.stringify(obj)
  }
}

export default EndUser
