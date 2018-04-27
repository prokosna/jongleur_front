<template>
  <div class="col-8">
    <div class="card text-white"
         :class="{'bg-success': cardType === CardType.Success, 'bg-danger': cardType === CardType.Danger}">
      <div class="card-header">
        <div>API Server Status</div>
        <div>
          <small>({{ timestamp }})</small>
        </div>
      </div>
      <div class="card-body">
        <h4 class="card-title">{{ cardType === CardType.Success ? 'Healthy' : 'Outage' }}</h4>
        <div class="card-text">
          Endpoint: {{ endpoint }}
          <div class="card-text" v-if="cardType === CardType.Success">Latency: {{ getLatency }} ms</div>
          <div class="card-text" v-if="cardType === CardType.Danger">{{ errorMessage }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import * as moment from 'moment'
  import { ConfigKeys, configService } from '../../services/common/ConfigService'
  import { AdminService } from '../../services/admin/AdminService'

  enum CardType {
    Success,
    Danger
  }

  @Component
  export default class Status extends Vue {
    CardType = CardType
    cardType: CardType = CardType.Success
    timestamp: string = moment().format()
    endpoint: string = configService.get(ConfigKeys.ApiUrl).toString()
    latency: number = -1
    errorMessage: string = ''
    adminService = new AdminService()

    get getLatency (): number | string {
      if (this.latency < 0) {
        return '...'
      } else {
        return this.latency.toFixed(2)
      }
    }

    mounted () {
      const start = performance.now()
      this.adminService.health()
        .then(() => {
          const end = performance.now()
          this.cardType = CardType.Success
          this.latency = end - start
        })
        .catch((e) => {
          this.cardType = CardType.Danger
          this.errorMessage = e.toString()
        })
    }
  }
</script>

<style scoped>

</style>
