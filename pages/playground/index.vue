<script setup lang="ts">
import ImageItem from '~/components/Item/ImageItem.vue'

const layout = ref(
  [
    { x: 0, y: 0, w: 2, h: 2, i: 0 },
    { x: 2, y: 0, w: 2, h: 4, i: 1 },
    { x: 4, y: 0, w: 2, h: 5, i: 2 },
    { x: 6, y: 0, w: 5, h: 3, i: 3 },
    { x: 8, y: 0, w: 2, h: 3, i: 4 },
    { x: 8, y: 0, w: 2, h: 3, i: 5 },
    { x: 0, y: 5, w: 1, h: 6, i: 6 },
    { x: 2, y: 5, w: 2, h: 5, i: 7 },
    { x: 4, y: 5, w: 2, h: 5, i: 8 },
    { x: 6, y: 3, w: 2, h: 4, i: 9 }
  ]
)

const isOpen = ref(false)
</script>

<template>
  <UContainer class="bg-white dark:bg-gray-950 rounded-lg" :ui="{ padding: 'py-4 sm:py-6 lg:py-8' }">
    <div class="flex w-full">
      <UButton label="Button" @click="isOpen = true" />
    </div>
    <UDivider class="py-4" />
    <grid-layout v-model:layout="layout" :col-num="12" :row-height="24" :vertical-compact="true" :prevent-collision="false">
      <template #default="{ gridItemProps }">
        <grid-item v-for="item in layout" :key="item.i" v-bind="gridItemProps" :x="item.x" :y="item.y" :w="item.w" :h="item.h" :i="item.i" :is-resizable="true">
          <image-item />
        </grid-item>
      </template>
    </grid-layout>
    <UModal v-model="isOpen" fullscreen :ui="{ paddin: 'p-0', fullscreen: 'w-1/2 h-1/2 rounded-lg' }">
      <Selector />
    </UModal>
  </UContainer>
</template>