<template>
  <div class="row">
    <div class="col-sm-7">
      <h1>Client</h1>
      <p>
        "Client" is a user of resources such as web services, desktop apps and mobile apps.
        When "Client" accesses to someone's resource, "Client" redirects "EndUser" to the authorization server and
        gets "Access Token".
      </p>
    </div>
    <div class="col-sm-5">
      <ul class="nav nav-tabs">
        <li class="nav-item">
          <a class="nav-link active" href="#logIn" data-toggle="tab">Log in</a>
        </li>
      </ul>
      <div id="myTabContent" class="tab-content card">
        <div class="tab-pane fade show active card-body" id="logIn">
          <form-login :form="form" @submit="onLogin"></form-login>
          <div>
            <a href="/client/register">Create a new Client</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import FormLogin from '../form/FormLogin'
  import { Keys, StorageService } from "../../services/common/StorageService"
  import { ActionTypeClient } from "../../vuex/client/Action"

  @Component({
    components: {
      'form-login': FormLogin
    }
  })
  export default class Login extends Vue {
    storageService: StorageService = new StorageService()

    form: { name: string, password: string } = { name: null, password: null }
    isProcessing: boolean = false

    mounted () {
      // check if logged in
      if (this.storageService.get(Keys.ClientId)) {
        // may be already logged in
        this.$store.dispatch(`client/${ActionTypeClient.FETCH_MY_CLIENT}`)
          .then(() => {
            this.$router.replace('/client/home')
          })
      }
    }

    onLogin () {
      if (this.isProcessing) {
        return
      }
      this.isProcessing = true
      this.$store.dispatch(`client/${ActionTypeClient.LOGIN_AS_CLIENT}`, this.form)
        .then(() => {
          this.$router.replace('/client/home')
          this.isProcessing = false
        })
        .catch(() => {
          this.isProcessing = false
        })
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
