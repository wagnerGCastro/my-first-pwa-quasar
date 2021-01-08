import Vue from 'vue'
import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:8021/api'
})

// Set Bearer token header
const setAxiosBearerToken = token => {
  /* eslint-disable */
  axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

// for use inside Vue files through this.$axios
Vue.prototype.$axios = axiosInstance

export {
  axiosInstance,
  setAxiosBearerToken
}
