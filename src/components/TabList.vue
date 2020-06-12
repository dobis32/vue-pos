<template>
  <div id="container">
    <div id="heading">
      <h2>Open Tabs</h2>
    </div>
    <div id="add-tab">
      <AddTab></AddTab>
    </div>
    <div id="list">
      <TabListing v-bind:key="tab._id" v-for="tab in tabs" v-bind:tab="tab"></TabListing>
    </div>
  </div>
</template>

<script>
import AddTab from "./AddTab";
import TabListing from "./TabListing";
export default {
  name: "TabList",
  components: { AddTab, TabListing },
  computed: {
    tabs() {
      return this.$store.state.tabs;
    }
  }
};
</script>

<style scoped>
#container {
  height: 100%;
  width: 280px;
}

#heading,
#add-tab {
  height: 5%;
}

#list {
  overflow: scroll;
  height: 90%;
  background-color: #fff;
}

h1 {
  margin-bottom: 6px;
}
</style>
