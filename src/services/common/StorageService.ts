enum Keys {
  EndUserId = 'enduserid',
  ClientId = 'clientid',
  ResourceId = 'resourceid',
  SessionToken = 'sessiontoken'
}

class StorageService {

  get (key: Keys): string {
    return localStorage.getItem(key as string) || null
  }

  set (key: Keys, value: string) {
    localStorage.setItem(key as string, value)
  }

}

export { Keys, StorageService }
