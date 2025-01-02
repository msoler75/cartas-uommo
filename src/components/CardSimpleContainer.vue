<template>
  <div
    class="card-container bg-pink-800"
    :style="{
      width: (width ? width : constants.CARD_WIDTH) + 'px',
      height: (height ? height : constants.CARD_HEIGHT) + 'px',
    }"
  >
    <slot />
  </div>
</template>

<script setup>
import useConstants from "../lib/constants.js";

const constants = useConstants();

const props = defineProps({
  width: { type: Number, default: 0 },
  height: { type: Number, default: 0 },
});
</script>
