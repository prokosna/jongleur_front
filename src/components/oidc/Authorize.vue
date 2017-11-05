<template>
    <div class="content">
        <div class="row">
            <div class="col-sm-offset-3 col-sm-6">
                <div class="form-container">
                    <form class="form-horizontal">
                        <div class="form-group">
                            <h2>Authorize "{{ client.name }}" to use your account?</h2>
                            <p>
                                The application will be able to do following actions
                            </p>
                            <ul>
                                <li v-for="s in scope">{{ s.description }}</li>
                            </ul>
                        </div>
                        <fieldset v-if="isLoggedIn === true">
                            <div class="form-group">
                                <a type="button" class="col-lg-6 btn btn-primary" @click="onAccept">Accept</a>
                                <a type="button" class="col-lg-6 btn btn-default" @click="onCancel">No, Thank you</a>
                            </div>
                        </fieldset>
                        <fieldset v-else-if="isLoggedIn === false">
                            <div class="form-group">
                                <label for="inputName" class="control-label">Name</label>
                                <div class="">
                                    <input type="text" class="form-control" id="inputName" placeholder="Name"
                                           v-model="name" required>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="inputPassword" class="control-label">Password</label>
                                <div class="">
                                    <input type="password" class="form-control" id="inputPassword"
                                           placeholder="Password" v-model="password" required>
                                </div>
                            </div>
                            <div class="form-group" :style="warningStyle">
                                <p class="text-danger">{{ warning }}</p>
                            </div>
                            <div class="form-group">
                                <a type="button" class="col-lg-6 btn btn-primary" @click="onLogin">Log in</a>
                            </div>
                        </fieldset>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  import { mapActions } from 'vuex'

  export default {
    mounted: function () {
      const query = this.$route.query
      const { client_id } = query
      this.query = query
      this.authorize({
        params: query
      })
        .then((ret) => {
          const { grantId, scope } = ret
          this.grantId = grantId
          this.scope = scope || ['No actions required']
          this.isLoggedIn = true
        })
        .catch((e) => {
          if (e) {
            throw e
          }
        })
        .then(() => this.getClient({ id: client_id }))
        .then((client) => {
          this.client = client
        })
        .catch((e) => {
          this.updateAlertMessage({
            alertType: 'danger',
            alertMessage: e.message
          })
        })
    },
    data: function () {
      return {
        query: null,
        isLoggedIn: false,
        name: null,
        password: null,
        grantId: null,
        scope: [],
        client: {},
        warning: null,
        isProcessing: false
      }
    },
    computed: {
      warningStyle: function () {
        return this.warning ? {} : {
          display: 'none'
        }
      }
    },
    methods: {
      ...mapActions([
        'authorize',
        'accept',
        'getClient',
        'loginAsEndUser',
        'updateAlertMessage'
      ]),
      onLogin: function () {
        if (this.isProcessing) {
          return
        }
        this.isProcessing = true
        if (!this.name || !this.password) {
          this.warning = 'Name and Password are required.'
          return
        }
        this.loginAsEndUser({
          name: this.name,
          password: this.password
        })
          .then(() => this.authorize({ params: this.query }))
          .then((ret) => {
            const { grantId, scope } = ret
            this.grantId = grantId
            this.scope = scope || ['No actions required']
            this.isLoggedIn = true
          })
          .catch((e) => this.updateAlertMessage({
            alertType: 'danger',
            alertMessage: e.message
          }))
          .then(() => {
            this.isProcessing = false
          })
      },
      onAccept: function () {
        if (this.isProcessing) {
          return
        }
        this.isProcessing = true
        this.accept({ grantId: this.grantId, accept: true })
          .catch((e) => this.updateAlertMessage({
            alertType: 'danger',
            alertMessage: e.message
          }))
          .then(() => {
            this.isProcessing = false
          })
      },
      onCancel: function () {
        if (this.isProcessing) {
          return
        }
        this.isProcessing = true
        this.accept({ grantId: this.grantId, accept: false })
          .catch((e) => this.updateAlertMessage({
            alertType: 'danger',
            alertMessage: e.message
          }))
          .then(() => {
            this.isProcessing = false
          })
      }
    }
  }
</script>

<style scoped>
</style>