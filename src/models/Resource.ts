import { camelToSnake } from '../utils/camelize'
import Scope from './Scope'

class Resource {
  id: string
  name: string
  password: string
  website: string
  resourceSecret: string
  scope: Scope[]
  createdAt: Date
  updatedAt: Date

  constructor (obj: any) {
    this.id = obj.id
    this.name = obj.name
    this.website = obj.website
    this.resourceSecret = obj.resourceSecret
    this.scope = obj.scope.map((v: any) => new Scope(v.name, v.description))
    this.createdAt = obj.createdAt ? new Date(obj.createdAt) : null
    this.updatedAt = obj.updatedAt ? new Date(obj.updatedAt) : null
  }

  toJson (): string {
    const obj: any = {}
    Object.keys(this).forEach((key: keyof Resource) => {
      obj[camelToSnake(key)] = this[key]
    })
    return JSON.stringify(obj)
  }
}

export default Resource
