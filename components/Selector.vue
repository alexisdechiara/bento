<script lang="ts" setup>
import ImageSettings from '../components/Settings/ImageSettings.vue'

const isSelected = ref(false)
const componentName = ref(null)

const setComponent = ((e: any) => {
  componentName.value = e
  isSelected.value = true
})

const previous = (() => {
  componentName.value = null
  isSelected.value = false
})
</script>

<template>
  <UCard :ui="{ divide: '', body: { padding: 'p-0 sm:p-0' }, header: { padding: 'py-0 pt-5' } }">
    <template v-if="isSelected" #header>
      <div class="flex w-full h-fit">
        <UButton :padded="false" color="gray" variant="link" icon="i-heroicons-arrow-left" @click="previous()" />
      </div>
    </template>

    <div v-if="!isSelected" class="flex gap-x-4 min-h-96">
      <aside class="flex flex-col w-fit border-r border-solid gap-y-2 min-w-32 py-5">
        <div class="hover:bg-gray-50 cursor-pointer transition px-4 py-2 w-full h-fit">
          Content
        </div>
      </aside>
      <div class="grid grid-cols-2 w-full grow px-4 py-5">
        <SelectItem title="Image" description="An image that can be edit to shrink in a bento box" icon="i-ic-round-landscape" @click="setComponent(ImageSettings)" />
      </div>
    </div>

    <div v-else class="flex flex-col px-4 py-5 sm:p-6">
      <component :is="componentName" />
    </div>
  </UCard>
</template>