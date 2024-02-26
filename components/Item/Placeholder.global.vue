<script lang="ts" setup>

defineProps<{
  values: {
    showBackground: boolean
  }
}>()

defineEmits(['remove', 'edit', 'replace'])
</script>

<template>
  <div class="@container relative w-full h-full group hover:bg-gray-50 dark:hover:bg-gray-900">
    <button class="absolute invisible group-hover:visible inset-4 z-10" @click="$emit('replace')">
      <UIcon name="i-heroicons-plus" class="text-xl @[5rem]:text-2xl @[10rem]:text-3xl @[15rem]:text-4xl @[20rem]:text-4xl @[25rem]:text-5xl @[30rem]:text-6xl" />
    </button>
    <UButton icon="i-heroicons-pencil" size="2xs" color="primary" variant="soft" class="absolute invisible group-hover:visible bottom-4 right-12 z-10" @click="$emit('edit')" />
    <UButton icon="i-heroicons-trash" size="2xs" color="red" variant="soft" class="absolute invisible group-hover:visible bottom-4 right-4 z-10" @click="$emit('remove')" />
    <Placeholder v-if="values.showBackground" class="size-full group-hover:brightness-95" />
  </div>
</template>
