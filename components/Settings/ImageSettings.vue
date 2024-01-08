<template>
  <div class="grid grid-cols-2 gap-x-6">
    <label v-if="!imageFile" for="dropzone-file" class="flex flex-col items-center overflow-hidden justify-center w-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
      <div class="flex flex-col items-center justify-center pt-5 pb-6">
        <UIcon name="i-heroicons-cloud-arrow-up" class="text-5xl" />
        <p class="my-2 text-sm text-gray-500 dark:text-gray-400 text-center"><span class="font-semibold">Click to upload </span> (image file only)</p>
      </div>
      <input id="dropzone-file" type="file" accept="image/*" class="hidden" required @change="onFileSelected">
    </label>
    <label v-else for="preview-file" class="relative group">
      <NuxtImg :src="imageFile" class="h-full w-full scale-95 rounded hover:brightness-75 transition cursor-pointer" :class="'object-' + selectedOption.toLowerCase()" />
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
          </UInput>
        </UFormGroup>
        <UFormGroup label="Height">
          <UInput v-model="height" min="1" type="number" required>
            <template #leading>
              <UIcon name="i-radix-icons-height" dynamic />
            </template>
          </UInput>
        </UFormGroup>
      </div>
      <UFormGroup label="Fit option">
        <USelectMenu v-model="selectedOption" :options="options" />
      </UFormGroup>
      <UButton type="submit" class="mt-auto">
        Submit
      </UButton>
    </div>
  </div>
</template>

<script lang="ts" setup>
const options = ['Cover', 'Contain', 'Fill', 'Scale-down']
const selectedOption = ref(options[0])
const width = ref(1)
const height = ref(1)
const imageFile = ref(null)

const onFileSelected = ((e: any) => {
  imageFile.value = URL.createObjectURL(e.target.files[0])
})

const removeImage = (() => {
  imageFile.value = null
})
</script>