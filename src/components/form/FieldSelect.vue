<template>
  <div>
    <label class="col-form-label control-label"
           :class="{required: required}">{{ label }}</label>
    <select class="form-control"
            :name="name"
            :value="value"
            @input="update"
    >
      <option v-for="(v, i) in options" :value="v">
        {{ inputDisplayOptions ? inputDisplayOptions[i]: v }}
      </option>
    </select>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import { Prop, Watch } from 'vue-property-decorator'

  @Component
  export default class FieldSelect extends Vue {
    @Prop()
    value: string
    @Prop()
    label: string
    @Prop()
    name: string
    @Prop()
    options: string[]
    @Prop()
    required: boolean
    @Prop()
    displayOptions: string[]

    inputRequired: boolean = false
    inputDisplayOptions: string[] = null

    @Watch('displayOptions')
    onDisplayOptionsChanged (value: string[]) {
      this.inputDisplayOptions = value
    }

    mounted () {
      this.inputRequired = this.required || false
      this.inputDisplayOptions = this.displayOptions || null
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
