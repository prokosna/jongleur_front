<template>
  <div class="row">
    <div class="offset-2 col-10">
      <h1>New Client</h1>
    </div>
    <div class="offset-2 col-10">
      <div class="form-horizontal">
        <div class="form-group row">
          <div class="col-10">
            <field-input v-model="form.name"
                         label="Name"
                         name="name"
                         placeholder="Enter your name"
                         :required="true"
            ></field-input>
          </div>
        </div>
        <div class="form-group row">
          <div class="col-10">
            <field-input v-model="form.password"
                         label="Password"
                         name="password"
                         type="password"
                         placeholder="Enter your password"
                         :required="true">
            </field-input>
          </div>
        </div>
        <div class="form-group row">
          <div class="col-10">
            <field-select v-model="clientType"
                          label="Client Type"
                          name="client_type"
                          :options="clientTypeOptions"
                          :required="true">
            </field-select>
          </div>
        </div>
        <div class="form-group row">
          <div class="col-10">
            <field-input v-model="form.website"
                         label="Website"
                         name="website"
                         type="url"
                         placeholder="Enter your website"
                         :required="true"
            >
            </field-input>
          </div>
        </div>
        <div class="form-group row">
          <div class="col-10">
            <field-select v-model="form.resourceId"
                          label="Resource"
                          name="resource"
                          :options="resources.map(r => r.id)"
                          :displayOptions="resources.map(r => r.name)"
                          :required="true">
            </field-select>
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
          <div class="col-2">
            <a class="btn btn-primary btn-block" @click="onRegister">
              Register
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
  import FieldDate from '../form/FieldDate'
  import FieldInput from '../form/FieldInput'
  import FieldSelect from '../form/FieldSelect'
  import FieldInputList from '../form/FieldInputList'
  import { ClientRegisterForm } from '../../services/client/ClientService'
  import ClientType from '../../models/ClientType'
  import { ActionTypeClient } from '../../vuex/client/Action'
  import Resource from "../../models/Resource"
  import { ResourceService } from "../../services/resource/ResourceService"
  import { ActionType } from "../../vuex/Action"
  import { AlertType } from "../../vuex/State"

  @Component({
    components: {
      'field-input': FieldInput,
      'field-select': FieldSelect,
      'field-date': FieldDate,
      'field-input-list': FieldInputList
    }
  })
  export default class Register extends Vue {
    resourceService = new ResourceService()
    form: ClientRegisterForm = {
      name: null,
      password: null,
      website: null,
      clientType: null,
      redirectUris: [],
      resourceId: null
    }
    isProcessing: boolean = false
    resources: Resource[] = []

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
      this.resourceService.getAll()
        .then((ret) => {
          this.resources = ret
        })
        .catch((e) => {
          const msg = e.data ? e.data.error || 'unexpected_error' : 'unexpected_error'
          return this.$store.dispatch(ActionType.UPDATE_ALERT_MESSAGE, { type: AlertType.Danger, message: msg })
        })
        .catch(() => {
          this.$router.push('/')
        })
    }

    onRegister () {
      if (this.isProcessing) {
        return
      }
      this.isProcessing = true
      this.$store.dispatch(`client/${ActionTypeClient.REGISTER_CLIENT}`, this.form)
        .then(() => {
          this.$router.push('/client/login')
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
