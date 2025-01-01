<template>
  <div class="card-container" :style="{
    width: `${constants.CARD_WIDTH}px`,
    height: `${constants.CARD_HEIGHT}px`,
  }">
    <slot />
  </div>
</template>

<script setup>
import useConstants from "../assets/constants.js";

const constants = useConstants();

const props = defineProps({
  cardNumber: Number, // para referencia
});

</script>
