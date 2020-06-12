<template>
  <div id="addons-container">
    <button
      v-bind:key="addon._id"
      v-for="addon in addonsForActiveItem"
      @click="addToItem(addon)"
    >{{addon.name}}</button>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "AddonsWidget",
  computed: {
    ...mapGetters(["addonsForActiveItem"])
  },

  methods: {
    addToItem(addon) {
      this.$store.dispatch("addToItem", addon);
    }
  }
};
</script>

<style scoped>
#addons-container {
  margin-left: 40px;
  background: aqua;
}

button {
  padding: 20px;
}
</style>