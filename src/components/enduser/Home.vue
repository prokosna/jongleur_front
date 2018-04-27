<template>
  <div class="row">
    <div class="col-sm-3">
      <div class="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
        <a class="nav-link active" id="v-pills-profile-tab" data-toggle="pill" href="#v-pills-profile" role="tab"
           aria-controls="v-pills-profile" aria-selected="true">Profile</a>
        <a class="nav-link" id="v-pills-account-tab" data-toggle="pill" href="#v-pills-account" role="tab"
           aria-controls="v-pills-account" aria-selected="false">Account</a>
        <a class="nav-link" id="v-pills-applications-tab" data-toggle="pill" href="#v-pills-applications" role="tab"
           aria-controls="v-pills-applications" aria-selected="false">Applications</a>
        <a class="nav-link" id="v-pills-activities-tab" data-toggle="pill" href="#v-pills-activities" role="tab"
           aria-controls="v-pills-activities" aria-selected="false">Activities</a>
      </div>
    </div>
    <div class="col-sm-9">
      <div class="tab-content" id="v-pills-tabContent">
        <div class="tab-pane fade show active" id="v-pills-profile" role="tabpanel"
             aria-labelledby="v-pills-profile-tab">
          <enduser-profile></enduser-profile>
        </div>
        <div class="tab-pane fade" id="v-pills-account" role="tabpanel" aria-labelledby="v-pills-account-tab">
          <enduser-account></enduser-account>
        </div>
        <div class="tab-pane fade" id="v-pills-applications" role="tabpanel"
             aria-labelledby="v-pills-applications-tab">
          <p>Not implemented...</p>
        </div>
        <div class="tab-pane fade" id="v-pills-activities" role="tabpanel" aria-labelledby="v-pills-activities-tab">
          <p>Not implemented...</p>
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
  import Profile from './Profile'
  import Account from './Account'
  import { mapState } from 'vuex'
  import { State } from '../../vuex/enduser/State'
  import EndUser from '../../models/EndUser'
  import { MutationType } from '../../vuex/Mutation'

  @Component({
    components: {
      'enduser-profile': Profile,
      'enduser-account': Account
    },
    computed: {
      ...mapState('enduser', {
        endUser: (state: State) => state.endUser
      })
    }
  })
  export default class Home extends Vue {
    endUser: EndUser

    mounted () {
      // check if logged in
      if (!this.endUser) {
        this.$router.replace('/enduser/login')
        return
      }
      this.$store.commit(MutationType.UPDATE_LOGGED_IN_AS, 'enduser')
    }

    beforeDestroy () {
      this.$store.commit(MutationType.UPDATE_LOGGED_IN_AS, null)
    }
  }
</script>

<style scoped>
</style>
