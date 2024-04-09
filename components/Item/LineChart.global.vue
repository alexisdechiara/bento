<script lang="ts" setup>
import { VisXYContainer, VisLine, VisAxis, VisTooltip, VisCrosshair } from '@unovis/vue'

defineProps<{
  values: LineChartItem
}>()

defineEmits(['remove', 'edit'])
</script>

<template>
  <div class="relative w-full h-full group">
    <UButton icon="i-heroicons-pencil" size="2xs" color="primary" variant="soft" class="absolute invisible group-hover:visible bottom-4 right-12 z-10" @click="$emit('edit')" />
    <UButton icon="i-heroicons-trash" size="2xs" color="red" variant="soft" class="absolute invisible group-hover:visible bottom-4 right-4 z-10" @click="$emit('remove')" />
    <VisXYContainer :data="values.data" class="relative size-full"> <!-- :margin="{ left: 16, top: 32, right: 32, bottom: 16 }" -->
      <VisLine :curve-type="values.options.line.type" :line-width="values.options.line.width" :color="values.options.line.color" :line-dash-array="values.options.line.dashes" :x="(d: DataRecord) => d.x" :y="(d: DataRecord) => d.y" />
      <VisAnnotations :items="values.options.annotations" />
      <VisTooltip />
      <VisAxis v-if="values.options.xAxis.show" :label-font-size="values.options.xAxis.labelSize" :tick-text-font-size="!values.options.xAxis.options.includes('Tick label') ? 0 : 12" :grid-line="values.options.xAxis.options.includes('Grid line')" :tick-line="values.options.xAxis.options.includes('Tick line')" :domain-line="values.options.xAxis.options.includes('Domain line')" type="x" :label="values.options.xAxis.label" />
      <VisAxis v-if="values.options.yAxis.show" :label-font-size="values.options.yAxis.labelSize" :tick-text-font-size="!values.options.yAxis.options.includes('Tick label') ? 0 : 12" :grid-line="values.options.yAxis.options.includes('Grid line')" :tick-line="values.options.yAxis.options.includes('Tick line')" :domain-line="values.options.yAxis.options.includes('Domain line')" type="y" :label="values.options.yAxis.label" />
      <VisCrosshair :template="values.options.crosshair" />
    </VisXYContainer>
  </div>
</template>
