<template>
  <div class="row">
    <div class="offset-3 col-6">
      <ul class="nav nav-tabs">
        <li class="nav-item">
          <a class="nav-link active" href="#logIn" data-toggle="tab">Log in</a>
        </li>
      </ul>
      <div id="myTabContent" class="tab-content card">
        <div class="tab-pane fade show active card-body" id="logIn">
          <form-login :form="form" @submit="onLogin"></form-login>
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
  import { ActionTypeAdmin } from "../../vuex/admin/Action"

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
      if (this.storageService.get(Keys.AdminId)) {
        // may be already logged in
        this.$store.dispatch(`admin/${ActionTypeAdmin.FETCH_MY_ADMIN}`)
          .then(() => {
            this.$router.replace('/admin/home')
          })
      }
    }

    onLogin () {
      if (this.isProcessing) {
        return
      }
      this.isProcessing = true
      this.$store.dispatch(`admin/${ActionTypeAdmin.LOGIN_AS_ADMIN}`, this.form)
        .then(() => this.$store.dispatch(`admin/${ActionTypeAdmin.FETCH_MY_ADMIN}`))
        .then(() => {
          this.$router.replace('/admin/home')
          this.isProcessing = false
        })
        .catch(() => {
          this.isProcessing = false
        })
    }
  }
</script>

<style scoped>
  .tab-content {
    padding: 10px 30px;
    border: 1px solid #333333;
  }
</style>
