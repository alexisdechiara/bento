<template>
  <ModalItem :values="values" label="Line Chart" :component-id="7" :preserve-aspect-ratio="false" :is-submitable="data.length > 0" @return="$emit('return')" @close="$emit('close')">
    <template #preview>
      <ItemLineChart :values="values" />
    </template>
    <template #content>
      <div class="grid grid-cols-2 size-full overflow-hidden">
        <VisXYContainer :data="data" :margin="{ right: 16 }" class="relative">
          <VisLine :curve-type="selectedChartType" :line-width="lineWidth" :color="colorChart" :line-dash-array="lineDashCharts" :x="x" :y="y" />
          <VisAnnotations :items="annotations" />
          <VisTooltip />
          <VisAxis v-if="showXAxis" :label-font-size="xAxisLabelSize" :tick-text-font-size="!selectedXLabelOptions.includes('Tick label') ? 0 : 12" :grid-line="selectedXLabelOptions.includes('Grid line')" :tick-line="selectedXLabelOptions.includes('Tick line')" :domain-line="selectedXLabelOptions.includes('Domain line')" type="x" :label="xAxisLabel" />
          <VisAxis v-if="showYAxis" :label-font-size="yAxisLabelSize" :tick-text-font-size="!selectedYLabelOptions.includes('Tick label') ? 0 : 12" :grid-line="selectedYLabelOptions.includes('Grid line')" :tick-line="selectedYLabelOptions.includes('Tick line')" :domain-line="selectedYLabelOptions.includes('Domain line')" type="y" :label="yAxisLabel" />
          <VisCrosshair :template="triggers" />
          <!-- <div class="flex flex-col bg-white/90 opacity-25 hover:opacity-100 transition-opacity absolute bottom-8 right-0 rounded-md w-fit p-2 mr-8">
            <span class="text-lg font-medium text-gray-500 dark:text-gray-400 text-center mb-2">
              Grid lines
            </span>
            <div class="flex flex-col w-fit gap-y-1.5">
              <label class="flex items-center gap-x-2 text-gray-700">
                abscissa (x)
                <UToggle v-model="showXAxis" />
              </label>
              <label class="flex items-center gap-x-2 text-gray-700">
                ordinate (y)
                <UToggle v-model="showYAxis" />
              </label>
            </div>
          </div> -->
        </VisXYContainer>
        <div class="flex flex-col h-full gap-y-4">
          <div class="flex w-full items-center gap-x-4">
            <UInput v-model="chartTitle" placeholder="Chart title" class="w-full" :disabled="!showTitle" />
            <UInput v-model="titleSize" type="number" class="w-32" :disabled="!showTitle">
              <template #trailing>
                <span class="text-gray-500 dark:text-gray-400 text-xs">px</span>
              </template>
            </UInput>
            <UToggle v-model="showTitle" />
          </div>
          <UFormGroup label="abscissa (x)">
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
          </UFormGroup>
          <UFormGroup label="ordinates (y)">
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

          <div class="grid grid-cols-12 gap-x-4">
            <UFormGroup label="Curve type" class="col-span-3">
              <USelectMenu v-model="selectedChartType" :options="chartType" option-attribute="label" value-attribute="value" />
            </UFormGroup>
            <UFormGroup label="Line Width" class="col-span-3">
              <UInput v-model="lineWidth" type="number" min="1" />
            </UFormGroup>
            <UFormGroup label="Line dashes" class="col-span-3">
              <UInput v-model="lineDashChart" type="number" min="0" />
            </UFormGroup>
            <UFormGroup label="Line Color" class="col-span-3">
              <ColorPicker v-model:pureColor="colorChart" format="hex6" round-history lang="En" />
            </UFormGroup>
          </div>
          <div class="max-h-72 overflow-auto">
            <UTable :empty-state="{ icon: 'i-heroicons-circle-stack-20-solid', label: 'No data' }" :rows="data" :columns="colums" :ui="{ td: { base: 'w-min', padding: 'p-0' } }">
              <template #valueX-data="{ row }">
                <input v-model.lazy="row.x" type="number" class="p-1 w-full">
              </template>
              <template #valueY-data="{ row }">
                <input v-model.lazy="row.y" type="number" class="p-1 w-full border-l">
              </template>
              <template #actions-data="{ row, index }">
                <UDropdown :items="tableActions(row, index)" class="w-max">
                  <UButton color="gray" variant="ghost" size="sm" icon="i-heroicons-ellipsis-horizontal-20-solid" />
                </UDropdown>
              </template>
            </UTable>
          </div>
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

const colums = [
  {
    key: 'valueX',
    label: 'Value (X)'
  },
  {
    key: 'valueY',
    label: 'Value (Y)'
  },
  {
    key: 'actions',
  }]

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
  },
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

const chartType = [{
    label: 'Basic',
    value: 'basis'
  }, {
    label: 'Linear',
    value: 'linear'
  }, {
    label: 'Step',
    value: 'step'
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

const xAxisLabel = ref<string>('X')
const yAxisLabel = ref<string>('Y')
const xAxisLabelSize = ref<number>(16)
const yAxisLabelSize = ref<number>(16)
const showXAxis = ref<boolean>(true)
const showYAxis = ref<boolean>(true)
const titleSize = ref<number>(30)
const chartTitle = ref<string>('Title')
const showTitle = ref<boolean>(true)
const lineWidth = ref<number>(2)
const colorChart = ref<string>('#4d8cfd')
const lineDashChart = ref<number>(0)
const selectedChartType = ref<string>(chartType[0].value)
const x = computed(() => (d: DataRecord) => d.x)
const y = computed(() => (d: DataRecord) => d.y)
const lineDashCharts = computed(() => {
  return new Array<number>(lineDashChart.value).fill(lineDashChart.value)
})

const annotations = computed<AnnotationItem[]>(() => [
    { x: 1, y: 1, content: { text: chartTitle.value, fontSize: titleSize.value }},
    { x: 15, y: 50, width: 200, content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam rutrum dignissim lorem, a mollis lacus lacinia eget' }
  ]
)

defineEmits(['return', 'close'])

const values = computed<LineChartItem>(() => ({
  options: {
    title: {
      showTitle: showTitle.value,
      value: chartTitle.value,
    },
    xAxis: {
      show: showXAxis.value,
      label: xAxisLabel.value,
      labelSize: xAxisLabelSize.value,
      options: selectedXLabelOptions.value
    },
    yAxis: {
      show: showYAxis.value,
      label: yAxisLabel.value,
      labelSize: yAxisLabelSize.value,
      options: selectedYLabelOptions.value,
    },
    annotations: annotations.value,
    crosshair: triggers.value,
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
