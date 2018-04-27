enum Keys {
  AdminId = 'adminid',
  AdminSessionToken = 'adminsessiontoken',
  EndUserId = 'enduserid',
  EndUserSessionToken = 'endusersessiontoken',
  ClientId = 'clientid',
  ClientSessionToken = 'clientsessiontoken',
  ResourceId = 'resourceid',
  ResourceSessionToken = 'resourcesessiontoken'
}

class StorageService {

  get (key: Keys): string {
    return localStorage.getItem(key as string) || null
  }

  set (key: Keys, value: string) {
    localStorage.setItem(key as string, value == null ? '' : value)
  }

}

export { Keys, StorageService }
