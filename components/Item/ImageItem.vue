<script lang="ts" setup>
import type { Image } from '~/stores/grid'

defineProps<{
  value: Image
}>()
</script>

<template>
  <div class="relative w-full h-full group">
    <UButton icon="i-heroicons-pencil" size="2xs" color="primary" variant="soft" class="absolute invisible group-hover:visible bottom-4 right-4 z-10" />
    <NuxtImg :src="value.url" class="w-full h-full object-cover rounded-lg overflow-hidden" fit="cover" />
  </div>
</template>
