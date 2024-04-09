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
  <div class="relative size-full group container-query">
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
        <div class="date-month">
          {{ format(values.date, 'MMM, yyy') }}
        </div>
        <div class="date-day">
          {{ format(values.date, 'dd') }}
        </div>
      </div>
      <div v-else class="flex flex-col size-full justify-center items-center">
        <div v-if="values.timeMode === 'datetime'" class="absolute left-2 @[10rem]:left-4 top-4 datetime-date">
          {{ format(values.date, 'MMM dd, yyy') }}
        </div>
        <div class="font-bold datetime-hour">
          {{ format(values.date, values.timeFormat === '24 hours' ? 'hh' : 'HH') }}
        </div>
        <div class="font-light datetime-minute">
          {{ format(values.date, 'mm') }}
        </div>
      </div>
    </template>
    <UButton icon="i-heroicons-pencil" size="2xs" color="primary" variant="soft" class="absolute invisible group-hover:visible bottom-4 right-12 z-10" @click="$emit('edit')" />
    <UButton icon="i-heroicons-trash" size="2xs" color="red" variant="soft" class="absolute invisible group-hover:visible bottom-4 right-4 z-10" @click="$emit('remove')" />
  </div>
</template>

<style lang="scss">

.container-query {
  container-type: size;
}

.date-month {
  font-size: clamp(min(15cqh, 15cqw), 2cqw, max(20cqh, 20cqw));
}

.date-day {
  font-size: clamp(min(20cqh, 20cqw), 3cqw, max(25cqh, 25cqw));
  font-weight: bold;
}

.datetime-date {
  font-size: clamp(min(7cqh, 7cqw), 0.75rem, max(10cqh, 10cqw));
}

.datetime-hour,.datetime-minute {
  font-size: clamp(min(30cqh, 30cqw), 3cqw, max(35cqh, 35cqw));
  line-height: 1;
}

.datetime-date~.datetime-hour,.datetime-date ~.datetime-minute {
  font-size: clamp(min(20cqh, 20cqw), 3cqw, max(25cqh, 25cqw));
  translate: 0 8px;
}
</style>
