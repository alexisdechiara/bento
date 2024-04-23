<script lang="ts" setup>

defineProps<{
  values: {
    showBackground: boolean
  }
}>()

</script>

<template>
  <div class="@container relative size-full group hover:bg-gray-50 dark:hover:bg-gray-900">
    <button class="absolute invisible group-hover:visible inset-4 z-10">
      <UIcon name="i-heroicons-plus" class="text-xl @[5rem]:text-2xl @[10rem]:text-3xl @[15rem]:text-4xl @[20rem]:text-4xl @[25rem]:text-5xl @[30rem]:text-6xl" @click="console.log('Replace with your content')" />
    </button>
    <Placeholder v-if="values.showBackground" class="size-full group-hover:brightness-95" />
  </div>
</template>
