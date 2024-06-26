<template>
  <UCard :class="[ui.wrapper, highlight && ui.highlight, scale && ui.scale, disabled && ui.disabled]" v-bind="attrs" :ui="ui">
    <template v-if="$slots.header" #header>
      <slot name="header" />
    </template>

    <div>
      <div class="flex items-center justify-between">
        <p v-if="title || $slots.title" :class="ui.title">
          <slot name="title">
            {{ title }}
          </slot>
        </p>

        <UBadge v-if="badge" v-bind="{ variant: 'subtle', ...badge }" />
      </div>

      <p v-if="description || $slots.description" :class="ui.description">
        <slot name="description">
          {{ description }}
        </slot>
      </p>
    </div>

    <div :class="ui.amount.base">
      <p v-if="discount && price" :class="ui.amount.discount">
        {{ price }}
      </p>
      <p :class="ui.amount.price">
        {{ discount || price || '&nbsp;' }}
      </p>
      <p v-if="cycle" :class="ui.amount.cycle">
        {{ cycle }}
      </p>
    </div>

    <div v-if="features?.length || $slots.features" :class="align === 'top' && 'order-last'" class="flex-1">
      <slot name="features">
        <ul v-if="features?.length" :class="ui.features.base">
          <li v-for="(offer, index) of features" :key="index" :class="ui.features.item.base">
            <UIcon :name="ui.features.item.icon.name" :class="ui.features.item.icon.base" />
            <span :class="ui.features.item.label">{{ offer }}</span>
          </li>
        </ul>
      </slot>
    </div>

    <UButton v-if="button" :block="true" size="lg" :disabled="disabled" :label="button.label" @click="button.click" />

    <template v-if="$slots.footer" #footer>
      <slot name="footer" />
    </template>
  </UCard>
</template>

<script setup lang="ts">
import type { Badge, Button } from '#ui/types'
import { card as cardConfig } from '#ui/ui.config'

defineOptions({
  inheritAttrs: false
})

const props = withDefaults(defineProps<{
  title?: string
  description?: string
  align?: 'top' | 'bottom'
  highlight?: boolean
  scale?: boolean
  features?: string[]
  badge?: Badge
  button?: Button & { click?: Function }
  price?: string
  discount?: string
  cycle?: string
  ui?: Partial<typeof config & typeof cardConfig>
  class?: any
  disabled?: boolean
}>(), {
  title: '',
  description: undefined,
  align: 'bottom',
  highlight: false,
  scale: false,
  features: () => [],
  badge: undefined,
  button: undefined,
  price: '',
  discount: undefined,
  cycle: undefined,
  ui: () => ({}),
  class: undefined,
  disabled: false
})

const config = {
  wrapper: 'relative flex flex-col self-stretch w-full',
  highlight: 'ring-gray-900 dark:ring-white ring-2',
  scale: 'lg:scale-[1.1] lg:z-10',
  rounded: 'rounded-xl',
  disabled: 'opacity-75 shadow-none cursor-not-allowed',
  body: {
    base: 'flex-1 flex flex-col gap-y-6',
    padding: 'p-8 xl:p-10'
  },
  title: 'text-2xl text-gray-900 dark:text-white sm:text-3xl font-semibold truncate',
  description: 'text-sm sm:text-base text-gray-500 dark:text-gray-400 mt-2',
  amount: {
    base: 'flex flex-row items-baseline gap-x-1',
    discount: 'text-gray-500 dark:text-gray-400 line-through text-xl sm:text-2xl font-medium',
    price: 'text-gray-900 dark:text-white text-2xl sm:text-4xl font-semibold',
    cycle: 'text-gray-500 dark:text-gray-400 text-sm/6 font-medium truncate'
  },
  features: {
    base: 'space-y-3 text-sm',
    item: {
      base: 'flex items-center gap-x-3',
      label: 'text-gray-600 dark:text-gray-400',
      icon: {
        base: 'w-5 h-5 flex-shrink-0 text-gray-900 dark:text-white',
        name: 'i-heroicons-check'
      }
    }
  }
}

const { ui, attrs } = useUI('pricing.card', toRef(props, 'ui'), config, toRef(props, 'class'), true)
</script>
