<template>
  <div class="main">
    <h1>{{ msg }}</h1>
    <list :linksList="essentialLinksList"></list>
  </div>
</template>

<script>
  import list from './list';

  export default {
    data() {
      return {
        msg: 'List of articles',
        essentialLinksList: [
          { id: 0, url: 'https://vuejs.org', title: 'Core Docs' },
          { id: 1, url: 'https://forum.vuejs.org', title: 'Forum' },
          { id: 2, url: 'https://chat.vuejs.org', title: 'Community Chat' },
          { id: 3, url: 'https://twitter.com/vuejs', title: 'Twitter' },
          { id: 4, url: 'https://vuejs-templates.github.io/webpack/', title: 'Docs for This Template' },
        ],
      };
    },
    components: { list },
  };
</script>

<style scoped>
</style>
