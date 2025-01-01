<template>
    <div ref="cardDom">
        <slot />
    </div>
</template>

<script setup>
import { useGsap } from '../assets/useGsap.js'
import { ref, onMounted } from 'vue'

const gsap = useGsap()

const props = defineProps({
    current: Boolean,
    width: Number,
    height: Number,
    x: Number,
    y: Number,
    r: Number
})

const cardDom = ref(null)

onMounted(() => {
    gsap.to(cardDom.value, {
        duration: 0,
        width: props.width,
        height: props.height,
        x: props.x,
        y: props.y,
        rotation: props.r
    })
})

</script>