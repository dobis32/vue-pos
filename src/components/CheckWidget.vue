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
    <div id="check-total">
      <h2>Total: {{tabTotal.toFixed(2)}}</h2>
    </div>
    <div id="check-options">
      <button v-bind:disabled="!hasUnsent" @click="sendItems">Send</button>
      <button
        v-bind:disabled="lastSelection == undefined || !lastSelection.unsent"
        @click="editItem"
      >Edit</button>
      <button v-bind:disabled="!hasSelection" @click="deleteSelected">Delete</button>
    </div>
  </div>
</template>

<script>
import CheckItem from "./CheckItem";
import { mapGetters } from "vuex";
export default {
  name: "CheckWidget",
  components: { CheckItem },
  props: ["items"],
  computed: {
    ...mapGetters([
      "activeItem",
      "lastSelection",
      "hasUnsent",
      "hasSelection",
      "tabTotal"
    ])
  },
  methods: {
    selectionChange(args) {
      this.$store.commit("itemSelectionChange", args);
    },
    deleteSelected() {
      this.$store.dispatch("deleteSelectedItems");
    },
    sendItems() {
      this.$store.dispatch("sendItems");
    },

    editItem() {
      this.$store.dispatch("editItem");
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
  height: 500px;
  background-color: #fff;
  overflow: scroll;
}
#check-total {
  width: 400px;
  padding: 12px 0px;
  background-color: #fff;
}
#check-options button {
  padding: 12px;
}
</style>