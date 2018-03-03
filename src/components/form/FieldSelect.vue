<template>
    <div>
        <label class="col-form-label control-label"
               :class="{required: required}">{{ label }}</label>
        <select class="form-control"
                :name="name"
                :value="value"
                @input="update"
        >
            <option v-for="v in options">
                {{ v }}
            </option>
        </select>
    </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import { Prop } from 'vue-property-decorator'

  @Component
  export default class FieldSelect extends Vue {
    @Prop()
    value: string[]
    @Prop()
    label: string
    @Prop()
    name: string
    @Prop()
    options: string[]
    @Prop()
    required: boolean = false

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
