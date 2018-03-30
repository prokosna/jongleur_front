import Client from '../../models/Client'

export class State {

  client: Client

  constructor () {
    this.client = null
  }
}

const state = new State()
export default state
