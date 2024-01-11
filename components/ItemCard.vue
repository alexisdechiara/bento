<script setup lang="ts">
defineProps<{
  title?: string
  description?: string
  icon?: string
  class?: any
}>()
</script>

<template>
  <UCard :ui="{ base: 'h-full relative cursor-pointer hover:outline outline-primary' }">
    <div v-if="icon || $slots.icon" class="mb-2 flex">
      <slot name="icon">
        <UIcon :name="(icon as string)" dynamic class="w-10 h-10 flex-shrink-0 text-primary" />
      </slot>
    </div>

    <p v-if="title || $slots.title" class="text-gray-900 dark:text-white text-base font-semibold truncate flex items-center gap-1.5">
      <slot name="title">
        {{ title }}
      </slot>
    </p>

    <p v-if="description || $slots.description" class="text-[15px] text-gray-500 dark:text-gray-400 mt-1">
      <slot name="description">
        {{ description }}
      </slot>
    </p>
    <slot />

    <template v-if="$slots.footer" #footer>
      <slot name="footer" />
    </template>
  </UCard>
</template>