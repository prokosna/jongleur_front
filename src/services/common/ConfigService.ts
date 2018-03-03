import config from '../../Config'

enum ConfigKeys {
  ApiUrl = 'apiurl',
  AlertMessageTimeout = 'alertmessagetimeout'
}

class ConfigService {
  configMap: { [key in ConfigKeys]: string | number }

  constructor () {
    this.configMap = {
      [ConfigKeys.ApiUrl]: config.API_URI,
      [ConfigKeys.AlertMessageTimeout]: config.ALERT_MESSAGE_TIMEOUT_MS
    }
  }

  get (key: ConfigKeys): string | number {
    return this.configMap[key]
  }

  set (key: ConfigKeys, value: string | number) {
    this.configMap[key] = value
  }
}

const configService = new ConfigService()

export { ConfigKeys, configService }
