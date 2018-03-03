import * as qs from 'qs'

function redirect (url: string) {
  location.href = url
}

class RedirectService {
  redirect (url: string, params: {}, after: number) {
    let query = ''
    if (params) {
      query = `?${qs.stringify(params)}`
    }
    setTimeout(redirect, after, `${url}${query}`)
  }
}

export default RedirectService
