<template>
    <div>
        <label class="col-form-label control-label"
               :class="{required: required}">{{ label }}</label>
        <div v-for="(item, index) in items">
            <input class="form-control"
                   :type="type"
                   :id="name + index"
                   :name="name + index"
                   :placeholder="placeholder"
                   v-model="item"
                   @input="update"
            >
            <button v-if="index <= 0"
                    type="button"
                    class="btn btn-default"
                    @click="add">
                <i class="fa fa-plus"></i>
            </button>
            <button v-if="index > 0"
                    type="button"
                    class="btn btn-default"
                    @click="remove(index)">
                <i class="fa fa-minus"></i>
            </button>
        </div>
    </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import { Prop } from 'vue-property-decorator'

  @Component
  export default class FieldInputList extends Vue {
    @Prop()
    value: string[]
    @Prop()
    label: string
    @Prop()
    name: string
    @Prop()
    type: string = 'text'
    @Prop()
    placeholder: string
    @Prop()
    required: boolean = false

    items: string[]

    mounted () {
      this.items = this.value ? this.value : []
    }

    update () {
      this.$emit('input', this.items)
      this.$emit('change', this.items)
    }

    add () {
      this.items.push(null)
    }


    remove (index) {
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
