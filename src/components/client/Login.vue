<template>
    <div class="content">
        <div class="row">
            <div class="col-sm-7">
                <h1>Client</h1>
                <p>
                    "Client" is a user of resources such as web services, desktop apps and mobile apps.
                    When "Client" accesses to someone's resource, "Client" redirects "EndUser" to the authorization server and gets "Access Token".
                </p>
            </div>
            <div class="col-sm-5">
                <div class="form-container">
                    <ul class="nav nav-tabs">
                        <li class="active">
                            <a href="#logIn" data-toggle="tab">Log in</a>
                        </li>
                    </ul>
                    <div id="myTabContent" class="tab-content">
                        <div class="tab-pane fade active in" id="logIn">
                            <form class="form-horizontal">
                                <fieldset>
                                    <div class="form-group">
                                        <label for="inputName" class="control-label">Name</label>
                                        <div class="">
                                            <input type="text" class="form-control" id="inputName" v-model="name"
                                                   placeholder="Name">
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="inputPassword" class="control-label">Password</label>
                                        <div class="">
                                            <input type="password" class="form-control" id="inputPassword"
                                                   v-model="password"
                                                   placeholder="Password">
                                        </div>
                                    </div>
                                    <div class="form-group" :style="warningStyle">
                                        <p class="text-danger">{{ warning }}</p>
                                    </div>
                                    <div class="form-group">
                                        <a href="#" class="btn btn-primary btn-block" @click="onLogin">Log in</a>
                                        <a href="/client/register">Create a new client</a>
                                    </div>
                                </fieldset>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex'

  export default {
    mounted: function () {
      // check if logged in
      if (this.client.savedId) {
        // may be already logged in
        this.$router.replace('/client/update')
      }
    },
    data: function () {
      return {
        name: null,
        password: null,
        warning: null,
        isProcessing: false
      }
    },
    computed: {
      ...mapState({
        client: state => state.client
      }),
      warningStyle: function () {
        return this.warning ? {} : {
          display: 'none'
        }
      }
    },
    methods: {
      onLogin: function () {
        if (this.isProcessing) {
          return
        }
        this.isProcessing = true
        if (!this.name || !this.password) {
          this.warning = 'Name and Password are required.'
          return
        }
        this.loginAsClient({
          name: this.name,
          password: this.password
        })
          .then(() => {
            this.$router.replace('/client/update')
          })
          .catch((e) => {
            this.updateAlertMessage({
              alertType: 'danger',
              alertMessage: e.message
            })
          })
          .then(() => {
            this.isProcessing = false
          })
      },
      ...mapActions([
        'updateAlertMessage',
        'loginAsClient'
      ])
    }
  }
</script>

<style scoped>
    .content {
        padding: 10px 10px;
    }

    .tab-content {
        padding: 10px 30px;
        border: 1px solid #333333;
    }
</style>
