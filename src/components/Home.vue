<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <button v-on:click="reverseMessage">Msg reverse</button>
    <input v-model="msg">
    <h2>Essential Links</h2>
    <list :linksList="essentialLinksList"></list>
    <h2>Ecosystem</h2>
    <list :linksList="ecosystemLinksList"></list>
  </div>
</template>

<script>
  import list from './list';

  export default {
    data() {
      return {
        msg: 'Home',
        essentialLinksList: [
          { id: 0, url: 'https://vuejs.org', title: 'Core Docs' },
          { id: 1, url: 'https://forum.vuejs.org', title: 'Forum' },
          { id: 2, url: 'https://chat.vuejs.org', title: 'Community Chat' },
          { id: 3, url: 'https://twitter.com/vuejs', title: 'Twitter' },
          { id: 4, url: 'https://vuejs-templates.github.io/webpack/', title: 'Docs for This Template' },
        ],
        ecosystemLinksList: [
          { id: 0, url: 'http://router.vuejs.org/', title: 'vue-router' },
          { id: 1, url: 'http://vuex.vuejs.org/', title: 'vue' },
          { id: 2, url: 'http://vue-loader.vuejs.org/', title: 'vue-loader' },
          { id: 3, url: 'https://github.com/vuejs/awesome-vue', title: 'awesome-vue' },
        ],
      };
    },
    methods: {
      reverseMessage() {
        this.msg = this.msg.split('').reverse().join('');
      },
    },
    components: { list },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
</style>
