<template>
    <div id="app">
        <nav class="navbar navbar-default navbar-fixed-top">
            <div class="container">
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle collapsed" data-toggle="collapse"
                            data-target="#bs-example-navbar-collapse-1">
                        <span class="sr-only">Toggle navigation</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                    <a class="navbar-brand" href="/"><strong>Jongleur</strong></a>
                </div>
                <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                    <ul class="nav navbar-nav">
                        <li><a href="/doc">Doc</a></li>
                        <li><a href="#">Admin</a></li>
                    </ul>
                    <ul class="nav navbar-nav navbar-right" v-if="loggedInAs && loggedInName">
                        <!-- <li><a href="#">Hi {{ loggedInName }}!</a></li> -->
                        <li><a href="#" @click="logout">Logout</a></li>
                    </ul>
                </div>
            </div>
        </nav>
        <div class="container">
            <alert-display></alert-display>
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
  import AlertDisplay from './AlertDisplay.vue'
  import { mapActions, mapState } from 'vuex'

  export default {
    components: {
      'alert-display': AlertDisplay
    },
    created: function () {
      this.initialize()
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
        padding-top: 70px;
        font-size: 21px;
    }

    p {
        font-size: 21px;
    }

    .form-control {
        color: #000000;
    }
</style>
