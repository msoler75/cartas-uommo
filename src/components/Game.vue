<template>
    <div class="absolute left-0 top-0 p-5 z-50">
        user_rotate_deg: {{ user_rotate_deg }}
    </div>

    <div class="container h-screen flex flex-col justify-center items-center"
        :style="{ transform: `translateY(calc(50vh - ${constants.CARD_HEIGHT + constants.CARD_ELEVATION}px - ${constants.SPACE_BOTTOM} + ${constants.CIRCLE_RADIUS}px))` }">
        <div :style="{
            transition: 'all .4s ease-out', transform: `rotate(${user_rotate_deg}deg)`, transformOrigin: 'center',
            minWidth: `${constants.CIRCLE_RADIUS * 2 + constants.CARD_HEIGHT + constants.CARD_ELEVATION}px`,
            minHeight: `${constants.CIRCLE_RADIUS * 2 + constants.CARD_HEIGHT + constants.CARD_ELEVATION}px`,
        }" class="bg-green-400">
            <CardContainer v-for="container, index in card_positions" :key="index"
                class="absolute  bg-gray-500 bg-opacity-50 text-xs"
                :current="active_card_index == container.index" :width="container.width" :height="container.height"
                :x="container.x" :y="container.y" :r="container.rotate">
                <Card>{{ index }}</Card>
            </CardContainer>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import useConstants from '../assets/constants.js'
import Card from './Card.vue'
import CardContainer from './CardContainer.vue'
import { useGsap } from '../assets/useGsap.js'

const gsap = useGsap()

const props = defineProps({
    cards: Array,
    offset: Number,
    moving: Boolean
})

const constants = useConstants()

const user_rotate_deg = computed(() => {
    //if(props.moving) 
    // return props.offset / 5

    const perimeter = constants.CIRCLE_RADIUS * 2 * Math.PI
    const gap = perimeter / props.cards.length
    const v = Math.round(props.offset / gap) * gap
    return v / 20
})

const active_card_index = computed(() => {
    return Math.round(props.cards.length * ((-user_rotate_deg.value + 3600) % 360) / 360)
})



const card_positions = computed(() => {
    const w = constants.CARD_WIDTH
    const h = constants.CARD_HEIGHT
    const ad = constants.ARC_DEGREES
    const ar = constants.ARC_RADIANS
    const rd = constants.ROTATION_DEGREES
    const sr = constants.START_RADIANS
    const n = props.cards.length
    const r = constants.CIRCLE_RADIUS
    const e = constants.CARD_ELEVATION
    return props.cards.map((c, index) => {
        return {
            ...c,
            index,
            width: w, 
            height: h+e,
            pos: ad * index / n,
            x: Math.sin(index / n * ar + sr) * r + r + (h+e) / 2 - w / 2 ,
            y: -Math.cos(index / n * ar + sr) * r + r ,
            rotate: index * ad / n + rd
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
