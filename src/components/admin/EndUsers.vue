<template>
  <div class="col-12">
    <table class="table table-hover">
      <thead>
      <th scope="col">Name</th>
      <th scope="col">Created At</th>
      <th scope="col">Updated At</th>
      <th scope="col">Action</th>
      </thead>
      <tbody>
      <tr v-for="endUser in endUsers">
        <td>{{ endUser.name }}</td>
        <td>{{ endUser.createdAt}}</td>
        <td>{{ endUser.updatedAt}}</td>
        <td>
          <a class="btn btn-outline-danger" @click="onDelete(endUser.id)">Delete</a>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import EndUser from "../../models/EndUser"
  import ModalCommon from '../common/ModalCommon'
  import { EndUserService } from '../../services/enduser/EndUserService'
  import { ActionType } from "../../vuex/Action"
  import { AlertType } from "../../vuex/State"
  import { ActionTypeAdmin } from "../../vuex/admin/Action"

  @Component
  export default class EndUsers extends Vue {
    endUserService = new EndUserService()
    endUsers: EndUser[] = []
    isProcessing = false

    initialize () {
      this.endUserService.getAll()
        .then((v: EndUser[]) => {
          this.endUsers = v
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
              this.$store.dispatch(`admin/${ActionTypeAdmin.DELETE_END_USER}`, { id })
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
