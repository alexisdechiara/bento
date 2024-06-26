<template>
  <UAccordion :items="accordionSettings" :ui="{ wrapper: 'flex flex-col w-full', item: { base : 'flex flex-col gap-2 px-1 my-2'} }">
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
          <UToggle v-model="crosshair.show" />
        </div>
      </UFormGroup>
    </template>
    <template #tooltip>
      <UFormGroup label="Show tooltip" class="grid grid-cols-2 items-center" :ui="{ container: '' }">
        <div class="flex justify-end">
          <UToggle v-model="tooltip.show" />
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
    <template #line>
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
      <UFormGroup label="Line colors">
        <div class="flex flex-col gap-y-2">
          <div v-for="(data, index) in columns" :key="data.key" class="flex border-2 p-2 rounded-lg items-center justify-between">
            <span class="text-gray-700 dark:text-gray-400 font-medium">{{ data.label }}</span>
            <UIRadioColorGroup v-model="colors[index]" :name="data.key" :color-list="colorList" />
          </div>
        </div>
      </UFormGroup>
    </template>
    <template #bar>
      <UFormGroup label="Orientation">
        <USelectMenu v-model="bar.orientation" :options="barOrientations" @change="invertLabelAxis()" />
      </UFormGroup>
      <div class="grid grid-cols-3 gap-x-4">
        <UFormGroup label="Border radius">
          <UTooltip :text="bar.roundedCorners" class="w-full" :popper="{ placement: 'right' }">
            <URange v-model="bar.roundedCorners" :min="0" :max="16" :step="1" />
          </UTooltip>
        </UFormGroup>
        <UFormGroup label="Bar padding">
          <UTooltip :text="bar.barPadding" class="w-full" :popper="{ placement: 'right' }">
            <URange v-model="bar.barPadding" :min="0" :max="1" :step=".1" />
          </UTooltip>
        </UFormGroup>
        <UFormGroup label="Group padding">
          <UTooltip :text="bar.groupPadding" class="w-full" :popper="{ placement: 'left' }">
            <URange v-model="bar.groupPadding" :min="0" :max="1" :step=".1" />
          </UTooltip>
        </UFormGroup>
      </div>
      <UFormGroup label="Bar colors">
        <div class="flex flex-col gap-y-2">
          <div v-for="(data, index) in columns" :key="data.key" class="flex border-2 p-2 rounded-lg items-center justify-between">
            <span class="text-gray-700 dark:text-gray-400 font-medium">{{ data.label }}</span>
            <UIRadioColorGroup v-model="colors[index]" :name="data.key" :color-list="colorList" />
          </div>
        </div>
      </UFormGroup>
    </template>
  </UAccordion>
</template>

<script lang="ts" setup>
import { useCloned } from '@vueuse/core'

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
  {
    name: 'pink',
    hex: '#ec4899',
  }
]

const barOrientations = [
  'vertical',
  'horizontal',
]

const props = defineProps<{
  lineTypes?: Array<{label: string, value: string, icon: string}>
  labelOptions?: Array<string>
  groupedBar?: boolean
  columns?: Array<any>
}>()

const annotation = defineModel<annotationChart>('annotation')
const line = defineModel<lineChart>('line')
const bar = defineModel<barChart>('bar')
const axis = defineModel<chartAxis>('axis')
const crosshair = defineModel<chartCrosshair>('crosshair')
const colors = defineModel<string[]>('colors')
const tooltip = defineModel<chartTooltip>('tooltip')

const accordionSettings: Array<Object> = []

if(annotation.value) {
  accordionSettings.push({
    label: 'Annotations',
    slot: 'annotations',
    icon: 'i-solar-subtitles-linear',
    defaultOpen: false,
    disabled: true
  })
}

if(axis.value) {
  accordionSettings.push({
    label: 'Axis',
    slot: 'axis',
    icon: 'i-mdi-axis',
    defaultOpen: false,
    disabled: false
  })
}

if(crosshair.value) {
  accordionSettings.push({
    label: 'Crosshair',
    slot: 'crosshair',
    icon: 'i-ph-crosshair',
    defaultOpen: false,
    disabled: false
  })
}

if(tooltip.value) {
  accordionSettings.push({
    label: 'Tooltip',
    slot: 'tooltip',
    icon: 'i-heroicons-chat-bubble-bottom-center-text',
    defaultOpen: false,
    disabled: false
  })
}

if(line.value) {
  accordionSettings.push({
    label: 'Line',
    slot: 'line',
    icon: 'i-solar-graph-linear',
    defaultOpen: false,
    disabled: false
  })
}

if(bar.value) {
  accordionSettings.push({
    label: 'Bar',
    slot: 'bar',
    icon: 'i-solar-chart-square-linear',
    defaultOpen: false,
    disabled: false
  })
}

const invertLabelAxis = () => {
  const { cloned } = useCloned(axis.value)
  axis.value.x = axis.value.y
  axis.value.y = cloned.value.x
}

</script>
