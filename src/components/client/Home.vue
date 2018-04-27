<template>
  <div class="row">
    <div class="col-sm-3">
      <div class="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
        <a class="nav-link active" id="v-pills-client-tab" data-toggle="pill" href="#v-pills-client" role="tab"
           aria-controls="v-pills-client" aria-selected="true">Client</a>
        <a class="nav-link" id="v-pills-account-tab" data-toggle="pill" href="#v-pills-account" role="tab"
           aria-controls="v-pills-password" aria-selected="false">Account</a>
      </div>
    </div>
    <div class="col-sm-9">
      <div class="tab-content" id="v-pills-tabContent">
        <div class="tab-pane fade show active" id="v-pills-client" role="tabpanel"
             aria-labelledby="v-pills-client-tab">
          <client-update></client-update>
        </div>
        <div class="tab-pane fade" id="v-pills-account" role="tabpanel" aria-labelledby="v-pills-account-tab">
          <client-account></client-account>
        </div>
      </div>
    </div>
    <div>
      <modals-container/>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import Update from './Update'
  import Account from './Account'
  import { mapState } from 'vuex'
  import { State } from '../../vuex/client/State'
  import Client from "../../models/Client"
  import { MutationType } from "../../vuex/Mutation"

  @Component({
    components: {
      'client-update': Update,
      'client-account': Account
    },
    computed: {
      ...mapState('client', {
        client: (state: State) => state.client
      })
    }
  })
  export default class Home extends Vue {
    client: Client

    mounted () {
      // check if logged in
      if (!this.client) {
        this.$router.replace('/client/login')
        return
      }
      this.$store.commit(MutationType.UPDATE_LOGGED_IN_AS, 'client')
    }

    beforeDestroy () {
      this.$store.commit(MutationType.UPDATE_LOGGED_IN_AS, null)
    }
  }
</script>

<style scoped>

</style>
