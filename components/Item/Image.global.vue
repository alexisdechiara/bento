<script lang="ts" setup>
import type { ImageItem } from '~/types'

defineProps<{
  values: ImageItem
}>()

</script>

<template>
  <NuxtImg :src="values.url" class="w-full h-full object-cover overflow-hidden" fit="cover" />
</template>
