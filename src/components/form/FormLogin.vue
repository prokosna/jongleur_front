<template>
    <form>
        <fieldset>
            <div class="form-group row">
                <field-input v-model="input.name"
                             label="Name"
                             name="name"
                             placeholder="Enter your name"
                             :required="false">

                </field-input>
            </div>
            <div class="form-group row">
                <field-input v-model="input.password"
                             label="Password"
                             name="password"
                             type="password"
                             placeholder="Enter your password"
                             :required="false">
                </field-input>
            </div>
            <a class="btn btn-primary" @click="onSubmit">Login</a>
        </fieldset>
    </form>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import FieldInput from './FieldInput'
  import { Prop } from 'vue-property-decorator'

  interface Form {
    name: string
    password: string
  }

  @Component({
    components: {
      'field-input': FieldInput
    }
  })
  export default class FormLogin extends Vue {
    @Prop()
    form: Form

    input: Form = { name: null, password: null }

    mounted () {
      this.input = this.form
    }

    onSubmit () {
      this.$emit('submit', this.input)
    }
  }
</script>
