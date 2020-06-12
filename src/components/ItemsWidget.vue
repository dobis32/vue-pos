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
    async addToTab(item) {
      console.log("SELECTED ITEM", item);
      const activeItem = await this.$store.dispatch("addItemToTab", {
        ...item,
        active: true
      });
      await this.$store.dispatch("setActiveItem", activeItem);
    }
  }
};
</script>

<style scoped>
#items-container {
  margin-left: 40px;
  background: orangered;
}
button {
  padding: 20px;
}
</style>