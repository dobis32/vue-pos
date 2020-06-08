<template>
  <TabManager></TabManager>
</template>

<script>
import TabManager from "./components/TabManager";

export default {
  name: "App",
  components: { TabManager },
  created() {
    this.$store.dispatch("initItems");
    this.$store.dispatch("initTabs");
  }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}

button {
  padding: 4px;
  color: black;
}
</style>
