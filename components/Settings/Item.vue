<template>
  <div class="pb-5 flex justify-between w-full h-fit">
    <UButton :padded="false" color="gray" variant="link" icon="i-heroicons-arrow-left" @click="$emit('return')" />
    <UTabs :items="items" @change="onChangeTab" />
    <span />
  </div>

  <div v-if="currentTab === 0" class="flex gap-x-6 justify-center">
    <div class="flex grow justify-center items-center background-grid">
      <div class="flex justify-center items-center w-64 h-64 overflow-auto">
        <div :class="[width > height ? 'w-3/4' : 'h-3/4', themeUi]" class="flex justify-center items-center box" />
      </div>
    </div>
    <div class="flex flex-col gap-y-4 w-80">
      <div class="flex justify-between gap-x-8 w-full">
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
      <div class="flex flex-col w-full gap-y-4">
        <UiExpandingRadio id="defaultRadio" v-model="customTheme" label="Default" name="customTheme" value="default" :src="'/image/landscape.png'" />
        <UiExpandingRadio id="themeOne" v-model="customTheme" label="Theme 1" name="customTheme" value="themeOne" :src="'/image/landscape.png'" />
      </div>
    </div>
  </div>

  <template v-else-if="currentTab === 1">
    <slot name="content" />
  </template>
</template>

<script lang="ts" setup>
const gridStore = useGridStore()
const { settings } = storeToRefs(gridStore)

defineEmits(['return'])
  
const currentTab = ref(0)
const customTheme = ref('default')
const width = defineModel('width', { type: Number, default: 1 })
const height = defineModel('height', { type: Number, default: 1 })
const themeUi = computed(() => {
  switch (customTheme.value) {
    case 'themeOne': return 'border border-solid border-gray-200 bg-white shadow-sm'
    default: return 'bg-white'
  }
})
  
const items = [{
  label: 'Item settings',
}, {
  label: 'Edit content',
  }]

const onChangeTab = ((index: number) => {
  currentTab.value = index
})
</script>

<style lang="scss" scoped>
.background-grid {
  background-image: radial-gradient(black 5%, transparent 5%);
  background-size: 15px 15px;
}

.box {
  max-height: 100%;
  max-width: 100%;
  aspect-ratio: v-bind(width) / v-bind(height);
  border-radius: v-bind('settings.borderRadius') !important;
}
</style>