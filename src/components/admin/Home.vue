<template>
  <div class="row">
    <div class="col-sm-3">
      <div class="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
        <a class="nav-link active" id="v-pills-admin-tab" data-toggle="pill" href="#v-pills-status" role="tab"
           aria-controls="v-pills-status" aria-selected="true">Status</a>
        <a class="nav-link" id="v-pills-account-tab" data-toggle="pill" href="#v-pills-account" role="tab"
           aria-controls="v-pills-account" aria-selected="false">Account</a>
        <a class="nav-link" id="v-pills-endusers-tab" data-toggle="pill" href="#v-pills-endusers" role="tab"
           aria-controls="v-pills-endusers" aria-selected="false">EndUsers</a>
        <a class="nav-link" id="v-pills-clients-tab" data-toggle="pill" href="#v-pills-clients" role="tab"
           aria-controls="v-pills-clients" aria-selected="false">Clients</a>
        <a class="nav-link" id="v-pills-resources-tab" data-toggle="pill" href="#v-pills-resources" role="tab"
           aria-controls="v-pills-resources" aria-selected="false">Resources</a>
        <a class="nav-link" id="v-pills-admins-tab" data-toggle="pill" href="#v-pills-admins" role="tab"
           aria-controls="v-pills-admins" aria-selected="false">Admins</a>
      </div>
    </div>
    <div class="col-sm-9">
      <div class="tab-content" id="v-pills-tabContent">
        <div class="tab-pane fade show active" id="v-pills-status" role="tabpanel"
             aria-labelledby="v-pills-status-tab">
          <admin-status></admin-status>
        </div>
        <div class="tab-pane fade" id="v-pills-account" role="tabpanel" aria-labelledby="v-pills-account-tab">
          <admin-account></admin-account>
        </div>
        <div class="tab-pane fade" id="v-pills-endusers" role="tabpanel" aria-labelledby="v-pills-endusers-tab">
          <admin-endusers></admin-endusers>
        </div>
        <div class="tab-pane fade" id="v-pills-clients" role="tabpanel" aria-labelledby="v-pills-clients-tab">
          <admin-clients></admin-clients>
        </div>
        <div class="tab-pane fade" id="v-pills-resources" role="tabpanel" aria-labelledby="v-pills-resources-tab">
          <admin-resources></admin-resources>
        </div>
        <div class="tab-pane fade" id="v-pills-admins" role="tabpanel" aria-labelledby="v-pills-admins-tab">
          <admin-admins></admin-admins>
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
  import Status from './Status'
  import Account from './Account'
  import EndUsers from './EndUsers'
  import Clients from './Clients'
  import Resources from './Resources'
  import Admins from './Admins'
  import { mapState } from 'vuex'
  import { State } from '../../vuex/admin/State'
  import Admin from "../../models/Admin"
  import { MutationType } from "../../vuex/Mutation"

  @Component({
    components: {
      'admin-status': Status,
      'admin-account': Account,
      'admin-endusers': EndUsers,
      'admin-clients': Clients,
      'admin-resources': Resources,
      'admin-admins': Admins
    },
    computed: {
      ...mapState('admin', {
        admin: (state: State) => state.admin
      })
    }
  })
  export default class Home extends Vue {
    admin: Admin

    mounted () {
      // check if logged in
      if (!this.admin) {
        this.$router.replace('/admin/login')
        return
      }
      this.$store.commit(MutationType.UPDATE_LOGGED_IN_AS, 'admin')
    }

    beforeDestroy () {
      this.$store.commit(MutationType.UPDATE_LOGGED_IN_AS, null)
    }
  }
</script>

<style scoped>

</style>
