<template>
    <div class="content">
        <div class="row">
            <div class="form-container">
                <div class="well bs-component">
                    <form class="form-horizontal">
                        <fieldset>
                            <legend><h3>Hi {{ resource.name }}!</h3></legend>
                            <div class="form-group">
                                <label for="inputId" class="control-label col-sm-4">ID</label>
                                <div class="col-sm-8">
                                    <input type="text" class="form-control" id="inputId" placeholder="Id"
                                           v-model="resource.id" readonly>
                                </div>
                            </div>
                            <div class="form-group required">
                                <label for="inputName" class="control-label col-sm-4">Name</label>
                                <div class="col-sm-8">
                                    <input type="text" class="form-control" id="inputName" v-model="resource.name">
                                </div>
                            </div>
                            <div class="form-group required">
                                <label for="inputPassword" class="control-label col-sm-4">Password</label>
                                <div class="col-sm-8">
                                    <input type="password" class="form-control" id="inputPassword"
                                           v-model="resource.password">
                                </div>
                            </div>
                            <div class="form-group required">
                                <label for="inputWebsite" class="control-label col-sm-4">Website</label>
                                <div class="col-sm-8">
                                    <input type="text" class="form-control" id="inputWebsite"
                                           v-model="resource.website">
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="inputSecret" class="control-label col-sm-4">Secret</label>
                                <div class="col-sm-8">
                                    <input type="text" class="form-control" id="inputSecret"
                                           v-model="resource.resourceSecret" readonly>
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
                                <label for="inputCreatedAt" class="control-label col-sm-4">Created</label>
                                <div class="col-sm-8">
                                    <input type="text" class="form-control" id="inputCreatedAt"
                                           v-model="createdAt" readonly>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="inputUpdatedAt" class="control-label col-sm-4">Updated</label>
                                <div class="col-sm-8">
                                    <input type="text" class="form-control" id="inputUpdatedAt"
                                           v-model="updatedAt" readonly>
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="col-sm-12">
                                    <a href="#" class="btn btn-primary btn-block" @click="onUpdate">Update</a>
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="col-sm-12">
                                    <a href="#" class="btn btn-danger btn-block" @click="onDelete">Delete</a>
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
  import { mapActions, mapMutations, mapState } from 'vuex'
  import moment from 'moment-timezone'
  import consts from '../../consts'

  export default {
    mounted: function () {
      if (!this.savedId) {
        this.updateResourceSavedId()
        this.$router.replace('/resource/login')
        return
      }
      this.getCurrentResource({ id: this.savedId })
        .then(() => {
          this.updateLoggedInAs({ loggedInAs: 'resource' })
          this.resource = Object.assign({}, this.stateResource)
          this.scope = this.resource.scope[0]
          this.additionalScope = this.resource.scope.slice(1)
        })
        .catch((e) => {
          if (e) {
            this.updateAlertMessage({
              alertType: 'danger',
              alertMessage: e.message
            })
          }
          this.$router.replace('/resource/login')
        })
    },
    data: function () {
      return {
        resource: {},
        scope: {
          name: null,
          description: null
        },
        additionalScope: [],
        isProcessing: false
      }
    },
    computed: {
      ...mapState({
        savedId: state => state.resource.savedId,
        stateResource: state => state.resource.model
      }),
      createdAt: function () {
        return moment(this.resource.createdAt).format('YYYY-MM-DD HH:mm:ss')
      },
      updatedAt: function () {
        return moment(this.resource.updatedAt).format('YYYY-MM-DD HH:mm:ss')
      }
    },
    methods: {
      ...mapActions([
        'updateAlertMessage',
        'getCurrentResource',
        'updateResource',
        'deleteResource'
      ]),
      ...mapMutations([
        'updateLoggedInAs',
        'updateResourceSavedId'
      ]),
      addScopeForm: function () {
        this.additionalScope.push({ name: null, description: null })
      },
      removeScopeForm: function (index) {
        this.additionalScope.splice(index, 1)
      },
      onUpdate: function () {
        if (this.isProcessing) {
          return
        }
        this.isProcessing = true
        this.resource.scope = [this.scope, ...this.additionalScope]
        this.updateResource({
          resource: this.resource
        })
          .then(() => {
            this.updateAlertMessage({
              alertType: 'success',
              alertMessage: consts.UPDATE_SUCCESS_MESSAGE
            })
            this.$router.replace('/resource/login')
          })
          .catch(e => this.updateAlertMessage({
            alertType: 'danger',
            alertMessage: e.message
          }))
          .then(() => {
            this.isProcessing = false
          })
      },
      onDelete: function () {
        if (this.isProcessing) {
          return
        }
        this.isProcessing = true
        this.deleteResource({
          resource: this.resource
        })
          .then(() => {
            this.updateAlertMessage({
              alertType: 'success',
              alertMessage: consts.DELETE_SUCCESS_MESSAGE
            })
            this.$router.replace('/resource/login')
          })
          .catch(e => this.updateAlertMessage({
            alertType: 'danger',
            alertMessage: e.message
          }))
          .then(() => {
            this.isProcessing = false
          })
      },
      beforeDestroy: function () {
        this.updateLoggedInAs({ loggedInAs: null })
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
