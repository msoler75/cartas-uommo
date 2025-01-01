<template>
  <div class="select-none">
    <div class="absolute left-0 top-0 p-5 z-50">
      user_rotate_deg: {{ user_rotate_deg }}
    </div>

    <div
      class="w-full bg-yellow-100 grid"
      :style="{ height: constants.CARD_HEIGHT + 'px' }"
    >
      <CardSimpleContainer
        v-for="(card, index) of selected_cards"
        :key="index"
        class="bg-red-200"
        :number="card"
      >
      </CardSimpleContainer>
    </div>

    <div
      class="container h-screen flex flex-col justify-center items-center"
      :style="{
        transform: `translateY(calc(50vh - ${
          constants.CARD_HEIGHT + constants.CARD_ELEVATION
        }px - ${constants.SPACE_BOTTOM} + ${constants.CIRCLE_RADIUS}px))`,
      }"
    >
      <div
        :style="{
          transition: 'all .4s ease-out',
          transform: `rotate(${user_rotate_deg}deg)`,
          transformOrigin: 'center',
          minWidth: `${
            constants.CIRCLE_RADIUS * 2 +
            constants.CARD_HEIGHT +
            constants.CARD_ELEVATION
          }px`,
          minHeight: `${
            constants.CIRCLE_RADIUS * 2 +
            constants.CARD_HEIGHT +
            constants.CARD_ELEVATION
          }px`,
        }"
      >
        <CardSelectionContainer
          v-for="(container, index) in card_positions"
          :key="index"
          class="absolute"
          :elevated="active_card_number == container.number"
          :width="container.width"
          :height="container.height"
          :elevateHeight="constants.CARD_ELEVATION"
          :x="container.x"
          :y="container.y"
          :r="container.rotate"
          :card-number="container.number"
        >
          <Card
            @click="animate($event, container.number)"
            :ref="
              (el) => {
                const idx = container ? container.number : 0;
                if (el) cardRefs[idx] = el;
              }
            "
            :number="container.number"
          />
        </CardSelectionContainer>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from "vue";
import useConstants from "../assets/constants.js";
import Card from "./Card.vue";
import CardSimpleContainer from "./CardSimpleContainer.vue";
import CardSelectionContainer from "./CardSelectionContainer.vue";
import { useGsap } from "../assets/useGsap.js";
import { Flip } from "gsap/Flip";

const gsap = useGsap();

const props = defineProps({
  cards: Array,
})

const cardRefs = ref({})

const constants = useConstants()

const user_rotate_deg = computed(() => {
  //if(props.moving)
  // return props.offset / 5

  const perimeter = constants.CIRCLE_RADIUS * 2 * Math.PI;
  const arcLength = (constants.ARC_DEGREES / 360) * perimeter;
  const gap = arcLength / props.cards.length;
  const v = Math.round(dragged.value / gap) * gap;
  return (v / arcLength) * constants.ARC_DEGREES;
});

const dragged = ref(0)

const selected_cards = ref([])

const card_positions = computed(() => {
  const w = constants.CARD_WIDTH;
  const h = constants.CARD_HEIGHT;
  const ad = constants.ARC_DEGREES;
  const ar = constants.ARC_RADIANS;
  const rd = constants.ROTATION_DEGREES;
  const sr = constants.START_RADIANS;
  const n = props.cards.length;
  const r = constants.CIRCLE_RADIUS;
  const e = constants.CARD_ELEVATION;
  return props.cards.map((c, number) => {
    return {
      ...c,
      number,
      width: w,
      height: h + e,
      pos: (ad * number) / n,
      x: Math.sin((number / n) * ar + sr) * r + r + (h + e) / 2 - w / 2,
      y: -Math.cos((number / n) * ar + sr) * r + r,
      rotate: (number * ad) / n + rd,
    }
  })
})

const active_card_number = computed(() => {
  return Math.round(
    (props.cards.length * ((-user_rotate_deg.value + 36000) % 360)) /
      constants.ARC_DEGREES
  )
})

/*
a = N * r / 360
a * 360 / N=  r
*/
function rotate_to_card(target) {
  // Asegúrate de que el target esté dentro del rango
  if (target < 0 || target >= props.cards.length) {
    console.error("El valor objetivo debe estar dentro del rango de tarjetas.");
    return;
  }

  // Obtiene el active_card_number actual
  const currentActiveCard = active_card_number.value;

  // Calcula la diferencia entre el target y el active_card_number actual
  let difference = target - currentActiveCard;

  // Asegúrate de que la diferencia esté en el rango adecuado (-n a n)
  if (difference > props.cards.length / 2) {
    difference -= props.cards.length;
  } else if (difference < -props.cards.length / 2) {
    difference += props.cards.length;
  }

  
  const perimeter = constants.CIRCLE_RADIUS * 2 * Math.PI;
  const arcLength = (constants.ARC_DEGREES / 360) * perimeter;
  const gap = arcLength / props.cards.length;
  
  const newDraggedValue = dragged.value -  gap * difference


  // Actualiza dragged.value
  dragged.value = newDraggedValue;
}


let animating = false;

const animate = (event, number) => {
  if (animating) return;
  console.log("animate", number, "current", active_card_number.value);

  if (number != active_card_number.value) {
    animating = true;
    rotate_to_card(number);
    setTimeout(() => {
      animating = false;
      // Llamar a animate nuevamente para verificar si se alcanzó el número activo
      animate(event, number);
      return;
    }, 500);
    return;
  }

  animating = true;

  const card = event.target;
  selected_cards.value.push(number);
  // const state = Flip.getState(event.target);

  gsap
    .timeline()
    .to(card, {
      y: "-=300", // Subtracts 300px on the Y-axis
      duration: 0.6,
      ease: "power2.out", // Natural easing for the movement
    })
    /*
    .to(card, {
      rotationY: 180,
      duration: 0.9,
      ease: "power2.inOut", // Smooth easing for the rotation
    })
      */
    .to(card, {
      zIndex: 0,
      duration: 0.1,
    })
    .call(() => {
      // Tu función de callback aquí
      console.log("Animación de movimiento completada");
      cardRefs.value[number].flip(() => {
        console.log("flip callback");
        // Este código se ejecutará cuando la animación termine
        const state = Flip.getState(card);
        // Aquí puedes agregar cualquier lógica adicional que necesites
        console.log("Animación completada, nuevo estado capturado");
        const container = document.querySelector(
          '.card-container[number="' + number + '"]'
        );
        container.appendChild(card);
        // animate from the previous state to the current one:
        Flip.from(state, {
          duration: 0.5,
          ease: "power1.inOut",
          // absolute: true,
          onComplete: () => {
            animating = false;
            console.log("Animación de movimiento completada");
          },
        })
      })
      // Puedes realizar cualquier acción adicional aquí
    })
}

const offset_start = ref(0)
const temporal_offset = ref(0)
const clicked = ref(false)
const x_start = ref(0)


onMounted(()=>{
    document.addEventListener('mousedown', (event) => {
    clicked.value = true
    x_start.value = event.clientX
    offset_start.value = dragged.value
  })
  document.addEventListener('mouseup', (event) => {
    clicked.value = false
    dragged.value = offset_start.value + temporal_offset.value
    temporal_offset.value = 0
  })
  document.addEventListener('mousemove', (event) => {
    if(clicked.value) {
      const dx = event.clientX - x_start.value
      temporal_offset.value = dx
      dragged.value = offset_start.value + temporal_offset.value
    }
  })
})
</script>
