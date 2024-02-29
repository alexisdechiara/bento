<script setup lang="ts">
import { DatePicker as VCalendarDatePicker } from 'v-calendar'
import type { DatePickerDate, DatePickerRangeObject } from 'v-calendar/dist/types/src/use/datePicker.js'
import 'v-calendar/dist/style.css'

const date = defineModel('date', { type: [Date] as PropType<DatePickerDate | null>, default: null })
const range = defineModel('range',{ type: [Object] as PropType<DatePickerRangeObject | null>, default: null })

const props = defineProps({
  isRange: {
    type: Boolean,
    default: false
  }
})

const calendarDate = ref(null)
const calendarRange = ref(null)

watch(() => date.value, () => {
    calendarDate.value.move(date.value)
})

watch(() => range.value, () => {
  calendarRange.value.move(range.value.start)
})

async function move(date: Date) {
  if (props.isRange) {
    await calendarRange.value.move(date)
  } else {
    await calendarDate.value.move(date)
  }
}

defineExpose({
  move
})

const attrs = {
  transparent: true,
  borderless: true,
  color: 'gray',
  'is-dark': { selector: 'html', darkClass: 'dark' },
  expanded: true,
  showWeeknumbers: true,
}
</script>

<template>
  <VCalendarDatePicker v-if="isRange && range && (typeof range === 'object')" ref="calendarRange" v-model.range="range" :columns="2" v-bind="{ ...attrs, ...$attrs }" />
  <VCalendarDatePicker v-else ref="calendarDate" v-model="date" v-bind="{ ...attrs, ...$attrs }" />
</template>

<style>
:root {
  --vc-gray-50: rgb(var(--color-gray-50));
  --vc-gray-100: rgb(var(--color-gray-100));
  --vc-gray-200: rgb(var(--color-gray-200));
  --vc-gray-300: rgb(var(--color-gray-300));
  --vc-gray-400: rgb(var(--color-gray-400));
  --vc-gray-500: rgb(var(--color-gray-500));
  --vc-gray-600: rgb(var(--color-gray-600));
  --vc-gray-700: rgb(var(--color-gray-700));
  --vc-gray-800: rgb(var(--color-gray-800));
  --vc-gray-900: rgb(var(--color-gray-900));
}

.vc-primary {
  --vc-accent-50: rgb(var(--color-primary-50));
  --vc-accent-100: rgb(var(--color-primary-100));
  --vc-accent-200: rgb(var(--color-primary-200));
  --vc-accent-300: rgb(var(--color-primary-300));
  --vc-accent-400: rgb(var(--color-primary-400));
  --vc-accent-500: rgb(var(--color-primary-500));
  --vc-accent-600: rgb(var(--color-primary-600));
  --vc-accent-700: rgb(var(--color-primary-700));
  --vc-accent-800: rgb(var(--color-primary-800));
  --vc-accent-900: rgb(var(--color-primary-900));
}
</style>
