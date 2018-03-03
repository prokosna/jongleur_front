<template>
    <div class="content">
        <div class="row">
            <div class="form-container">
                <div class="well bs-component">
                    <form class="form-horizontal">
                        <fieldset>
                            <legend>New End-User</legend>
                            <div class="form-group required">
                                <label for="inputName" class="control-label col-sm-4">Name</label>
                                <div class="col-sm-8">
                                    <input type="text" class="form-control" id="inputName" placeholder="Name"
                                           v-model="endUser.name">
                                </div>
                            </div>
                            <div class="form-group required">
                                <label for="inputEmail" class="control-label col-sm-4">Email</label>
                                <div class="col-sm-8">
                                    <input type="email" class="form-control" id="inputEmail" placeholder="Email"
                                           v-model="endUser.email">
                                </div>
                            </div>
                            <div class="form-group required">
                                <label for="inputPassword" class="control-label col-sm-4">Password</label>
                                <div class="col-sm-8">
                                    <input type="password" class="form-control" id="inputPassword"
                                           placeholder="Password" v-model="endUser.password">
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="inputGivenName" class="control-label col-sm-4">Given Name</label>
                                <div class="col-sm-8">
                                    <input type="text" class="form-control" id="inputGivenName"
                                           v-model="endUser.givenName"
                                           placeholder="Given Name">
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="inputFamilyName" class="control-label col-sm-4">Family Name</label>
                                <div class="col-sm-8">
                                    <input type="text" class="form-control" id="inputFamilyName"
                                           v-model="endUser.familyName"
                                           placeholder="Family Name">
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="inputMiddleName" class="control-label col-sm-4">Middle Name</label>
                                <div class="col-sm-8">
                                    <input type="text" class="form-control" id="inputMiddleName"
                                           v-model="endUser.middleName"
                                           placeholder="Middle Name">
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="inputNickname" class="control-label col-sm-4">Nickname</label>
                                <div class="col-sm-8">
                                    <input type="text" class="form-control" id="inputNickname" placeholder="Nickname"
                                           v-model="endUser.nickname">
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="inputProfile" class="control-label col-sm-4">Profile</label>
                                <div class="col-sm-8">
                                    <input type="text" class="form-control" id="inputProfile" placeholder="Profile"
                                           v-model="endUser.profile">
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="inputPicture" class="control-label col-sm-4">Picture</label>
                                <div class="col-sm-8">
                                    <input type="text" class="form-control" id="inputPicture" placeholder="Picture"
                                           v-model="endUser.picture">
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="inputWebSite" class="control-label col-sm-4">WebSite</label>
                                <div class="col-sm-8">
                                    <input type="text" class="form-control" id="inputWebSite" placeholder="Website"
                                           v-model="endUser.website">
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
                                            id="inputbirthdateDate" v-model="birthdateDate">
                                        <option value="" selected disabled>Day</option>
                                        <option v-for="day in 31">{{ day }}</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="inputZoneInfo" class="control-label col-sm-4">Zone Info</label>
                                <div class="col-sm-8">
                                    <input type="text" class="form-control" id="inputZoneInfo" placeholder="Zone info"
                                           v-model="endUser.zoneinfo">
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="inputLocale" class="control-label col-sm-4">Locale</label>
                                <div class="col-sm-8">
                                    <input type="text" class="form-control" id="inputLocale" placeholder="Locale"
                                           v-model="endUser.locale">
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="inputPhoneNumber" class="control-label col-sm-4">Phone Number</label>
                                <div class="col-sm-8">
                                    <input type="text" class="form-control" id="inputPhoneNumber"
                                           placeholder="Phone number" v-model="endUser.phoneNumber">
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="col-sm-12">
                                    <button type="submit" class="btn btn-primary btn-block" @click="onRegister">
                                        Register
                                    </button>
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
  import EndUser from '../../models/EndUser'
  import config from '../../Config'

  export default {
    mounted: function () {
      this.endUser = Object.assign({}, new EndUser())
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
    methods: {
      ...mapActions([
        'updateAlertMessage',
        'registerEndUser'
      ]),
      onRegister: function () {
        if (this.isProcessing) {
          return
        }
        this.isProcessing = true
        if (this.birthdateYear && this.birthdateMonth && this.birthdateDate) {
          this.endUser.birthdate = new Date(parseInt(this.birthdateYear), parseInt(this.birthdateMonth) - 1, parseInt(this.birthdateDate)).toISOString()
        }
        this.registerEndUser({ endUser: this.endUser })
          .then(() => {
            this.updateAlertMessage({
              alertType: 'success',
              alertMessage: config.REGISTER_SUCCESS_MESSAGE
            })
            this.$router.push('/end_user/login')
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

    .placeholder {
        color: #888888;
    }
</style>