<template>
  <div>
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" :id="modalId + '-title'">{{ modalTitle }}</h5>
          <button type="button" class="close" @click="$emit('close')">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <p>{{ modalBody }}</p>
        </div>
        <div class="modal-footer">
          <button type="button"
                  v-for="action in actions"
                  :class="{btn: true,
                  'btn-primary': action.type === 'primary',
                  'btn-secondary': action.type === 'secondary'}"
                  @click="onCallback(action.callback)"
          >
            {{ action.label }}
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

  interface ModalAction {
    type: string,
    label: string,
    callback: () => void,
  }

  @Component
  export default class ModalCommon extends Vue {
    @Prop()
    modalId: string
    @Prop()
    modalTitle: string
    @Prop()
    modalBody: string
    @Prop()
    actions: ModalAction[]
    @Prop()
    beforeClosed: () => void

    onCallback (callback: () => void) {
      callback()
      this.$emit('close')
    }

    beforeDestroy () {
      this.beforeClosed()
    }
  }
</script>

<style scoped>
  .modal-dialog {
    margin: 0px;
    min-width: 100%;
    min-height: 100%;
  }

  .modal-content {
    border: 0px
  }
</style>
