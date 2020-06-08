<template>
  <div id="check-container">
    <div id="check-list">
      <CheckItem
        v-bind:key="index"
        v-for="(item, index) in items"
        v-bind:data="item"
        v-bind:index="index"
        v-on:selection-change="selectionChange"
      ></CheckItem>
    </div>
    <div id="check-options">
      <button @click="sendItems">Send</button>
      <button @click="deleteSelected">Delete</button>
    </div>
  </div>
</template>

<script>
import CheckItem from "./CheckItem";
export default {
  name: "CheckWidget",
  components: { CheckItem },
  props: ["items"],
  methods: {
    selectionChange(args) {
      this.$store.commit("selectionChange", args);
    },
    deleteSelected() {
      this.$store.dispatch("deleteSelected");
    },
    sendItems() {
      this.$store.dispatch("sendItems");
    }
  }
};
</script>

<style scoped>
#check-container {
  margin-left: 40px;
}
#check-list {
  width: 400px;
  height: 600px;
  background-color: #fff;
  overflow: scroll;
}
#check-options button {
  padding: 12px;
}
</style>