<script lang="ts" setup>
import type { ImageItem } from '~/types'

defineProps<{
  value: ImageItem
}>()

defineEmits(['remove', 'edit'])
</script>

<template>
  <div class="relative w-full h-full group">
    <UButton icon="i-heroicons-pencil" size="2xs" color="primary" variant="soft" class="absolute invisible group-hover:visible bottom-4 right-12 z-10" @click="$emit('edit')" />
    <UButton icon="i-heroicons-trash" size="2xs" color="red" variant="soft" class="absolute invisible group-hover:visible bottom-4 right-4 z-10" @click="$emit('remove')" />
    <NuxtImg :src="value.url" class="w-full h-full object-cover overflow-hidden" fit="cover" />
  </div>
</template>
