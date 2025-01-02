<template>
  <div ref="cardDom" class="pointer-events-none"
  :style="{
    width: `${props.width}px`,
    height: `${props.height}px`,
    transform: `translate(${props.x}px, ${props.y}px) rotate(${props.r}deg)`,
  }"
  >
    <slot />
  </div>
</template>

<script setup>
import { useGsap } from "../lib/useGsap.js";
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
