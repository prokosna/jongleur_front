import { camelToSnake } from '../utils/camelize'
import ClientType from './ClientType'

class Client {
  id: string
  name: string
  password: string
  website: string
  clientType: ClientType
  clientSecret: string
  resourceId: string
  redirectUris: string[]
  createdAt: Date
  updatedAt: Date

  constructor (obj: any) {
    this.id = obj.id
    this.name = obj.name
    this.password = obj.password
    this.website = obj.website
    this.clientType = obj.clientType ? ClientType[obj.clientType as keyof typeof ClientType] : ClientType.Public
    this.clientSecret = obj.clientSecret
    this.resourceId = obj.resourceId
    this.redirectUris = obj.redirectUris
    this.createdAt = obj.createdAt ? new Date(obj.createdAt) : null
    this.updatedAt = obj.updatedAt ? new Date(obj.updatedAt) : null
  }

  toJson (): string {
    const obj: any = {}
    Object.keys(this).forEach((key: keyof Client) => {
      obj[camelToSnake(key)] = this[key]
    })
    return JSON.stringify(obj)
  }
}

export default Client
