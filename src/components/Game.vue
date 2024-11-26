<template>
    <div class="container h-screen flex justify-center items-center"
        :style="{ transform: `translateY(calc(50vh - ${constants.CARD_HEIGHT}px - ${constants.SPACE_BOTTOM} + ${constants.CIRCLE_RADIUS}px))` }">
        <Card v-for="card, index in cards_with_offset" :key="index" class="absolute p-4 border border-black" :style="{
            '--w': constants.CARD_WIDTH + 'px',
            '--h': constants.CARD_HEIGHT + 'px',
            '--x': card.x + 'px',
            '--y': card.y + 'px',
            '--r': card.rotate + 'deg',
            zIndex: index,
        }" @click="animate">{{ index }}</Card>
    </div>
</template>

<script setup>
import gsap from 'gsap';
import { ref, computed } from 'vue'
import useConstants from '../assets/constants.js'
import Card from './Card.vue'

const constants = useConstants()

const cards = ref([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52])

const cards_with_offset = computed(() => {
    return cards.value.map((n, index) => {
        return {
            ...n,
            x: Math.cos(index / cards.value.length * constants.ARC_RADIANS + constants.START_RADIANS) * constants.CIRCLE_RADIUS,
            y: Math.sin(index / cards.value.length * constants.ARC_RADIANS + constants.START_RADIANS) * constants.CIRCLE_RADIUS,
            rotate: index * 180 / cards.value.length + constants.ROTATION_DEGREES
        }
    })
})

const animate = (event) => {
    gsap.timeline()
        .to(event.target, {
            y: '-=300', // Subtracts 300px on the Y-axis
            duration: 0.6,
            ease: "power2.out" // Natural easing for the movement
        })
        .to(event.target, {
            rotationY: 180,
            duration: 0.9,
            ease: "power2.inOut" // Smooth easing for the rotation
        })
        .to(event.target, {
            zIndex: 0,
            duration: 0.3
        });
};

</script>