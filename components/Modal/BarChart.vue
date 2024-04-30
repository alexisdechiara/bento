<template>
  <ModalItem :values="values" label="Line Chart" :component-id="8" :width="2" :height="2" :preserve-aspect-ratio="false" :is-submitable="data.length > 0" @return="$emit('return')" @close="$emit('close')">
    <template #preview>
      <ItemBarChart :values="values" />
    </template>
    <template #content>
      <div class="grid grid-cols-2 size-full overflow-hidden">
        <ClientOnly>
          <VisXYContainer :key="componentKey" :data="data" :margin="{ left: 0, top: 4, right: 16, bottom: 4 }" class="relative">
            <VisGroupedBar :orientation="bar.orientation" :rounded-corners="bar.roundedCorners" :color="color" :bar-padding="bar.barPadding" :group-padding="bar.groupPadding" :x="x" :y="y" />
            <VisAnnotations :items="annotationList" />
            <VisTooltip />
            <VisAxis v-if="axis.x.show" :label-font-size="axis.x.labelSize" :tick-text-font-size="!axis.x.options.includes('Tick label') ? 0 : 12" :grid-line="axis.x.options.includes('Grid line')" :tick-line="axis.x.options.includes('Tick line')" :domain-line="axis.x.options.includes('Domain line')" type="x" :label="axis.x.label" />
            <VisAxis v-if="axis.y.show" :label-font-size="axis.y.labelSize" :tick-text-font-size="!axis.y.options.includes('Tick label') ? 0 : 12" :grid-line="axis.y.options.includes('Grid line')" :tick-line="axis.y.options.includes('Tick line')" :domain-line="axis.y.options.includes('Domain line')" type="y" :label="axis.y.label" />
            <VisCrosshair v-if="showCrosshair" :template="triggers" />
          </VisXYContainer>
        </ClientOnly>
        <div class="max-h-full h-fit max-w-full overflow-scroll rounded-t my-1.5 UTable">
          <UTable :key="componentKey" :sort-button="{ icon: 'i-heroicons-arrows-up-down-20-solid', color: 'gray', variant: 'soft', square: true, class:'text-black font-semibold' }" sort-asc-icon="i-heroicons-bars-arrow-down-20-solid" sort-desc-icon="i-heroicons-bars-arrow-up-20-solid" :empty-state="{ icon: 'i-heroicons-circle-stack-20-solid', label: 'No data' }" :rows="data" :columns="columns" :ui="{ wrapper:'overflow-visible', base:'table-auto', thead: 'bg-gray-50 dark:bg-gray-700', th: { base: 'text-nowrap' }, td: { padding: 'p-0' } }">
            <template v-for="key in columns.map((c) => c.key).filter((k) => k.startsWith('y'))" :key="key" #[`${key}-header`]="{ column }">
              <UDropdown :items="headerActions(column)" :popper="{ placement: 'bottom' }">
                <UButton color="gray" variant="soft" class="group text-black font-semibold">
                  <template #leading>
                    <span class="rounded-full size-4" :style="{ backgroundColor: colors[columns.findIndex((c) => c.key === column.key)-1] }" />
                  </template>
                  <template #trailing>
                    <UIcon name="i-heroicons-ellipsis-horizontal-20-solid" class="invisible group-hover:visible" />
                  </template>
                  {{ column.label }}
                </UButton>
              </UDropdown>
            </template>
            <template #x-data="{ row }">
              <div class="bg-gray-50 dark:bg-gray-700">
                <UInput v-model.lazy="row.x" type="number" variant="none" color="gray" class="p-1 w-full border-r font-semibold text-black" />
              </div>
            </template>
            <template v-for="key in columns.map((c) => c.key).filter((k) => k.startsWith('y'))" :key="key" #[`${key}-data`]="{ row }">
              <UInput v-model.lazy="row[key]" type="number" variant="none" class="p-1 w-full border-r" />
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
            <VisGroupedBar :orientation="bar.orientation" :rounded-corners="bar.roundedCorners" :color="color" :bar-padding="bar.barPadding" :group-padding="bar.groupPadding" :x="x" :y="y" />
            <VisAnnotations :items="annotationList" />
            <VisTooltip :triggers="{[GroupedBar.selectors.bar]: triggers}" />
            <VisAxis v-if="axis.x.show" :label-font-size="axis.x.labelSize" :tick-text-font-size="!axis.x.options.includes('Tick label') ? 0 : 12" :grid-line="axis.x.options.includes('Grid line')" :tick-line="axis.x.options.includes('Tick line')" :domain-line="axis.x.options.includes('Domain line')" type="x" :label="axis.x.label" />
            <VisAxis v-if="axis.y.show" :label-font-size="axis.y.labelSize" :tick-text-font-size="!axis.y.options.includes('Tick label') ? 0 : 12" :grid-line="axis.y.options.includes('Grid line')" :tick-line="axis.y.options.includes('Tick line')" :domain-line="axis.y.options.includes('Domain line')" type="y" :label="axis.y.label" />
          </VisXYContainer>
        </ClientOnly>
        <div class="flex flex-col max-h-full gap-y-4 py-1.5 pr-0.5 overflow-auto">
          <ChartOptions v-model:colors="colors" v-model:annotation="annotation" v-model:axis="axis" v-model:show-crosshair="showCrosshair" v-model:bar="bar" :label-options="labelOptions" :columns="columns.filter((c: any) => c.key.startsWith('y'))" />
        </div>
      </div>
    </template>
  </ModalItem>
</template>

<script lang="ts" setup>
import { VisXYContainer, VisGroupedBar, VisAxis, VisTooltip } from '@unovis/vue'
import { GroupedBar, type AnnotationItem } from '@unovis/ts'
const { labelOptions } = useLineChart()

const triggers = computed(() => {
  return (d: DataRecord) => `<div>${d.x}<br/>` + columns.value.map((c) => c.key).filter((k) => k.startsWith('y')).map((k) => `${columns.value.find((c) => c.key === k)?.label} :  ${d[k]}`).join('<br/>') + '</div>'
})

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

let nbY = 1

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

const headerActions = (column: any) => {
  const index = columns.value.findIndex((c) => c.key === column.key)
  return [
    [
      {
        label: 'Rename',
        icon: 'i-fluent-rename-20-filled',
        click: () => columns.value.find((c) => c.key === column.key).label = prompt('Enter new label', columns.value.find((c) => c.key === column.key).label)
      }
    ],
    [
      {
        label: 'Duplicate',
        icon: 'i-heroicons-document-duplicate-20-solid',
        click: () => addYColumn(index + 1, column)
      },
      {
        label: 'Move left',
        icon: 'i-heroicons-arrow-left-circle-20-solid',
        disabled: index < 2,
        click: () => moveYColumn(index, index - 1)
      },
      {
        label: 'Move right',
        icon: 'i-heroicons-arrow-right-circle-20-solid',
        disabled: index === columns.value.length - 2,
        click: () => moveYColumn(index, index + 1)
      }
    ],
    [
      {
        label: 'Add',
        icon: 'i-heroicons-plus-circle-20-solid',
        click: () =>  addYColumn(columns.value.length - 1)
      },
      {
        label: 'Delete',
        icon: 'i-heroicons-trash-20-solid',
        click: () => {
          removeYColumn(index)
        }
      }
    ]
  ]
}

function incrementNbY() {
  nbY = nbY + 1
}

const moveYColumn = (from: number, to: number) => {
  columns.value.splice(to, 0, columns.value.splice(from, 1)[0])
  data.forEach((d) => {
    const [fromKey, toKey] = [columns.value[from].key, columns.value[to].key]
    const [fromValue, toValue] = [d[fromKey], d[toKey]]
    d[fromKey] = toValue
    d[toKey] = fromValue
  })
  colors.value.splice(to - 1, 0, colors.value.splice(from -1, 1)[0])
  forceRerender()
}

const addYColumn = (index: number, column?: any) => {
  incrementNbY()
  const key = 'y' + nbY
  columns.value.splice(index, 0, {
    key: key,
    label: column ? 'Copy of ' + column.label.charAt(0).toLowerCase() + column.label.slice(1) : 'Ordonates (Y' + nbY + ')'
  })
  data.forEach((d) => {
    d['y' + nbY] = column ? d[column.key] : null
  })
  y.value.splice(index, 0, (d) => d[key])
  forceRerender()
}

const removeYColumn = (index: number) => {
  const key = columns.value[index].key
  columns.value.splice(index, 1)
  data.forEach((d) => {
    delete d[key]
  })
  y.value.splice(index - 1, 1)
  forceRerender()
}

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
  groupPadding: 0.5,
  roundedCorners: 0,
})

const colors = ref<string[]>(['#3b82f6','#ef4444','#f59e0b', '#10b981', '#8b5cf6'])

const color = computed(() => (d: DataRecord, i: number) => colors.value[i])

const showCrosshair = ref<boolean>(true)

const annotationList = computed<AnnotationItem[]>(() => [
  { x: 1, y: 1, content: { text: annotation.value.title, fontSize: annotation.value.titleSize }},
  { x: 1, y: 5, width: 200, content: annotation.value.description }
])

watch(() => [axis.value.x.show, axis.value.y.show, showCrosshair.value, colors.value], () => forceRerender(), {deep: true})

const forceRerender = () => {
  componentKey.value ++
}

defineEmits(['return', 'close'])

const values: BarChartItem = {
  options: {
    axis: axis.value,
    annotations: annotationList.value,
    crosshair: {
      show: showCrosshair.value,
      value: triggers.value
    },
    color: color.value,
    bar: bar.value,
  },
  data : data,
  x: x.value,
  y: y.value
}
</script>
