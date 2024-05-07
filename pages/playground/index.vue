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
    <div id="content" class="w-full h-full pb-16">
      <Grid />
    </div>
    <UDivider class="py-4" />
    <UButtonGroup orientation="horizontal" class="ml-auto" color="white">
      <!-- <UButton label="Save As" @click="saveGridAs('png')" /> -->
      <UDropdown :items="items" :popper="{ placement: 'right-start' }" color="white">
        <UButton label="Save" trailing icon="i-heroicons-chevron-down-20-solid" color="white" />
      </UDropdown>
    </UButtonGroup>
  </UContainer>
</template>

<script setup lang="ts">
import domtoimage from 'dom-to-image-more'
import { saveAs } from 'file-saver'

const isOpen = ref(false)

const items = [
  [{
    label: 'PNG',
    click: () => saveGridAs('png')
  },
  {
    label: 'JPG',
    click: () => saveGridAs('jpg')
  },
  {
    label: 'WEBP',
    click: () => saveGridAs('webp')
  }]
]

function saveGridAs(extension: string) {
  domtoimage.toBlob(document.getElementById('content')).then(function (blob) {
    saveAs(blob, `bento-layout.${extension}`)
  })
}

</script>
