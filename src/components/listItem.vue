<template>
  <a
    v-on:click="setActive"
    v-bind:class="{ active: isActive }"
    v-bind:href="linksAttr.url"
    v-bind:title="linksAttr.title"
    target="_blank">{{ linksAttr.title }}
  </a>
</template>

<script>
  export default {
    name: 'listItem',
    props: {
      linksAttr: {
        type: Object,
        required: true,
      },
    },
    data() {
      return {
        isActive: false,
      };
    },
    methods: {
      setActive() {
        this.isActive = true;
      },
    },
  };
</script>

<style scoped>
  a {
    color: #42b983;
  }
  .active {
    color: #1085b9;
  }
</style>
