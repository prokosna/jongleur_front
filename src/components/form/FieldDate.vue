<template>
  <div>
    <label class="col-form-label control-label"
           :class="{required: required}">{{ label }}</label>
    <div class="form-inline row">
      <div class="col-2">
        <select :class="{'form-control': true, placeholder: !year }"
                :id="name + 'year'"
                :name="name + 'year'"
                v-model="year"
                @input="updateYear"
                @focus="$emit('fucus', $event)"
                @blur="$emit('blur', $event)">
          <option value="" selected disabled>Year</option>
          <option v-for="year in 150">{{ 1899 + year }}</option>
        </select>
      </div>
      <div class="col-2">
        <select :class="{'form-control': true, placeholder: !month }"
                :id="name + 'month'"
                :name="name + 'month'"
                v-model="month"
                @input="updateMonth"
                @focus="$emit('fucus', $event)"
                @blur="$emit('blur', $event)">
          <option value="" selected disabled>Month</option>
          <option v-for="month in 12">{{ month }}</option>
        </select>
      </div>
      <div class="col-2">
        <select :class="{'form-control': true, placeholder: !day }"
                :id="name + 'day'"
                :name="name + 'day'"
                v-model="day"
                @input="updateDay"
                @focus="$emit('fucus', $event)"
                @blur="$emit('blur', $event)">
          <option value="" selected disabled>Day</option>
          <option v-for="day in 31">{{ day }}</option>
        </select>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import { Prop, Watch } from 'vue-property-decorator'
  import * as moment from 'moment'

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
        return new Date(Number(this.year), Number(this.month) - 1, Number(this.day), 0, 0, 0, 0)
      } catch (e) {
        return null
      }
    }

    @Watch('value')
    onValueChanged () {
      if (this.value) {
        const m = moment(this.value)
        this.year = m ? m.year().toString() : ''
        this.month = m ? (m.month() + 1).toString() : ''
        this.day = m ? m.date().toString() : ''
      }
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
      this.update()
    }

    updateMonth (event: any) {
      this.month = event.target.value
      this.update()
    }

    updateDay (event: any) {
      this.day = event.target.value
      this.update()
    }
  }
</script>

<style scoped>
  .required:after {
    content: " *";
    color: red;
  }
</style>
