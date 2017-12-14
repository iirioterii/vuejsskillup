<template>
  <ul>
    <li
      v-for="item in linksList"
      v-bind:item="item"
      v-bind:key="item.id"
    >
      <listItem :linksAttr="item"></listItem>
    </li>
  </ul>
</template>

<script>
  import listItem from './listItem';

  export default {
    name: 'list',
    props: {
      linksList: {
        type: Array,
        required: true,
      },
    },
    components: { listItem },
  };
</script>

<style scoped>
  ul {
    list-style-type: none;
    padding: 0;
    display: flex;
    justify-content: center;
  }
  li {
    padding: 0 10px;
  }
</style>

