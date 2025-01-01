<template>
  <div class="h-screen w-screen bg-gray-800 grid items-center justify-center overfloxw-hidden">
    {{clicked}} {{ offset }} {{ temporal_offset }}
    <Game
    :cards="cards"
    :offset="offset + temporal_offset"
    :moving="clicked"
    />
  </div>
</template>


<script setup>
import { ref, onMounted } from 'vue'
import Game from './components/Game.vue';

const cards = ref([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52])
const offset = ref(0)
const clicked = ref(false)
const x_start = ref(0)
const temporal_offset = ref(0)

onMounted(() => {
  document.addEventListener('mousedown', (event) => {
    clicked.value = true
    x_start.value = event.clientX
  })
  document.addEventListener('mouseup', (event) => {
    clicked.value = false
    offset.value += temporal_offset.value
    temporal_offset.value = 0
  })
  document.addEventListener('mousemove', (event) => {
    if(clicked.value) {
      const dx = event.clientX - x_start.value
      temporal_offset.value = dx
    }
  })
})

</script>
