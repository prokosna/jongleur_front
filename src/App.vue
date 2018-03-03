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
                    <ul class="navbar-nav navbar-right mr-auto" v-if="loggedInAs && loggedInName">
                        <!-- <li><a href="#">Hi {{ loggedInName }}!</a></li> -->
                        <li><a href="#" @click="logout">Logout</a></li>
                    </ul>
                </div>
            </div>
        </nav>
        <div class="container">
            <div class="alert-container">
                <alert-display></alert-display>
            </div>
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
  import AlertDisplay from './components/AlertDisplay.vue'
  import { mapActions, mapState } from 'vuex'

  export default {
    components: {
      'alert-display': AlertDisplay
    },
    created: function () {
      // this.initialize()
    },
    computed: {
      ...mapState({
        loggedInAs: state => state.loggedInAs,
        endUser: state => state.endUser,
        client: state => state.client,
        resource: state => state.resource
      }),
      loggedInName: function () {
        switch (this.loggedInAs) {
          case 'end_user':
            return this.endUser.model.name
          case 'client':
            return this.client.model.name
          case 'resource':
            return this.resource.model.name
          default:
            return null
        }
      }
    },
    methods: {
      ...mapActions([
        'initialize',
        'logout'
      ])
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
