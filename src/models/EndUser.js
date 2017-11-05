class EndUser {
  constructor (obj = {}) {
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
    this.birthdate = isNaN(new Date(obj.birthdate)) ? null : new Date(obj.birthdate).toISOString()
    this.zoneinfo = obj.zoneinfo
    this.locale = obj.locale
    this.phoneNumber = obj.phoneNumber
    this.acceptedClient = obj.acceptedClients
    this.createdAt = isNaN(new Date(obj.createdAt)) ? null : new Date(obj.createdAt).toISOString()
    this.updatedAt = isNaN(new Date(obj.updatedAt)) ? null : new Date(obj.updatedAt).toISOString()
    this.lastAuthenticatedAt = isNaN(new Date(obj.lastAuthenticatedAt)) ? null : new Date(obj.lastAuthenticatedAt).toISOString()
  }
}

export default EndUser
