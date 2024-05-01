<template>
  <ModalItem :values="values" label="Line Chart" :component-id="7" :preserve-aspect-ratio="false" :is-submitable="data.length > 0" :width="2" :height="2" @return="$emit('return')" @close="$emit('close')">
    <template #preview>
      <ItemLineChart :values="values" />
    </template>
    <template #content>
      <div class="grid grid-cols-2 size-full overflow-hidden">
        <ClientOnly>
          <VisXYContainer :key="componentKey" :data="data" :margin="{ left: 0, top: 4, right: 16, bottom: 4 }" class="relative">
            <VisLine :curve-type="line.type" :line-width="line.width" :color="(d: DataRecord, i: number) => colors[i]" :line-dash-array="line.dashes" :x="x" :y="y" />
            <VisAnnotations :items="annotationList" />
            <VisTooltip />
            <VisAxis v-if="axis.x.show" :label-font-size="axis.x.labelSize" :tick-text-font-size="!axis.x.options.includes('Tick label') ? 0 : 12" :grid-line="axis.x.options.includes('Grid line')" :tick-line="axis.x.options.includes('Tick line')" :domain-line="axis.x.options.includes('Domain line')" type="x" :label="axis.x.label" />
            <VisAxis v-if="axis.y.show" :label-font-size="axis.y.labelSize" :tick-text-font-size="!axis.y.options.includes('Tick label') ? 0 : 12" :grid-line="axis.y.options.includes('Grid line')" :tick-line="axis.y.options.includes('Tick line')" :domain-line="axis.y.options.includes('Domain line')" type="y" :label="axis.y.label" />
            <VisCrosshair v-if="crosshair.show" :template="crosshair.content" />
          </VisXYContainer>
        </ClientOnly>
        <ChartTable v-model:rows="data" v-model:columns="columns" v-model:x="x" v-model:y="y" v-model:colors="colors" @updated="forceRerender()" />
      </div>
    </template>
    <template #settings>
      <div class="grid grid-cols-2 size-full overflow-hidden">
        <ClientOnly>
          <VisXYContainer :key="componentKey" :data="data" :margin="{ left: 0, top: 4, right: 16, bottom: 4 }" class="relative">
            <VisLine :curve-type="line.type" :line-width="line.width" :color="(d: DataRecord, i: number) => colors[i]" :line-dash-array="line.dashes" :x="x" :y="y" />
            <VisAnnotations :items="annotationList" />
            <VisTooltip />
            <VisAxis v-if="axis.x.show" :label-font-size="axis.x.labelSize" :tick-text-font-size="!axis.x.options.includes('Tick label') ? 0 : 12" :grid-line="axis.x.options.includes('Grid line')" :tick-line="axis.x.options.includes('Tick line')" :domain-line="axis.x.options.includes('Domain line')" type="x" :label="axis.x.label" />
            <VisAxis v-if="axis.y.show" :label-font-size="axis.y.labelSize" :tick-text-font-size="!axis.y.options.includes('Tick label') ? 0 : 12" :grid-line="axis.y.options.includes('Grid line')" :tick-line="axis.y.options.includes('Tick line')" :domain-line="axis.y.options.includes('Domain line')" type="y" :label="axis.y.label" />
            <VisCrosshair v-if="crosshair.show" :template="crosshair.content" />
          </VisXYContainer>
        </ClientOnly>
        <div class="flex flex-col max-h-full gap-y-4 py-1.5 pr-0.5 overflow-auto">
          <ChartOptions v-model:colors="colors" v-model:annotation="annotation" v-model:line="line" v-model:axis="axis" v-model:crosshair="crosshair" :line-types="types" :label-options="labelOptions" :columns="columns.filter((c: any) => c.key.startsWith('y'))" />
        </div>
      </div>
    </template>
  </ModalItem>
</template>

<script lang="ts" setup>
import { VisXYContainer, VisLine, VisAxis, VisTooltip, VisCrosshair } from '@unovis/vue'
import { Line, type AnnotationItem } from '@unovis/ts'
const { types, labelOptions } = useLineChart()

const columns = computed(() => [
  {
    key: 'x',
    label: axis.value.x.label,
    sortable: true,
  },
  {
    key: 'y1',
    label: axis.value.y.label
  },
  {
    key: 'actions',
  }
])

const data = reactive<DataRecord[]>([
  {
    x: 0,
    y1: 0,
  },
  {
    x: 1,
    y1: 2,
  },
  {
    x: 2,
    y1: 1,
  },
  {
    x: 3,
    y1: 5,
  },
  {
    x: 4,
    y1: 4,
  }
])

const componentKey = ref(0)
const x = computed(() => (d: DataRecord) => d.x)
const y = computed(() =>[(d: DataRecord) => d.y1])

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

function triggers(d: DataRecord): string {
  const title = `<div style="text-align: center; font-weight: 600; font-size: 16px">${d.x}</div>`
  const description = columns.value.map((c) => c.key).filter((k) => k.startsWith('y')).map((k) => `<span style="color:${colors.value[columns.value.findIndex((c) => c.key === k) - 1]}">${columns.value.find((c) => c.key === k)?.label} :  ${d[k]}</span>`).join('<br/>')
  return `<div style="font-size: 14px;font-weight: 500">${title}${description}</div>`
}

const crosshair = ref<chartCrosshair>({
  show: true,
  content: triggers
})

const colors = ref<string[]>(['#3b82f6','#ef4444','#f59e0b', '#10b981', '#8b5cf6'])

const annotationList = computed<AnnotationItem[]>(() => [
  { x: 1, y: 1, content: { text: annotation.value.title, fontSize: annotation.value.titleSize }},
  { x: 1, y: 5, width: 200, content: annotation.value.description }
])

watch(() => [axis.value.x.show, axis.value.y.show, crosshair.value.show, colors.value],  () => forceRerender(), {deep: true})

const forceRerender = () => {
  componentKey.value ++
}

defineEmits(['return', 'close'])

const values = computed<LineChartItem>(() => ({
  options: {
    axis: axis.value,
    annotations: annotationList.value,
    crosshair: crosshair.value,
    line: line.value,
    colors: colors.value
  },
  data : data,
  x: x.value,
  y: y.value
}))
</script>
