<template>
  <div class="page-container">
    <AppHeader></AppHeader>
    <div class="page-content">
      <router-view></router-view>
    </div>
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

  .page-content {
    margin: 20px;
  }

</style>
