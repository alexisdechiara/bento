<template>
  <UAccordion :items="accordionSettings" :ui="{ wrapper: 'flex flex-col w-full', item: { base : 'flex flex-col gap-2 px-1 my-2'} }" multiple>
    <template #default="{ item, open }">
      <UButton color="gray" :label="item.label" :icon="item.icon" variant="ghost" size="xl" class="border-b border-gray-200 dark:border-gray-700" :ui="{ rounded: 'rounded-none', padding: { sm: 'p-3' } }">
        <template #trailing>
          <UIcon
            name="i-heroicons-chevron-right-20-solid"
            class="w-5 h-5 ms-auto transform transition-transform duration-200"
            :class="[open && 'rotate-90']"
          />
        </template>
      </UButton>
    </template>
    <template #annotations>
      <div class="flex w-full items-center gap-x-4">
        <UInput v-model="annotation.title" placeholder="Title …" class="w-full" size="lg" />
        <UInput v-model="annotation.titleSize" type="number" class="w-32" size="lg">
          <template #trailing>
            <span class="text-gray-500 dark:text-gray-400 text-xs">px</span>
          </template>
        </UInput>
      </div>
      <UTextarea v-model="annotation.description" :rows="3" placeholder="Description …" class="mt-2" />
    </template>
    <template #crosshair>
      <UFormGroup label="Show crosshair" class="grid grid-cols-2 items-center" :ui="{ container: '' }">
        <div class="flex justify-end">
          <UToggle v-model="showCrosshair" />
        </div>
      </UFormGroup>
    </template>
    <template #axis>
      <div class="flex w-full items-center gap-x-2">
        <UInput v-model="axis.x.label" placeholder="X-axis label" :disabled="!axis.x.show" />
        <UInput v-model="axis.x.labelSize" type="number" class="w-24" :disabled="!axis.x.show">
          <template #trailing>
            <span class="text-gray-500 dark:text-gray-400 text-xs">px</span>
          </template>
        </UInput>
        <USelectMenu v-model="axis.x.options" placeholder="0 selected" :options="props.labelOptions" class="w-40" multiple :disabled="!axis.x.show" />
        <UToggle v-model="axis.x.show" class="ml-2" />
      </div>
      <UFormGroup>
        <div class="flex w-full items-center gap-x-2">
          <UInput v-model="axis.y.label" placeholder="Y-axis label" :disabled="!axis.y.show" />
          <UInput v-model="axis.y.labelSize" type="number" class="w-24" :disabled="!axis.y.show">
            <template #trailing>
              <span class="text-gray-500 dark:text-gray-400 text-xs">px</span>
            </template>
          </UInput>
          <USelectMenu v-model="axis.y.options" placeholder="0 selected" :options="props.labelOptions" class="w-40" multiple :disabled="!axis.y.show" />
          <UToggle v-model="axis.y.show" class="ml-2" />
        </div>
      </UFormGroup>
    </template>
    <template #options>
      <div class="grid grid-cols-3 gap-4">
        <UFormGroup label="Curve type">
          <USelectMenu v-model="line.type" :options="lineTypes" option-attribute="label" value-attribute="value" />
        </UFormGroup>
        <UFormGroup label="Line Width">
          <UInput v-model="line.width" type="number" min="1">
            <template #trailing>
              <span class="text-gray-500 dark:text-gray-400 text-xs">px</span>
            </template>
          </UInput>
        </UFormGroup>
        <UFormGroup label="Dashes length">
          <UInput :value="line.dashes" placeholder="No dashes" type="number" min="0" @input="event => line.dashes = new Array<number>(event.target.value).fill(event.target.value)" />
        </UFormGroup>
      </div>
      <UFormGroup label="Line Color">
        <div class="flex gap-x-3">
          <div v-for="color in colorList" :key="color.name">
            <input :id="color.name" v-model="line.color" type="radio" name="color" :value="color.hex" class="hidden peer">
            <label :for="color.name" class="flex size-7 cursor-pointer transition rounded-full ring-offset-2 ring-1 ring-transparent peer-checked:ring-black" :class="`bg-${color.name}-500 hover:bg-${color.name}-700`" />
          </div>
        </div>
      </UFormGroup>
    </template>
  </UAccordion>
</template>

<script lang="ts">

const accordionSettings = [
  {
    label: 'Annotations',
    slot: 'annotations',
    icon: 'i-heroicons-chat-bubble-bottom-center-text',
    defaultOpen: false,
    disabled: true
  },
  {
    label: 'Axis',
    slot: 'axis',
    icon: 'i-mdi-axis',
    defaultOpen: true,
    disabled: false
  },
  {
    label: 'Crosshair',
    slot: 'crosshair',
    icon: 'i-ph-crosshair',
    defaultOpen: false,
    disabled: false
  },
  {
    label: 'Line',
    slot: 'options',
    icon: 'i-solar-graph-linear',
    defaultOpen: false,
    disabled: false
  },
]

const colorList = [
  {
    name: 'blue',
    hex: '#3b82f6',
  },
  {
    name: 'red',
    hex: '#ef4444',
  },
  {
    name: 'amber',
    hex: '#f59e0b',
  },
  {
    name: 'emerald',
    hex: '#10b981',
  },
  {
    name: 'violet',
    hex: '#8b5cf6',
  },
]

export default {}
</script>

<script lang="ts" setup>

const props = defineProps<{
  lineTypes: Array<{label: string, value: string, icon: string}>
  labelOptions: Array<string>
}>()

const annotation = defineModel<annotationChart>('annotation')
const line = defineModel<lineChart>('line')
const axis = defineModel<chartAxis>('axis')
const showCrosshair = defineModel<boolean>('showCrosshair')

</script>
