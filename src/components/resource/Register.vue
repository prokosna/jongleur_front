<template>
    <div class="content">
        <div class="row">
            <div class="form-container">
                <div class="well bs-component">
                    <form class="form-horizontal">
                        <fieldset>
                            <legend>New Resource</legend>
                            <div class="form-group required">
                                <label for="inputName" class="control-label col-sm-4">Name</label>
                                <div class="col-sm-8">
                                    <input type="text" class="form-control" id="inputName" placeholder="Name"
                                           v-model="resource.name">
                                </div>
                            </div>
                            <div class="form-group required">
                                <label for="inputPassword" class="control-label col-sm-4">Password</label>
                                <div class="col-sm-8">
                                    <input type="password" class="form-control" id="inputPassword"
                                           placeholder="Password" v-model="resource.password">
                                </div>
                            </div>
                            <div class="form-group required">
                                <label for="inputWebsite" class="control-label col-sm-4">Website</label>
                                <div class="col-sm-8">
                                    <input type="text" class="form-control" id="inputWebsite"
                                           placeholder="Website" v-model="resource.website">
                                </div>
                            </div>
                            <div class="form-group required">
                                <label for="inputScopeName0" class="control-label col-sm-4">Scope</label>
                                <div class="col-sm-2">
                                    <input type="text" class="form-control" id="inputScopeName0"
                                           placeholder="Scope" v-model="scope.name">
                                </div>
                                <div class="col-sm-5">
                                    <input type="text" class="form-control" id="inputScopeDesc0"
                                           placeholder="Description" v-model="scope.description">
                                </div>
                                <div class="col-sm-1">
                                    <button type="button" class="btn btn-default" @click="addScopeForm">
                                        <i class="fa fa-plus"></i>
                                    </button>
                                </div>
                            </div>
                            <div class="form-group" v-for="(item, index) in additionalScope">
                                <div class="col-sm-offset-4 col-sm-2">
                                    <input type="text" class="form-control" :id="'inputScopeName' + index"
                                           placeholder="Scope" v-model="item.name">
                                </div>
                                <div class="col-sm-5">
                                    <input type="text" class="form-control" :id="'inputScopeDesc' + index"
                                           placeholder="Description" v-model="item.description">
                                </div>
                                <div class="col-sm-1">
                                    <button type="button" class="btn btn-default" @click="removeScopeForm(index)">
                                        <i class="fa fa-minus"></i>
                                    </button>
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="col-sm-12">
                                    <a href="#" class="btn btn-primary btn-block" @click="onRegister">Register</a>
                                </div>
                            </div>
                        </fieldset>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  import { mapActions } from 'vuex'
  import Resource from '../../models/Resource'
  import consts from '../../consts'

  export default {
    mounted: function () {
      this.resource = Object.assign({}, new Resource())
    },
    data () {
      return {
        resource: {},
        scope: {
          name: 'openid',
          description: 'Access to your personal information'
        },
        additionalScope: [],
        isProcessing: false
      }
    },
    methods: {
      ...mapActions([
        'updateAlertMessage',
        'registerResource'
      ]),
      addScopeForm: function () {
        this.additionalScope.push({ name: null, description: null })
      },
      removeScopeForm: function (index) {
        this.additionalScope.splice(index, 1)
      },
      onRegister: function () {
        if (this.isProcessing) {
          return
        }
        this.isProcessing = true
        this.resource.scope = [this.scope, ...this.additionalScope]
        this.registerResource({
          resource: this.resource
        })
          .then(() => {
            this.updateAlertMessage({
              alertType: 'success',
              alertMessage: consts.REGISTER_SUCCESS_MESSAGE
            })
            this.$router.push('/resource/login')
          })
          .catch(e => this.updateAlertMessage({
            alertType: 'danger',
            alertMessage: e.message
          }))
          .then(() => {
            this.isProcessing = false
          })
      }
    }
  }
</script>

<style scoped>
    .form-container {
        padding: 10px;
        width: 70%;
        margin: 0 auto;
    }

    .form-group.required .control-label:after {
        content: "*";
        color: red;
    }
</style>
