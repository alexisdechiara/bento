<template>
  <ModalItem :values="values" label="Line Chart" :component-id="7" :preserve-aspect-ratio="false" :is-submitable="data.length > 0" @return="$emit('return')" @close="$emit('close')">
    <template #preview>
      <ItemLineChart :values="values" />
    </template>
    <template #content>
      <div class="grid grid-cols-2 size-full overflow-hidden">
        <ClientOnly>
          <VisXYContainer :key="componentKey" :data="data" :margin="{ left: 0, top: 4, right: 16, bottom: 4 }" class="relative">
            <VisLine :curve-type="selectedChartType" :line-width="lineWidth" :color="colorChart" :line-dash-array="lineDashCharts" :x="x" :y="y" />
            <VisAnnotations :items="annotations" />
            <VisTooltip />
            <VisAxis v-if="showXAxis" :label-font-size="xAxisLabelSize" :tick-text-font-size="!selectedXLabelOptions.includes('Tick label') ? 0 : 12" :grid-line="selectedXLabelOptions.includes('Grid line')" :tick-line="selectedXLabelOptions.includes('Tick line')" :domain-line="selectedXLabelOptions.includes('Domain line')" type="x" :label="xAxisLabel" />
            <VisAxis v-if="showYAxis" :label-font-size="yAxisLabelSize" :tick-text-font-size="!selectedYLabelOptions.includes('Tick label') ? 0 : 12" :grid-line="selectedYLabelOptions.includes('Grid line')" :tick-line="selectedYLabelOptions.includes('Tick line')" :domain-line="selectedYLabelOptions.includes('Domain line')" type="y" :label="yAxisLabel" />
            <VisCrosshair v-if="showCrosshair" :template="triggers" />
          </VisXYContainer>
        </ClientOnly>
        <div class="max-h-full h-fit overflow-auto border border-gray-200 dark:border-gray-700 rounded my-1.5">
          <UTable :empty-state="{ icon: 'i-heroicons-circle-stack-20-solid', label: 'No data' }" :rows="data" :columns="colums" :ui="{ td: { padding: 'p-0' } }">
            <template #valueX-data="{ row }">
              <UInput v-model.lazy="row.x" type="number" variant="none" class="p-1 w-full" />
            </template>
            <template #valueY-data="{ row }">
              <UInput v-model.lazy="row.y" type="number" variant="none" class="p-1 w-full border-x" />
            </template>
            <template #actions-data="{ row, index }">
              <UDropdown :items="tableActions(row, index)">
                <UButton color="gray" variant="ghost" size="sm" icon="i-heroicons-ellipsis-horizontal-20-solid" />
              </UDropdown>
            </template>
          </UTable>
        </div>
      </div>
    </template>
    <template #settings>
      <div class="grid grid-cols-2 size-full overflow-hidden">
        <ClientOnly>
          <VisXYContainer :key="componentKey" :data="data" :margin="{ left: 0, top: 4, right: 16, bottom: 4 }" class="relative">
            <VisLine :curve-type="selectedChartType" :line-width="lineWidth" :color="colorChart" :line-dash-array="lineDashCharts" :x="x" :y="y" />
            <VisAnnotations :items="annotations" />
            <VisTooltip />
            <VisAxis v-if="showXAxis" :label-font-size="xAxisLabelSize" :tick-text-font-size="!selectedXLabelOptions.includes('Tick label') ? 0 : 12" :grid-line="selectedXLabelOptions.includes('Grid line')" :tick-line="selectedXLabelOptions.includes('Tick line')" :domain-line="selectedXLabelOptions.includes('Domain line')" type="x" :label="xAxisLabel" />
            <VisAxis v-if="showYAxis" :label-font-size="yAxisLabelSize" :tick-text-font-size="!selectedYLabelOptions.includes('Tick label') ? 0 : 12" :grid-line="selectedYLabelOptions.includes('Grid line')" :tick-line="selectedYLabelOptions.includes('Tick line')" :domain-line="selectedYLabelOptions.includes('Domain line')" type="y" :label="yAxisLabel" />
            <VisCrosshair v-if="showCrosshair" :template="triggers" />
          </VisXYContainer>
        </ClientOnly>
        <div class="flex flex-col max-h-full gap-y-4 py-1.5 pr-0.5 overflow-auto">
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
                <UInput v-model="chartTitle" placeholder="Title …" class="w-full" size="lg" />
                <UInput v-model="titleSize" type="number" class="w-32" size="lg">
                  <template #trailing>
                    <span class="text-gray-500 dark:text-gray-400 text-xs">px</span>
                  </template>
                </UInput>
              </div>
              <UTextarea v-model="chartDescription" :rows="3" placeholder="Description …" class="mt-2" />
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
                <UInput v-model="xAxisLabel" placeholder="X-axis label" :disabled="!showXAxis" />
                <UInput v-model="xAxisLabelSize" type="number" class="w-24" :disabled="!showXAxis">
                  <template #trailing>
                    <span class="text-gray-500 dark:text-gray-400 text-xs">px</span>
                  </template>
                </UInput>
                <USelectMenu v-model="selectedXLabelOptions" placeholder="0 selected" :options="labelOptions" class="w-40" multiple :disabled="!showXAxis" />
                <UToggle v-model="showXAxis" class="ml-2" />
              </div>
              <UFormGroup>
                <div class="flex w-full items-center gap-x-2">
                  <UInput v-model="yAxisLabel" placeholder="Y-axis label" :disabled="!showYAxis" />
                  <UInput v-model="yAxisLabelSize" type="number" class="w-24" :disabled="!showYAxis">
                    <template #trailing>
                      <span class="text-gray-500 dark:text-gray-400 text-xs">px</span>
                    </template>
                  </UInput>
                  <USelectMenu v-model="selectedYLabelOptions" placeholder="0 selected" :options="labelOptions" class="w-40" multiple :disabled="!showYAxis" />
                  <UToggle v-model="showYAxis" class="ml-2" />
                </div>
              </UFormGroup>
            </template>
            <template #options>
              <div class="grid grid-cols-3 gap-4">
                <UFormGroup label="Curve type">
                  <USelectMenu v-model="selectedChartType" :options="chartType" option-attribute="label" value-attribute="value" />
                </UFormGroup>
                <UFormGroup label="Line Width">
                  <UInput v-model="lineWidth" type="number" min="1">
                    <template #trailing>
                      <span class="text-gray-500 dark:text-gray-400 text-xs">px</span>
                    </template>
                  </UInput>
                </UFormGroup>
                <UFormGroup label="Dashes length">
                  <UInput v-model="lineDashChart" placeholder="No dashes" type="number" min="0" />
                </UFormGroup>
              </div>
              <UFormGroup label="Line Color">
                <div class="flex gap-x-3">
                  <div v-for="color in colorList" :key="color.name">
                    <input :id="color.name" v-model="colorChart" type="radio" name="color" :value="color.hex" class="hidden peer">
                    <label :for="color.name" class="flex size-7 cursor-pointer transition rounded-full ring-offset-2 ring-1 ring-transparent peer-checked:ring-black" :class="`bg-${color.name}-500 hover:bg-${color.name}-700`" />
                  </div>
                </div>
              </UFormGroup>
            </template>
          </UAccordion>
        </div>
      </div>
    </template>
  </ModalItem>
</template>

<script lang="ts" setup>
import { VisXYContainer, VisLine, VisAxis, VisTooltip, VisCrosshair } from '@unovis/vue'
import { type AnnotationItem } from '@unovis/ts'

const triggers = computed(() => {
  return (d: DataRecord) => `<span>x :  ${d.x}<br/>y :  ${d.y}</span>`
})

const colums = computed(() => [
  {
    key: 'valueX',
    label: xAxisLabel.value
  },
  {
    key: 'valueY',
    label: yAxisLabel.value
  },
  {
    key: 'actions',
  }
])

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

const data = reactive<DataRecord[]>([
  {
    x: 0,
    y: 0,
  },
  {
    x: 1,
    y: 2,
  },
  {
    x: 2,
    y: 1,
  },
  {
    x: 3,
    y: 5,
  },
  {
    x: 4,
    y: 4,
  }
])

const tableActions = (row: any, index: number) => [
  [{
    label: 'Duplicate',
    icon: 'i-heroicons-document-duplicate-20-solid',
    click: () => {
      data.splice(index + 1, 0, { ...row })
    }
  },{
    label: 'Move up',
    icon: 'i-heroicons-arrow-up-circle-20-solid',
    disabled: index === 0,
    click: () => {
      if (index > 0) {
        data.splice(index - 1, 0, data.splice(index, 1)[0])
      }
    }
  },{
    label: 'Move down',
    icon: 'i-heroicons-arrow-down-circle-20-solid',
    disabled: index === data.length - 1,
    click: () => {
      if (index < data.length - 1) {
        data.splice(index + 1, 0, data.splice(index, 1)[0])
      }
    }
  }], [{
    label: 'Add',
    icon: 'i-heroicons-plus-circle-20-solid',
    click: () => {
      data.push({
        x: null,
        y: null,
      })
    }
  }, {
    label: 'Delete',
    icon: 'i-heroicons-trash-20-solid',
    click: () => {
      data.splice(index, 1)
    }
  }]
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

const chartType = [{
    label: 'Basic',
    value: 'basis',
    icon: 'i-carbon-chart-line-smooth'
  }, {
    label: 'Linear',
    value: 'linear',
    icon: 'i-carbon-chart-line'
  }, {
    label: 'Step',
    value: 'step',
    icon: 'i-carbon-chart-stepper'
  }
]

const labelOptions = [
  'Grid line',
  'Domain line',
  'Tick line',
  'Tick label'
]

const selectedXLabelOptions = ref<Array<string>>([labelOptions[0], labelOptions[1], labelOptions[2], labelOptions[3]])
const selectedYLabelOptions = ref<Array<string>>([labelOptions[0], labelOptions[1], labelOptions[2], labelOptions[3]])
const componentKey = ref(0)
const showCrosshair = ref<boolean>(true)
const xAxisLabel = ref<string>('Abscissa (x)')
const yAxisLabel = ref<string>('Ordinates (y)')
const xAxisLabelSize = ref<number>(16)
const yAxisLabelSize = ref<number>(16)
const showXAxis = ref<boolean>(true)
const showYAxis = ref<boolean>(true)
const titleSize = ref<number>(30)
const chartTitle = ref<string>()
const chartDescription = ref<string>()
const lineWidth = ref<number>(2)
const colorChart = ref<string>('#3b82f6')
const lineDashChart = ref<number>(0)
const selectedChartType = ref<string>(chartType[0].value)
const x = computed(() => (d: DataRecord) => d.x)
const y = computed(() => (d: DataRecord) => d.y)
const lineDashCharts = computed(() => {
  return new Array<number>(lineDashChart.value).fill(lineDashChart.value)
})

watch(() => [showXAxis.value, showYAxis.value, showCrosshair.value], () => {
  forceRerender()
})

const forceRerender = () => {
  componentKey.value ++
}

const annotations = computed<AnnotationItem[]>(() => [
    { x: 1, y: 1, content: { text: chartTitle.value, fontSize: titleSize.value }},
    { x: 1, y: 5, width: 200, content: chartDescription.value }
  ]
)

defineEmits(['return', 'close'])

const values = computed<LineChartItem>(() => ({
  options: {
    axis: {
      x: {
        show: showXAxis.value,
        label: xAxisLabel.value,
        labelSize: xAxisLabelSize.value,
        options: selectedXLabelOptions.value
      },
      y: {
        show: showYAxis.value,
        label: yAxisLabel.value,
        labelSize: yAxisLabelSize.value,
        options: selectedYLabelOptions.value,
      }
    },
    annotations: annotations.value,
    crosshair: {
      show: showCrosshair.value,
      value: triggers.value
    },
    line: {
      type: selectedChartType.value,
      color: colorChart.value,
      width: lineWidth.value,
      dashes: lineDashCharts.value
    }
  },
  data : data,
}))
</script>
