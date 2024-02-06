<template>
  <UPopover :popper="{ placement: 'bottom-end', offsetDistance: 12 }">
    <UButton icon="i-heroicons-adjustments-horizontal" color="gray" variant="soft" :ui="{ rounded: 'rounded-md' }" />
    <template #panel>
      <div class="flex flex-col p-4 w-80 gap-y-2">
        <UIAccordion label="Column number" description="The number of columns in the grid">
          <template #action>
            <div class="flex w-1/3 justify-between items-center">
              <UButton icon="i-heroicons-minus" color="gray" class="p-1" square variant="ghost" @click.prevent="gridStore.decrementColNum" />
              <span class="whitespace-nowrap px-2">{{ settings.colNum }}</span>
              <UButton icon="i-heroicons-plus" color="gray" class="p-1" square variant="ghost" @click.prevent="gridStore.incrementColNum" />
            </div>
          </template>
        </UIAccordion>
        <UIAccordion label="Rounded items" description="Make border of items in the grid rounded">
          <template #action>
            <UToggle v-model="settings.roundedItems" color="gray" />
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
        </UIAccordion>
        <UIAccordion label="Free grid" description="Allow items to be moved freely without vertical shrink">
          <template #action>
            <UToggle v-model="settings.freeGrid" color="gray" />
          </template>
        </UIAccordion>
        <UIAccordion label="Prevent collision" description="Allow items to move other items when dragging them">
          <template #action>
            <UToggle v-model="settings.preventCollision" color="gray" />
          </template>
        </UIAccordion>
        <UIAccordion label="Show grid" description="Show grid for better visualisation of the layout">
          <template #action>
            <UToggle v-model="settings.showGrid" color="gray" />
          </template>
        </UIAccordion>
      </div>
    </template>
  </UPopover>
</template>

<script lang="ts" setup>
const gridStore = useGridStore()
const { settings } = storeToRefs(gridStore)
</script>
