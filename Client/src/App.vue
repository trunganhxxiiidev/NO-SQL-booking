<script setup lang="ts">
import { RouterView } from "vue-router";
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
</script>

<template>
  <Header />
  <div class="main">
    <RouterView></RouterView>
  </div>
  <Footer />
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  components: {
    Header,
    Footer,
  },
});
</script>

<style>
/* @import url("../public/css/index.css"); */
</style>
