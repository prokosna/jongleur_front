export default {
  API_URI: process.env.API_URI || 'http://127.0.0.1/api/v1',
  ALERT_MESSAGE_TIMEOUT_MS: Number(process.env.ALERT_MESSAGE_TIMEOUT_MS) || 10000
}
