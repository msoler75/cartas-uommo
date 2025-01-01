<template>
  <div
    ref="elem"
    class="card pointer-events-auto"
    :style="{
      width: embedded ? '100%' : constants.CARD_WIDTH + 'px',
      height: embedded ? '100%' : constants.CARD_HEIGHT + 'px',
    }"
  >
    <div class="bg-red-500 h-full outline outline-black card-inner pointer-events-none perspective-1000" 
    :style="{
        transform: flipped ? 'rotateY(180deg)': 'rotateY(0deg)', 
        transition: 'transform 0.5s',
    }">
      <div class="card-front">{{ number }}</div>
      <div class="card-back">Reverso</div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import useConstants from "../assets/constants.js";

const props = defineProps({
  number: Number,
  startFlipped: { type: Boolean, default: true },
  startEmbedded: { type: Boolean, default: false },
});

const constants = useConstants();

const flipped = ref(props.startFlipped);
const embedded = ref(props.startEmbedded);

const flip = (callback) => {
  console.log("card.flip", props.number);
  flipped.value = !flipped.value;
  updateState(false, callback);
};

const embed = () => {
  embedded.value = true;
};

const elem = ref(null);

defineExpose({ flip, embed });
</script>
