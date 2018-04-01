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
                         placeholder="Enter your name"
                         :required="true">
            </field-input>
          </div>
        </div>
        <div class="form-group row">
          <div class="col-12">
            <field-input v-model="form.email"
                         label="E-mail"
                         name="email"
                         type="email"
                         placeholder="Enter your email"
                         :required="true">
            </field-input>
          </div>
        </div>
        <div class="form-group row">
          <div class="col-12">
            <field-input v-model="form.givenName"
                         label="Given Name"
                         name="givenName"
                         placeholder="Enter your given name">
            </field-input>
          </div>
        </div>
        <div class="form-group row">
          <div class="col-12">
            <field-input v-model="form.familyName"
                         label="Family Name"
                         name="familyName"
                         placeholder="Enter your family name">
            </field-input>
          </div>
        </div>
        <div class="form-group row">
          <div class="col-12">
            <field-input v-model="form.middleName"
                         label="Middle Name"
                         name="middleName"
                         placeholder="Enter your middle name">
            </field-input>
          </div>
        </div>
        <div class="form-group row">
          <div class="col-12">
            <field-input v-model="form.nickname"
                         label="Nickname"
                         name="nickname"
                         placeholder="Enter your nickname">
            </field-input>
          </div>
        </div>
        <div class="form-group row">
          <div class="col-12">
            <field-input v-model="form.profile"
                         label="Profile"
                         name="profile"
                         placeholder="Enter your profile">
            </field-input>
          </div>
        </div>
        <div class="form-group row">
          <div class="col-12">
            <field-input v-model="form.website"
                         label="Website"
                         name="website"
                         type="url"
                         placeholder="Enter your website">
            </field-input>
          </div>
        </div>
        <div class="form-group row">
          <div class="col-12">
            <field-select v-model="gender"
                          label="Gender"
                          name="gender"
                          :options="genderOptions">
            </field-select>
          </div>
        </div>
        <div class="form-group row">
          <div class="col-12">
            <field-date v-model="birthdate"
                        label="Birthdate"
                        name="birthdate"
                        placeholder="Enter your birthdate">
            </field-date>
          </div>
        </div>
        <div class="form-group row">
          <div class="col-12">
            <field-input v-model="form.zoneinfo"
                         label="Zone Info"
                         name="zoneinfo"
                         placeholder="Enter your zone info">
            </field-input>
          </div>
        </div>
        <div class="form-group row">
          <div class="col-12">
            <field-input v-model="form.locale"
                         label="Locale"
                         name="locale"
                         placeholder="Enter your locale">
            </field-input>
          </div>
        </div>
        <div class="form-group row">
          <div class="col-12">
            <field-input v-model="form.phoneNumber"
                         label="Phone Number"
                         name="phoneNumber"
                         type="tel"
                         placeholder="Enter your phone number">
            </field-input>
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
  import Component from 'vue-class-component'
  import Vue from 'vue'
  import { mapState } from 'vuex'
  import FieldDate from '../form/FieldDate'
  import FieldInput from '../form/FieldInput'
  import FieldSelect from '../form/FieldSelect'
  import EndUser, { Gender } from '../../models/EndUser'
  import { ActionTypeEndUser } from '../../vuex/enduser/Action'
  import { EndUserUpdateForm } from '../../services/enduser/EndUserService'
  import * as moment from 'moment'
  import { State } from "../../vuex/enduser/State"

  @Component({
    components: {
      'field-input': FieldInput,
      'field-select': FieldSelect,
      'field-date': FieldDate
    },
    computed: {
      ...mapState('enduser', {
        endUser: (state: State) => state.endUser
      })
    }
  })
  export default class Profile extends Vue {
    id: string = ''
    form: EndUserUpdateForm = {
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

    endUser: EndUser

    get gender (): string {
      return this.form.gender ? this.form.gender.toString() : null
    }

    set gender (value: string) {
      this.form.gender = Gender[<any>value] as Gender
    }

    get birthdate (): Date {
      return new Date(this.form.birthdate)
    }

    set birthdate (value: Date) {
      this.form.birthdate = moment(value).format()
    }

    get genderOptions () {
      return [Gender.Female, Gender.Male, Gender.Other]
    }

    mounted () {
      this.id = this.endUser.id
      this.form = {
        name: this.endUser.name,
        email: this.endUser.email,
        givenName: this.endUser.givenName,
        familyName: this.endUser.familyName,
        middleName: this.endUser.middleName,
        nickname: this.endUser.nickname,
        profile: this.endUser.profile,
        picture: this.endUser.picture,
        website: this.endUser.website,
        gender: this.endUser.gender,
        birthdate: moment(this.endUser.birthdate).isValid() ? moment(this.endUser.birthdate).format() : null,
        zoneinfo: this.endUser.zoneinfo,
        locale: this.endUser.locale,
        phoneNumber: this.endUser.phoneNumber
      }
    }

    onUpdate () {
      if (this.isProcessing) {
        return
      }
      this.isProcessing = true
      this.$store.dispatch(`enduser/${ActionTypeEndUser.UPDATE_END_USER}`, { id: this.id, form: this.form })
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
