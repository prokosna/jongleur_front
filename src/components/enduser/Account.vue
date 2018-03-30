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
  import { EndUserUpdatePasswordForm } from '../../services/enduser/EndUserService'
  import { mapState } from 'vuex'
  import { State } from '../../vuex/enduser/State'
  import EndUser from '../../models/EndUser'
  import { ActionTypeEndUser } from '../../vuex/enduser/Action'

  @Component({
    components: {
      'field-input': FieldInput
    },
    computed: {
      ...mapState('enduser', {
        endUser: (state: State) => state.endUser
      })
    }
  })
  export default class Account extends Vue {
    id: string = ''
    form: EndUserUpdatePasswordForm = {
      newPassword: null,
      currentPassword: null
    }
    newPasswordAgain: string = null
    isProcessing: boolean = false
    endUser: EndUser

    mounted () {
      this.id = this.endUser.id
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
      this.$store.dispatch(`enduser/${ActionTypeEndUser.UPDATE_END_USER_PASSWORD}`, { id: this.id, form: this.form })
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
  .form-container {
    padding: 10px;
    width: 70%;
    margin: 0 auto;
  }
</style>
