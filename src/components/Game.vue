<template>
  <div class="select-none">
    <div class="absolute left-0 top-0 p-5 z-50">
      user_rotate_deg: {{ user_rotate_deg }}
    </div>

    <div
      class="absolute bg-yellow-800 flex flex-wrap pointer-events-none"
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

    <div class="inset-0 flex justify-center items-center bg-pink-200 z-50 pointer-events-none"
        :style="{
            height: '60vh'
        }">
      <div
        id="show-card-container"
        class="bg-green-200 z-30"
        :style="{
          width: constants.CARD_WIDTH + 'px',
          height: constants.CARD_HEIGHT + 'px',
        }"
      ></div>
    </div>

    <TransitionFade>
      <div
        class="absolute inset-0 bg-black/30 backdrop-blur-md flex justify-center items-center z-40"
        v-if="showModal"
        @click="closeShow"
      >
        <div
          class="flex flex-wrap justify-center gap-4 p-12 max-h-screen overflow-y-auto bg-teal-300"
        >
          <CardSimpleContainer
            id="show-card-detail-container"
            :width="constants.SHOW_CARD_WIDTH"
            :height="constants.SHOW_CARD_HEIGHT"
            class="bg-pink-400"
          ></CardSimpleContainer>

          <div
            :style="{ maxWidth: constants.SHOW_CARD_DESCRIPTION_WIDTH + 'px' }"
            class="bg-gray-100 p-5 rounded-lg"
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
            quod. Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Quisquam, quod. Lorem ipsum dolor sit amet consectetur adipisicing
            elit. Quisquam, quod. Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Quisquam, quod. Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Quisquam, quod. Lorem ipsum dolor sit
            amet consectetur adipisicing elit. Quisquam, quod. Lorem ipsum dolor
            sit amet consectetur adipisicing elit. Quisquam, quod. Lorem ipsum
            dolor sit amet consectetur adipisicing elit. Quisquam, quod. Lorem
            ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
            quod. Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Quisquam, quod. Lorem ipsum dolor sit amet consectetur adipisicing
            elit. Quisquam, quod. Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Quisquam, quod. Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Quisquam, quod. Lorem ipsum dolor sit
            amet consectetur adipisicing elit. Quisquam, quod. Lorem ipsum dolor
            sit amet consectetur adipisicing elit. Quisquam, quod.
          </div>
        </div>
      </div>
    </TransitionFade>

 

    <div
      class="h-screen flex flex-col  bg-blue-300">
      <div
       class="bg-red-300"
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
            @click="sacarCarta($event, container.number)"
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
import { onMounted, ref, computed, nextTick } from "vue";
import useConstants from "../lib/constants.js";
import Card from "./Card.vue";
import CardSimpleContainer from "./CardSimpleContainer.vue";
import CardSelectionContainer from "./CardSelectionContainer.vue";
import { useGsap } from "../lib/useGsap.js";
import TransitionFade from "./TransitionFade.vue";
import { Flip } from "gsap/Flip";

const gsap = useGsap();

const props = defineProps({
  cards: Array,
});

const cardRefs = ref({});

const constants = useConstants();

const user_rotate_deg = computed(() => {
  //if(props.moving)
  // return props.offset / 5

  const perimeter = constants.CIRCLE_RADIUS * 2 * Math.PI;
  const arcLength = (constants.ARC_DEGREES / 360) * perimeter;
  const gap = arcLength / props.cards.length;
  const v = Math.round(dragged.value / gap) * gap;
  return (v / arcLength) * constants.ARC_DEGREES;
});

const dragged = ref(0);

const selected_cards = ref([]);

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
    };
  });
});

const active_card_number = computed(() => {
  return Math.round(
    (props.cards.length * ((-user_rotate_deg.value + 36000) % 360)) /
      constants.ARC_DEGREES
  );
});

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

  const newDraggedValue = dragged.value - gap * difference;

  // Actualiza dragged.value
  dragged.value = newDraggedValue;
}

let animating = false;

const almacenarCarta = (card, number, callback) => {
  if (selected_cards.value.includes(number)) return;

  selected_cards.value.push(number);
  nextTick(() => {
    const state = Flip.getState(card);
    // Aquí puedes agregar cualquier lógica adicional que necesites
    console.log("Animación completada, nuevo estado capturado");
    const container = document.querySelector(
      '.card-container[number="' + number + '"]'
    );

    container.appendChild(card);

    // sacarCarta from the previous state to the current one:
    Flip.from(state, {
      duration: 0.5,
      // y: "+=" + constants.SHOW_CARD_Y_OFFSET,
      ease: "power1.inOut",
      // absolute: true,
      onComplete: () => {
        if (callback) callback();
      },
    });
  });
};

let cardShowing = null;
let numberShowing = null;

const closeShow = () => {
  showModal.value = false;
  almacenarCarta(cardShowing, numberShowing, () => {
    cardShowing = null;
    numberShowing = null;
  });
};

const mostrarCarta = (card, number, callback) => {
  // showModal.value = true;
  nextTick(() => {
    // Wait for modal show
    cardShowing = card;
    numberShowing = number;

    // cardRefs.value[number].embed();

    /*gsap.to(card, {
      y: 0,
      duration: 0,
    });*/

    const state = Flip.getState(card);
    const container = document.querySelector("#show-card-container");
    container.appendChild(card);
    //if(false)
    Flip.from(state, {
      // y: "+=" + constants.SHOW_CARD_Y_OFFSET,
      //width: constants.SHOW_CARD_WIDTH,
      //height: constants.SHOW_CARD_HEIGHT,
      scale: true,
      absolute: true,
      duration: 0.6,
      ease: "power1.inOut",
      onComplete: () => {
        animating = false;
        cardRefs.value[number].flip(() => {
          //showModal.value = true;
          //if (callback) callback();
        });
        // if (callback) callback();
      },
    });
  });
};

const sacarCarta = (event, number) => {
  if (animating) return;

  const card = event.target;
  console.log("sacarCarta", number, "current", active_card_number.value);

  if (selected_cards.value.includes(number)) {
    mostrarCarta(card, number);
    return;
  }

  if (number != active_card_number.value) {
    animating = true;
    rotate_to_card(number);
    setTimeout(() => {
      animating = false;
      // Llamar a sacarCarta nuevamente para verificar si se alcanzó el número activo
      sacarCarta(event, number);
      return;
    }, 500);
    return;
  }

  animating = true;

  // selected_cards.value.push(number);
  // const state = Flip.getState(event.target);

  /* gsap
    .timeline()
    .to(card, {
     // y: "-=" + constants.SHOW_CARD_Y_OFFSET, // Subtracts 300px on the Y-axis
      duration: 0.6,
      ease: "power2.out", // Natural easing for the movement
    })*/
  /*
    .to(card, {
      rotationY: 180,
      duration: 0.9,
      ease: "power2.inOut", // Smooth easing for the rotation
    })
      */

  /*.call(() => {
      // Tu función de callback aquí
      console.log("Animación de movimiento completada");
      cardRefs.value[number].flip(() => {
        mostrarCarta(card, number, () => {
          animating = false;
        });
      });
    });
    */
  mostrarCarta(card, number, () => {
    animating = false;
  });
};

const showModal = ref(false);

// Mouse dragging:
const offset_start = ref(0);
const temporal_offset = ref(0);
const clicked = ref(false);
const x_start = ref(0);

function drag_start(event) {
    console.log("drag_start");
    clicked.value = true;
    x_start.value = event.clientX;
    // si es evento touch, entonces...
    if (event.touches) {
      x_start.value = event.touches[0].clientX;
    }
    offset_start.value = dragged.value;
}

function drag_move(event) {
    console.log("drag_move");
    if (clicked.value) {
      let dx = event.clientX - x_start.value;
    // si es evento touch, entonces...
        if (event.touches) {
            dx = event.touches[0].clientX - x_start.value;
        }
      temporal_offset.value = dx;
      dragged.value = offset_start.value + temporal_offset.value;
    }
}

function drag_end(event) {
    console.log("drag_end");
    clicked.value = false;
    dragged.value = offset_start.value + temporal_offset.value;
    temporal_offset.value = 0;
}

onMounted(() => {
  document.addEventListener("mousedown", drag_start);
  document.addEventListener("mouseup", drag_end);
  document.addEventListener("mousemove", drag_move);
  document.addEventListener("touchstart", drag_start);
  document.addEventListener("touchend", drag_end);
  document.addEventListener("touchmove", drag_move);
});
</script>
