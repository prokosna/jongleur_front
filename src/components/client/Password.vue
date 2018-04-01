<template>
  <div class="row">
    <div class="col-8">
      <div class="form-horizontal">
        <div class="form-group row">
          <div class="col-12">
            <field-input v-model="form.currentPassword"
                         label="Old password"
                         name="old_password"
                         type="password"
            ></field-input>
          </div>
        </div>
        <div class="form-group row">
          <div class="col-12">
            <field-input v-model="form.newPassword"
                         label="New password"
                         name="new_password"
                         type="password"
            ></field-input>
          </div>
        </div>
        <div class="form-group row">
          <div class="col-12">
            <field-input v-model="newPasswordAgain"
                         label="Confirm new password"
                         name="new_password_confirm"
                         type="password"
            ></field-input>
          </div>
        </div>
        <div class="form-group row">
          <div class="col-12">
            <a class="btn btn-primary" @click="onUpdatePassword">
              Update password
            </a>
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
  import { ClientUpdatePasswordForm } from '../../services/client/ClientService'
  import { mapState } from 'vuex'
  import { State } from '../../vuex/client/State'
  import Client from '../../models/Client'
  import { ActionTypeClient } from '../../vuex/client/Action'

  @Component({
    components: {
      'field-input': FieldInput
    },
    computed: {
      ...mapState('client', {
        client: (state: State) => state.client
      })
    }
  })
  export default class Account extends Vue {
    id: string = ''
    form: ClientUpdatePasswordForm = {
      newPassword: null,
      currentPassword: null
    }
    newPasswordAgain: string = null
    isProcessing: boolean = false
    client: Client

    mounted () {
      this.id = this.client.id
    }

    onUpdatePassword () {
      if (this.isProcessing) {
        return
      }
      if (!this.form.newPassword || this.form.newPassword != this.newPasswordAgain) {
        // TODO: Warning message
        return
      }
      this.isProcessing = true
      this.$store.dispatch(`client/${ActionTypeClient.UPDATE_CLIENT_PASSWORD}`, { id: this.id, form: this.form })
        .then(() => {
          this.isProcessing = false
        })
        .catch(() => {
          this.isProcessing = false
        })
    }
  }
</script>

<style scoped>
</style>
