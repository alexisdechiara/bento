import { defineNuxtPlugin } from '#app'
// @ts-ignore
import VueDraggableGrid from '@noction/vue-draggable-grid'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(VueDraggableGrid)
})