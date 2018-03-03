<template>
    <div class="jumbotron">
        <h1>Jongleur</h1>
        <h4>OpenID Connector Provider powered by Rust</h4>
        <p>
            This is an experimental implementation of OAuth 2.0, OpenID Connect 1.0 and surrounding specifications.
        </p>
        <div class="btn-group btn-group-justified" role="group">
            <a href="/end_user/login" class="btn btn-outline-primary btn-lg">End User</a>
            <a href="/client/login" class="btn btn-outline-success btn-lg">Client</a>
            <a href="/resource/login" class="btn btn-outline-info btn-lg">Resource</a>
        </div>
    </div>
</template>

<script>
</script>

<style scoped>
    .btn-outline {
        border: 1px solid;
    }
    .btn-lg {
        margin: 0 10px;
    }
</style>
