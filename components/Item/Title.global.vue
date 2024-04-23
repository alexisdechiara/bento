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

</script>

<template>
  <div class="flex size-full justify-center items-center overflow-hidden group container-query">
    <TiptapEditorContent :editor="editor" />
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
