<template>
  <div
    ref="elem"
    class="card bg-red-500 outline outline-black"
    :style="{
      width: constants.CARD_WIDTH + 'px',
      height: constants.CARD_HEIGHT + 'px',
    }"
  >
    {{ number }}
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import useConstants from "../assets/constants.js";
import { useGsap } from "../assets/useGsap.js";

const gsap = useGsap();

const props = defineProps({
  number: Number,
  startFlipped: { type: Boolean, default: true },
});

const constants = useConstants();

const flipped = ref(props.startFlipped);

const flip = (callback) => {
  console.log("card.flip", props.number);
  flipped.value = !flipped.value;
  updateState(false, callback);
};

const elem = ref(null);

const updateState = (instant, callback) => {
  gsap.to(elem.value, {
    rotationY: flipped.value ? 180 : 0,
    duration: instant ? 0 : 0.9,
    ease: "power2.inOut", // Smooth easing for the rotation
    onComplete: () => {
      // Emit the event after the flip animation is done
      if (!instant && callback && callback instanceof Function) callback();
    },
  });
};

onMounted(() => {
  updateState(true);
});

defineExpose({ flip });
</script>
