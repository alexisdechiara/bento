<script lang="ts" setup>
import { format } from 'date-fns'

defineProps<{
  values: {
    date: Date
    isRange: boolean
    range: {
      start: Date
      end: Date
    }
    timeMode: string
    timeFormat: string
  }
}>()

defineEmits(['remove', 'edit'])
</script>

<template>
  <div class="relative size-full group @container">
    <div v-if="values.isRange" class="flex size-full justify-center items-center gap-x-2">
      <template v-if="values.timeMode === 'date'">
        <template v-for="item, key in values.range" :key="key">
          <div class="flex flex-col justify-center items-center rounded-xl bg-gray-800 text-white p-2">
            <div class="text-xs @[10rem]:text-md @[15rem]:text-lg @[20rem]:text-xl @[25rem]:text-2xl @[30rem]:text-3xl">
              {{ format(item, 'MMM, yyy') }}
            </div>
            <div class="font-bold text-xl @[5rem]:text-2xl @[10rem]:text-3xl @[15rem]:text-4xl @[20rem]:text-5xl @[25rem]:text-6xl @[30rem]:text-7xl">
              {{ format(item, 'dd') }}
            </div>
          </div>
          <UIcon v-if="key == 'start'" name="i-heroicons-arrow-right" class="text-sm @[5rem]:text-md @[10rem]:text-lg @[15rem]:text-xl @[20rem]:text-2xl @[25rem]:text-3xl @[30rem]:text-4xl" />
        </template>
      </template>
      <template v-else>
        <template v-for="item, key in values.range" :key="key">
          <div class="flex flex-col gap-y-1">
            <div class="flex flex-col justify-center items-center rounded-xl bg-gray-800 text-white p-2">
              <div class="leading-none font-bold text-md @[5rem]:text-lg @[10rem]:text-xl @[15rem]:text-2xl @[20rem]:text-3xl @[25rem]:text-4xl @[30rem]:text-5xl">
                {{ format(item, values.timeFormat === '24 hours' ? 'hh' : 'HH') }}
              </div>
              <div class="font-light text-md @[5rem]:text-lg @[10rem]:text-xl @[15rem]:text-2xl @[20rem]:text-3xl @[25rem]:text-4xl @[30rem]:text-5xl">
                {{ format(item, 'mm') }}
              </div>
            </div>
            <div v-if="values.timeMode === 'datetime'" class="scale-75 text-xs @[15rem]:text-lg">
              {{ format(item, 'MMM dd, yyy') }}
            </div>
          </div>
          <UIcon v-if="key == 'start'" name="i-heroicons-arrow-right" class="-mt-2 text-sm @[5rem]:text-md @[10rem]:text-lg @[15rem]:text-xl @[20rem]:text-2xl @[25rem]:text-3xl @[30rem]:text-4xl" />
        </template>
      </template>
    </div>
    <template v-else>
      <div v-if="values.timeMode === 'date'" class="flex flex-col size-full justify-center items-center">
        <div class="text-sm @[5rem]:text-md @[10rem]:text-lg @[15rem]:text-xl @[20rem]:text-2xl @[25rem]:text-3xl @[30rem]:text-4xl">
          {{ format(values.date, 'MMM, yyy') }}
        </div>
        <div class="font-bold text-3xl @[5rem]:text-4xl @[10rem]:text-5xl @[15rem]:text-6xl @[20rem]:text-7xl @[25rem]:text-8xl @[30rem]:text-9xl">
          {{ format(values.date, 'dd') }}
        </div>
      </div>
      <div v-else class="flex flex-col size-full justify-center items-center">
        <div v-if="values.timeMode === 'datetime'" class="absolute left-2 @[10rem]:left-4 top-4 text-xs @[10rem]:text-lg">
          {{ format(values.date, 'MMM dd, yyy') }}
        </div>
        <div :class="{'-mb-2 @[10rem]:-mb-0' : values.timeMode === 'datetime'}" class="leading-none font-bold text-lg @[5rem]:text-xl @[10rem]:text-5xl @[15rem]:text-6xl @[20rem]:text-7xl @[25rem]:text-8xl @[30rem]:text-9xl">
          {{ format(values.date, values.timeFormat === '24 hours' ? 'hh' : 'HH') }}
        </div>
        <div :class="{'-mb-6 @[10rem]:-mb-4': values.timeMode === 'datetime' }" class="font-light text-lg @[5rem]:text-xl @[10rem]:text-5xl @[15rem]:text-6xl @[20rem]:text-7xl @[25rem]:text-8xl @[30rem]:text-9xl">
          {{ format(values.date, 'mm') }}
        </div>
      </div>
    </template>
    <UButton icon="i-heroicons-pencil" size="2xs" color="primary" variant="soft" class="absolute invisible group-hover:visible bottom-4 right-12 z-10" @click="$emit('edit')" />
    <UButton icon="i-heroicons-trash" size="2xs" color="red" variant="soft" class="absolute invisible group-hover:visible bottom-4 right-4 z-10" @click="$emit('remove')" />
  </div>
</template>
