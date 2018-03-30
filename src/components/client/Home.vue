<template>
  <div class="row">
    <div class="col-sm-3">
      <div class="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
        <a class="nav-link active" id="v-pills-client-tab" data-toggle="pill" href="#v-pills-client" role="tab"
           aria-controls="v-pills-client" aria-selected="true">Client</a>
        <a class="nav-link" id="v-pills-password-tab" data-toggle="pill" href="#v-pills-password" role="tab"
           aria-controls="v-pills-password" aria-selected="false">Password</a>
        <a class="nav-link" id="v-pills-keys-tab" data-toggle="pill" href="#v-pills-keys" role="tab"
           aria-controls="v-pills-keys" aria-selected="false">Keys</a>
      </div>
    </div>
    <div class="col-sm-9">
      <div class="tab-content" id="v-pills-tabContent">
        <div class="tab-pane fade show active" id="v-pills-client" role="tabpanel"
             aria-labelledby="v-pills-client-tab">
          <client-update></client-update>
        </div>
        <div class="tab-pane fade" id="v-pills-password" role="tabpanel" aria-labelledby="v-pills-password-tab">
          <enduser-password></enduser-password>
        </div>
        <div class="tab-pane fade" id="v-pills-keys" role="tabpanel" aria-labelledby="v-pills-keys-tab">
          <p>Not implemented...</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import Update from './Update'
  import Password from './Password'
  import { mapState } from 'vuex'
  import { State } from '../../vuex/client/State'
  import Client from "../../models/Client"
  import { MutationType } from "../../vuex/Mutation"

  @Component({
    components: {
      'client-update': Update,
      'client-password': Password
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
