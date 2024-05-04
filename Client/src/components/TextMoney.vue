<template>
  <span class="price">
    <span :class="[`text-${color}`, custom]">{{ amountDisplay }}</span>
  </span>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    amount: {
      type: Number,
      required: false,
      default: 0,
    },
    currency: {
      type: String,
      default: "VND",
    },
    color: {
      type: String,
      required: false,
    },
    custom: {
      type: String,
      required: false,
    },
    to_vnd: {
      type: Boolean,
      default: true,
      required: false,
    },
  },
  computed: {
    amountDisplay() {
      return  new Intl.NumberFormat("ja-JP", {
        style: "currency",
        currency: this.currency,
      }).format(this.amount);
    },
  },
});
</script>
