<template>
  <div id="manager-container">
    <TabList></TabList>
    <SelectedTab></SelectedTab>
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
  }
};
</script>

<style scoped>
#manager-container {
  display: flex;
  height: 100vh;
}
hr {
  margin: 4px 0px;
}
</style>