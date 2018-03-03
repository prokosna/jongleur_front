export enum AlertType {
  Info = 'Info',
  Warning = 'Warning',
  Danger = 'Danger',
  Success = 'Success'
}

export class State {
  alertType: AlertType
  alertMessage: string
  isLoading: boolean
  loggedInAs: string

  constructor () {
    this.alertType = null
    this.alertMessage = null
    this.isLoading = false
    this.loggedInAs = null
  }
}

const state = new State()
export default state
