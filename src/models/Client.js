class Client {
  constructor (obj = {}) {
    this.id = obj.id
    this.name = obj.name
    this.password = obj.password
    this.website = obj.website
    this.clientType = obj.clientType
    this.clientSecret = obj.clientSecret
    this.resourceId = obj.resourceId
    this.redirectUris = obj.redirectUris
    this.createdAt = isNaN(new Date(obj.createdAt)) ? null : new Date(obj.createdAt).toISOString()
    this.updatedAt = isNaN(new Date(obj.updatedAt)) ? null : new Date(obj.updatedAt).toISOString()
  }
}

export default Client
