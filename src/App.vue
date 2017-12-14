<template>
  <div id="app">
    <notifications position="top center" />
    <header class="header">
      <router-link to="/" class="logo">
        <img src="./assets/logo.png" class="logo-img" />
      </router-link>
      <nav class="nav">
        <div class="nav-list">
          <router-link to="/" class="nav-link"><i class="fa fa-home nav-icon"></i></router-link>
          <router-link to="/articles" class="nav-link">Articles</router-link>
          <router-link to="/login" class="nav-link"><i class="fa fa-sign-out nav-icon"></i></router-link>
        </div>
      </nav>
    </header>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app',
};
</script>

<style lang="scss" type="text/scss">
  @import "src/assets/styles/main.scss";

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
</style>
