<template>
  <div class="pb-5 flex justify-between w-full h-fit">
    <UButton :padded="false" color="gray" variant="link" icon="i-heroicons-arrow-left" @click="$emit('return')" />
    <UTabs :items="items" @change="onChangeTab" />
    <span />
  </div>

  <template v-if="currentTab === 0">
    <slot name="content" />
  </template>

  <div v-else-if="currentTab === 1" class="flex flex-col gap-y-2">
    <div class="flex gap-x-6 justify-center">
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
    <UButton block class="mt-4 col-span-2" @click="onSubmit()">
      Submit
    </UButton>
  </div>
</template>

<script lang="ts" setup>
const gridStore = useGridStore()
const { settings } = storeToRefs(gridStore)

defineEmits(['return'])
  
const currentTab = ref(0)
const customTheme = ref('default')
const width = ref(1)
const height = ref(1)

const label = defineModel('label', { type: String, default: '' })
const componentId = defineModel('componentId', { type: Number, required: true })
const modelValue = defineModel('modelValue', { type: Object, default: () => ({}) })

const themeUi = computed(() => {
  switch (customTheme.value) {
    case 'themeOne': return 'border border-solid border-gray-200 bg-white shadow-sm'
    default: return 'bg-white'
  }
})
  
const items = [{
  label: 'Content',
}, {
  label: 'Item',
  }]

const onChangeTab = ((index: number) => {
  currentTab.value = index
})

const onSubmit = (() => {
  const gridStore = useGridStore()
  const item: Item = {
    label: label.value,
    componentId: componentId.value,
    h: height.value,
    w: width.value,
    values: modelValue.value
  }
  gridStore.addItem(item)
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