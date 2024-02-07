<template>
  <div v-if="!componentName" class="flex gap-x-4 size-full">
    <UTabs :items="filters" orientation="vertical" :ui="{ container:'w-full h-full px-6 py-5 overflow-auto', wrapper: 'flex items-center', list: { padding: 'p-2', width: 'w-48 h-full rounded-none' } }">
      <template #item="{ item }">
        <div class="grid grid-cols-2 gap-4 ">
          <template v-if="item.label === 'Content' || item.label === 'All'">
            <UICard title="Image" description="An image that can be edit to shrink in a bento box" icon="i-ic-round-landscape" @click="setComponent(ModalImage)" />
          </template>
          <template v-if="item.label === 'Chart' || item.label === 'All'">
            <UICard title="Line Chart" description="Displays data points over a continuous interval, often used to show trends" icon="i-lucide-line-chart" @click="setComponent(ModalImage)" />
            <UICard title="Radial Chart" description="An image that can be edit to shrink in a bento box" icon="i-tdesign-chart-radial" @click="setComponent(ModalRadialChart)" />
            <UICard title="Bar Chart" description="Represents data using rectangular bars, where the length of each bar corresponds to the value it represents" icon="i-lucide-bar-chart-3" @click="setComponent(ModalImage)" />
            <UICard title="Pie Chart" description="Illustrates data in a circular graph, with each slice representing a proportion of the whole" icon="i-heroicons-chart-pie" @click="setComponent(ModalImage)" />
          </template>
        </div>
      </template>
    </UTabs>
  </div>

  <div v-else class="flex flex-col px-4 py-5 sm:p-6 size-full relative gap-y-2">
    <component :is="componentName" @return="componentName = ''" @close="$emit('close')" />
  </div>
</template>

<script lang="ts" setup>
import ModalImage from './Image.vue'
import ModalRadialChart from './RadialChart.vue'

const componentName = ref('')
defineEmits(['close'])

const setComponent = ((e: any) => {
  componentName.value = e
})

const filters = [{
  label: 'All',
}, {
  label: 'Content',
}, {
  label: 'Chart',
}]
</script>
