<script setup lang="ts">
const model = defineModel({
  type: Boolean
})

const toast = useToast()

const loading = ref(false)
const emit = defineEmits(['delete'])

function onDelete () {
  loading.value = true
  emit('delete')

  setTimeout(() => {
    loading.value = false
    toast.add({ icon: 'i-heroicons-check-circle', title: 'The item has been deleted', color: 'green' })
    model.value = false
  }, 500)
}
</script>

<template>
  <UIModal
    v-model="model"
    title="Delete item"
    description="Are you sure you want to delete this item?"
    icon="i-heroicons-exclamation-circle"
    :close-button="null"
    :ui="{
      icon: {
        base: 'text-red-500 dark:text-red-400'
      } as any,
      footer: {
        base: 'ml-16'
      } as any
    }"
  >
    <template #footer>
      <UButton color="white" label="Cancel" class="ml-auto" @click="model = false" />
      <UButton color="red" label="Delete" :loading="loading" @click="onDelete" />
    </template>
  </UIModal>
</template>
