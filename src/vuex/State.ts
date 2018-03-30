export enum AlertType {
  Info = 'Info',
  Warning = 'Warning',
  Danger = 'Danger',
  Success = 'Success'
}

export class RootState {
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

const state = new RootState()
export default state
