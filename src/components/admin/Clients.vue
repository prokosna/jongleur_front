<template>
  <div class="col-12">
    <table class="table table-hover">
      <thead>
      <th scope="col">Name</th>
      <th scope="col">Website</th>
      <th scope="col">Resource</th>
      <th scope="col">Created At</th>
      <th scope="col">Updated At</th>
      <th scope="col">Action</th>
      </thead>
      <tbody>
      <tr v-for="client in clients">
        <td>{{ client.name }}</td>
        <td>{{ client.website }}</td>
        <td>{{ resources.filter(v => v.id === client.resourceId).pop().name }}</td>
        <td>{{ client.createdAt}}</td>
        <td>{{ client.updatedAt}}</td>
        <td>
          <a class="btn btn-outline-danger" @click="onDelete(client.id)">Delete</a>
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
  import Client from "../../models/Client"
  import ModalCommon from '../common/ModalCommon'
  import { ClientService } from '../../services/client/ClientService'
  import { ResourceService } from '../../services/resource/ResourceService'
  import { ActionType } from "../../vuex/Action"
  import { AlertType } from "../../vuex/State"
  import { ActionTypeAdmin } from "../../vuex/admin/Action"
  import Resource from "../../models/Resource"

  @Component
  export default class Clients extends Vue {
    clientService = new ClientService()
    resourceService = new ResourceService()
    clients: Client[] = []
    resources: Resource[] = []
    isProcessing = false

    initialize () {
      this.resourceService.getAll()
        .then((v: Resource[]) => {
          this.resources = v
        })
        .then(() => this.clientService.getAll())
        .then((v: Client[]) => {
          this.clients = v
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
              this.$store.dispatch(`admin/${ActionTypeAdmin.DELETE_CLIENT}`, { id })
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

