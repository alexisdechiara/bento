<script lang="ts" setup>
import { GridItem } from 'vue-ts-responsive-grid-layout'
const gridStore = useGridStore()
const { settings, items } = storeToRefs(gridStore)
</script>

<!-- WIP -->

<template>
  <template v-for="item in items" :key="item.i">
    <GridItem :show-close-button="false" :is-resizable="true" :enable-edit-mode="true" :x="item.x" :y="item.y" :w="item.w" :h="item.h" :i="item.i" :border-radius="Number(settings.borderRadius.replace(/\D/g, ''))" class="relative" :class="[settings.themes[item.customTheme ? item.customTheme : settings.currentTheme]]" :preserveAspectRatio="item.preserveAspectRatio">
      <ItemImage v-if="item.componentId === 1" :values="item.values" @remove="gridStore.removeItem(item)" />
      <ItemRadialChart :values="item.values" @remove="gridStore.removeItem(item)" />
    </GridItem>
  </template>
</template>
