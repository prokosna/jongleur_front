<template>
  <div class="row">
    <div class="offset-2 col-10">
      <h1>New Resource</h1>
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
            <field-scope-list v-model="form.scope"
                              label="Scope"
                              name="scope"
                              :required="false">
            </field-scope-list>
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
  import FieldInput from '../form/FieldInput'
  import FieldScopeList from '../form/FieldScopeList'
  import { ResourceRegisterForm } from '../../services/resource/ResourceService'
  import { ActionTypeResource } from '../../vuex/resource/Action'

  @Component({
    components: {
      'field-input': FieldInput,
      'field-scope-list': FieldScopeList
    }
  })
  export default class Register extends Vue {
    form: ResourceRegisterForm = {
      name: null,
      password: null,
      website: null,
      scope: null
    }
    isProcessing: boolean = false

    mounted () {
      this.form.scope = []
      this.form.scope.push({
        name: 'openid',
        description: 'Access your personal information'
      })
    }

    onRegister () {
      if (this.isProcessing) {
        return
      }
      this.isProcessing = true
      this.$store.dispatch(`resource/${ActionTypeResource.REGISTER_RESOURCE}`, this.form)
        .then(() => {
          this.$router.push('/resource/login')
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

