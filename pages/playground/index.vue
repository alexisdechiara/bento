<script setup lang="ts">
import ImageItem from '~/components/Item/ImageItem.vue'

const isOpen = ref(false)
const gridStore = useGridStore()
</script>

<template>
  <UContainer class="bg-white dark:bg-gray-950 rounded-lg" :ui="{ padding: 'py-4 sm:py-6 lg:py-8' }">
    <div class="flex w-full">
      <UButton label="Button" @click="isOpen = true" />
    </div>
    <UDivider class="py-4" />
    <grid-layout v-if="Array.isArray(gridStore.items) && gridStore.items.length" v-model:layout="gridStore.items" :col-num="gridStore.settings.colNum" :row-height="gridStore.settings.rowHeight" :vertical-compact="gridStore.settings.verticalCompact" :prevent-collision="gridStore.settings.preventCollision">
      <template #default="{ gridItemProps }">
        <grid-item v-for="item in gridStore.items" :key="item.layout.i" v-bind="gridItemProps" :x="item.layout.x" :y="item.layout.y" :w="item.layout.w" :h="item.layout.h" :i="item.layout.i" :is-resizable="true">
          <image-item :value="item.image" />
        </grid-item>
      </template>
    </grid-layout>
    <UModal v-model="isOpen" fullscreen :ui="{ paddin: 'p-0', fullscreen: 'w-2/3 h-1/2 xl:w-1/2 rounded-lg' }">
      <ItemMenu />
    </UModal>
  </UContainer>
</template>