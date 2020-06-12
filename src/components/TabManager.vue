<template>
  <div id="manager-container">
    <TabList></TabList>
    <SelectedTab v-if="openTab._id"></SelectedTab>
  </div>
</template>

<script>
import TabList from "./TabList";
import SelectedTab from "./SelectedTab";
export default {
  name: "TabManager",
  components: {
    TabList,
    SelectedTab
  },
  computed: {
    openTab() {
      return this.$store.state.openTab;
    }
  }
};
</script>

<style scoped>
#manager-container {
  display: flex;
  height: 100vh;
  background-color: #999;
}
hr {
  margin: 4px 0px;
}
</style>