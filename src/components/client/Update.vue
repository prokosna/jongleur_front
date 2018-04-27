<template>
  <div class="row">
    <div class="col-8">
      <div class="form-horizontal">
        <div class="form-group row">
          <div class="col-12">
            <field-input v-model="id"
                         label="ID"
                         name="id"
                         :readonly="true">
            </field-input>
          </div>
        </div>
        <div class="form-group row">
          <div class="col-12">
            <field-input v-model="form.name"
                         label="Name"
                         name="name"
                         placeholder="Enter client name"
                         :required="true">
            </field-input>
          </div>
        </div>
        <div class="form-group row">
          <div class="col-12">
            <field-select v-model="clientType"
                          label="Client Type"
                          name="clientType"
                          :required="true"
                          :options="clientTypeOptions">
            </field-select>
          </div>
        </div>
        <div class="form-group row">
          <div class="col-12">
            <field-input v-model="form.website"
                         label="Website"
                         name="website"
                         placeholder="Enter client website"
                         :required="true">
            </field-input>
          </div>
        </div>
        <div class="form-group row">
          <div class="col-12">
            <field-input v-model="secret"
                         label="Secret"
                         name="secret"
                         :readonly="true">
            </field-input>
          </div>
        </div>
        <div class="form-group row">
          <div class="col-12">
            <field-input v-model="resource"
                         label="Resource"
                         name="resource"
                         :readonly="true">
            </field-input>
          </div>
        </div>
        <div class="form-group row">
          <div class="col-10">
            <field-input-list v-model="form.redirectUris"
                              label="Redirect URI"
                              name="redirect_uris"
                              placeholder="Enter a full URI"
                              :required="true"
            ></field-input-list>
          </div>
        </div>
        <div class="form-group row">
          <div class="col-12">
            <a class="btn btn-primary" @click="onUpdate">
              Update
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
  import { mapState } from 'vuex'
  import { State } from '../../vuex/client/State'
  import FieldInput from '../form/FieldInput'
  import FieldSelect from '../form/FieldSelect'
  import FieldInputList from '../form/FieldInputList'
  import Client from '../../models/Client'
  import { ClientUpdateForm } from '../../services/client/ClientService'
  import ClientType from '../../models/ClientType'
  import { ResourceService } from '../../services/resource/ResourceService'
  import { ActionType } from '../../vuex/Action'
  import { AlertType } from '../../vuex/State'
  import { ActionTypeClient } from "../../vuex/client/Action"

  @Component({
    components: {
      'field-input': FieldInput,
      'field-select': FieldSelect,
      'field-input-list': FieldInputList
    },
    computed: {
      ...mapState('client', {
        client: (state: State) => state.client
      })
    }
  })
  export default class Update extends Vue {
    resourceService = new ResourceService()

    id: string = ''
    secret: string = ''
    resource: string = ''
    form: ClientUpdateForm = {
      name: null,
      website: null,
      clientType: null,
      redirectUris: null
    }
    client: Client

    isProcessing: boolean = false

    get clientType (): string {
      return this.form.clientType ? ClientType[this.form.clientType as keyof typeof ClientType].toString() : null
    }

    set clientType (value: string) {
      this.form.clientType = ClientType[value as keyof typeof ClientType]
    }

    get clientTypeOptions () {
      return [ClientType.Confidential, ClientType.Public]
    }

    mounted () {
      this.id = this.client.id
      this.secret = this.client.clientSecret
      this.form = {
        name: this.client.name,
        website: this.client.website,
        clientType: this.client.clientType,
        redirectUris: this.client.redirectUris
      }
      const resourceId = this.client.resourceId
      this.resourceService.get(resourceId, null)
        .then((ret) => {
          this.resource = ret.name
        })
        .catch((e) => {
          const msg = e.data ? e.data.error || 'unexpected_error' : 'unexpected_error'
          return this.$store.dispatch(ActionType.UPDATE_ALERT_MESSAGE, { type: AlertType.Danger, message: msg })
        })
        .catch(() => {
          this.$router.push('/')
        })
    }

    onUpdate () {
      if (this.isProcessing) {
        return
      }
      this.isProcessing = true
      this.$store.dispatch(`client/${ActionTypeClient.UPDATE_CLIENT}`, this.form)
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
