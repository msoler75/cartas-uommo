<template>
    <div
      ref="elem"
      class="card-container pointer-events-auto"
      :style="{
        width: embedded ? '100%' : constants.CARD_WIDTH + 'px',
        height: embedded ? '100%' : constants.CARD_HEIGHT + 'px',
      }"
    >
      <div class="card shadow outline outline-gray-600 pointer-events-none" :class="{ 'is-flipped': flipped }">
        <div class="card-face card-front">
        </div>
        <div class="card-face card-back">
        </div>
      </div>
    </div>
  </template>
  

<script setup>
import { ref, onMounted } from "vue";
import useConstants from "../lib/constants.js";

const props = defineProps({
  number: Number,
  startFlipped: { type: Boolean, default: true },
  startEmbedded: { type: Boolean, default: false },
});

const constants = useConstants();

const flipped = ref(props.startFlipped);
const embedded = ref(props.startEmbedded);

const flip = (callback) => {
  flipped.value = !flipped.value;
};

const embed = () => {
  embedded.value = true;
};

const elem = ref(null);

defineExpose({ flip, embed });
</script>


<style scoped>
.card-container {
  perspective: 1000px;
}

.card {
  width: 100%;
  height: 100%;
  transition: transform 0.6s;
  transform-style: preserve-3d;
  cursor: pointer;
  position: relative;
}

.card.is-flipped {
  transform: rotateY(180deg);
}

.card-face {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.card-front {
  background: url(/images/front.jpg) center center no-repeat;
  background-size: cover;
  z-index: 2;
}

.card-back {
  background: url(/images/back.jpg) center center no-repeat;
  background-size: cover;
  transform: rotateY(180deg);
}

img {
  max-width: 100%;
  max-height: 100%;
  object-fit: cover;
}
</style>
