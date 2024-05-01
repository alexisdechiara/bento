<template>
  <ModalItem :values="values" label="Line Chart" :component-id="8" :width="2" :height="2" :preserve-aspect-ratio="false" :is-submitable="data.length > 0" @return="$emit('return')" @close="$emit('close')">
    <template #preview>
      <ItemBarChart :values="values" />
    </template>
    <template #content>
      <div class="grid grid-cols-2 size-full overflow-hidden">
        <ClientOnly>
          <VisXYContainer :key="componentKey" :data="data" :margin="{ left: 0, top: 4, right: 16, bottom: 4 }" class="relative">
            <VisGroupedBar :orientation="bar.orientation" :rounded-corners="bar.roundedCorners" :color="(d: DataRecord, i: number) => colors[i]" :bar-padding="bar.barPadding" :group-padding="bar.groupPadding" :x="x" :y="y" />
            <VisAnnotations :items="annotationList" />
            <VisTooltip v-if="tooltip.show" :triggers="{[GroupedBar.selectors.bar]: triggers}" />
            <VisAxis v-if="axis.x.show" :label-font-size="axis.x.labelSize" :tick-text-font-size="!axis.x.options.includes('Tick label') ? 0 : 12" :grid-line="axis.x.options.includes('Grid line')" :tick-line="axis.x.options.includes('Tick line')" :domain-line="axis.x.options.includes('Domain line')" type="x" :label="axis.x.label" />
            <VisAxis v-if="axis.y.show" :label-font-size="axis.y.labelSize" :tick-text-font-size="!axis.y.options.includes('Tick label') ? 0 : 12" :grid-line="axis.y.options.includes('Grid line')" :tick-line="axis.y.options.includes('Tick line')" :domain-line="axis.y.options.includes('Domain line')" type="y" :label="axis.y.label" />
          </VisXYContainer>
        </ClientOnly>
        <ChartTable v-model:rows="data" v-model:columns="columns" v-model:x="x" v-model:y="y" v-model:colors="colors" @updated="forceRerender()" />
      </div>
    </template>
    <template #settings>
      <div class="grid grid-cols-2 size-full overflow-hidden">
        <ClientOnly>
          <VisXYContainer :key="componentKey" :data="data" :margin="{ left: 0, top: 4, right: 16, bottom: 4 }" class="relative">
            <VisGroupedBar :orientation="bar.orientation" :rounded-corners="bar.roundedCorners" :color="(d: DataRecord, i: number) => colors[i]" :bar-padding="bar.barPadding" :group-padding="bar.groupPadding" :x="x" :y="y" />
            <VisAnnotations :items="annotationList" />
            <VisTooltip v-if="tooltip.show" :triggers="{[GroupedBar.selectors.bar]: triggers}" />
            <VisAxis v-if="axis.x.show" :label-font-size="axis.x.labelSize" :tick-text-font-size="!axis.x.options.includes('Tick label') ? 0 : 12" :grid-line="axis.x.options.includes('Grid line')" :tick-line="axis.x.options.includes('Tick line')" :domain-line="axis.x.options.includes('Domain line')" type="x" :label="axis.x.label" />
            <VisAxis v-if="axis.y.show" :label-font-size="axis.y.labelSize" :tick-text-font-size="!axis.y.options.includes('Tick label') ? 0 : 12" :grid-line="axis.y.options.includes('Grid line')" :tick-line="axis.y.options.includes('Tick line')" :domain-line="axis.y.options.includes('Domain line')" type="y" :label="axis.y.label" />
          </VisXYContainer>
        </ClientOnly>
        <div class="flex flex-col max-h-full gap-y-4 py-1.5 pr-0.5 overflow-auto">
          <ChartOptions v-model:colors="colors" v-model:annotation="annotation" v-model:axis="axis" v-model:tooltip="tooltip" v-model:bar="bar" :label-options="labelOptions" :columns="columns.filter((c: any) => c.key.startsWith('y'))" />
        </div>
      </div>
    </template>
  </ModalItem>
</template>

<script lang="ts" setup>
import { VisXYContainer, VisGroupedBar, VisAxis, VisTooltip } from '@unovis/vue'
import { GroupedBar, type AnnotationItem } from '@unovis/ts'

const { labelOptions } = useLineChart()

function triggers(d: DataRecord): string {
  const title = `<div style="text-align: center; font-weight: 600; font-size: 16px">${d.x}</div>`
  const description = columns.value.map((c) => c.key).filter((k) => k.startsWith('y')).map((k) => `<span style="color:${colors.value[columns.value.findIndex((c) => c.key === k) - 1]}">${columns.value.find((c) => c.key === k)?.label} :  ${d[k]}</span>`).join('<br/>')
  return `<div style="font-size: 14px;font-weight: 500">${title}${description}</div>`
}

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

const bar = ref<barChart>({
  orientation: 'vertical',
  barPadding: 0,
  groupPadding: 0.2,
  roundedCorners: 0,
})

const tooltip = ref<chartTooltip>({
  show: true,
  content: triggers
})

const colors = ref<string[]>(['#3b82f6','#ef4444','#f59e0b', '#10b981', '#8b5cf6'])

const annotationList = computed<AnnotationItem[]>(() => [
  { x: 1, y: 1, content: { text: annotation.value.title, fontSize: annotation.value.titleSize }},
  { x: 1, y: 5, width: 200, content: annotation.value.description }
])

watch(() => [axis.value.x.show, axis.value.y.show, tooltip.value.show, colors.value], () => forceRerender(), {deep: true})

const forceRerender = () => {
  componentKey.value ++
}

defineEmits(['return', 'close'])

const values: BarChartItem = {
  options: {
    axis: axis.value,
    annotations: annotationList.value,
    colors: colors.value,
    tooltip: tooltip.value,
    bar: bar.value,
  },
  data : data,
  x: x.value,
  y: y.value
}
</script>
