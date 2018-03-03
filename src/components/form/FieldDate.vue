<template>
    <div>
        <label class="col-form-label control-label"
               :class="{required: required}">{{ label }}</label>
        <div class="form-inline">
            <select :class="{'form-control': true, placeholder: !year }"
                    :id="name + 'year'"
                    :name="name + 'year'"
                    @input="updateYear"
                    @focus="$emit('fucus', $event)"
                    @blur="$emit('blur', $event)"
            >
                <option value="" selected disabled>Year</option>
                <option v-for="year in 150">{{ 1899 + year }}</option>
            </select>
            <select :class="{'form-control': true, placeholder: !month }"
                    :id="name + 'month'"
                    :name="name + 'month'"
                    @input="updateMonth"
                    @focus="$emit('fucus', $event)"
                    @blur="$emit('blur', $event)"
            >
                <option value="" selected disabled>Month</option>
                <option v-for="month in 12">{{ month }}</option>
            </select>
            <select :class="{'form-control': true, placeholder: !day }"
                    :id="name + 'day'"
                    :name="name + 'day'"
                    @input="updateDay"
                    @focus="$emit('fucus', $event)"
                    @blur="$emit('blur', $event)"
            >
                <option value="" selected disabled>Day</option>
                <option v-for="day in 31">{{ day }}</option>
            </select>
        </div>
    </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import { Prop } from 'vue-property-decorator'

  @Component
  export default class FieldDate extends Vue {
    @Prop()
    value: Date
    @Prop()
    label: string
    @Prop()
    name: string
    @Prop()
    required: boolean

    year: string = ''
    month: string = ''
    day: string = ''

    get date (): Date {
      try {
        return new Date(Number(this.year), Number(this.month), Number(this.day), 0, 0, 0, 0)
      } catch (e) {
        return null
      }
    }

    mounted () {
      const d = new Date(this.value)
      this.year = d ? '' : d.getFullYear().toString()
      this.month = d ? '' : d.getMonth().toString()
      this.day = d ? '' : d.getDate().toString()
    }

    update () {
      const d = this.date
      if (d) {
        this.$emit('input', d)
        this.$emit('change', d)
      }
    }

    updateYear (event: any) {
      this.year = event.target.value
    }

    updateMonth (event: any) {
      this.month = event.target.value
    }

    updateDay (event: any) {
      this.day = event.target.value
    }
  }
</script>

<style scoped>
    .required:after {
        content: " *";
        color: red;
    }
</style>
