<template>
  <ModalItem :values="values" label="Line Chart" :component-id="7" :preserve-aspect-ratio="false" :is-submitable="data.length > 0" @return="$emit('return')" @close="$emit('close')">
    <template #preview>
      <ItemLineChart :values="values" />
    </template>
    <template #content>
      <div class="grid grid-cols-2 size-full overflow-hidden">
        <ClientOnly>
          <VisXYContainer :key="componentKey" :data="data" :margin="{ left: 0, top: 4, right: 16, bottom: 4 }" class="relative">
            <VisLine :curve-type="line.type" :line-width="line.width" :color="line.color" :line-dash-array="line.dashes" :x="x" :y="y" />
            <VisAnnotations :items="annotationList" />
            <VisTooltip />
            <VisAxis v-if="axis.x.show" :label-font-size="axis.x.labelSize" :tick-text-font-size="!axis.x.options.includes('Tick label') ? 0 : 12" :grid-line="axis.x.options.includes('Grid line')" :tick-line="axis.x.options.includes('Tick line')" :domain-line="axis.x.options.includes('Domain line')" type="x" :label="axis.x.label" />
            <VisAxis v-if="axis.y.show" :label-font-size="axis.y.labelSize" :tick-text-font-size="!axis.y.options.includes('Tick label') ? 0 : 12" :grid-line="axis.y.options.includes('Grid line')" :tick-line="axis.y.options.includes('Tick line')" :domain-line="axis.y.options.includes('Domain line')" type="y" :label="axis.y.label" />
            <VisCrosshair v-if="showCrosshair" :template="triggers" />
          </VisXYContainer>
        </ClientOnly>
        <div class="max-h-full h-fit overflow-auto rounded-t my-1.5">
          <UTable :empty-state="{ icon: 'i-heroicons-circle-stack-20-solid', label: 'No data' }" :rows="data" :columns="colums" :ui="{ thead: 'bg-gray-50 dark:bg-gray-700', td: { padding: 'p-0' } }">
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
            <VisLine :curve-type="line.type" :line-width="line.width" :color="line.color" :line-dash-array="line.dashes" :x="x" :y="y" />
            <VisAnnotations :items="annotationList" />
            <VisTooltip />
            <VisAxis v-if="axis.x.show" :label-font-size="axis.x.labelSize" :tick-text-font-size="!axis.x.options.includes('Tick label') ? 0 : 12" :grid-line="axis.x.options.includes('Grid line')" :tick-line="axis.x.options.includes('Tick line')" :domain-line="axis.x.options.includes('Domain line')" type="x" :label="axis.x.label" />
            <VisAxis v-if="axis.y.show" :label-font-size="axis.y.labelSize" :tick-text-font-size="!axis.y.options.includes('Tick label') ? 0 : 12" :grid-line="axis.y.options.includes('Grid line')" :tick-line="axis.y.options.includes('Tick line')" :domain-line="axis.y.options.includes('Domain line')" type="y" :label="axis.y.label" />
            <VisCrosshair v-if="showCrosshair" :template="triggers" />
          </VisXYContainer>
        </ClientOnly>
        <div class="flex flex-col max-h-full gap-y-4 py-1.5 pr-0.5 overflow-auto">
          <ChartOptions v-model:annotation="annotation" v-model:line="line" v-model:axis="axis" v-model:show-crosshair="showCrosshair" :line-types="types" :label-options="labelOptions" />
        </div>
      </div>
    </template>
  </ModalItem>
</template>

<script lang="ts" setup>
import { VisXYContainer, VisLine, VisAxis, VisTooltip, VisCrosshair } from '@unovis/vue'
import type { AnnotationItem } from '@unovis/ts'
import ChartOptions from '../ChartOptions.vue';
const { types, labelOptions } = useLineChart()

const triggers = computed(() => {
  return (d: DataRecord) => `<span>x :  ${d.x}<br/>y :  ${d.y}</span>`
})

const colums = computed(() => [
  {
    key: 'valueX',
    label: axis.value.x.label
  },
  {
    key: 'valueY',
    label: axis.value.y.label
  },
  {
    key: 'actions',
  }
])

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

const componentKey = ref(0)
const x = computed(() => (d: DataRecord) => d.x)
const y = computed(() => (d: DataRecord) => d.y)

const annotation = ref<annotationChart>({
  title: 'Title',
  titleSize: 30,
  description: 'Description',
})
const axis = ref<chartAxis>({
  x: {
    show: true,
    label: 'Abscissa (X)',
    labelSize: 16,
    options: [labelOptions[0], labelOptions[1], labelOptions[2], labelOptions[3]]
  },
  y: {
    show: true,
    label: 'Ordonates (Y)',
    labelSize: 16,
    options: [labelOptions[0], labelOptions[1], labelOptions[2], labelOptions[3]]
  }
})
const line = ref<lineChart>({
  type: types[0].value,
  color: '#3b82f6',
  width: 2,
  dashes: [0]
})

const showCrosshair = ref<boolean>(true)

const annotationList = computed<AnnotationItem[]>(() => [
  { x: 1, y: 1, content: { text: annotation.value.title, fontSize: annotation.value.titleSize }},
  { x: 1, y: 5, width: 200, content: annotation.value.description }
])

watch(() => [axis.value.x.show, axis.value.y.show, showCrosshair.value], () => {
  forceRerender()
})

const forceRerender = () => {
  componentKey.value ++
}

defineEmits(['return', 'close'])

const values = computed<LineChartItem>(() => ({
  options: {
    axis: axis.value,
    annotations: annotationList.value,
    crosshair: {
      show: showCrosshair.value,
      value: triggers.value
    },
    line: line.value
  },
  data : data,
}))
</script>
