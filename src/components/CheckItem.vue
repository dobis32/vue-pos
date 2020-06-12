<template>
  <div v-bind:class="{ 'unsent' : data.unsent}">
    <div @click="selectChange" v-bind:class="{'is-selected' : data.selected }">
      <div id="item-div" v-bind:class="{ 'is-active' : data.active }">
        <h3>{{data.name}}</h3>
        <h3 class="price">{{data.price}}</h3>
      </div>
      <div id="addons-div">
        <h5
          v-bind:key="`${addon._id}-${index}`"
          v-for="(addon, index) in data.addons"
        >{{addon.name}} -- {{addon.price.toFixed(2)}}</h5>
      </div>
    </div>
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
#item-div {
  cursor: pointer;
  display: flex;
  justify-content: space-between;
}

.unsent {
  /* background: #fff; */
  color: #80f;
}

.is-selected {
  background: #00f;
  color: #fff;
}
.is-active {
  background-color: #ff0;
}
.price {
  margin-right: 10px;
}
</style>