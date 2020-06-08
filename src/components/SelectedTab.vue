<template>
  <div id="container">
    <div class="row">
      <div id="selected-tab-heading">
        <h1>Selected Tab: {{openTab.name}}</h1>
        <h5>ID: {{openTab._id}}</h5>
      </div>
      <div id="selected-tab-options">
        <button @click="processPayment">Payment</button>
        <button @click="closeTab">Close</button>
      </div>
    </div>
    <div class="row">
      <CheckWidget v-bind:items="openTab.check"></CheckWidget>
      <ItemsWidget></ItemsWidget>
    </div>
  </div>
</template>

<script>
import CheckWidget from "./CheckWidget";
import ItemsWidget from "./ItemsWidget";
export default {
  name: "SelectedTab",
  components: { CheckWidget, ItemsWidget },
  computed: {
    openTab() {
      return this.$store.state.openTab;
    }
  },
  methods: {
    closeTab() {
      console.log("Close tab");
    },
    processPayment() {
      console.log("Process payment");
    }
  }
};
</script>

<style scoped>
#container {
  height: 100%;
  width: 100%;
  background-color: #999;
}

#selected-tab-options button {
  padding: 12px;
}

#selected-tab-heading {
  width: 30vw;
  overflow: hidden;
}

#selected-tab-options,
#selected-tab-heading {
  margin-left: 20px;
  margin-top: 20px;
}

.row {
  display: flex;
}

.row:last-child {
  margin-top: 40px;
}
</style>