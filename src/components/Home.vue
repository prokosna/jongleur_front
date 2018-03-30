<template>
  <div class="jumbotron">
    <h1>Jongleur</h1>
    <h4>OpenID Connector Provider powered by Rust</h4>
    <p>
      This is an experimental implementation of OAuth 2.0, OpenID Connect 1.0 and surrounding specifications.
    </p>
    <div class="row">
      <div class="col-4">
        <a href="/end_user/login" class="btn btn-outline-primary btn-lg btn-block">End User</a>
      </div>
      <div class="col-4">
        <a href="/client/login" class="btn btn-outline-success btn-lg btn-block">Client</a>
      </div>
      <div class="col-4">
        <a href="/resource/login" class="btn btn-outline-info btn-lg btn-block">Resource</a>
      </div>
    </div>
  </div>
</template>

<script>
</script>

<style scoped>
  .btn-outline {
    border: 1px solid;
  }
</style>
