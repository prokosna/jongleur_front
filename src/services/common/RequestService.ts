import * as qs from 'qs'
import axios from 'axios'

class RequestService {
  get (url: string, params: {}, token: string): Promise<any> {
    return new Promise((resolve, reject) => {
      let query = ''
      if (params) {
        query = `?${qs.stringify(query)}`
      }
      let headers = null
      if (token) {
        headers = { 'Authorization': `Bearer ${token}` }
      }
      axios({
        method: 'get',
        url: `${url}${query}`,
        responseType: 'json',
        headers
      })
        .then(resp => resolve(resp.data))
        .catch(e => {
          console.error(e)
          reject(e.response ? e.response.data : e)
        })
    })
  }

  post (url: string, params: {}, body: {}, token: string): Promise<any> {
    return new Promise((resolve, reject) => {
      let query = ''
      if (params) {
        query = `?${qs.stringify(query)}`
      }
      let headers = null
      if (token) {
        headers = { 'Authorization': `Bearer ${token}` }
      }
      axios({
        method: 'post',
        url: `${url}${query}`,
        responseType: 'json',
        headers,
        data: body
      })
        .then(resp => resolve(resp.data))
        .catch(e => {
          console.error(e)
          reject(e.response ? e.response.data : e)
        })
    })
  }

  put (url: string, params: {}, body: {}, token: string): Promise<any> {
    return new Promise((resolve, reject) => {
      let query = ''
      if (params) {
        query = `?${qs.stringify(query)}`
      }
      let headers = null
      if (token) {
        headers = { 'Authorization': `Bearer ${token}` }
      }
      axios({
        method: 'put',
        url: `${url}${query}`,
        responseType: 'json',
        headers,
        data: body
      })
        .then(resp => resolve(resp.data))
        .catch(e => {
          console.error(e)
          reject(e.response ? e.response.data : e)
        })
    })
  }

  delete (url: string, params: {}, body: {}, token: string): Promise<any> {
    return new Promise((resolve, reject) => {
      let query = ''
      if (params) {
        query = `?${qs.stringify(query)}`
      }
      let headers = null
      if (token) {
        headers = { 'Authorization': `Bearer ${token}` }
      }
      axios({
        method: 'delete',
        url: `${url}${query}`,
        responseType: 'json',
        headers,
        data: body
      })
        .then(resp => resolve(resp.data))
        .catch(e => {
          console.error(e)
          reject(e.response ? e.response.data : e)
        })
    })
  }
}

export default RequestService
