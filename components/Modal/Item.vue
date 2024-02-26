<template>
  <div class="flex justify-between w-full h-fit">
    <UButton :padded="false" color="gray" variant="link" icon="i-heroicons-arrow-left" @click="$emit('return')" />
    <UTabs :items="items" @change="onChangeTab" />
    <span />
  </div>

  <template v-if="currentTab === 0">
    <slot name="content" />
  </template>

  <div v-else-if="currentTab === 1" class="flex flex-col h-full">
    <div class="flex gap-x-6 justify-center h-[22rem]">
      <div class="flex grow justify-center items-center background-grid">
        <div class="flex justify-center items-center w-64 h-64 overflow-auto">
          <div :class="[width > height ? 'w-3/4' : 'h-3/4', customCSS]" class="relative flex justify-center items-center box overflow-hidden">
            <slot v-if="$slots.preview && values && isSubmitable" name="preview" />
          </div>
        </div>
      </div>
      <div class="flex flex-col gap-y-4 w-80 h-full">
        <div class="flex justify-between gap-x-4 w-full">
          <UFormGroup label="Width">
            <UInput :value="width" min="1" type="number" required @change="updateWidth(width, $event)">
              <template #leading>
                <UIcon name="i-radix-icons-width" dynamic />
              </template>
              <template #trailing>
                <span class="text-gray-500 dark:text-gray-400 text-xs">col</span>
              </template>
            </UInput>
          </UFormGroup>
          <div class="flex items-end">
            <input id="lockInput" v-model="preserveAspectRatio" :disabled="lockAspectRatioInput" type="checkbox" class="hidden peer">
            <label for="lockInput" class="cursor-pointer" :class="{ 'cursor-not-allowed': lockAspectRatioInput }">
              <UIcon :class="{'text-gray-300 cursor-not-allowed' : lockAspectRatioInput }" class="size-5" :name="preserveAspectRatio ?'i-heroicons-lock-closed' : 'i-heroicons-lock-open'" />
            </label>
          </div>
          <UFormGroup label="Height">
            <UInput :value="height" min="1" type="number" required @change="updateHeight(height, $event)">
              <template #leading>
                <UIcon name="i-radix-icons-height" dynamic />
              </template>
              <template #trailing>
                <span class="text-gray-500 dark:text-gray-400 text-xs">row</span>
              </template>
            </UInput>
          </UFormGroup>
        </div>
        <div class="flex flex-col w-full gap-y-4 overflow-auto no-scrollbar p-1">
          <UIExpandingRadio id="defaultRadio" v-model="customTheme" label="Default" name="customTheme" value="default" :src="'/image/landscape.png'">
            <template #content="{ open }">
              <div class="flex size-full justify-center items-center transition-opacity duration-500" :class="open ? 'opacity-100' : 'opacity-0'">
                <div class="h-7 w-7 overflow-hidden scale-[4]">
                  <div class="h-8 w-8 border-b-0 border-r-0 rounded" :class="settings.themes[settings.currentTheme]" />
                </div>
              </div>
            </template>
          </UIExpandingRadio>
          <UIExpandingRadio v-for="(theme, index) in themes" :id="theme + 'Radio'" :key="index" v-model="customTheme" :label="theme" name="customTheme" :value="theme" :src="'/image/landscape.png'">
            <template #content="{ open }">
              <div class="flex size-full justify-center items-center transition-opacity duration-500" :class="open ? 'opacity-100' : 'opacity-0'">
                <div class="h-7 w-7 overflow-hidden scale-[4]">
                  <div class="h-8 w-8 border-b-0 border-r-0 rounded" :class="settings.themes[theme]" />
                </div>
              </div>
            </template>
          </UIExpandingRadio>
        </div>
      </div>
    </div>
    <UButton block class="col-span-2 mt-auto" :disabled="!isSubmitable" @click="onSubmit()">
      Submit
    </UButton>
  </div>
</template>

<script lang="ts" setup>
const gridStore = useGridStore()
const { settings } = storeToRefs(gridStore)

const emit = defineEmits(['return', 'close'])

const customTheme = defineModel('default', { type: String, default: 'default' })
const width = defineModel('width', { type: Number, default: 1 })
const height = defineModel('height', { type: Number, default: 1 })
const label = defineModel('label', { type: String, default: '' })

const currentTab = ref(0)

const preserveAspectRatio = defineModel('preserveAspectRatio', { type: Boolean, default: false })
const props = defineProps<{
  values: any,
  lockAspectRatioInput?: boolean,
  isSubmitable?: boolean
  componentId: number
}>()

const lockAspectRatioInput = props.lockAspectRatioInput || preserveAspectRatio.value

const customCSS = computed(() => {
  return settings.value.themes[customTheme.value == 'default' ? settings.value.currentTheme : customTheme.value]
})

const themes = Object.keys(settings.value.themes).filter((theme) => theme !== settings.value.currentTheme)

const items = [{
  label: 'Content',
}, {
  label: 'Item',
  }]

const onChangeTab = ((index: number) => {
  currentTab.value = index
})

const updateWidth = ((oldValue: number, event: any) => {
  width.value = parseInt(event.target.value)
  if (preserveAspectRatio.value) {
    const ratio = parseInt(event.target.value) - oldValue
    height.value = height.value + ratio
  }
})

const updateHeight = ((oldValue: number, event: any) => {
  height.value = parseInt(event.target.value)
  if (preserveAspectRatio.value) {
    const ratio = parseInt(event.target.value) - oldValue
    width.value = width.value + ratio
  }
})

const onSubmit = (() => {
  console.log(props.values)
  const gridStore = useGridStore()
  const item: Item = {
    label: label.value,
    componentId: props.componentId,
    h: height.value,
    w: width.value,
    customTheme: customTheme.value == 'default' ? undefined : customTheme.value,
    values: props.values,
    preserveAspectRatio: preserveAspectRatio.value
  }
  if (props.isSubmitable) {
    gridStore.addItem(item)
    emit('close')
  }
})
</script>

<style lang="scss" scoped>

.no-scrollbar::-webkit-scrollbar {
    display: none;
  }
  /* Hide scrollbar for IE, Edge and Firefox */
  .no-scrollbar {
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
}

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
