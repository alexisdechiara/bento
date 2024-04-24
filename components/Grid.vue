<template>
  <ClientOnly>
    <div :class="{ 'h-screen': !(Array.isArray(items) && items.length) }">
      <GridLayout v-if="Array.isArray(items) && items.length" v-model:layout="items" class="lg:w-[960px] xl:w-[1200px]" :prevent-collision="settings.preventCollision" :row-height="gridStore.getRowHeightForSquare" :col-num="settings.colNum" :is-resizable="true" :is-draggable="true" :auto-size="true" :show-grid-lines="settings.showGrid" :vertical-compact="!settings.freeGrid">
        <template v-for="item in items" :key="item.i">
          <GridItem :show-close-button="false" :is-resizable="true" :enable-edit-mode="true" :x="item.x" :y="item.y" :w="item.w" :h="item.h" :i="item.i" :use-border-radius="settings.roundedItems" :border-radius="Number(settings.borderRadius.replace(/\D/g, ''))" class="relative" :class="[settings.themes[item.customTheme ? item.customTheme : settings.currentTheme]]" :preserveAspectRatio="item.preserveAspectRatio">
            <div class="w-full h-full group overflow-hidden vue-use-radius">
              <div class="flex gap-x-1 absolute rounded-lg bg-black transition duration-300 opacity-0 group-hover:opacity-100 -bottom-4 right-1/2 translate-x-1/2 z-50 py-1 px-2">
                <UButton icon="i-heroicons-pencil-square-20-solid" size="2xs" :ui="{ color: { black: {solid: 'hover:bg-gray-700'}}}" />
                <UButton icon="i-heroicons-document-duplicate-20-solid" size="2xs" :ui="{ color: { black: {solid: 'hover:bg-gray-700'}}}" />
                <UButton icon="i-heroicons-trash-20-solid" size="2xs" :ui="{ color: { black: {solid: 'hover:bg-gray-700'}}}" @click="deleteItem(item)" />
                <UDivider orientation="vertical" size="xs" class="border-white my-1.5" />
                <UDropdown :items="options(item)" :popper="{ offsetDistance: 16, placement: 'right-end' }">
                  <UButton icon="i-heroicons-ellipsis-horizontal" size="2xs" :ui="{ color: { black: {solid: 'hover:bg-gray-700'}}}" />
                </UDropdown>
              </div>
              <component :is="getItemNameById(item.componentId)" v-bind="{values: item.values}" @remove="gridStore.removeItem(item)" />
            </div>
          </GridItem>
        </template>
      </GridLayout>
      <UIDeleteModal v-model="isDeleteItem" @delete="gridStore.removeItem(itemToDelete)" />
    </div>
  </ClientOnly>
</template>

<script lang="ts" setup>
import { GridItem, GridLayout } from 'vue-ts-responsive-grid-layout'
const gridStore = useGridStore()
const { settings, items } = storeToRefs(gridStore)

const {getItemNameById} = useItemsName()

const isDeleteItem = ref(false)
const itemToDelete = ref(null)

const deleteItem = (item: any) => {
  isDeleteItem.value = true
  itemToDelete.value = item
}

const options = (item: any) => [
  [
    {
      label: 'Copy',
      icon: 'i-heroicons-clipboard-document-20-solid',
      disabled: true,
      click: () => {
        console.log(item)
      }
    },
    {
      label: 'Cut',
      icon: 'i-heroicons-scissors-20-solid',
      disabled: true,
      click: () => {
        console.log(item)
      }
    },
  ]
]
</script>

<style lang="scss" scoped>

.vue-grid-item {
  transition: all 200ms ease;
  transition-property: left, top, right;
  position: relative;

  &.no-touch {
    touch-action: none;
  }

  &.css-transforms {
    left: 0;
    right: auto;
    transition-property: transform;
  }

  &.resizing {
    transition: all;
    opacity: .5;
    z-index: 3;
  }

  &.vue-draggable {
    cursor: grab;
  }

  &.vue-draggable-dragging {
    cursor: grabbing;
    transition: none;
    z-index: 3;
  }

  &.vue-grid-placeholder {
    @apply bg-primary;
  }
}

.vue-use-radius {
  border-radius: v-bind('settings.borderRadius') !important;

  &~.vue-grid-placeholder {
    border-radius: v-bind('settings.borderRadius') !important;
  }
}

.vue-grid-layout {
  position: relative;
  transition: height 500ms ease;
}

.grid::before {
  content: "";
  opacity: 0.5;
  background-color: transparent;
  background-image: radial-gradient(black 10%, transparent 10%);
  background-size: 14px 14px;
  height: calc(100% - 5px);
  width: calc(100% - 5px);
  position: absolute;
  background-repeat: repeat;
}

.dark .grid::before {
  background-image: radial-gradient(white 10%, transparent 10%);
}
</style>
