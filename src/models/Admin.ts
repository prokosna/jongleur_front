import { camelToSnakeObj } from '../utils/camelize'

class Admin {
  id: string
  name: string
  password: string
  createdAt: Date
  updatedAt: Date

  constructor (obj: any) {
    this.id = obj.id
    this.name = obj.name
    this.password = obj.password
    this.createdAt = obj.createdAt ? new Date(obj.createdAt) : null
    this.updatedAt = obj.updatedAt ? new Date(obj.updatedAt) : null
  }

  toJson (): string {
    const obj = camelToSnakeObj(this)
    return JSON.stringify(obj)
  }
}

export default Admin
