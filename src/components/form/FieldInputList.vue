<template>
  <div>
    <label class="col-form-label control-label"
           :class="{required: inputRequired}">{{ label }}</label>
    <div v-for="(item, index) in items">
      <div class="row">
        <div class="col-11">
          <input class="form-control"
                 :type="inputType"
                 :id="name + index"
                 :name="name + index"
                 :placeholder="placeholder"
                 v-model="item.v"
                 @input="update"
          >
        </div>
        <div class="col-1" v-if="index <= 0">
          <button type="button"
                  class="btn btn-secondary"
                  @click="add">
            <i class="fa fa-plus"></i>
          </button>
        </div>
        <div class="col-1" v-if="index > 0">
          <button type="button"
                  class="btn btn-secondary"
                  @click="remove(index)">
            <i class="fa fa-minus"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import { Prop } from 'vue-property-decorator'

  interface TemporaryObject {
    v: string
  }

  @Component
  export default class FieldInputList extends Vue {
    @Prop()
    value: string[]
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

    inputType: string = 'text'
    items: TemporaryObject[] = []
    inputRequired: boolean = false

    mounted () {
      this.items = this.value ? this.value.map((v: string) => ({ v })) : []
      this.inputType = this.type || 'text'
      this.inputRequired = this.required || false
      if (this.items.length == 0) {
        this.items.push({
          v: null
        })
      }
    }

    update () {
      this.$emit('input', this.items.map(v => v.v).filter(v => v))
      this.$emit('change', this.items.map(v => v.v).filter(v => v))
    }

    add () {
      this.items.push({
        v: null
      })
    }


    remove (index: number) {
      this.items.splice(index, 1)
    }
  }
</script>

<style scoped>
  .required:after {
    content: " *";
    color: red;
  }
</style>
