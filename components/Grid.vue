<template>
  <ClientOnly>
    <div :class="{ 'h-screen': !(Array.isArray(items) && items.length) }">
      <GridLayout v-if="Array.isArray(items) && items.length" v-model:layout="items" class="lg:w-[960px] xl:w-[1200px]" :prevent-collision="settings.preventCollision" :row-height="gridStore.getRowHeightForSquare" :col-num="settings.colNum" :is-resizable="true" :is-draggable="true" :auto-size="true" :show-grid-lines="settings.showGrid" :vertical-compact="!settings.freeGrid">
        <template v-for="item in items" :key="item.i">
          <GridItem :show-close-button="false" :is-resizable="true" :enable-edit-mode="true" :x="item.x" :y="item.y" :w="item.w" :h="item.h" :i="item.i" :use-border-radius="settings.roundedItems" :border-radius="Number(settings.borderRadius.replace(/\D/g, ''))" class="relative" :class="[settings.themes[item.customTheme ? item.customTheme : settings.currentTheme]]" :preserveAspectRatio="item.preserveAspectRatio">
            <ItemImage v-if="item.componentId === 1" :values="item.values" @remove="gridStore.removeItem(item)" />
            <ItemRadialChart v-else-if="item.componentId === 2" :values="item.values" @remove="gridStore.removeItem(item)" />
          </GridItem>
        </template>
      </GridLayout>
    </div>
  </ClientOnly>
</template>

<script lang="ts" setup>
import { GridItem, GridLayout } from 'vue-ts-responsive-grid-layout'
const gridStore = useGridStore()
const { settings, items } = storeToRefs(gridStore)
</script>

<style lang="scss" scoped>
.vue-close-button {}

.vue-close-button:hover {}

.vue-grid-item {
  transition: all 200ms ease;
  transition-property: left, top, right;

  &.no-touch {
    touch-action: none;
  }

  &.vue-use-radius {
    border-radius: v-bind('settings.borderRadius') !important;
    overflow: hidden;

    &~.vue-grid-placeholder {
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
