<template>
  <div>
    <form @submit.prevent="addTab">
      <input type="text" v-model="tabName" v-bind:class="{'invalid-tab-name':invalidTabName}" />
      <button type="submit">Add</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "AddTab",
  data() {
    return {
      tabName: "",
      invalidTabName: false
    };
  },
  methods: {
    async addTab(event) {
      this.invalidTabName = true;
      if (!this.tabName) {
        alert("Please enter a valid tab name");
        this.invalidTabName = true;
      } else {
        const result = await this.$store.dispatch("addTab", this.tabName);
        if (result) event.target.reset();
        else alert("Failed to add tab!");
      }
    }
  },
  computed: {
    tabs() {
      return this.$store.state.tabs;
    }
  }
};
</script>

<style scoped>
div {
  height: 100%;
  display: flex;
  justify-content: center;
}
button {
  margin-left: 5px;
}
</style>