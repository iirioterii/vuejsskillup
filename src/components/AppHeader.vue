<template>
  <header class="header">
    <router-link to="/" class="logo">
      <img src="./../assets/logo.png" class="logo-img" />
    </router-link>
    <nav class="nav">
      <div class="nav-list">
        <router-link to="/" class="nav-link"><i class="fa fa-home nav-icon"></i></router-link>
        <router-link to="/articles" class="nav-link">Articles</router-link>
        <span v-on:click="onLogoutClicked" class="nav-link"><i class="fa fa-sign-out nav-icon"></i></span>
      </div>
    </nav>
  </header>
</template>

<script>
  import { logout } from '@/services/auth';

  export default {
    methods: {
      onLogoutClicked() {
        logout();
      },
    },
  };
</script>

<style scoped>

</style>