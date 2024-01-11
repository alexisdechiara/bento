<template>
  <div class="pb-5 flex justify-between w-full h-fit">
    <UButton :padded="false" color="gray" variant="link" icon="i-heroicons-arrow-left" @click="$emit('return')" />
    <UTabs :items="items" @change="onChangeTab" />
    <span />
  </div>
  <div v-if="currentTab === 0" class="grid grid-cols-2 gap-x-6">
    <label v-if="imageURL == ''" for="dropzone-file" class="flex flex-col items-center overflow-hidden justify-center w-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
      <div class="flex flex-col items-center justify-center pt-5 pb-6">
        <UIcon name="i-heroicons-cloud-arrow-up" class="text-5xl" />
        <p class="my-2 text-sm text-gray-500 dark:text-gray-400 text-center"><span class="font-semibold">Click to upload </span> (image file only)</p>
      </div>
      <input id="dropzone-file" type="file" accept="image/*" class="hidden" required @change="onFileSelected">
    </label>
    <label v-else for="preview-file" class="relative group">
      <NuxtImg :src="imageURL" class="h-full w-full scale-95 rounded group-hover:brightness-75 transition cursor-pointer" :class="'object-' + selectedOption.toLowerCase()" />
      <input id="preview-file" type="file" accept="image/*" class="hidden" required @change="onFileSelected">
      <UButton icon="i-heroicons-trash" size="2xs" color="red" variant="solid" class="absolute invisible group-hover:visible bottom-4 right-4 z-10" @click="removeImage" />
    </label>
    <div class="flex flex-col gap-y-2">
      <div class="flex justify-between gap-x-4">
        <UFormGroup label="Width">
          <UInput v-model="width" min="1" type="number" required>
            <template #leading>
              <UIcon name="i-radix-icons-width" dynamic />
            </template>
            <template #trailing>
              <span class="text-gray-500 dark:text-gray-400 text-xs">col</span>
            </template>
          </UInput>
        </UFormGroup>
        <UFormGroup label="Height">
          <UInput v-model="height" min="1" type="number" required>
            <template #leading>
              <UIcon name="i-radix-icons-height" dynamic />
            </template>
            <template #trailing>
              <span class="text-gray-500 dark:text-gray-400 text-xs">row</span>
            </template>
          </UInput>
        </UFormGroup>
      </div>
      <UFormGroup label="Fit option">
        <USelectMenu v-model="selectedOption" :options="options" />
      </UFormGroup>
      <UButton block class="mt-auto" @click="onSubmit()">
        Submit
      </UButton>
    </div>
  </div>
  <!-- <ImageEditor v-else-if="currentTab === 1" /> -->
</template>

<script lang="ts" setup>
const options = ['Cover', 'Contain', 'Fill', 'Scale-down']
const selectedOption = ref(options[0])
const width = ref(1)
const height = ref(1)
const imageFile = ref(null)
const imageURL = ref('')
const currentTab = ref(0)
defineEmits(['return'])

const items = [{
  label: 'Item settings',
}, {
  label: 'Edit content',
  }]

const onChangeTab = ((index) => {
  currentTab.value = index
})

const onFileSelected = ((e: any) => {
  imageFile.value = e.target.files[0]
  imageURL.value = URL.createObjectURL(e.target.files[0])
})

const removeImage = (() => {
  imageFile.value = null
  imageURL.value = ''
})

const onSubmit = (() => {
  const gridStore = useGridStore()
  const item: Item = {
    label: 'Image',
    layout: {
      h: height.value,
      w: width.value
    },
    image: {
      values: imageFile.value,
      url: imageURL.value
    } as Image
  }
  gridStore.addItem(item)
})
</script>