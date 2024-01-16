<script lang="ts" setup>

const props = defineProps<{
  label: string
  description: string
  disabled?: boolean
}>()

const items = computed(() => [
  {
    label: props.label,
    description: props.description
  }
])

</script>

<template>
  <UAccordion :items="items" :disabled="disabled">
    <template #default="{ item, open }">
      <UButton color="gray" variant="soft" :disabled="disabled" :ui="{ rounded: 'rounded-none' }" :class="[ open ? 'bg-gray-100 dark:bg-gray-700/50 rounded-t-md' : 'rounded-md']">
        <span class="truncate me-auto">{{ item.label }}</span>
        <template #trailing>
          <slot name="action" />
        </template>
      </UButton>
    </template>
    <template #item="{ item }">
      <div class="flex flex-col items-center gap-y-2 bg-gray-50 dark:bg-gray-700 rounded-b-md -mt-1.5 p-2">
        <p class="inline-flex text-wrap break-words italic">
          {{ item.description }}
        </p>
        <slot name="content" />
      </div>
    </template>
  </UAccordion>
</template>