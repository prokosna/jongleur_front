<template>
  <div class="row">
    <div class="col-sm-3">
      <div class="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
        <a class="nav-link active" id="v-pills-resource-tab" data-toggle="pill" href="#v-pills-resource" role="tab"
           aria-controls="v-pills-resource" aria-selected="true">Resource</a>
        <a class="nav-link" id="v-pills-account-tab" data-toggle="pill" href="#v-pills-account" role="tab"
           aria-controls="v-pills-account" aria-selected="false">Account</a>
      </div>
    </div>
    <div class="col-sm-9">
      <div class="tab-content" id="v-pills-tabContent">
        <div class="tab-pane fade show active" id="v-pills-resource" role="tabpanel"
             aria-labelledby="v-pills-resource-tab">
          <resource-update></resource-update>
        </div>
        <div class="tab-pane fade" id="v-pills-account" role="tabpanel" aria-labelledby="v-pills-account-tab">
          <resource-account></resource-account>
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
  import { State } from '../../vuex/resource/State'
  import Client from "../../models/Client"
  import { MutationType } from "../../vuex/Mutation"

  @Component({
    components: {
      'resource-update': Update,
      'resource-account': Account
    },
    computed: {
      ...mapState('resource', {
        resource: (state: State) => state.resource
      })
    }
  })
  export default class Home extends Vue {
    resource: Client

    mounted () {
      // check if logged in
      if (!this.resource) {
        this.$router.replace('/resource/login')
        return
      }
      this.$store.commit(MutationType.UPDATE_LOGGED_IN_AS, 'resource')
    }

    beforeDestroy () {
      this.$store.commit(MutationType.UPDATE_LOGGED_IN_AS, null)
    }
  }
</script>

<style scoped>

</style>
