import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import gsap from 'gsap'
import { Flip } from "gsap/Flip"

gsap.registerPlugin(Flip)

const app = createApp(App)

app.config.globalProperties.$gsap = gsap

app.mount('#app')
