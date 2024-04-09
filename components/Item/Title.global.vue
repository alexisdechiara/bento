<script lang="ts" setup>
import TiptapHighlight from '@tiptap/extension-highlight'

const props = defineProps<{
  values: any
}>()

const editor = useEditor({
  editorProps: {
    attributes: {
      class: 'absolute inset-0 flex justify-center items-center flex-col text-center focus:outline-none font-black bg-gray-50 dark:bg-gray-900 rounded-lg overflow-hidden leading-snug title',
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
  <div class="relative size-full group container-query">
    <UButton icon="i-heroicons-pencil" size="2xs" color="primary" variant="soft" class="absolute invisible group-hover:visible bottom-4 right-12 z-10" @click="$emit('edit')" />
    <UButton icon="i-heroicons-trash" size="2xs" color="red" variant="soft" class="absolute invisible group-hover:visible bottom-4 right-4 z-10" @click="$emit('remove')" />
    <div class="flex size-full justify-center items-center overflow-hidden">
      <TiptapEditorContent :editor="editor" />
    </div>
  </div>
</template>

<style lang="scss">

.container-query {
  container-type: size;
}

.title {
  font-size: clamp(1rem, 8cqw + 5cqh, min(75cqh, 25cqw));
}

</style>
