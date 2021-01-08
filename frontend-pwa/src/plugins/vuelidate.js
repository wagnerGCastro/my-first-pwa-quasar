import Vuelidate from 'vuelidate'

export default ({ Vue }) => {
  window.Vue = require('vue')
  Vue.use(Vuelidate)
}