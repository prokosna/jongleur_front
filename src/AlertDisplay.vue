<template>
    <div :class="classObject" :style="styleObject">
        {{ alertMessage }}
    </div>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    computed: {
      ...mapState({
        alertType: state => state.alertType,
        alertMessage: state => state.alertMessage
      }),
      classObject: function () {
        return {
          alert: true,
          'alert-success': this.alertType === 'success',
          'alert-info': this.alertType === 'info',
          'alert-warning': this.alertType === 'warning',
          'alert-danger': this.alertType === 'danger'
        }
      },
      styleObject: function () {
        return this.alertType ? {} : {
          display: 'none'
        }
      }
    }
  }
</script>
