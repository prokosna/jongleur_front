<template>
    <div :class="classObject" :style="styleObject">
        <button type="button" class="close" @click="dismiss">&times;</button>
        <strong>{{ $t(`message.${alertMessage}`) }}</strong>
    </div>
</template>

<script>
  import { AlertType } from '../vuex/State'
  import { mapActions, mapState } from 'vuex'
  import { ActionType } from '../vuex/Action'

  export default {
    computed: {
      ...mapState({
        alertType: state => state.alertType,
        alertMessage: state => state.alertMessage
      }),
      classObject: function () {
        return {
          alert: true,
          'alert-success': this.alertType === AlertType.Success,
          'alert-info': this.alertType === AlertType.Info,
          'alert-warning': this.alertType === AlertType.Warning,
          'alert-danger': this.alertType === AlertType.Danger
        }
      },
      styleObject: function () {
        return this.alertType ? {} : {
          display: 'none'
        }
      }
    },
    methods: {
      ...mapActions([
        ActionType.UPDATE_ALERT_MESSAGE
      ]),
      dismiss () {
        this[ActionType.UPDATE_ALERT_MESSAGE]({
          type: null,
          message: null
        })
      }
    }
  }
</script>
