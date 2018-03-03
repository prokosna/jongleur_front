import EndUser from '../../models/EndUser'

export class State {

  endUser: EndUser

  constructor () {
    this.endUser = null
  }
}

const state = new State()
export default state
