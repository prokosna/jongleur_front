import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import config from './config'
import EndUser from './models/EndUser'
import Client from './models/Client'
import Resource from './models/Resource'
import router from './router'
import util from './util'

Vue.use(Vuex)

const actions = {
  initialize ({ commit }) {
    // set saved values in localStorage and sessionStorage
    const saved_end_user_id = localStorage.getItem(config.END_USER_ID_LOCAL_STORAGE_KEY) || ''
    const saved_client_id = localStorage.getItem(config.CLIENT_ID_LOCAL_STORAGE_KEY) || ''
    const saved_resource_id = localStorage.getItem(config.RESOURCE_ID_LOCAL_STORAGE_KEY) || ''
    commit('updateEndUserSavedId', { id: saved_end_user_id })
    commit('updateClientSavedId', { id: saved_client_id })
    commit('updateResourceSavedId', { id: saved_resource_id })
  },
  updateAlertMessage ({ commit }, { alertType, alertMessage }) {
    commit('updateAlertMessage', { alertType, alertMessage })
    setTimeout(() => {
      commit('updateAlertMessage', {
        alertType: null,
        alertMessage: null
      })
    }, config.ALERT_MESSAGE_TIMEOUT_MS)
  },
  loginAsEndUser ({ commit }, { name, password }) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'post',
        url: `${config.API_URI}/end_users/login`,
        withCredentials: true,
        responseType: 'json',
        data: {
          name,
          password
        }
      })
        .then((resp) => {
          const id = resp.data.id
          commit('updateEndUserSavedId', { id })
          resolve()
        })
        .catch((e) => {
          if (e.response && e.response.data) {
            Vue.$log.error(e.response)
            const msg = e.response.data.error_description || config.UNEXPECTED_ERROR_MESSAGE
            reject(new Error(msg))
            return
          }
          Vue.$log.error(e)
          reject(new Error(config.UNEXPECTED_ERROR_MESSAGE))
        })
    })
  },
  getCurrentEndUser ({ commit }, { id }) {
    return new Promise((resolve, reject) => {
      if (!id) {
        reject(new Error('No user id.'))
        return
      }
      axios({
        method: 'get',
        url: `${config.API_URI}/end_users/private/${id}`,
        withCredentials: true,
        responseType: 'json'
      })
        .then((resp) => {
          const model = new EndUser(util.deepCamelize(resp.data))
          commit('updateEndUserModel', { model })
          resolve()
        })
        .catch((e) => {
          if (e.response && e.response.data) {
            if (e.response.data.code === 'require_login') {
              reject()
              return
            }
            Vue.$log.error(e.response)
            commit('updateEndUserSavedId', { id: null })
            const msg = e.response.data.error_description || config.UNEXPECTED_ERROR_MESSAGE
            reject(new Error(msg))
            return
          }
          Vue.$log.error(e)
          commit('updateEndUserSavedId', { id: null })
          reject(new Error(config.UNEXPECTED_ERROR_MESSAGE))
        })
    })
  },
  registerEndUser ({}, { endUser }) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'post',
        url: `${config.API_URI}/end_users`,
        responseType: 'json',
        data: {
          ...util.deepPrune(util.deepDecamelize(endUser))
        }
      })
        .then(() => {
          resolve()
        })
        .catch((e) => {
          if (e.response && e.response.data) {
            Vue.$log.error(e.response)
            const msg = e.response.data.error_description || config.UNEXPECTED_ERROR_MESSAGE
            reject(new Error(msg))
            return
          }
          Vue.$log.error(e)
          reject(new Error(config.UNEXPECTED_ERROR_MESSAGE))
        })
    })
  },
  updateEndUser ({}, { endUser }) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'put',
        url: `${config.API_URI}/end_users/private/${endUser.id}`,
        responseType: 'json',
        withCredentials: true,
        data: {
          ...util.deepPrune(util.deepDecamelize(endUser))
        }
      })
        .then((resp) => {
          Vue.$log.debug(resp)
          resolve()
        })
        .catch((e) => {
          if (e.response && e.response.data) {
            Vue.$log.error(e.response)
            const msg = e.response.data.error_description || config.UNEXPECTED_ERROR_MESSAGE
            reject(new Error(msg))
            return
          }
          Vue.$log.error(e)
          reject(new Error(config.UNEXPECTED_ERROR_MESSAGE))
        })
    })
  },
  deleteEndUser ({ commit }, { endUser }) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'delete',
        url: `${config.API_URI}/end_users/private/${endUser.id}`,
        withCredentials: true
      })
        .then(() => {
          commit('updateEndUserSavedId', { id: null })
          resolve()
        })
        .catch((e) => {
          if (e.response && e.response.data) {
            Vue.$log.error(e.response)
            const msg = e.response.data.error_description || config.UNEXPECTED_ERROR_MESSAGE
            reject(new Error(msg))
            return
          }
          Vue.$log.error(e)
          reject(new Error(config.UNEXPECTED_ERROR_MESSAGE))
        })
    })
  },
  loginAsClient ({ commit }, { name, password }) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'post',
        url: `${config.API_URI}/clients/login`,
        withCredentials: true,
        responseType: 'json',
        data: {
          name,
          password
        }
      })
        .then((resp) => {
          const id = resp.data.id
          commit('updateClientSavedId', { id })
          resolve()
        })
        .catch((e) => {
          if (e.response && e.response.data) {
            Vue.$log.error(e.response)
            const msg = e.response.data.error_description || config.UNEXPECTED_ERROR_MESSAGE
            reject(new Error(msg))
            return
          }
          Vue.$log.error(e)
          reject(new Error(config.UNEXPECTED_ERROR_MESSAGE))
        })
    })
  },
  getClient ({}, { id }) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'get',
        url: `${config.API_URI}/clients/${id}`,
        responseType: 'json'
      })
        .then((resp) => {
          const client = new Client(util.deepCamelize(resp.data))
          resolve(client)
        })
        .catch((e) => {
          if (e.response && e.response.data) {
            Vue.$log.error(e.response)
            const msg = e.response.data.error_description || config.UNEXPECTED_ERROR_MESSAGE
            reject(new Error(msg))
            return
          }
          Vue.$log.error(e)
          reject(new Error(config.UNEXPECTED_ERROR_MESSAGE))
        })
    })
  },
  getCurrentClient ({ commit }, { id }) {
    return new Promise((resolve, reject) => {
      if (!id) {
        reject(new Error('No client id.'))
        return
      }
      axios({
        method: 'get',
        url: `${config.API_URI}/clients/private/${id}`,
        withCredentials: true,
        responseType: 'json'
      })
        .then((resp) => {
          const model = new Client(util.deepCamelize(resp.data))
          commit('updateClientModel', { model })
          resolve()
        })
        .catch((e) => {
          if (e.response && e.response.data) {
            if (e.response.data.code === 'require_login') {
              reject()
              return
            }
            commit('updateClientSavedId', { id: null })
            const msg = e.response.data.error_description || config.UNEXPECTED_ERROR_MESSAGE
            reject(new Error(msg))
            return
          }
          Vue.$log.error(e)
          commit('updateClientSavedId', { id: null })
          reject(new Error(config.UNEXPECTED_ERROR_MESSAGE))
        })
    })
  },
  registerClient ({}, { client }) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'post',
        url: `${config.API_URI}/clients`,
        responseType: 'json',
        data: {
          ...util.deepPrune(util.deepDecamelize(client))
        }
      })
        .then(() => {
          resolve()
        })
        .catch((e) => {
          if (e.response && e.response.data) {
            Vue.$log.error(e.response)
            const msg = e.response.data.error_description || config.UNEXPECTED_ERROR_MESSAGE
            reject(new Error(msg))
            return
          }
          Vue.$log.error(e)
          reject(new Error(config.UNEXPECTED_ERROR_MESSAGE))
        })
    })
  },
  updateClient ({}, { client }) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'put',
        url: `${config.API_URI}/clients/private/${client.id}`,
        responseType: 'json',
        withCredentials: true,
        data: {
          ...util.deepPrune(util.deepDecamelize(client))
        }
      })
        .then((resp) => {
          resolve()
        })
        .catch((e) => {
          if (e.response && e.response.data) {
            Vue.$log.error(e.response)
            const msg = e.response.data.error_description || config.UNEXPECTED_ERROR_MESSAGE
            reject(new Error(msg))
            return
          }
          Vue.$log.error(e)
          reject(new Error(config.UNEXPECTED_ERROR_MESSAGE))
        })
    })
  },
  deleteClient ({ commit }, { client }) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'delete',
        url: `${config.API_URI}/clients/private/${client.id}`,
        withCredentials: true
      })
        .then(() => {
          commit('updateClientSavedId', { id: null })
          resolve()
        })
        .catch((e) => {
          if (e.response && e.response.data) {
            Vue.$log.error(e.response)
            const msg = e.response.data.error_description || config.UNEXPECTED_ERROR_MESSAGE
            reject(new Error(msg))
            return
          }
          Vue.$log.error(e)
          reject(new Error(config.UNEXPECTED_ERROR_MESSAGE))
        })
    })
  },
  loginAsResource ({ commit }, { name, password }) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'post',
        url: `${config.API_URI}/resources/login`,
        withCredentials: true,
        responseType: 'json',
        data: {
          name,
          password
        }
      })
        .then((resp) => {
          const id = resp.data.id
          commit('updateResourceSavedId', { id })
          resolve()
        })
        .catch((e) => {
          if (e.response && e.response.data) {
            Vue.$log.error(e.response)
            const msg = e.response.data.error_description || config.UNEXPECTED_ERROR_MESSAGE
            reject(new Error(msg))
            return
          }
          Vue.$log.error(e)
          reject(new Error(config.UNEXPECTED_ERROR_MESSAGE))
        })
    })
  },
  getResources () {
    return new Promise((resolve, reject) => {
      axios({
        method: 'get',
        url: `${config.API_URI}/resources`,
        responseType: 'json'
      })
        .then((resp) => {
          const resources = resp.data.map(r => new Resource(util.deepCamelize(r)))
          resolve(resources)
        })
        .catch((e) => {
          if (e.response && e.response.data) {
            Vue.$log.error(e.response)
            const msg = e.response.data.error_description || config.UNEXPECTED_ERROR_MESSAGE
            reject(new Error(msg))
            return
          }
          Vue.$log.error(e)
          reject(new Error(config.UNEXPECTED_ERROR_MESSAGE))
        })
    })
  },
  getResource ({}, { id }) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'get',
        url: `${config.API_URI}/resources/${id}`,
        responseType: 'json'
      })
        .then((resp) => {
          const resource = new Resource(util.deepCamelize(resp.data))
          resolve(resource)
        })
        .catch((e) => {
          if (e.response && e.response.data) {
            Vue.$log.error(e.response)
            const msg = e.response.data.error_description || config.UNEXPECTED_ERROR_MESSAGE
            reject(new Error(msg))
            return
          }
          Vue.$log.error(e)
          reject(new Error(config.UNEXPECTED_ERROR_MESSAGE))
        })
    })
  },
  getCurrentResource ({ commit }, { id }) {
    return new Promise((resolve, reject) => {
      if (!id) {
        reject(new Error('No resource id.'))
      }
      axios({
        method: 'get',
        url: `${config.API_URI}/resources/private/${id}`,
        withCredentials: true,
        responseType: 'json'
      })
        .then((resp) => {
          const model = new Resource(util.deepCamelize(resp.data))
          commit('updateResourceModel', { model })
          resolve()
        })
        .catch((e) => {
          if (e.response && e.response.data) {
            if (e.response.data.code === 'require_login') {
              reject()
              return
            }
            commit('updateResourceSavedId', { id: null })
            const msg = e.response.data.error_description || config.UNEXPECTED_ERROR_MESSAGE
            reject(new Error(msg))
            return
          }
          Vue.$log.error(e)
          commit('updateResourceSavedId', { id: null })
          reject(new Error(config.UNEXPECTED_ERROR_MESSAGE))
        })
    })
  },
  registerResource ({}, { resource }) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'post',
        url: `${config.API_URI}/resources`,
        responseType: 'json',
        data: {
          ...util.deepPrune(util.deepDecamelize(resource))
        }
      })
        .then(() => {
          resolve()
        })
        .catch((e) => {
          if (e.response && e.response.data) {
            Vue.$log.error(e.response)
            const msg = e.response.data.error_description || config.UNEXPECTED_ERROR_MESSAGE
            reject(new Error(msg))
            return
          }
          Vue.$log.error(e)
          reject(new Error(config.UNEXPECTED_ERROR_MESSAGE))
        })
    })
  },
  updateResource ({}, { resource }) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'put',
        url: `${config.API_URI}/resources/private/${resource.id}`,
        responseType: 'json',
        withCredentials: true,
        data: {
          ...util.deepPrune(util.deepDecamelize(resource))
        }
      })
        .then(() => {
          resolve()
        })
        .catch((e) => {
          if (e.response && e.response.data) {
            Vue.$log.error(e.response)
            const msg = e.response.data.error_description || config.UNEXPECTED_ERROR_MESSAGE
            reject(new Error(msg))
            return
          }
          Vue.$log.error(e)
          reject(new Error(config.UNEXPECTED_ERROR_MESSAGE))
        })
    })
  },
  deleteResource ({ commit }, { resource }) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'delete',
        url: `${config.API_URI}/resources/private/${resource.id}`,
        withCredentials: true
      })
        .then(() => {
          commit('updateResourceSavedId', { id: null })
          resolve()
        })
        .catch((e) => {
          if (e.response && e.response.data) {
            Vue.$log.error(e.response)
            const msg = e.response.data.error_description || config.UNEXPECTED_ERROR_MESSAGE
            reject(new Error(msg))
            return
          }
          Vue.$log.error(e)
          reject(new Error(config.UNEXPECTED_ERROR_MESSAGE))
        })
    })
  },
  logout ({ commit, state }) {
    switch (state.loggedInAs) {
      case 'end_user':
        commit('updateEndUserSavedId', { id: null })
        commit('updateEndUserModel', { model: {} })
        router.push('/end_user/login')
        break
      case 'client':
        commit('updateClientSavedId', { id: null })
        commit('updateClientModel', { model: {} })
        router.push('/client/login')
        break
      case 'resource':
        commit('updateResourceSavedId', { id: null })
        commit('updateResourceModel', { model: {} })
        router.push('/resource/login')
        break
    }
    commit('updateLoggedInAs', { loggedInAs: null })
  },
  authorize ({}, { params }) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'get',
        url: `${config.API_URI}/oidc/authorize`,
        responseType: 'json',
        withCredentials: true,
        params
      })
        .then((resp) => {
          if (resp.data.status === 'redirect') {
            location.href = resp.data.location
            return
          } else if (resp.data.code === 'require_acceptance') {
            resolve({
              grantId: resp.data.grant_id,
              scope: resp.data.scope
            })
            return
          }
          Vue.$log.error(resp)
          reject(new Error(config.UNEXPECTED_ERROR_MESSAGE))
        })
        .catch((e) => {
          if (e.response && e.response.status === 401) {
            reject()
            return
          }
          Vue.$log.error(e)
          reject(new Error(config.UNEXPECTED_ERROR_MESSAGE))
        })
    })
  },
  accept ({}, { grantId, accept }) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'post',
        url: `${config.API_URI}/oidc/accept`,
        responseType: 'json',
        withCredentials: true,
        data: {
          action: accept ? 'accept' : 'cancel',
          grant_id: grantId
        }
      })
        .then((resp) => {
          if (resp.data.status === 'redirect') {
            location.href = resp.data.location
            return
          }
          Vue.$log.error(resp)
          reject(new Error(config.UNEXPECTED_ERROR_MESSAGE))
        })
        .catch((e) => {
          Vue.$log.error(e)
          reject(new Error(config.UNEXPECTED_ERROR_MESSAGE))
        })
    })
  }
}

const mutations = {
  updateAlertMessage (state, { alertType, alertMessage }) {
    state.alertType = alertType
    state.alertMessage = alertMessage
  },
  updateLoading (state, { isLoading, loadingMessage }) {
    state.isLoading = isLoading
    state.loadingMessage = loadingMessage
  },
  updateLoggedInAs (state, { loggedInAs }) {
    state.loggedInAs = loggedInAs
  },
  updateEndUserSavedId (state, { id }) {
    if (id) {
      localStorage.setItem(config.END_USER_ID_LOCAL_STORAGE_KEY, id)
    } else {
      localStorage.removeItem(config.END_USER_ID_LOCAL_STORAGE_KEY)
    }
    state.endUser.savedId = id
  },
  updateClientSavedId (state, { id }) {
    if (id) {
      localStorage.setItem(config.CLIENT_ID_LOCAL_STORAGE_KEY, id)
    } else {
      localStorage.removeItem(config.CLIENT_ID_LOCAL_STORAGE_KEY)
    }
    state.client.savedId = id
  },
  updateResourceSavedId (state, { id }) {
    if (id) {
      localStorage.setItem(config.RESOURCE_ID_LOCAL_STORAGE_KEY, id)
    } else {
      localStorage.removeItem(config.RESOURCE_ID_LOCAL_STORAGE_KEY)
    }
    state.resource.savedId = id
  },
  updateEndUserModel (state, { model }) {
    state.endUser.model = model
  },
  updateClientModel (state, { model }) {
    state.client.model = model
  },
  updateResourceModel (state, { model }) {
    state.resource.model = model
  }
}

const getters = {}

const state = {
  alertType: null,
  alertMessage: null,
  isLoading: false,
  loadingMessage: null,
  loggedInAs: null,
  endUser: {
    savedId: null,
    model: {}
  },
  client: {
    savedId: null,
    model: {}
  },
  resource: {
    savedId: null,
    model: {}
  },
  admin: {
    endUsers: [],
    clients: [],
    resources: []
  }
}

export default new Vuex.Store({
  actions,
  mutations,
  getters,
  state
})
