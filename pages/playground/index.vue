<template>
  <UContainer class="bg-white dark:bg-gray-950 rounded-lg my-8" :ui="{base:'flex flex-col items-center', padding: 'py-4 sm:py-6 lg:py-8' }">
    <div class="flex w-full justify-between">
      <UButton label="Button" @click="isOpen = true" />
      <Settings />
    </div>
    <UModal v-model="isOpen" :ui="{ paddin: 'p-0', width: 'w-[66vw] sm:max-w-none', height: 'h-[75vh]' }">
      <ModalMenu @close="isOpen = false" />
    </UModal>
    <UDivider class="py-4" />
    <Grid />
  </UContainer>
</template>

<script setup lang="ts">
const isOpen = ref(false)
</script>
