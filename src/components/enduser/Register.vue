<template>
    <div class="content">
        <div class="row">
            <div class="form-container">
                <form>
                    <fieldset class="col-sm-10">
                        <legend>New User</legend>
                        <div class="form-group">
                            <field-input v-model="form.name"
                                         label="Name"
                                         name="name"
                                         placeholder="Enter your name"
                                         :required="true">
                            </field-input>
                        </div>
                        <div class="form-group">
                            <field-input v-model="form.password"
                                         label="Password"
                                         name="password"
                                         type="password"
                                         placeholder="Enter your password"
                                         :required="true">
                            </field-input>
                        </div>
                        <div class="form-group">
                            <field-input v-model="form.email"
                                         label="E-mail"
                                         name="email"
                                         type="email"
                                         placeholder="Enter your email"
                                         :required="true">
                            </field-input>
                        </div>
                        <div class="form-group">
                            <field-input v-model="form.givenName"
                                         label="Given Name"
                                         name="givenName"
                                         placeholder="Enter your given name">
                            </field-input>
                        </div>
                        <div class="form-group">
                            <field-input v-model="form.familyName"
                                         label="Family Name"
                                         name="familyName"
                                         placeholder="Enter your family name">
                            </field-input>
                        </div>
                        <div class="form-group">
                            <field-input v-model="form.middleName"
                                         label="Middle Name"
                                         name="middleName"
                                         placeholder="Enter your middle name">
                            </field-input>
                        </div>
                        <div class="form-group">
                            <field-input v-model="form.nickname"
                                         label="Nickname"
                                         name="nickname"
                                         placeholder="Enter your nickname">
                            </field-input>
                        </div>
                        <div class="form-group">
                            <field-input v-model="form.profile"
                                         label="profile"
                                         name="profile"
                                         placeholder="Enter your profile">
                            </field-input>
                        </div>
                        <div class="form-group">
                            <field-input v-model="form.website"
                                         label="Website"
                                         name="website"
                                         type="url"
                                         placeholder="Enter your website">
                            </field-input>
                        </div>
                        <div class="form-group">
                            <field-select v-model="gender"
                                          label="Gender"
                                          name="gender"
                                          :options="genderOptions">
                            </field-select>
                        </div>
                        <div class="form-group">
                            <field-date v-model="form.birthdate"
                                        label="Birthdate"
                                        name="birthdate"
                                        placeholder="Enter your birthdate">
                            </field-date>
                        </div>
                        <div class="form-group">
                            <field-input v-model="form.zoneinfo"
                                         label="Zone Info"
                                         name="zoneinfo"
                                         placeholder="Enter your zone info">
                            </field-input>
                        </div>
                        <div class="form-group">
                            <field-input v-model="form.locale"
                                         label="Locale"
                                         name="locale"
                                         placeholder="Enter your locale">
                            </field-input>
                        </div>
                        <div class="form-group">
                            <field-input v-model="form.phoneNumber"
                                         label="Phone Number"
                                         name="phoneNumber"
                                         type="tel"
                                         placeholder="Enter your phone number">
                            </field-input>
                        </div>
                        <a class="btn btn-primary" @click="onRegister">
                            Register
                        </a>
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
  import { mapActions } from 'vuex'
  import { ActionTypeEndUser } from '../../vuex/enduser/Action'
  import Component from 'vue-class-component'
  import Vue from 'vue'

  interface Form {
    name: string,
    password: string,
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
  export default class Register extends Vue {
    form: Form = {
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
      this.form.gender = Gender[<any>value]
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
          this.$router.push('/end_user/login')
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
        width: 60%;
        margin: 0 auto;
    }
</style>