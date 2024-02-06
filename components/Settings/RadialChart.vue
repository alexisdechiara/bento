<template>
  <SettingsItem v-model="values" label="Radial Chart" :component-id="2" :preserve-aspect-ratio="true" :is-submitable="stats.length > 0" @return="$emit('return')">
    <template #preview>
      <ItemRadialChart :values="values" />
    </template>
    <template #content>
      <div class="grid grid-cols-2">
        <ClientOnly>
          <div class="chart flex justify-center items-center w-full">
            <apexchart type="radialBar" height="66%" :options="chartOptions" :series="series" />
          </div>
        </ClientOnly>
        <div class="flex flex-col h-full gap-y-4">
          <UFormGroup label="Type">
            <USelectMenu ref="chart" v-model="selectedChartType" :options="chartType" option-attribute="label" />
          </UFormGroup>
          <div class="flex w-full items-center gap-x-4">
            <UInput v-model="chartTitle" placeholder="Chart title" class="w-full" :disabled="!showTitle" />
            <UToggle v-model="showTitle" />
          </div>
          <div class="flex w-full items-center gap-x-4">
            <label class="w-full grow">Show total value</label>
            <UToggle v-model="showTotalValue" />
          </div>
          <div class="max-h-72 overflow-auto">
            <UTable :empty-state="{ icon: 'i-heroicons-circle-stack-20-solid', label: 'No data' }" :rows="stats" :columns="colums" :ui="{ td: { base: 'w-min', padding: 'p-0' } }">
              <template #label-data="{ row }">
                <input v-model.lazy="row.label" type="text" class="px-3 py-4 w-full">
              </template>
              <template #value-data="{ row }">
                <input v-model.lazy="row.value" type="number" min="0" class="px-3 py-4 w-full">
              </template>
              <template #color-data="{ row }">
                <div class="flex justify-center items-center px-3 py-4 w-20">
                  <ColorPicker v-model:pureColor="row.color" format="hex6" shape="circle" round-history lang="En" />
                </div>
              </template>
              <template #actions-data="{ row, index }">
                <UDropdown :items="tableActions(row, index)" class="w-max">
                  <UButton color="gray" variant="ghost" icon="i-heroicons-ellipsis-horizontal-20-solid" />
                </UDropdown>
              </template>
            </UTable>
          </div>
        </div>
      </div>
    </template>
  </SettingsItem>
</template>

<script lang="ts" setup>

const colums = [{
  key: 'label',
  label: 'Label'
  },
  {
  key: 'value',
  label: 'Value (%)'
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

const tableActions = (row: any, index: number) => [
  [{
    label: 'Duplicate',
    icon: 'i-heroicons-document-duplicate-20-solid',
    click: () => {
      stats.splice(index + 1, 0, { ...row })
    }
  },{
    label: 'Move up',
    icon: 'i-heroicons-arrow-up-circle-20-solid',
    disabled: index === 0,
    click: () => {
      if (index > 0) {
        stats.splice(index - 1, 0, stats.splice(index, 1)[0])
      }
    }
  },{
    label: 'Move down',
    icon: 'i-heroicons-arrow-down-circle-20-solid',
    disabled: index === stats.length - 1,
    click: () => {
      if (index < stats.length - 1) {
        stats.splice(index + 1, 0, stats.splice(index, 1)[0])
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
    label: 'Basic',
    angles: [0, 360]
  }, {
    label: 'Circular gauge',
    angles: [-135,135]
  }, {
    label: 'Semi circular gauge',
    angles: [-90,90]
  }
]

const chartTitle = ref('Title')
const showTitle = ref(true)
const showTotalValue = ref(false)
const selectedChartType = ref(chartType[0])
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
      startAngle: selectedChartType.value.angles[0],
      endAngle: selectedChartType.value.angles[1],
      track: {
        startAngle: selectedChartType.value.angles[0],
        endAngle: selectedChartType.value.angles[1],
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

const updateChartOptions = (() => {
  chartOptions.value = {
    ...chartOptions.value, ...{
      plotOptions: {
        radialBar: {
          startAngle: selectedChartType.value.angles[0],
          endAngle: selectedChartType.value.angles[1],
          track: {
            startAngle: selectedChartType.value.angles[0],
            endAngle: selectedChartType.value.angles[1],
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

watch([stats, showTitle, showTotalValue, selectedChartType, chartTitle], () => {
  updateChartOptions()
})

const values = computed(() => ({
  chartOptions: chartOptions.value,
  series: series.value
}))
</script>

<style lang="scss">
.dark .apexcharts-text {
  fill: white !important;
}
</style>
