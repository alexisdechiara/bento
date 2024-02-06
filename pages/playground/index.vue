<script setup lang="ts">
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
        <UButton icon="i-heroicons-adjustments-horizontal" color="gray" variant="soft" :ui="{ rounded:'rounded-md'}" />
        <template #panel>
          <div class="flex flex-col p-4 w-80 gap-y-2">
            <UiAccordion label="Column number" description="The number of columns in the grid">
              <template #action>
                <div class="flex w-1/3 justify-between items-center">
                  <UButton icon="i-heroicons-minus" color="gray" class="p-1" square variant="ghost" @click.prevent="gridStore.decrementColNum" />
                  <span class="whitespace-nowrap px-2">{{ settings.colNum }}</span>
                  <UButton icon="i-heroicons-plus" color="gray" class="p-1" square variant="ghost" @click.prevent="gridStore.incrementColNum" />
                </div>
              </template>
            </UiAccordion>
            <UiAccordion label="Rounded items" description="Make border of items in the grid rounded">
              <template #action>
                <UToggle v-model="roundedItems" color="gray" />
              </template>
              <template #content>
                <ul class="flex w-full gap-x-2 rounded-b-lg p-1 pt-0">
                  <li class="w-full flex justify-center">
                    <input id="rounded-extra-small" v-model="settings.borderRadius" type="radio" name="roundedRadius" value="4px" class="hidden peer">
                    <label for="rounded-extra-small" class="aspect-w-1 aspect-h-1	flex items-center justify-center cursor-pointer peer-checked bg-gray-100 hover:bg-black hover:text-gray-50 peer-checked:bg-black peer-checked:text-gray-50 w-10 p-2 rounded-md">XS</label>
                  </li>
                  <li class="w-full flex justify-center">
                    <input id="rounded-small" v-model="settings.borderRadius" type="radio" name="borderRadius" value="8px" class="hidden peer">
                    <label for="rounded-small" class="aspect-w-1 aspect-h-1 flex items-center justify-center cursor-pointer peer-checked bg-gray-100 hover:bg-black hover:text-gray-50 peer-checked:bg-black peer-checked:text-gray-50 w-10 p-2 rounded-md">S</label>
                  </li>
                  <li class="w-full flex justify-center">
                    <input id="rounded-medium" v-model="settings.borderRadius" type="radio" name="borderRadius" value="16px" class="hidden peer">
                    <label for="rounded-medium" class="aspect-w-1 aspect-h-1 flex items-center justify-center cursor-pointer peer-checked bg-gray-100 hover:bg-black hover:text-gray-50 peer-checked:bg-black peer-checked:text-gray-50 w-10 p-2 rounded-md">M</label>
                  </li>
                  <li class="w-full flex justify-center">
                    <input id="rounded-large" v-model="settings.borderRadius" type="radio" name="borderRadius" value="24px" class="hidden peer">
                    <label for="rounded-large" class="aspect-w-1 aspect-h-1 flex items-center justify-center cursor-pointer peer-checked bg-gray-100 hover:bg-black hover:text-gray-50 peer-checked:bg-black peer-checked:text-gray-50 w-10 p-2 rounded-md">L</label>
                  </li>
                  <li class="w-full flex justify-center">
                    <input id="rounded-extra-large" v-model="settings.borderRadius" type="radio" name="borderRadius" value="32px" class="hidden peer">
                    <label for="rounded-extra-large" class="aspect-w-1 aspect-h-1 flex items-center justify-center cursor-pointer peer-checked bg-gray-100 hover:bg-black hover:text-gray-50 peer-checked:bg-black peer-checked:text-gray-50 w-10 p-2 rounded-md">XL</label>
                  </li>
                </ul>
              </template>
            </UiAccordion>
            <UiAccordion label="Free grid" description="Allow items to be moved freely without vertical shrink">
              <template #action>
                <UToggle v-model="freeGrid" color="gray" />
              </template>
            </UiAccordion>
            <UiAccordion label="Prevent collision" description="Allow items to move other items when dragging them">
              <template #action>
                <UToggle v-model="preventCollision" color="gray" />
              </template>
            </UiAccordion>
            <UiAccordion label="Show grid" description="Show grid for better visualisation of the layout">
              <template #action>
                <UToggle v-model="showGrid" color="gray" />
              </template>
            </UiAccordion>
          </div>
        </template>
      </UPopover>
    </div>
    <UDivider class="py-4" />
    <ClientOnly>
      <div :class="{'h-screen' : !(Array.isArray(items) && items.length)}">
        <GridLayout v-if="Array.isArray(items) && items.length" v-model:layout="items" class="lg:w-[960px] xl:w-[1200px]" :prevent-collision="preventCollision" :row-height="gridStore.getRowHeightForSquare" :col-num="settings.colNum" :is-resizable="true" :is-draggable="true" :auto-size="true" :show-grid-lines="showGrid" :vertical-compact="!freeGrid">
          <template v-for="item in items" :key="item.i">
            <GridItem :show-close-button="false" :is-resizable="true" :enable-edit-mode="true" :x="item.x" :y="item.y" :w="item.w" :h="item.h" :i="item.i" :use-border-radius="roundedItems" :border-radius="Number(settings.borderRadius.replace(/\D/g, ''))" class="relative" :class="[settings.themes[item.customTheme ? item.customTheme :settings.currentTheme]]" :preserveAspectRatio="item.preserveAspectRatio">
              <ItemImage v-if="item.componentId === 1" :values="item.values" @remove="gridStore.removeItem(item)" />
              <ItemRadialChart v-else-if="item.componentId === 2" :values="item.values" @remove="gridStore.removeItem(item)" />
            </GridItem>
          </template>
        </GridLayout>
      </div>
    </ClientOnly>
    <UModal v-model="isOpen" fullscreen :ui="{ paddin: 'p-0', fullscreen: 'w-3/5 h-1/2 rounded-lg' }">
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
    border-radius: v-bind('settings.borderRadius') !important;
    overflow: hidden;

    & ~.vue-grid-placeholder {
      border-radius: v-bind('settings.borderRadius') !important;
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
