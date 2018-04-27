<template>
  <div class="col-12">
    <div>
      <div class="form">
        <div class="row">
          <div class="form-group col-4">
            <field-input v-model="form.name"
                         label="Name"
                         name="name"
                         placeholder="Enter the name"
                         :required="true"></field-input>
          </div>
          <div class="form-group col-4">
            <field-input v-model="form.password"
                         label="Password"
                         name="password"
                         type="password"
                         placeholder="Enter the password"
                         :required="true"></field-input>
          </div>
          <div class="form-group col-2">
            <label for="register-btn" class="col-form-label control-label">&nbsp;</label>
            <a id="register-btn" class="btn btn-primary btn-block" @click="onRegister">
              Register
            </a>
          </div>
        </div>
      </div>
    </div>
    <hr>
    <table class="table table-hover">
      <thead>
      <th scope="col">Name</th>
      <th scope="col">Created At</th>
      <th scope="col">Updated At</th>
      <th scope="col">Action</th>
      </thead>
      <tbody>
      <tr v-for="admin in admins">
        <td>{{ admin.name }}</td>
        <td>{{ admin.createdAt}}</td>
        <td>{{ admin.updatedAt}}</td>
        <td>
          <a class="btn btn-outline-danger" @click="onDelete(admin.id)">Delete</a>
        </td>
      </tr>
      </tbody>
    </table>
    <div>
      <modals-container name="dialog"/>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import Admin from "../../models/Admin"
  import ModalCommon from '../common/ModalCommon'
  import { AdminRegisterForm, AdminService } from '../../services/admin/AdminService'
  import { ActionType } from "../../vuex/Action"
  import { AlertType } from "../../vuex/State"
  import { ActionTypeAdmin } from "../../vuex/admin/Action"
  import FieldInput from '../form/FieldInput'

  @Component({
    components: {
      'field-input': FieldInput
    }
  })
  export default class Admins extends Vue {
    adminService = new AdminService()
    admins: Admin[] = []
    isProcessing = false

    form: AdminRegisterForm = {
      name: null,
      password: null
    }

    initialize () {
      this.adminService.getAll()
        .then((v: Admin[]) => {
          this.admins = v
        })
        .catch((e) => {
          const msg = e.data ? e.data.error || 'unexpected_error' : 'unexpected_error'
          return this.$store.dispatch(ActionType.UPDATE_ALERT_MESSAGE, { type: AlertType.Danger, message: msg })
        })
        .catch(() => {
          this.$router.push('/')
        })
    }

    mounted () {
      this.initialize()
    }

    onRegister () {
      if (this.isProcessing) {
        return
      }
      this.isProcessing = true
      this.$store.dispatch(`admin/${ActionTypeAdmin.REGISTER_ADMIN}`, this.form)
        .then(() => {
          this.initialize()
          this.isProcessing = false
        })
        .catch(() => {
          this.isProcessing = false
        })
    }

    onDelete (id: string) {
      if (this.isProcessing) {
        return
      }
      this.isProcessing = true
      this.$modal.show(ModalCommon, {
        modalId: 'delete',
        modalTitle: 'Are you sure?',
        modalBody: 'You will not be able to recover this action.',
        actions: [
          {
            type: 'secondary',
            label: 'Cancel',
            callback: () => {
            }
          },
          {
            type: 'primary',
            label: 'Delete',
            callback: () => {
              this.$store.dispatch(`admin/${ActionTypeAdmin.DELETE_ADMIN}`, { id })
                .then(() => {
                  this.initialize()
                })
                .catch(() => {
                })
            }
          }
        ],
        beforeClosed: () => {
          this.isProcessing = false
        }
      }, {
        height: 'auto'
      })
    }
  }
</script>

<style scoped>
</style>

