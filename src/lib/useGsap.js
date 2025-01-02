// useGsap.js
import { getCurrentInstance } from 'vue'

export function useGsap() {
  const internalInstance = getCurrentInstance()
  const gsap = internalInstance.appContext.config.globalProperties.$gsap
  return gsap
}
