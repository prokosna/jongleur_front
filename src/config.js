const config = require(`./configs/${process.env.NODE_ENV}`)
import util from './util'

export default Object.assign({}, util.deepPrune(config), util.deepPrune({
  API_URI: process.env.API_URI
}))
