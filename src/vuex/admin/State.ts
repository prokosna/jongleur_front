import Admin from '../../models/Admin'

export class State {

  admin: Admin

  constructor () {
    this.admin = null
  }
}

const state = new State()
export default state
