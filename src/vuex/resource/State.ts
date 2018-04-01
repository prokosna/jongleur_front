import Resource from '../../models/Resource'

export class State {

  resource: Resource

  constructor () {
    this.resource = null
  }
}

const state = new State()
export default state
