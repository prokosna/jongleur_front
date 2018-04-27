<template>
  <div class="row">
    <div class="offset-2 col-8">
      <h1>Authorize <b>{{ client.name }}</b> to use your account?</h1>
      <p>This application will be able to:</p>
      <ul>
        <li v-for="s in scope">{{ s.description }}</li>
      </ul>
      <div class="form-horizontal">
        <div v-if="isLoggedIn === true">
          <div class="form-group row">
            <div class="col-2">
              <a type="button" class="btn btn-primary" @click="onAccept">Accept</a>
            </div>
            <div class="col-2">
              <a type="button" class="btn btn-secondary" @click="onCancel">Cancel</a>
            </div>
          </div>
        </div>
        <div v-else>
          <div class="form-group row">
            <div class="col-6">
              <field-input v-model="form.name"
                           label="Name"
                           name="name"
                           placeholder="Enter your name"
                           :required="false">
              </field-input>
            </div>
          </div>
          <div class="form-group row">
            <div class="col-6">
              <field-input v-model="form.password"
                           label="Password"
                           name="password"
                           type="password"
                           placeholder="Enter your password"
                           :required="false">
              </field-input>
            </div>
          </div>
          <div class="form-group row">
            <div class="col-12">
              <a class="btn btn-primary" @click="onLogin">Login</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import FieldInput from '../form/FieldInput'
  import Scope from '../../models/Scope'
  import Client from "../../models/Client"
  import { ActionTypeOidc } from "../../vuex/oidc/Action"
  import { snakeToCamelObj } from "../../utils/camelize"
  import { ClientService } from '../../services/client/ClientService'
  import { AuthorizeForm } from '../../services/oidc/OidcService'
  import { ActionTypeEndUser } from "../../vuex/enduser/Action"

  interface LoginForm {
    name: string
    password: string
  }

  @Component({
    components: {
      'field-input': FieldInput
    }
  })
  export default class Authorize extends Vue {
    clientService = new ClientService()
    form: LoginForm = {
      name: null,
      password: null
    }
    query: any = {}
    isLoggedIn: boolean = false
    grantId: string = ''
    scope: Scope[] = []
    client: Client = null
    isProcessing: boolean = false

    mounted () {
      this.query = snakeToCamelObj(this.$route.query)
      this.authorize()
    }

    authorize () {
      this.$store.dispatch(`oidc/${ActionTypeOidc.AUTHORIZE}`, this.query as AuthorizeForm)
        .then((ret) => {
          if (ret) {
            // Already logged in and require acceptance
            this.isLoggedIn = true
            const { grantId, scope } = ret
            this.grantId = grantId
            this.scope = scope || [{
              name: 'no_action',
              description: 'Do nothing (No actions are required)'
            }]
            const clientId = (<AuthorizeForm>this.query).clientId
            this.clientService.get(clientId, null)
              .then((client) => {
                this.client = client
              })
              .catch((e) => {
                console.error(e)
                this.$router.push('/sorry')
              })
          }
        })
        .catch((e) => {
          console.error(e)
          this.$router.push('/sorry')
        })
    }

    onLogin () {
      if (this.isProcessing) {
        return
      }
      this.isProcessing = true
      this.$store.dispatch(`enduser/${ActionTypeEndUser.LOGIN_AS_END_USER}`, this.form)
        .then(() => {
          this.$router.replace('/enduser/home')
          this.authorize()
          this.isProcessing = false
        })
        .catch(() => {
          this.isProcessing = false
        })
    }

    onAccept () {
      if (this.isProcessing) {
        return
      }
      this.isProcessing = true
      this.$store.dispatch(`oidc/${ActionTypeOidc.ACCEPT}`, {
        accept: true,
        grantId: this.grantId
      })
        .catch((e) => {
          console.error(e)
          this.$router.push('/sorry')
        })
        .then(() => {
          this.isProcessing = false
        })
    }

    onCancel () {
      if (this.isProcessing) {
        return
      }
      this.isProcessing = true
      this.$store.dispatch(`oidc/${ActionTypeOidc.ACCEPT}`, {
        accept: false,
        grantId: this.grantId
      })
        .catch((e) => {
          console.error(e)
          this.$router.push('/sorry')
        })
        .then(() => {
          this.isProcessing = false
        })
    }
  }
</script>

<style scoped>
</style>
