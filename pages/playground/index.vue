<script setup lang="ts">
import ImageItem from '~/components/Item/ImageItem.vue'
import RadialChartItem from '~/components/Item/RadialChartItem.vue'
import { GridItem, GridLayout } from 'vue-ts-responsive-grid-layout'
const isOpen = ref(false)
const showGrid = ref(false)
const freeGrid = ref(false)
const roundedItems = ref(true)
const preventCollision = ref(false)
const gridStore = useGridStore()
const { settings, items } = storeToRefs(gridStore)
</script>

<template>
  <UContainer class="bg-white dark:bg-gray-950 rounded-lg my-8" :ui="{base:'flex flex-col items-center', padding: 'py-4 sm:py-6 lg:py-8' }">
    <div class="flex w-full justify-between">
      <UButton label="Button" @click="isOpen = true" />
      <UPopover :popper="{ placement: 'bottom-end', offsetDistance: 12 }">
        <UButton icon="i-heroicons-adjustments-horizontal" color="primary" variant="soft" :ui="{ rounded:'rounded-md'}" />
        <template #panel>
          <div class="flex flex-col p-4 min-w-48 gap-y-2">
            <div class="flex w-full gap-x-4 justify-center items-center">
              <label class="whitespace-nowrap leading-8 flex items-center gap-x-1"> 
                <UTooltip text="The number of columns in the grid" :popper="{ placement: 'left' }">
                  <UIcon name="i-heroicons-information-circle-solid" class="text-sm" />
                </UTooltip>
                Column number
              </label>
              <div class="flex w-full justify-between items-center">
                <UButton icon="i-heroicons-minus" :padded="false" color="primary" square variant="ghost" @click="gridStore.decrementColNum" />
                <span class="whitespace-nowrap px-2">{{ settings.colNum }}</span>
                <UButton icon="i-heroicons-plus" :padded="false" color="primary" square variant="ghost" @click="gridStore.incrementColNum" />
              </div>
            </div>
            <div class="rounded-lg border-solid" :class="{ 'border': roundedItems }">
              <div class="flex w-full" :class="{ 'border-b border-solid py-3 px-2': roundedItems }">
                <label class="whitespace-nowrap leading-none flex items-center gap-x-1 w-full"> 
                  <UTooltip text="Make border of items in the grid rounded" :popper="{ placement: 'left' }">
                    <UIcon name="i-heroicons-information-circle-solid" class="text-sm" />
                  </UTooltip>
                  Rounded items
                </label>
                <UToggle v-model="roundedItems" />
              </div>
              <ul class="flex w-full gap-x-2 rounded-b-lg p-2" :class="{'hidden' : !roundedItems }">
                <li class="w-full">
                  <input id="rounded-extra-small" v-model="settings.borderRadius" type="radio" name="roundedRadius" :value="2" class="hidden peer">
                  <label for="rounded-extra-small" class="aspect-w-1 aspect-h-1	flex items-center justify-center cursor-pointer peer-checked bg-gray-100 hover:bg-black hover:text-gray-50 peer-checked:bg-black peer-checked:text-gray-50 w-10 p-2 rounded-md">XS</label>
                </li>
                <li class="w-full">
                  <input id="rounded-small" v-model="settings.borderRadius" type="radio" name="borderRadius" :value="4" class="hidden peer">
                  <label for="rounded-small" class="aspect-w-1 aspect-h-1 flex items-center justify-center cursor-pointer peer-checked bg-gray-100 hover:bg-black hover:text-gray-50 peer-checked:bg-black peer-checked:text-gray-50 w-10 p-2 rounded-md">S</label>
                </li>
                <li class="w-full">
                  <input id="rounded-medium" v-model="settings.borderRadius" type="radio" name="borderRadius" :value="8" class="hidden peer">
                  <label for="rounded-medium" class="aspect-w-1 aspect-h-1 flex items-center justify-center cursor-pointer peer-checked bg-gray-100 hover:bg-black hover:text-gray-50 peer-checked:bg-black peer-checked:text-gray-50 w-10 p-2 rounded-md">M</label>
                </li>
                <li class="w-full">
                  <input id="rounded-large" v-model="settings.borderRadius" type="radio" name="borderRadius" :value="12" class="hidden peer">
                  <label for="rounded-large" class="aspect-w-1 aspect-h-1 flex items-center justify-center cursor-pointer peer-checked bg-gray-100 hover:bg-black hover:text-gray-50 peer-checked:bg-black peer-checked:text-gray-50 w-10 p-2 rounded-md">L</label>
                </li>
                <li class="w-full">
                  <input id="rounded-extra-large" v-model="settings.borderRadius" type="radio" name="borderRadius" :value="16" class="hidden peer">
                  <label for="rounded-extra-large" class="aspect-w-1 aspect-h-1 flex items-center justify-center cursor-pointer peer-checked bg-gray-100 hover:bg-black hover:text-gray-50 peer-checked:bg-black peer-checked:text-gray-50 w-10 p-2 rounded-md">XL</label>
                </li>
              </ul>
            </div>
            <div class="flex w-full">
              <label class="whitespace-nowrap leading-none flex items-center gap-x-1 w-full"> 
                <UTooltip text="Allow items to be moved freely without vertical shrink" :popper="{ placement: 'left' }">
                  <UIcon name="i-heroicons-information-circle-solid" class="text-sm" />
                </UTooltip>
                Free grid
              </label>
              <UToggle v-model="freeGrid" />
            </div>
            <div class="flex w-full">
              <label class="whitespace-nowrap leading-none flex items-center gap-x-1 w-full"> 
                <UTooltip text="Allow items to move other items when dragging them" :popper="{ placement: 'left' }">
                  <UIcon name="i-heroicons-information-circle-solid" class="text-sm" />
                </UTooltip>
                Prevent collision
              </label>
              <UToggle v-model="preventCollision" />
            </div>
            <div class="flex w-full">
              <label class="whitespace-nowrap leading-none flex items-center gap-x-1 w-full"> 
                <UTooltip text="Show grid for better visualisation of the layout" :popper="{ placement: 'left' }">
                  <UIcon name="i-heroicons-information-circle-solid" class="text-sm" />
                </UTooltip>
                Show grid
              </label>
              <UToggle v-model="showGrid" />
            </div>
          </div>
        </template>
      </UPopover>
    </div>
    <UDivider class="py-4" />
    <ClientOnly>
      <div :class="{'h-screen' : !(Array.isArray(items) && items.length)}">
        <GridLayout v-if="Array.isArray(items) && items.length" v-model:layout="items" class="lg:w-[960px] xl:w-[1200px]" :prevent-collision="preventCollision" :row-height="gridStore.getRowHeightForSquare" :col-num="settings.colNum" :is-resizable="true" :is-draggable="true" :border-radius-px="settings.borderRadius" :auto-size="true" :show-grid-lines="showGrid" :vertical-compact="!freeGrid">
          <GridItem v-for="item in items" :key="item.i" :show-close-button="false" :is-resizable="true" :enable-edit-mode="true" :x="item.x" :y="item.y" :w="item.w" :h="item.h" :i="item.i" :use-border-radius="roundedItems" class="relative border border-solid">
            <image-item v-if="item.componentId === 1" :value="item.image" @remove="gridStore.removeItem(item)" />
            <!-- Fix it -->
            <RadialChartItem v-else-if="item.componentId === 2" :value="item.chart" @remove="gridStore.removeItem(item)" />
          </GridItem>
        </GridLayout>
      </div>
    </ClientOnly>
    <UModal v-model="isOpen" fullscreen :ui="{ paddin: 'p-0', fullscreen: 'w-2/3 h-1/2 rounded-lg' }">
      <ItemMenu />
    </UModal>
  </UContainer>
</template>

<style lang="scss" scoped>

.vue-close-button {
}

.vue-close-button:hover {
}

.vue-grid-item {
  transition: all 200ms ease;
  transition-property: left, top, right;

  &.no-touch {
    touch-action: none;
  }

  &.vue-use-radius {
    border-radius: 8px;
    // border-radius: v-bind('settings.borderRadius + "px"') !important;
    overflow: hidden;

    & ~.vue-grid-placeholder {
      border-radius: 8px;
      // border-radius: v-bind('settings.borderRadius + "px"') !important;
    }
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
    cursor: grab ;
  }

  &.vue-draggable-dragging {
    cursor: grabbing ;
    transition: none;
    z-index: 3;
  }

  &.vue-grid-placeholder {
    @apply bg-primary;
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