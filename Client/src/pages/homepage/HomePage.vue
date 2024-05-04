<template>
  <SeachSchedule />
  <ListTour />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SeachSchedule from "./component/SeachSchedule.vue";
import ListTour from "./component/ListTour.vue";
export default defineComponent({
  components: {
    SeachSchedule,
    ListTour,
    //
  },
  computed: {},
  mounted() {
    //
  },

  watch: {},
});
</script>

<style></style>
