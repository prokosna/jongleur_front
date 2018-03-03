<template>
    <div class="content">
        <div class="row">
            <div class="form-container">
              <form>
                <fieldset class="col-sm-10">

                </fieldset>
              </form>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
  import FieldDate from '../form/FieldDate'
  import FieldInput from '../form/FieldInput'
  import FieldSelect from '../form/FieldSelect'
  import { Gender } from '../../services/enduser/EndUserService'
  import { ActionTypeEndUser } from '../../vuex/enduser/Action'
  import Component from 'vue-class-component'
  import Vue from 'vue'

  interface Form {
    id: string,
    name: string,
    email: string,
    givenName: string,
    familyName: string,
    middleName: string,
    nickname: string,
    profile: string,
    picture: string,
    website: string,
    gender: string,
    birthdate: string,
    zoneinfo: string,
    locale: string,
    phoneNumber: string
  }

  @Component({
    components: {
      'field-input': FieldInput,
      'field-select': FieldSelect,
      'field-date': FieldDate
    }
  })
  export default class Update extends Vue {
    form: Form = {
      id: null,
      name: null,
      email: null,
      givenName: null,
      familyName: null,
      middleName: null,
      nickname: null,
      profile: null,
      picture: null,
      website: null,
      gender: null,
      birthdate: null,
      zoneinfo: null,
      locale: null,
      phoneNumber: null
    }
    isProcessing: boolean = false

    get gender (): string {
      return this.form.gender ? Gender[this.form.gender as keyof typeof Gender].toString() : null
    }

    set gender (value: string) {
      this.form.gender = Gender[<any>value]
    }

    get genderOptions () {
      return [Gender.Female, Gender.Male, Gender.Other]
    }

    mounted() {

    }

    onRegister () {
      if (this.isProcessing) {
        return
      }
      this.isProcessing = true
      this.$store.dispatch(`enduser/${ActionTypeEndUser.REGISTER_END_USER}`, this.form)
        .then(() => {
          this.$router.push('/end_user/login')
          this.isProcessing = false
        })
        .catch(() => {
          this.isProcessing = false
        })
    }
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
              alertMessage: config.UPDATE_SUCCESS_MESSAGE
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
              alertMessage: config.DELETE_SUCCESS_MESSAGE
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
        width: 60%;
        margin: 0 auto;
    }
</style>
