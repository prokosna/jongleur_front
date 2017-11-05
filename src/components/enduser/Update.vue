<template>
    <div class="content">
        <div class="row">
            <div class="form-container">
                <div class="well bs-component">
                    <form class="form-horizontal">
                        <fieldset>
                            <legend><h3>Hi {{ endUser.name }}!</h3></legend>
                            <div class="form-group">
                                <label for="inputId" class="control-label col-sm-4">ID</label>
                                <div class="col-sm-8">
                                    <input type="text" class="form-control" id="inputId" v-model="endUser.id" readonly>
                                </div>
                            </div>
                            <div class="form-group required">
                                <label for="inputName" class="control-label col-sm-4">Name</label>
                                <div class="col-sm-8">
                                    <input type="text" class="form-control" id="inputName" v-model="endUser.name">
                                </div>
                            </div>
                            <div class="form-group required">
                                <label for="inputEmail" class="control-label col-sm-4">Email</label>
                                <div class="col-sm-8">
                                    <input type="email" class="form-control" id="inputEmail" v-model="endUser.email"
                                    >
                                </div>
                            </div>
                            <div class="form-group required">
                                <label for="inputPassword" class="control-label col-sm-4">Password</label>
                                <div class="col-sm-8">
                                    <input type="password" class="form-control" id="inputPassword"
                                           v-model="endUser.password">
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="inputGivenName" class="control-label col-sm-4">Given Name</label>
                                <div class="col-sm-8">
                                    <input type="text" class="form-control" id="inputGivenName"
                                           v-model="endUser.givenName">
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="inputFamilyName" class="control-label col-sm-4">Family Name</label>
                                <div class="col-sm-8">
                                    <input type="text" class="form-control" id="inputFamilyName"
                                           v-model="endUser.familyName">
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="inputMiddleName" class="control-label col-sm-4">Middle Name</label>
                                <div class="col-sm-8">
                                    <input type="text" class="form-control" id="inputMiddleName"
                                           v-model="endUser.middleName">
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="inputNickname" class="control-label col-sm-4">Nickname</label>
                                <div class="col-sm-8">
                                    <input type="text" class="form-control" id="inputNickname"
                                           v-model="endUser.nickname">
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="inputProfile" class="control-label col-sm-4">Profile</label>
                                <div class="col-sm-8">
                                    <input type="text" class="form-control" id="inputProfile" v-model="endUser.profile">
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="inputPicture" class="control-label col-sm-4">Picture</label>
                                <div class="col-sm-8">
                                    <input type="text" class="form-control" id="inputPicture" v-model="endUser.picture">
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="inputWebSite" class="control-label col-sm-4">WebSite</label>
                                <div class="col-sm-8">
                                    <input type="text" class="form-control" id="inputWebSite" v-model="endUser.website">
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="selectGender" class="control-label col-sm-4">Gender</label>
                                <div class="col-sm-8">
                                    <select class="form-control" id="selectGender" v-model="endUser.gender">
                                        <option>Female</option>
                                        <option>Male</option>
                                        <option>Other</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="inputBirthdateYear" class="control-label col-sm-4">Birthdate</label>
                                <div class="col-sm-8 form-inline">
                                    <select :class="{'form-control': true, placeholder: !birthdateYear }"
                                            id="inputBirthdateYear" v-model="birthdateYear">
                                        <option value="" selected disabled>Year</option>
                                        <option v-for="year in 150">{{ 1899 + year }}</option>
                                    </select>
                                    <select :class="{'form-control': true, placeholder: !birthdateMonth }"
                                            id="inputBirthdateMonth" v-model="birthdateMonth">
                                        <option value="" selected disabled>Month</option>
                                        <option v-for="month in 12">{{ month }}</option>
                                    </select>
                                    <select :class="{'form-control': true, placeholder: !birthdateDate }"
                                            id="inputBirthdateDate" v-model="birthdateDate">
                                        <option value="" selected disabled>Day</option>
                                        <option v-for="day in 31">{{ day }}</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="inputZoneInfo" class="control-label col-sm-4">Zone Info</label>
                                <div class="col-sm-8">
                                    <input type="text" class="form-control" id="inputZoneInfo"
                                           v-model="endUser.zoneinfo">
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="inputLocale" class="control-label col-sm-4">Locale</label>
                                <div class="col-sm-8">
                                    <input type="text" class="form-control" id="inputLocale" v-model="endUser.locale">
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="inputPhoneNumber" class="control-label col-sm-4">Phone Number</label>
                                <div class="col-sm-8">
                                    <input type="text" class="form-control" id="inputPhoneNumber"
                                           v-model="endUser.phoneNumber">
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="inputCreatedAt" class="control-label col-sm-4">Created</label>
                                <div class="col-sm-8">
                                    <input type="text" class="form-control" id="inputCreatedAt" readonly
                                           v-model="endUser.createdAt">
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="inputUpdatedAt" class="control-label col-sm-4">Updated</label>
                                <div class="col-sm-8">
                                    <input type="text" class="form-control" id="inputUpdatedAt" readonly
                                           v-model="endUser.updatedAt">
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="inputLastAuthenticatedAt"
                                       class="control-label col-sm-4">Last Authenticated</label>
                                <div class="col-sm-8">
                                    <input type="text" class="form-control" id="inputLastAuthenticatedAt" readonly
                                           v-model="endUser.lastAuthenticatedAt">
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
  import consts from '../../consts'

  export default {
    mounted: function () {
      if (!this.savedId) {
        this.updateEndUserSavedId()
        this.$router.replace('/end_user/login')
        return
      }
      this.getCurrentEndUser({ id: this.savedId })
        .then(() => {
          this.updateLoggedInAs({ loggedInAs: 'end_user' })
          this.endUser = Object.assign({}, this.stateEndUser)
          if (this.endUser.birthdate) {
            this.birthdateYear = isNaN(new Date(this.endUser.birthdate)) ? '' : new Date(this.endUser.birthdate).getFullYear()
            this.birthdateMonth = isNaN(new Date(this.endUser.birthdate)) ? '' : new Date(this.endUser.birthdate).getMonth() + 1
            this.birthdateDate = isNaN(new Date(this.endUser.birthdate)) ? '' : new Date(this.endUser.birthdate).getDate()
          }
        })
        .catch((e) => {
          if (e) {
            this.updateAlertMessage({
              alertType: 'danger',
              alertMessage: e.message
            })
          }
          this.$router.replace('/end_user/login')
        })
    },
    data: function () {
      return {
        endUser: {},
        birthdateYear: '',
        birthdateMonth: '',
        birthdateDate: '',
        isProcessing: false
      }
    },
    computed: {
      ...mapState({
        savedId: state => state.endUser.savedId,
        stateEndUser: state => state.endUser.model
      })
    },
    methods: {
      ...mapActions([
        'updateAlertMessage',
        'getCurrentEndUser',
        'updateEndUser',
        'deleteEndUser'
      ]),
      ...mapMutations([
        'updateLoggedInAs',
        'updateEndUserSavedId'
      ]),
      onUpdate: function () {
        if (this.isProcessing) {
          return
        }
        this.isProcessing = true
        if (this.birthdateYear && this.birthdateMonth && this.birthdateDate) {
          this.endUser.birthdate = new Date(parseInt(this.birthdateYear), parseInt(this.birthdateMonth) - 1, parseInt(this.birthdateDate)).toISOString()
        }
        this.updateEndUser({ endUser: this.endUser })
          .then(() => {
            this.updateAlertMessage({
              alertType: 'success',
              alertMessage: consts.UPDATE_SUCCESS_MESSAGE
            })
            this.$router.replace('/end_user/login')
          })
          .catch((e) => {
            this.updateAlertMessage({
              alertType: 'danger',
              alertMessage: e.message
            })
          })
          .then(() => {
            this.isProcessing = false
          })
      },
      onDelete: function () {
        if (this.isProcessing) {
          return
        }
        this.isProcessing = true
        this.deleteEndUser({ endUser: this.endUser })
          .then(() => {
            this.updateAlertMessage({
              alertType: 'success',
              alertMessage: consts.DELETE_SUCCESS_MESSAGE
            })
            this.$router.replace('/end_user/login')
          })
          .catch((e) => {
            this.updateAlertMessage({
              alertType: 'danger',
              alertMessage: e.message
            })
          })
          .then(() => {
            this.isProcessing = false
          })
      }
    },
    beforeDestroy: function () {
      this.updateLoggedInAs({ loggedInAs: null })
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

    .placeholder {
        color: #888888;
    }
</style>
