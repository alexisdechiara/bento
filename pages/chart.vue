<script setup lang="ts">
import { VisXYContainer, VisLine } from '@unovis/vue'

const data = ref<DataRecord[]>([
  { x: 0, y: 0 },
  { x: 1, y: 2 },
  { x: 5, y: 10 },
  { x: 10, y: 5 },
  { x: 16, y: 8 },
  ])
const x = (d: DataRecord) => d.x
const y = (d: DataRecord) => d.y
</script>

<template>
  <VisXYContainer :data="data">
    <VisLine :x="x" :y="y" />
  </VisXYContainer>
</template>
