<template>
  <div>
    <label :for="name"
           class="col-form-label control-label"
           :class="{required: inputRequired}">{{ label }}</label>
    <input class="form-control"
           :type="inputType"
           :name="name"
           :id="name"
           :placeholder="placeholder"
           :value="value"
           :readonly="inputReadonly"
           @input="update"
           @focus="$emit('focus', $event)"
           @blur="$emit('blur', $event)"
    >
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  // import Component from 'vue-class-component'
  import { Component, Prop } from 'vue-property-decorator'

  @Component
  export default class FieldInput extends Vue {
    @Prop()
    value: string
    @Prop()
    label: string
    @Prop()
    name: string
    @Prop()
    type: string
    @Prop()
    placeholder: string
    @Prop()
    required: boolean
    @Prop()
    readonly: boolean

    inputType: string = 'text'
    inputRequired: boolean = false
    inputReadonly: boolean = false

    mounted () {
      this.inputType = this.type
      this.inputReadonly = this.readonly || false
      this.inputRequired = this.required || false
    }

    update (event: any) {
      this.$emit('input', event.target.value)
      this.$emit('change', event.target.value)
    }
  }
</script>

<style scoped>
  .required:after {
    content: " *";
    color: red;
  }
  input[readonly] {
    color: white;
  }
</style>
