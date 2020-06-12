<template>
  <div id="active-item-container">
    <div id="item-list">
      <div v-bind:class="{ 'unsent' : activeItem.unsent}">
        <div @click="selectChange" v-bind:class="{'is-selected' : activeItem.selected }">
          <div id="item-div" v-bind:class="{ 'is-active' : activeItem.active }">
            <h3>{{activeItem.name}}</h3>
            <h3 class="price">{{activeItem.price}}</h3>
          </div>
          <div id="addons-div">
            <div
              class="addon-div"
              v-bind:key="`${addon._id}-${index}`"
              v-for="(addon, index) in activeItem.addons"
              @click="selectChange($event, addon)"
              v-bind:class="{'is-selected' : addon.selected}"
            >
              <h5 class="addon">{{addon.name}} -- {{addon.price.toFixed(2)}}</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="active-item-options">
      <button @click="unsetActiveItem">Ok</button>
      <button @click="deleteSelectedAddons">Delete</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "ActiveItemWidget",
  components: {},
  computed: {
    activeItem() {
      const activeItem = this.$store.getters.activeItem;
      console.log(JSON.parse(JSON.stringify(activeItem)));
      return activeItem;
    }
  },
  methods: {
    deleteSelectedAddons() {
      this.$store.dispatch("deleteSelectedAddons");
    },
    unsetActiveItem() {
      this.$store.dispatch("unsetActiveItem");
    },
    selectChange(event, addon) {
      if (addon) this.$store.commit("addonSelectionChange", addon);
    }
  }
};
</script>

<style scoped>
#active-item-container {
  margin-left: 40px;
}
#item-list {
  width: 400px;
  height: 600px;
  background-color: #fff;
  overflow: scroll;
}
.is-selected {
  background: #00f;
  color: #fff;
}
.is-active {
  background-color: #ff0;
}
#active-item-options button {
  padding: 12px;
}
#item-div {
  display: flex;
  justify-content: space-between;
}

.addon-div {
  cursor: pointer;
}
</style>