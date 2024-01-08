<script lang="ts" setup>
const size = ref(1)
</script>

<template>
  <div class="relative w-full h-full group">
    <UButton icon="i-heroicons-plus" size="2xs" color="primary" variant="soft" class="absolute invisible group-hover:visible top-4 right-4 z-10" @click="size = size + 0.1" />
    <UButton icon="i-heroicons-minus" size="2xs" color="primary" variant="soft" class="absolute invisible group-hover:visible top-12 right-4 z-10" @click="size = size - 0.1" />
    <NuxtImg src="image/landscape.png" class="w-full h-full object-cover rounded-lg overflow-hidden" :class="'scale-[' + size.toPrecision(2).toString() + ']'" fit="cover" />
  </div>
</template>
