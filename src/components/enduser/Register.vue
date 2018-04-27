<template>
  <div class="row">
    <div class="offset-2 col-10">
      <h1>New End-User</h1>
    </div>
    <div class="offset-2 col-10">
      <div class="form-horizontal">
        <div class="form-group row">
          <div class="col-10">
            <field-input v-model="form.name"
                         label="Name"
                         name="name"
                         placeholder="Enter your name"
                         :required="true">
            </field-input>
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
          <div class="col-10">
            <field-input v-model="form.givenName"
                         label="Given Name"
                         name="givenName"
                         placeholder="Enter your given name">
            </field-input>
          </div>
        </div>
        <div class="form-group row">
          <div class="col-10">
            <field-input v-model="form.familyName"
                         label="Family Name"
                         name="familyName"
                         placeholder="Enter your family name">
            </field-input>
          </div>
        </div>
        <div class="form-group row">
          <div class="col-10">
            <field-input v-model="form.middleName"
                         label="Middle Name"
                         name="middleName"
                         placeholder="Enter your middle name">
            </field-input>
          </div>
        </div>
        <div class="form-group row">
          <div class="col-10">
            <field-input v-model="form.nickname"
                         label="Nickname"
                         name="nickname"
                         placeholder="Enter your nickname">
            </field-input>
          </div>
        </div>
        <div class="form-group row">
          <div class="col-10">
            <field-input v-model="form.profile"
                         label="profile"
                         name="profile"
                         placeholder="Enter your profile">
            </field-input>
          </div>
        </div>
        <div class="form-group row">
          <div class="col-10">
            <field-input v-model="form.website"
                         label="Website"
                         name="website"
                         type="url"
                         placeholder="Enter your website">
            </field-input>
          </div>
        </div>
        <div class="form-group row">
          <div class="col-10">
            <field-select v-model="gender"
                          label="Gender"
                          name="gender"
                          :options="genderOptions">
            </field-select>
          </div>
        </div>
        <div class="form-group row">
          <div class="col-10">
            <field-date v-model="birthdate"
                        label="Birthdate"
                        name="birthdate"
                        placeholder="Enter your birthdate">
            </field-date>
          </div>
        </div>
        <div class="form-group row">
          <div class="col-10">
            <field-input v-model="form.zoneinfo"
                         label="Zone Info"
                         name="zoneinfo"
                         placeholder="Enter your zone info">
            </field-input>
          </div>
        </div>
        <div class="form-group row">
          <div class="col-10">
            <field-input v-model="form.locale"
                         label="Locale"
                         name="locale"
                         placeholder="Enter your locale">
            </field-input>
          </div>
        </div>
        <div class="form-group row">
          <div class="col-10">
            <field-input v-model="form.phoneNumber"
                         label="Phone Number"
                         name="phoneNumber"
                         type="tel"
                         placeholder="Enter your phone number">
            </field-input>
          </div>
        </div>
        <div class="form-group row">
          <div class="col-10">
            <a class="btn btn-primary" @click="onRegister">
              Register
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
  import * as moment from 'moment'
  import FieldDate from '../form/FieldDate'
  import FieldInput from '../form/FieldInput'
  import FieldSelect from '../form/FieldSelect'
  import { Gender } from '../../models/EndUser'
  import { ActionTypeEndUser } from '../../vuex/enduser/Action'
  import { EndUserRegisterForm } from '../../services/enduser/EndUserService'

  @Component({
    components: {
      'field-input': FieldInput,
      'field-select': FieldSelect,
      'field-date': FieldDate
    }
  })
  export default class Register extends Vue {
    form: EndUserRegisterForm = {
      name: null,
      password: null,
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
      this.form.gender = Gender[value as keyof typeof Gender]
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

    onRegister () {
      if (this.isProcessing) {
        return
      }
      this.isProcessing = true
      this.$store.dispatch(`enduser/${ActionTypeEndUser.REGISTER_END_USER}`, this.form)
        .then(() => {
          this.$router.push('/enduser/login')
          this.isProcessing = false
        })
        .catch(() => {
          this.isProcessing = false
        })
    }
  }
</script>

<style scoped>
  .form-container {
    padding: 10px;
    width: 70%;
    margin: 0 auto;
  }
</style>
