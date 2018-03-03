<template>
    <div>
        <label :for="name"
               class="col-form-label control-label"
               :class="{required: required}">{{ label }}</label>
        <input class="form-control"
               :type="inputType"
               :name="name"
               :id="name"
               :placeholder="placeholder"
               :value="value"
               @input="update"
               @focus="$emit('focus', $event)"
               @blur="$emit('blur', $event)"
        >
    </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import { Prop } from 'vue-property-decorator'

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
    required: boolean = false

    inputType: string = 'text'

    mounted () {
      this.inputType = this.type
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
</style>