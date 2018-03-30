<template>
    <div class="content">
        <div class="row">
            <div class="form-container">
                <div class="well bs-component">
                    <form class="form-horizontal">
                        <fieldset>
                            <legend><h3>Hi {{ client.name }}!</h3></legend>
                            <div class="form-group">
                                <label for="inputId" class="control-label col-sm-4">ID</label>
                                <div class="col-sm-8">
                                    <input type="text" class="form-control" id="inputId" placeholder="Id"
                                           v-model="client.id" readonly>
                                </div>
                            </div>
                            <div class="form-group required">
                                <label for="inputName" class="control-label col-sm-4">Name</label>
                                <div class="col-sm-8">
                                    <input type="text" class="form-control" id="inputName" v-model="client.name">
                                </div>
                            </div>
                            <div class="form-group required">
                                <label for="inputPassword" class="control-label col-sm-4">Password</label>
                                <div class="col-sm-8">
                                    <input type="password" class="form-control" id="inputPassword"
                                           v-model="client.password">
                                </div>
                            </div>
                            <div class="form-group required">
                                <label for="selectClientType" class="control-label col-sm-4">Client Type</label>
                                <div class="col-sm-8">
                                    <select class="form-control" id="selectClientType" v-model="client.clientType">
                                        <option>Confidential</option>
                                        <option>Public</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group required">
                                <label for="inputWebsite" class="control-label col-sm-4">Website</label>
                                <div class="col-sm-8">
                                    <input type="text" class="form-control" id="inputWebsite" v-model="client.website">
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="inputSecret" class="control-label col-sm-4">Secret</label>
                                <div class="col-sm-8">
                                    <input type="text" class="form-control" id="inputSecret"
                                           v-model="client.clientSecret" readonly>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="inputResource" class="control-label col-sm-4">Resource</label>
                                <div class="col-sm-8">
                                    <input type="text" class="form-control" id="inputResource"
                                           v-model="resourceName" readonly>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="inputRedirectUri0" class="control-label col-sm-4">Redirect URI</label>
                                <div class="col-sm-7">
                                    <input type="text" class="form-control" id="inputRedirectUri0"
                                           v-model="redirectUri">
                                </div>
                                <div class="col-sm-1">
                                    <button type="button" class="btn btn-secondary" @click="addUriForm">
                                        <i class="fa fa-plus"></i>
                                    </button>
                                </div>
                            </div>
                            <div class="form-group" v-for="(item, index) in additionalRedirectUris">
                                <div class="col-sm-offset-4 col-sm-7">
                                    <input type="text" class="form-control" :id="'inputRedirectUri' + index"
                                           v-model="item.uri">
                                </div>
                                <div class="col-sm-1">
                                    <button type="button" class="btn btn-secondary" @click="removeUriForm(index)">
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
  import config from '../../Config'

  export default {
    mounted: function () {
      if (!this.savedId) {
        this.updateClientSavedId()
        this.$router.replace('/client/login')
        return
      }
      this.getCurrentClient({ id: this.savedId })
        .then(() => {
          this.updateLoggedInAs({ loggedInAs: 'client' })
          this.client = Object.assign({}, this.stateClient)
          this.redirectUri = this.client.redirectUris[0]
          this.additionalRedirectUris = this.client.redirectUris.slice(1).map(v => ({ uri: v }))
        })
        .catch((e) => {
          if (e) {
            this.updateAlertMessage({
              alertType: 'danger',
              alertMessage: e.message
            })
          }
          this.$router.replace('/client/login')
        })
        .then(() => this.getResource({ id: this.client.resourceId }))
        .then((ret) => {
          this.resourceName = ret.name
        })
        .catch((e) => {
          if (e) {
            this.updateAlertMessage({
              alertType: 'danger',
              alertMessage: e.message
            })
          }
        })
    },
    data: function () {
      return {
        client: {},
        redirectUri: {},
        additionalRedirectUris: [],
        resourceName: null,
        isProcessing: false
      }
    },
    computed: {
      ...mapState({
        savedId: state => state.client.savedId,
        stateClient: state => state.client.model
      }),
      createdAt: function () {
        return new Date(this.client.createdAt).toString()
      },
      updatedAt: function () {
        return new Date(this.client.updatedAt).toString()
      }
    },
    methods: {
      ...mapActions([
        'updateAlertMessage',
        'getCurrentClient',
        'updateClient',
        'deleteClient',
        'getResource'
      ]),
      ...mapMutations([
        'updateLoggedInAs',
        'updateClientSavedId'
      ]),
      addUriForm: function () {
        this.additionalRedirectUris.push({ uri: null })
      },
      removeUriForm: function (index) {
        this.additionalRedirectUris.splice(index, 1)
      },
      onUpdate: function () {
        if (this.isProcessing) {
          return
        }
        this.isProcessing = true
        this.client.redirectUris = [this.redirectUri, ...this.additionalRedirectUris.map(v => v.uri)]
        this.updateClient({
          client: this.client
        })
          .then(() => {
            this.updateAlertMessage({
              alertType: 'success',
              alertMessage: config.UPDATE_SUCCESS_MESSAGE
            })
            this.$router.replace('/client/login')
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
        this.deleteClient({
          client: this.client
        })
          .then(() => {
            this.updateAlertMessage({
              alertType: 'success',
              alertMessage: config.DELETE_SUCCESS_MESSAGE
            })
            this.$router.replace('/client/login')
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
