<template>
  <header :class="ui.wrapper" v-bind="attrs">
    <slot name="top" />

    <UContainer :class="ui.container">
      <div :class="ui.left">
        <slot name="left">
          <NuxtLink :to="to" :class="ui.logo">
            <slot name="logo">
              {{ title }}
            </slot>
          </NuxtLink>
        </slot>
      </div>

      <slot name="center">
        <UIHeaderLinks :links="links" :class="ui.center" v-bind="{ui: ui.links}" />
      </slot>

      <div :class="ui.right">
        <slot name="right" />

        <slot name="panel-button" :open="isHeaderDialogOpen">
          <UButton
            v-if="links.length || $slots.panel"
            :class="ui.button.base"
            v-bind="(ui?.button as any)"
            :aria-label="`${isHeaderDialogOpen ? 'Close' : 'Open'} Menu`"
            :icon="isHeaderDialogOpen ? ui.button.icon.close : ui.button.icon.open"
            @click="isHeaderDialogOpen = !isHeaderDialogOpen"
          />
        </slot>
      </div>
    </UContainer>

    <slot name="bottom" />

    <TransitionRoot :show="isHeaderDialogOpen" as="template">
      <Dialog as="div" @close="isHeaderDialogOpen = false">
        <DialogPanel :class="ui.panel.wrapper">
          <div :class="[ui.panel.header, ui.wrapper]">
            <div :class="ui.container">
              <div :class="ui.left">
                <slot name="left">
                  <NuxtLink :to="to" :class="ui.logo">
                    <slot name="logo">
                      {{ title }}
                    </slot>
                  </NuxtLink>
                </slot>
              </div>

              <slot name="center" />

              <div :class="ui.right">
                <slot name="right" />

                <slot name="panel-button" :open="isHeaderDialogOpen">
                  <UButton
                    :class="ui.button.base"
                    v-bind="(ui?.button as any)"
                    :aria-label="`${isHeaderDialogOpen ? 'Close' : 'Open'} Menu`"
                    :icon="isHeaderDialogOpen ? ui.button.icon.close : ui.button.icon.open"
                    @click="isHeaderDialogOpen = !isHeaderDialogOpen"
                  />
                </slot>
              </div>
            </div>
          </div>
          <div :class="ui.panel.body">
            <slot name="panel">
              <UAsideLinks :links="links" />
            </slot>
          </div>
        </DialogPanel>
      </Dialog>
    </TransitionRoot>
  </header>
</template>

<script setup lang="ts">
import { Dialog, DialogPanel, TransitionRoot, provideUseId } from '@headlessui/vue'
import { useId } from '#imports'
import type { AsideLink } from './UI/AsideLinks.vue'

const config = computed(() => ({
  wrapper: 'bg-red/75 dark:bg-black/75 lg:!border-transparent backdrop-blur border-b border-gray-200 dark:border-gray-800 -mb-px sticky top-0 z-50 py-2',
  container: 'flex items-center justify-between gap-3 h-[4rem]',
  left: 'lg:flex-1 flex items-center gap-1.5',
  center: 'hidden lg:flex',
  right: 'flex items-center justify-end lg:flex-1 gap-1.5',
  logo: 'flex-shrink-0 font-bold text-xl text-gray-900 dark:text-white flex items-end gap-1.5',
  panel: {
    wrapper: 'fixed inset-0 z-50 overflow-y-auto bg-white dark:bg-black lg:hidden',
    header: 'px-4 sm:px-6',
    body: 'px-4 sm:px-6 pt-3 pb-6'
  },
  button: {
    base: 'lg:hidden',
    icon: {
      open: 'i-heroicons-bars-3-20-solid',
      close: 'i-heroicons-x-mark-20-solid'
    }
  },
  links: {
    wrapper: 'ring-1 ring-gray-200 dark:ring-gray-800 px-3 gap-x-0 rounded-full border bg-white dark:bg-gray-950',
    base: 'py-2 px-4 font-medium transition-colors relative after:absolute after:-bottom-px after:inset-x-2 after:h-px after:rounded-full after:opacity-0 after:bg-gray-900 dark:after:bg-white after:transition-opacity',
    active: 'text-gray-900 dark:text-white after:opacity-100',
    inactive: 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
  }
}))

defineOptions({
  inheritAttrs: false
})

const props = defineProps({
  to: {
    type: String,
    default: '/'
  },
  title: {
    type: String,
    default: undefined
  },
  links: {
    type: Array as PropType<AsideLink[]>,
    default: () => []
  },
  class: {
    type: [String, Object, Array] as PropType<any>,
    default: undefined
  },
  ui: {
    type: Object as PropType<Partial<typeof config.value>>,
    default: () => ({})
  }
})

const route = useRoute()
const isHeaderDialogOpen = ref(false)
const { ui, attrs } = useUI('header', toRef(props, 'ui'), config, toRef(props, 'class'), true)

watch(() => route.fullPath, () => {
  isHeaderDialogOpen.value = false
})

provideUseId(() => useId())
</script>
