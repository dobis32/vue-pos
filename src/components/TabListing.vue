<template>
  <div>
    <button @click="openTab">{{tab.name}}</button>
  </div>
</template>

<script>
export default {
  name: "TabListing",
  props: ["tab"],
  methods: {
    openTab() {
      this.$store.dispatch("openTab", this.tab);
    }
  }
};
</script>

<style scoped>
div {
  margin-top: 5px;
}

button {
  width: 100%;
  overflow: hidden;
}
</style>