<template>
  <div class="pb-5 flex justify-between w-full h-fit">
    <UButton :padded="false" color="gray" variant="link" icon="i-heroicons-arrow-left" @click="$emit('return')" />
    <UTabs :items="items" @change="onChangeTab" />
    <span />
  </div>

  <div v-if="currentTab === 0" class="grid grid-cols-2 gap-x-6">
    <div class="flex flex-col gap-y-2">
      <div class="flex justify-between gap-x-4">
        <UFormGroup label="Width">
          <UInput v-model="width" min="1" type="number" required>
            <template #leading>
              <UIcon name="i-radix-icons-width" dynamic />
            </template>
            <template #trailing>
              <span class="text-gray-500 dark:text-gray-400 text-xs">col</span>
            </template>
          </UInput>
        </UFormGroup>
        <UFormGroup label="Height">
          <UInput v-model="height" min="1" type="number" required>
            <template #leading>
              <UIcon name="i-radix-icons-height" dynamic />
            </template>
            <template #trailing>
              <span class="text-gray-500 dark:text-gray-400 text-xs">row</span>
            </template>
          </UInput>
        </UFormGroup>
      </div>
    </div>
  </div>

  <div v-else-if="currentTab === 1">
    <div class="grid grid-cols-2">
      <ClientOnly>
        <div class="chart flex justify-center items-center w-full">
          <apexchart type="radialBar" height="66%" :options="chartOptions" :series="series" />
        </div>
      </ClientOnly>
      <div class="flex flex-col h-full gap-y-4">
        <UFormGroup label="Type">
          <USelectMenu ref="chart" v-model="chartAngles" :options="chartType" option-attribute="name" value-attribute="values" @change="updateChartOptions" />
        </UFormGroup>
        <UFormGroup>
          <div class="flex w-full justify-between">
            Show title
            <UToggle v-model="showTitle" @update:model-value="updateChartOptions" />
          </div>
          <UInput v-model="chartTitle" :disabled="!showTitle" @change="updateChartOptions" />
        </UFormGroup>
        <UFormGroup label="Show total value" class="col-span-4">
          <UToggle v-model="showTotalValue" @update:model-value="updateChartOptions" />
        </UFormGroup>
        <UTable :empty-state="{ icon: 'i-heroicons-circle-stack-20-solid', label: 'No data' }" :rows="stats" :columns="colums" :ui="{td: { padding: 'p-0'}}">
          <template #label-data="{ row }">
            <input v-model.lazy="row.label" type="text" class="px-3 py-4 w-20" @change="updateChartOptions"> 
          </template>
          <template #value-data="{ row }">
            <input v-model.lazy="row.value" type="number" class="px-3 py-4 w-16" @change="updateChartOptions">
          </template>
          <template #color-data="{ row }">
            <div class="flex justify-center items-center px-3 py-4 w-full">
              <ColorPicker v-model:pureColor="row.color" format="hex6" shape="circle" round-history lang="En" @update:pure-color="updateChartOptions" />
            </div>
          </template>
          <template #actions-data="{ row, index }">
            <UDropdown :items="tableActions(row, index)">
              <UButton color="gray" variant="ghost" icon="i-heroicons-ellipsis-horizontal-20-solid" />
            </UDropdown>
          </template>
        </UTable>
      </div>
      <UButton block class="mt-4 col-span-2" @click="onSubmit()">
        Submit
      </UButton>
    </div>
  </div>
</template>

<script lang="ts" setup>

const colums = [{
  key: 'label',
  label: 'Label'
  },
  {
  key: 'value',
  label: 'Value'
  },
  {
  key: 'color',
  label: 'Color'
  },
  {
    key: 'actions',
  }]

const stats = reactive([
  {
    label: 'Apples',
    value: 44,
    color: '#008FFB'
  },
  {
    label: 'Oranges',
    value: 55,
    color: '#00E396'
  },
  {
    label: 'Bananas',
    value: 67,
    color: '#FEB019'
  },
  {
    label: 'Berries',
    value: 83,
    color: '#FF4560'
  }
])

const tableActions = (row, index) => [
  [{
    label: 'Duplicate',
    icon: 'i-heroicons-document-duplicate-20-solid',
    click: () => {
      stats.splice(index + 1, 0, { ...row })
      updateChartOptions()
    }
  },{
    label: 'Move up',
    icon: 'i-heroicons-arrow-up-circle-20-solid',
    disabled: index === 0,
    click: () => {
      if (index > 0) {
        stats.splice(index - 1, 0, stats.splice(index, 1)[0])
        updateChartOptions()
      }
    }
  },{
    label: 'Move down',
    icon: 'i-heroicons-arrow-down-circle-20-solid',
    disabled: index === stats.length - 1,
    click: () => {
      if (index < stats.length - 1) {
        stats.splice(index + 1, 0, stats.splice(index, 1)[0])
        updateChartOptions()
      }
    }
  }], [{
    label: 'Add',
    icon: 'i-heroicons-plus-circle-20-solid',
    click: () => {
      stats.push({
        label: '',
        value: 0,
        color: '#000000'
      })
      updateChartOptions()
    }
  }, {
    label: 'Delete',
    icon: 'i-heroicons-trash-20-solid',
    click: () => {
      stats.splice(index, 1)
    }
  }]
]

const chartType = [{
    name: 'Basic',
    values: [0, 360]
  }, {
    name: 'Circular gauge',
    values: [-135,135]
  }, {
    name: 'Semi circular gauge',
    values: [-90,90]
  }
]

const chartTitle = ref('Title')
const showTitle = ref(true)
const showTotalValue = ref(false)
const chartAngles = ref(chartType[0].values)
const width = ref(1)
const height = ref(1)
const currentTab = ref(0)
const series = computed(() => stats.map(item => item.value))
const colors = computed(() => stats.map(item => item.color))
const labels = computed(() => stats.map(item => item.label))
const chartOptions = ref({
  chart: {
    height: 'auto',
    type: 'radialBar',
  },
  plotOptions: {
    radialBar: {
      startAngle: chartAngles.value[0],
      endAngle: chartAngles.value[1],
      track: {
        startAngle: chartAngles.value[0],
        endAngle: chartAngles.value[1],
      },
      hollow: {
        size: '50%'
      },
      dataLabels: {
        total: {
          show: showTitle.value,
          align: 'center',
          label: chartTitle.value,
          color: 'inherit',
          formatter: function (w) {
            if (showTotalValue.value) {
              return (w.globals.seriesTotals.reduce((a, b) => {
                return a + b
              }, 0) / w.globals.series.length).toFixed(0) + '%'
            } else {
              return ''
            }
          }
        }
      }
    }
  },
  stroke: {
    lineCap: 'round',
  },
  labels: labels,
  colors: colors,
})

defineEmits(['return'])

const items = [{
  label: 'Item settings',
}, {
  label: 'Edit content',
}]

const onChangeTab = ((index) => {
  currentTab.value = index
})

const updateChartOptions = (() => {
  chartOptions.value = {
    ...chartOptions.value, ...{
      plotOptions: {
        radialBar: {
          startAngle: chartAngles.value[0],
          endAngle: chartAngles.value[1],
          track: {
            startAngle: chartAngles.value[0],
            endAngle: chartAngles.value[1],
          },
          hollow: {
            
          },
          dataLabels: {
            total: {
              show: showTitle.value,
              label: chartTitle.value,
            }
          }
        }
      },
      labels: labels.value,
      colors: colors.value,
    }
  }
})

const onSubmit = (() => {
  const gridStore = useGridStore()
  const item: Item = {
    label: 'Radial Chart',
    componentId: 2,
    h: height.value,
    w: width.value,
    chart: {
      chartOptions: chartOptions.value,
      series: series.value,
    }
  }
  gridStore.addItem(item)
})
</script>

<style lang="scss">
.dark .apexcharts-text {
  fill: white !important;
}
</style>