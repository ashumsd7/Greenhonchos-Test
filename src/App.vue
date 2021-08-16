<template>
  <div id="app">
    <div id="nav">
      <Header />
    </div>

    <router-view />
  </div>
</template>

<script>
import Header from "./components/Header.vue";
export default {
  components: {
    Header,
  },
  created() {
    this.$store.dispatch("loadDataAction", "");
  },
};
</script>

<style >
#nav {
  position: relative;
}

.badge-warning {
  font-size: 1.8rem !important;
}
</style>
