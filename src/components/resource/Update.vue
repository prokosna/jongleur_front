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
                         placeholder="Enter resource name"
                         :required="true">
            </field-input>
          </div>
        </div>
        <div class="form-group row">
          <div class="col-12">
            <field-input v-model="form.website"
                         label="Website"
                         name="website"
                         placeholder="Enter resource website"
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
            <field-scope-list v-model="form.scope"
                              label="Scope"
                              name="scope"
                              :readonly="false">
            </field-scope-list>
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
  import { State } from '../../vuex/resource/State'
  import FieldInput from '../form/FieldInput'
  import FieldScopeList from '../form/FieldScopeList'
  import Resource from '../../models/Resource'
  import { ResourceService, ResourceUpdateForm } from '../../services/resource/ResourceService'
  import { ActionTypeResource } from "../../vuex/resource/Action"

  @Component({
    components: {
      'field-input': FieldInput,
      'field-scope-list': FieldScopeList
    },
    computed: {
      ...mapState('resource', {
        resource: (state: State) => state.resource
      })
    }
  })
  export default class Update extends Vue {
    resourceService = new ResourceService()

    id: string = ''
    secret: string = ''
    form: ResourceUpdateForm = {
      name: null,
      website: null,
      scope: null
    }
    resource: Resource
    isProcessing: boolean = false

    mounted () {
      this.id = this.resource.id
      this.secret = this.resource.resourceSecret
      this.form = {
        name: this.resource.name,
        website: this.resource.website,
        scope: this.resource.scope
      }
    }

    onUpdate () {
      if (this.isProcessing) {
        return
      }
      this.isProcessing = true
      this.$store.dispatch(`resource/${ActionTypeResource.UPDATE_RESOURCE}`, this.form)
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

