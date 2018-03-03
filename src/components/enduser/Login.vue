<template>
  <div class="content">
    <div class="row">
      <div class="col-sm-7">
        <h1>End-User</h1>
        <p>
          <b>End-User</b> is a resource owner.
          When a <b>client</b> needs to access to resources owned by the <b>end-user</b>, it can delegate the
          authority to client via AccessToken.
        </p>
        <ul>
          <li>Support local users</li>
          <li>Support LDAP (TBD)</li>
        </ul>
      </div>
      <div class="col-sm-5">
        <ul class="nav nav-tabs">
          <li class="nav-item">
            <a class="nav-link active" href="#logIn" data-toggle="tab">Log in</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#ldap" data-toggle="tab">LDAP</a>
          </li>
        </ul>
        <div id="myTabContent" class="tab-content card">
          <div class="tab-pane fade show active card-body" id="logIn">
            <form-login :form="form" @submit="onLogin"></form-login>
            <div>
              <a href="/end_user/register">Create a new end user</a>
            </div>
          </div>
          <div class="tab-pane fade card-body" id="ldap">
            Not implemented...
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
  import { Keys, StorageService } from '../../services/common/StorageService'
  import { ActionTypeEndUser } from "../../vuex/enduser/Action"

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
      if (this.storageService.get(Keys.EndUserId)) {
        // may be already logged in
        this.$router.replace('/end_user/home')
      }
    }

    onLogin () {
      if (this.isProcessing) {
        return
      }
      this.isProcessing = true
      this.$store.dispatch(`enduser/${ActionTypeEndUser.LOGIN_AS_END_USER}`, this.form)
        .then(() => {
          this.$router.replace('/end_user/home')
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
Update
