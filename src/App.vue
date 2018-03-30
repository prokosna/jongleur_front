<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary navbar-fixed-top">
      <div class="container">
        <div class="navbar-header">
          <a class="navbar-brand" href="/">Jongleur</a>
        </div>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01"
                aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation" style="">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarColor01">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item">
              <a class="nav-link" href="/doc">Document</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Admins</a>
            </li>
          </ul>
          <ul class="navbar-nav navbar-right" v-if="loggedInAs">
            <li><a class="nav-link" href="#" @click="onLoggedOut">Logout</a></li>
          </ul>
        </div>
      </div>
    </nav>
    <div class="container">
      <div class="row">
        <div class="alert-container col-md-12">
          <alert-display></alert-display>
        </div>
        <div class="col-md-12">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import AlertDisplay from './components/AlertDisplay.vue'
  import { mapState } from 'vuex'
  import Component from 'vue-class-component'
  import { MutationType } from "./vuex/Mutation"
  import { RootState } from "./vuex/State"
  import { Keys, StorageService } from './services/common/StorageService'

  @Component({
    components: {
      'alert-display': AlertDisplay
    },
    computed: {
      ...mapState({
        loggedInAs: (state: RootState) => state.loggedInAs
      })
    }
  })
  export default class App extends Vue {
    loggedInAs: string
    storageService: StorageService = new StorageService()

    onLoggedOut () {
      switch (this.loggedInAs) {
        case 'enduser':
          this.storageService.set(Keys.EndUserId, null)
          this.storageService.set(Keys.EndUserSessionToken, null)
          break
        case 'client':
          this.storageService.set(Keys.ClientId, null)
          this.storageService.set(Keys.ClientSessionToken, null)
          break
        case 'resource':
          this.storageService.set(Keys.ResourceId, null)
          this.storageService.set(Keys.ResourceSessionToken, null)
          break
      }
      this.$store.commit(MutationType.UPDATE_LOGGED_IN_AS, null)
      this.$router.replace('/')
    }
  }
</script>

<style>
  body {
    font-size: 21px;
  }

  p {
    font-size: 21px;
  }

  .alert-container {
    padding: 10px;
    margin: 0 auto;
  }
</style>
