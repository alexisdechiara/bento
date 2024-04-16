<template>
  <ClientOnly v-if="!colorMode?.forced">
    <UTooltip :text="`Change to ${colorSwitch === 0 ? 'light' : colorSwitch === 1 ? 'dark' : 'system'} mode`" :popper="{ placement: 'left' }">
      <UButton
        :icon="colorSwitch === 0 ? appConfig.ui.icons.system : colorSwitch === 1 ? appConfig.ui.icons.light : appConfig.ui.icons.dark"
        v-bind="{...$attrs }"
        variant="link"
        color="gray"
        @click="changeColorMode()"
      />
    </UTooltip>

    <template #fallback>
      <div class="w-8 h-8" />
    </template>
  </ClientOnly>
</template>

<script setup lang="ts">
defineOptions({
  inheritAttrs: false
})

const colorMode = useColorMode()
const appConfig = useAppConfig()
const colorSwitch = ref<number>(0)
// Computed

const changeColorMode = () => {
  if (colorSwitch.value >= 0 && colorSwitch.value < 2) {
    colorSwitch.value++
  } else {
    colorSwitch.value = 0
  }
}

const colorNames = (() => [
  'System',
  'Light',
  'Dark'
])

watch(() => colorSwitch.value, () => {
  switch (colorSwitch.value) {
    case 0:
      colorMode.preference = 'system'
      break
    case 1:
      colorMode.preference = 'light'
      break
    case 2:
      colorMode.preference = 'dark'
      break
  }
})
</script>
