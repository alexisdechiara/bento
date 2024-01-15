<script lang="ts" setup>
import type { ChartItem } from '~/types'

defineProps<{
  value: ChartItem
}>()

defineEmits(['remove', 'edit'])
</script>

<template>
  <div id="chart" class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-full w-full flow-root ">
    <ClientOnly>
      <apexchart type="radialBar" height="100%" width="100%" :options="value.chartOptions" :series="value.series" />
    </ClientOnly>
  </div>
</template>