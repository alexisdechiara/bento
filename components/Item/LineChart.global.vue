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
    <VisXYContainer :data="values.data" class="relative size-full" :margin="values.options.axis.x.show && values.options.axis.y.show ? { left: 8, top: 16, right: 16, bottom: 8 } : { top: 0, right: 0, bottom: 0, left: 0 }">
      <VisLine :curve-type="values.options.line.type" :line-width="values.options.line.width" :color="values.options.line.color" :line-dash-array="values.options.line.dashes" :x="(d: DataRecord) => d.x" :y="(d: DataRecord) => d.y" />
      <VisAnnotations :items="values.options.annotations" />
      <VisAxis v-if="values.options.axis.x.show" :label-font-size="values.options.axis.x.labelSize" :tick-text-font-size="!values.options.axis.x.options.includes('Tick label') ? 0 : 12" :grid-line="values.options.axis.x.options.includes('Grid line')" :tick-line="values.options.axis.x.options.includes('Tick line')" :domain-line="values.options.axis.x.options.includes('Domain line')" type="x" :label="values.options.axis.x.label" />
      <VisAxis v-if="values.options.axis.y.show" :label-font-size="values.options.axis.y.labelSize" :tick-text-font-size="!values.options.axis.y.options.includes('Tick label') ? 0 : 12" :grid-line="values.options.axis.y.options.includes('Grid line')" :tick-line="values.options.axis.y.options.includes('Tick line')" :domain-line="values.options.axis.y.options.includes('Domain line')" type="y" :label="values.options.axis.y.label" />
      <VisCrosshair v-if="values.options.crosshair.show" :template="values.options.crosshair.value" />
    </VisXYContainer>
  </div>
</template>
