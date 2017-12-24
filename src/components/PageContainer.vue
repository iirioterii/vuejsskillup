<template>
  <div class="page-container">
    <AppHeader></AppHeader>
    <router-view></router-view>
  </div>
</template>

<script>
  import AppHeader from './AppHeader';

  export default {
    components: { AppHeader },
  };
</script>

<style scoped>
h1, h2 {
  font-weight: normal;
}
</style>
