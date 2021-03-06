import { setAxiosBearerToken } from 'boot/axios'
import * as service from '@services/request/auth'
import { storageService as storage } from '@services/storage'

/* eslint-disable */
export const auth = {
  namespaced: true,

  state: {
    user: {},
    token: '',
    expires: ''
  },

  mutations: {
    SET_TOKEN(state, token) {
      state.token = token
    },

    SET_USER(state, payload) {
      state.user = payload
    },

    SET_EXPIRES(state, payload) {
      state.expires = payload
    }
  },

  getters: {
    getUser: state => state.user
  },

  actions: {
    actionLoadSession: ({ dispatch }, token) => {
      return new Promise(async(resolve, reject) => {
        try {
          setAxiosBearerToken(token)
          const { data: { message } } = await service.getUserInfo()
          // console.log(message)
          dispatch('actionSetUser', message)
          dispatch('actionSetToken', token)
          storage.saveToken(token)
          resolve()
        } catch (err) {
          dispatch('actionSignOut')
          // console.log('[err]-actionLoadSession', err)
          reject(err)
        }
      })
    },

    actionDoLogin: ({ dispatch }, payload) => {
      return service.login(payload.userName, payload.userPassword).then(resp => {
        // console.log(resp)
        dispatch('actionSetExpires', resp.data.expires_in)
        dispatch('actionSetToken', resp.data.access_token)
        dispatch('actionLoadSession', resp.data.access_token)
      })
    },

    actionSetUser: ({ commit }, payload) => {
      commit('SET_USER', payload)
    },

    actionSetExpires: ({ commit }, payload) => {
      commit('SET_EXPIRES', payload)
    },

    actionSetToken: ({ commit }, payload) => {
      storage.saveToken(payload)
      // storage.setHeaderToken(payload)
      commit('SET_TOKEN', payload)
    },

    actionSignOut: ({ dispatch }) => {
      // storage.setHeaderToken('')
      storage.removeToken()
      dispatch('actionSetUser', {})
      dispatch('actionSetToken', '')
      dispatch('actionSetExpires', '')
    }
  }
}
