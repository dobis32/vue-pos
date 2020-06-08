<template>
  <div id="items-container">
    <button v-bind:key="item._id" v-for="item in items" @click="addToTab(item)">{{item.name}}</button>
  </div>
</template>

<script>
export default {
  name: "ItemsWidget",
  computed: {
    items() {
      return this.$store.state.items;
    }
  },
  methods: {
    addToTab(item) {
      this.$store.dispatch("addItemToTab", item);
    }
  }
};
</script>

<style scoped>
#items-container {
  margin-left: 40px;
}
button {
  padding: 20px;
}
</style>