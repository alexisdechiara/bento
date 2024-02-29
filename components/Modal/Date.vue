<template>
  <ModalItem :values="values" label="Date" :component-id="6" :is-submitable="isRange ? (values.range?.end != null && values.range?.start != null) : values.date != null" :lock-aspect-ratio-input="isRange" :width="isRange ? 2 : 1" @return="$emit('return')" @close="$emit('close')">
    <template #preview>
      <ItemDate :values="values" />
    </template>
    <template #action>
      <UPopover :popper="{ placement: 'bottom-end', offsetDistance: 12 }">
        <UButton icon="i-heroicons-adjustments-horizontal" color="gray" variant="soft" :ui="{ rounded: 'rounded-md' }" />
        <template #panel>
          <div class="flex flex-col p-4 w-80 gap-y-2">
            <UButton color="gray" variant="soft" class="cursor-default">
              <span class="truncate me-auto">Time mode</span>
              <USelectMenu v-model="selectedTimeMode" :options="timeMode" class="min-w-24" />
            </UButton>
            <UButton color="gray" variant="soft" class="cursor-default" :disabled="selectedTimeMode === 'date'">
              <span class="truncate me-auto">Time format</span>
              <USelectMenu v-model="selectedTimeFormat" :options="timeFormat" :disabled="selectedTimeMode === 'date'" />
            </UButton>
            <UButton color="gray" variant="soft" class="cursor-default">
              <span class="truncate me-auto">Range</span>
              <UToggle v-model="isRange" color="gray" />
            </UButton>
          </div>
        </template>
      </UPopover>
    </template>
    <template #content>
      <div class="flex flex-col justify-center size-full p-2">
        <div class="flex space-x-4 divide-x divide-gray-200 dark:divide-gray-800">
          <UTabs :items="items">
            <template #item="{ item }">
              <div class="flex w-max min-w-36 flex-col py-4">
                <UButton
                  v-for="(value, index) in isRange ? ranges : dates"
                  :key="index"
                  :label="value.label[item.label.toLowerCase()]"
                  color="gray"
                  variant="ghost"
                  class="rounded-none px-6 w-full"
                  :class="[isSelected(value.duration) ? 'bg-gray-100 dark:bg-gray-800' : 'hover:bg-gray-50 dark:hover:bg-gray-800/50']"
                  @click="select(value.duration, item.method)"
                />
              </div>
            </template>
          </UTabs>
          <div class="w-full pl-4">
            <UIDatePicker ref="calendar" v-model:date="date" v-model:range="range" :is-range="isRange" :mode="selectedTimeMode" :is24hr="selectedTimeFormat === '24 hours'" />
          </div>
        </div>
      </div>
    </template>
  </ModalItem>
</template>

<script lang="ts" setup>
import { sub, add,  isSameDay, type Duration } from 'date-fns'
defineEmits(['return', 'close'])

const calendar = ref(null)

const date = ref(new Date())
const range = ref({
  start: new Date(),
  end: new Date()
})

const timeMode = ref(['date', 'time', 'datetime'])
const selectedTimeMode = ref('date')

const timeFormat = ref(['12 hours', '24 hours'])
const selectedTimeFormat = ref('12 hours')

const isRange = ref(false)

function isSelected(duration: Duration) {
  if(isRange.value) {
    return (isSameDay(range.value.start, sub(new Date(), duration)) && isSameDay(range.value.end, new Date())) || (isSameDay(range.value.start, new Date()) && isSameDay(range.value.end, add(new Date(), duration)))
  } else {
    return isSameDay(date.value, sub(new Date(), duration)) || isSameDay(date.value, add(new Date(), duration))
  }
}

function select(duration: Duration, method: string) {
  if (isRange.value) {
    if (method === 'add') {
      range.value = { start: new Date(), end: add(new Date(), duration) }
    } else if (method === 'sub') {
      range.value = { start: sub(new Date(), duration), end: new Date() }
    }
  } else {
    if (method === 'add') {
      date.value = add(new Date(), duration)
    } else if (method === 'sub') {
      date.value = sub(new Date(), duration)
    }
  }
  calendar.value.move(range.value.start)
}

const ranges = [
  {
    label: {
      past: 'Last 7 days',
      future: 'Next 7 days'
    },
    duration: { days: 7 }
  },
  {
    label: {
      past: 'Last 14 days',
      future: 'Next 14 days'
    },
    duration: { days: 14 }
  },
  {
    label: {
      past: 'Last 30 days',
      future: 'Next 30 days'
    },
    duration: { months: 1 }
  },
  {
    label: {
      past: 'Last 3 months',
      future: 'Next 3 months'
    },
    duration: { months: 3 }
  },
  {
    label: {
      past: 'Last 6 months',
      future: 'Next 6 months'
    },
    duration: { months: 6 }
  },
  {
    label: {
      past: 'Last year',
      future: 'Next year'
    },
    duration: { years: 1 }
  }
]

const dates = [
  {
    label: {
      past: 'Today',
      future: 'Today'
    },
    duration: { days: 0 }
  },
  {
    label: {
      past: 'Yesterday',
      future: 'Tomorrow'
    },
    duration: { days: 1 }
  },
  {
    label: {
      past: '7 days ago',
      future: '7 days from now'
    },
    duration: { days: 7 }
  },
  {
    label: {
      past: '1 month ago',
      future: '1 month from now'
    },
    duration: { months: 1 }
  },
  {
    label: {
      past: '6 months ago',
      future: '6 months from now'
    },
    duration: { months: 6 }
  },
  {
    label: {
      past: '1 year ago',
      future: '1 year from now'
    },
    duration: { years: 1 }
  }
]

const items = [{
  label: 'Past',
  method: 'sub',
}, {
  label: 'Future',
  method: 'add'
}]

const values = computed(() => {
  return {
    date: date.value,
    range: range.value,
    isRange: isRange.value,
    timeMode: selectedTimeMode.value,
    timeFormat: selectedTimeFormat.value
  }
})

</script>
