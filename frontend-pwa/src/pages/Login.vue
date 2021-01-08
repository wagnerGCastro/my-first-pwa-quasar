<template>
  <div class="row justify-center">
    <div class="q-pa-md">
      <div class="login-page">
        <q-form @submit.prevent="submit($event)" ref="form" class="row q-col-gutter-sm">
          <h4>Acessar o sistema</h4>

          <div class="col col-12">
            <q-input
              outlined
              label="Email"
              v-model="form.userName"
            />
          </div>
          <div class="col col-12">
            <q-input
              outlined type="password"
              v-model="form.userPassword"
              label="Senha"
            />
          </div>
          <div class="col col-12">
            <q-btn label="Entrar" type="submit" color="primary"/>
          </div>
        </q-form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { required, email } from 'vuelidate/lib/validators'

export default {
  name: 'Login',
  props: {
  },
  data() {
    return {
      form: {
        userName: 'wagner@gmail.com',
        userPassword: '123456'
      }
    }
  },
  mounted() {

  },
  validations: {
    form: {
      userName: { required, email }
    }
  },
  methods: {
    ...mapActions({
      actionDoLogin: 'auth/actionDoLogin'
    }),

    async submit() {
      if (this.form.userName === '' && this.form.userPassword === '') {
        this.$q.notify({
          type: 'negative',
          position: 'top',
          message: 'Preencha todos os campos'
        })

        return
      }

      try {
        await this.actionDoLogin(this.form)
        alert('Redirecione para Home')
        this.$router.push({ name: 'home' })

        // this.$axios.post('/auth/login', {
        //   email: this.form.userName,
        //   password: this.form.userPassword
        // })
        //   .then((response) => {
        //     // this.data = response.data
        //     this.actionDoLogin(response.data)
        //     console.log(response.data)
        //   })
        //   .catch(() => {
        //     this.$q.notify({
        //       color: 'negative',
        //       position: 'top',
        //       message: 'Loading failed',
        //       icon: 'report_problem'
        //     })
        //   })
        //
      } catch (error) {
        console.log(error)
        alert(error.data ? error.data.message : 'Não foi possível fazer login')
      }
    }
  }
}
</script>

<style scoped lang="scss">
  .login-page {
    height: calc(100vh - 82px);
    display: flex;
    align-items: center;
    justify-content: center;
    max-width: 360px;
    min-width: 320px;
  }
</style>
