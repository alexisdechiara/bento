<template>
  <div class="flex gap-x-3 w-fit">
    <div v-for="color in colorList" :key="`${color.name}-${name}`">
      <input :id="`${color.name}-${name}`" v-model="modelValue" type="radio" :name="`color-${name}`" :value="color.hex" class="hidden peer">
      <label :for="`${color.name}-${name}`" class="flex p-1.5 cursor-pointer transition duration-300 rounded-md ring-inset ring-1 ring-transparent peer-hover:ring-gray-300 peer-hover:bg-gray-50 peer-checked:ring-gray-700 peer-checked:hover:ring-gray-700">
        <span :class="`rounded size-6 bg-${color.name}-500 hover:bg-${color.name}-700`" />
      </label>
    </div>
  </div>
</template>

<script lang="ts" setup>

withDefaults(defineProps<{
  name: string
  colorList: { name: string, hex: string }[]
}>(), {
  colorList: () => ([
    {
      name: 'blue',
      hex: '#3b82f6',
    },
    {
      name: 'red',
      hex: '#ef4444',
    },
    {
      name: 'amber',
      hex: '#f59e0b',
    },
    {
      name: 'emerald',
      hex: '#10b981',
    },
    {
      name: 'violet',
      hex: '#8b5cf6',
    },
  ])
})

const modelValue = defineModel({ type: String, required: true })

</script>
