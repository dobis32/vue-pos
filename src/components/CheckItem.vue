<template>
  <div v-bind:class="{ 'unsent' : data.unsent}">
    <h3 @click="selectChange()" v-bind:class="{ 'is-selected' : data.selected}">{{data.name}}</h3>
  </div>
</template>

<script>
export default {
  name: "CheckItem",
  props: ["data", "index"],
  methods: {
    selectChange() {
      this.data.selected = !this.data.selected;
      this.$emit("selection-change", {
        index: this.index,
        status: this.data.selected
      });
    }
  }
};
</script>

<style scoped>
div {
  cursor: pointer;
}

.unsent {
  background: #fff;
  color: #80f;
}

.is-selected {
  background: #00f;
  color: #fff;
}
</style>