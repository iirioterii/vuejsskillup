<template>
  <header class="header">
    <router-link to="/articles" class="logo">
      <img src="./../assets/logo.png" class="logo-img" />
    </router-link>
    <nav class="nav">
      <div class="nav-list">
        <router-link to="/articles" class="nav-link">Articles</router-link>
        <router-link to="/profile" class="nav-link">Profile</router-link>
        <span v-on:click="onLogoutClicked" class="nav-link"><i class="fa fa-sign-out nav-icon"></i></span>
      </div>
    </nav>
  </header>
</template>

<script>
  import { logout } from '../services/auth';

  export default {
    methods: {
      onLogoutClicked() { return logout(); },
    },
  };
</script>

<style scoped>

</style>