<template>
  <div>
    <label class="col-form-label control-label"
           :class="{required: inputRequired}">{{ label }}</label>
    <div v-for="(item, index) in items">
      <div class="row">
        <div class="col-3">
          <input class="form-control"
                 type="text"
                 :id="name + index + '_name'"
                 :name="name + index + '_name'"
                 placeholder="Scope"
                 v-model="item.name"
                 @input="update">
        </div>
        <div class="col-8">
          <input class="form-control"
                 type="text"
                 :id="name + index + '_desc'"
                 :name="name + index + '_desc'"
                 placeholder="Description"
                 v-model="item.description"
                 @input="update">
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
  import { Prop, Watch } from 'vue-property-decorator'
  import Scope from '../../models/Scope'

  @Component
  export default class FieldScopeList extends Vue {
    @Prop()
    value: Scope[]
    @Prop()
    label: string
    @Prop()
    name: string
    @Prop()
    required: boolean

    items: Scope[] = []
    inputRequired: boolean = false

    @Watch('value')
    onValueChanged (value: Scope[]) {
      this.items = value
    }

    mounted () {
      this.items = this.value ? this.value : []
      this.inputRequired = this.required || false
    }

    update () {
      this.$emit('input', this.items.filter(v => v.name && v.description))
      this.$emit('change', this.items.filter(v => v.name && v.description))
    }

    add () {
      this.items.push({
        name: null,
        description: null
      })
    }

    remove (index: number) {
      this.items.splice(index, 1)
    }
  }
</script>

<style scoped>
</style>
