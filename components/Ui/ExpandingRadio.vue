<template>
  <div class="flex flex-col w-full gap-y-4">
    <div class="flex flex-col w-full h-fit gap-y-2">
      <input :id="id" v-model="modelValue" type="radio" :name="name" :value="value" class="hidden peer">
      <label :for="id" class="flex flex-col gap-y-1 size-full peer-checked:h-48 transition-all duration-500 h-10 text-gray-500 font-bold cursor-pointer ring-2 rounded-lg ring-gray-200 peer-hover:text-black peer-checked:text-black peer-hover:ring-black peer-checked:ring-black p-2 overflow-hidden">
        {{ label }}
        <div v-if="!$slots.content" class="flex size-full rounded-md overflow-hidden">
          <NuxtImg v-if="src" :src="src" class="size-full object-cover" fit="cover" />
        </div>
        <slot name="content" :open="modelValue === value" />
      </label>
    </div>
  </div>
</template>

<script lang="ts" setup>

defineProps<{
  label: string
  value: string
  name: string
  id: string
  src?: string
}>()

const modelValue = defineModel({ type: String, required: true })
</script>