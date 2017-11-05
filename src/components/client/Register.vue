<template>
    <div class="content">
        <div class="row">
            <div class="form-container">
                <div class="well bs-component">
                    <form class="form-horizontal">
                        <fieldset>
                            <legend>New Client</legend>
                            <div class="form-group required">
                                <label for="inputName" class="control-label col-sm-4">Name</label>
                                <div class="col-sm-8">
                                    <input type="text" class="form-control" id="inputName" placeholder="Name"
                                           v-model="client.name">
                                </div>
                            </div>
                            <div class="form-group required">
                                <label for="inputPassword" class="control-label col-sm-4">Password</label>
                                <div class="col-sm-8">
                                    <input type="password" class="form-control" id="inputPassword"
                                           placeholder="Password" v-model="client.password">
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
                                    <input type="text" class="form-control" id="inputWebsite"
                                           placeholder="Website" v-model="client.website">
                                </div>
                            </div>
                            <div class="form-group required">
                                <label for="inputResource" class="control-label col-sm-4">Resource</label>
                                <div class="col-sm-8">
                                    <select class="form-control" id="inputResource" v-model="client.resourceId">
                                        <option v-for="r in resources" :value="r.id">{{ r.name }}</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group required">
                                <label for="inputRedirectUri0" class="control-label col-sm-4">Redirect URI</label>
                                <div class="col-sm-7">
                                    <input type="text" class="form-control" id="inputRedirectUri0"
                                           placeholder="Redirect URI" v-model="redirectUri">
                                </div>
                                <div class="col-sm-1">
                                    <button type="button" class="btn btn-default" @click="addUriForm">
                                        <i class="fa fa-plus"></i>
                                    </button>
                                </div>
                            </div>
                            <div class="form-group" v-for="(item, index) in additionalRedirectUris">
                                <div class="col-sm-offset-4 col-sm-7">
                                    <input type="text" class="form-control" :id="'inputRedirectUri' + index"
                                           placeholder="Redirect URI" v-model="item.uri">
                                </div>
                                <div class="col-sm-1">
                                    <button type="button" class="btn btn-default" @click="removeUriForm(index)">
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
  import Client from '../../models/Client'
  import consts from '../../consts'

  export default {
    mounted: function () {
      this.client = Object.assign({}, new Client())
      this.getResources()
        .then((ret) => {
          this.resources = ret
        })
        .catch(e => this.updateAlertMessage({
          alertType: 'danger',
          alertMessage: e.message
        }))
    },
    data () {
      return {
        client: {},
        redirectUri: null,
        additionalRedirectUris: [],
        resources: [],
        isProcessing: false
      }
    },
    methods: {
      ...mapActions([
        'updateAlertMessage',
        'registerClient',
        'getResources'
      ]),
      addUriForm: function () {
        this.additionalRedirectUris.push({ uri: null })
      },
      removeUriForm: function (index) {
        this.additionalRedirectUris.splice(index, 1)
      },
      onRegister: function () {
        if (this.isProcessing) {
          return
        }
        this.isProcessing = true
        this.client.redirectUris = [this.redirectUri, ...this.additionalRedirectUris.map(v => v.uri)]
        this.registerClient({
          client: this.client
        })
          .then(() => {
            this.updateAlertMessage({
              alertType: 'success',
              alertMessage: consts.REGISTER_SUCCESS_MESSAGE
            })
            this.$router.push('/client/login')
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
