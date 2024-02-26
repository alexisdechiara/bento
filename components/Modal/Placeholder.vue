<template>
  <ModalItem :values="values" label="Placeholder" :component-id="5" :is-submitable="true" @return="$emit('return')" @close="$emit('close')">
    <template #preview>
      <ItemPlaceholder :values="values" />
    </template>
    <template #content>
      <div class="flex flex-col gap-y-4 size-full p-2">
        <div class="flex gap-x-4">
          <span class="inline w-full">Show background</span>
          <UToggle v-model="showBackground" />
        </div>
        <Placeholder v-if="showBackground" class="h-full" />
      </div>
    </template>
  </ModalItem>
</template>

<script lang="ts" setup>
defineEmits(['return', 'close'])

const showBackground = ref(false)

const values = computed(() => {
  return {
    showBackground: showBackground.value
  }
})

</script>
