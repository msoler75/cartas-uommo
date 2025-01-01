<template>
  <div ref="cardDom">
    <slot />
  </div>
</template>

<script setup>
import { useGsap } from "../assets/useGsap.js";
import { ref, watch, onMounted } from "vue";

const gsap = useGsap();

const props = defineProps({
  current: Boolean,
  width: Number,
  height: Number,
  x: Number,
  y: Number,
  r: Number,
  elevated: Boolean,
  elevateHeight: Number,
  cardNumber: Number,
});

const cardDom = ref(null);

onMounted(() => {
  gsap.to(cardDom.value, {
    duration: 0,
    width: props.width,
    height: props.height,
    x: props.x,
    y: props.y,
    rotation: props.r,
  });

  updateCardPos(true);
});

const updateCardPos = (instant) => {
  gsap.to(cardDom.value.firstElementChild, {
    duration: instant ? 0 : 0.2,
    y: props.elevated ? 0 : props.elevateHeight,
    ease: "power2.inOut",
  });
};

watch(
  () => props.elevated,
  () => {
    updateCardPos();
  }
);
</script>
