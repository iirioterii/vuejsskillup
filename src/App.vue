<template>
  <div id="app">
    <notifications position="top center" />
    <header class="header">
      <router-link to="/" class="logo">
        <img src="./assets/logo.png" class="logo-img" />
      </router-link>
      <nav class="nav">
        <div class="nav-list">
          <router-link to="/" class="nav-link">Home</router-link>
          <router-link to="/articles" class="nav-link">Articles</router-link>
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
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  a {
    text-decoration: none;
    color: inherit;
  }
  .header {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #fff;
    box-shadow: 0 0 17.3px 0.7px rgba(0, 0, 0, 0.16);
    color: #414141;
  }
  .logo {
    padding: 10px;
  }
  .logo-img {
    display: block;
    height: 40px;
  }
  .nav {
    display: block;
    height: 100%;
  }
  .nav-list {
    display: flex;
  }
  .nav-link {
    padding: 10px;
    height: 100%;
    line-height: 40px;
    display: block;
    transition: .3s ease;
  }
  .nav-link:hover {
    background-color: #e2e2e2;
  }
  .router-link-exact-active {
    color: #41b883;
    cursor: default;
  }
  .router-link-exact-active:hover {
    background-color: transparent;
  }
</style>
