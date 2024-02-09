<script lang="ts" setup>
import TiptapHighlight from '@tiptap/extension-highlight'

const props = defineProps<{
  values: any
}>()

const editor = useEditor({
  editorProps: {
    attributes: {
      class: 'absolute inset-0 flex justify-center items-center flex-col focus:outline-none text-base @[5rem]:text-lg @[10rem]:text-xl @[15rem]:text-2xl @[20rem]:text-3xl @[25rem]:text-4xl @[30rem]:text-5xl @[35rem]:text-6xl @[40rem]:text-7xl @[45rem]:text-8xl @[50rem]:text-9xl font-black bg-gray-50 dark:bg-gray-900 rounded-lg overflow-hidden leading-snug',
    }
  },
  content: props.values,
  extensions: [
    TiptapStarterKit,
    TiptapItalic,
    TiptapHardBreak,
    TiptapLink,
    TiptapHighlight,
  ],
  injectCSS: false,
  editable: false
})

defineEmits(['remove', 'edit'])
</script>

<template>
  <div class="relative size-full group">
    <UButton icon="i-heroicons-pencil" size="2xs" color="primary" variant="soft" class="absolute invisible group-hover:visible bottom-4 right-12 z-10" @click="$emit('edit')" />
    <UButton icon="i-heroicons-trash" size="2xs" color="red" variant="soft" class="absolute invisible group-hover:visible bottom-4 right-4 z-10" @click="$emit('remove')" />
    <div class="flex size-full justify-center items-center overflow-hidden @container">
      <TiptapEditorContent :editor="editor" />
    </div>
  </div>
</template>
