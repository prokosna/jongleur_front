class Resource {
  constructor (obj = {}) {
    this.id = obj.id
    this.name = obj.name
    this.password = obj.password
    this.website = obj.website
    this.resourceSecret = obj.resourceSecret
    this.scope = obj.scope
    this.createdAt = isNaN(new Date(obj.createdAt)) ? null : new Date(obj.createdAt).toISOString()
    this.updatedAt = isNaN(new Date(obj.updatedAt)) ? null : new Date(obj.updatedAt).toISOString()
  }
}

export default Resource
