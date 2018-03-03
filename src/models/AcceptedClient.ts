class AcceptedClient {
  clientId: string
  scope: string[]

  constructor (clientId: string, scope: string[]) {
    this.clientId = clientId
    this.scope = scope
  }
}

export default AcceptedClient
