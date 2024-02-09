<template>
  <ModalItem :values="editor ? editor.getHTML() : ''" :width="3" :height="2" label="Title" :component-id="3" :is-submitable="true" @return="$emit('return')" @close="$emit('close')">
    <template #preview>
      <ItemTitle :values="editor ? editor.getHTML() : ''" />
    </template>
    <template #content>
      <div class="flex size-full relative">
        <TiptapEditorContent :editor="editor" />
      </div>
    </template>
  </ModalItem>
</template>

<script lang="ts" setup>
import TiptapHighlight from '@tiptap/extension-highlight'
import TiptapPlaceholder from '@tiptap/extension-placeholder'

defineEmits(['return', 'close'])

const editor = useEditor({
  editorProps: {
    attributes: {
      class: 'absolute inset-0 flex justify-center items-center flex-col focus:outline-none text-5xl font-black bg-gray-50 dark:bg-gray-900 rounded-lg overflow-auto leading-snug',
    }
  },
  content: '',
  extensions: [
    TiptapStarterKit,
    TiptapItalic,
    TiptapHardBreak,
    TiptapLink,
    TiptapHighlight,
    TiptapPlaceholder.configure({
      emptyNodeClass: 'is-editor-empty',
      placeholder: 'Add your title here',
    }),
  ],
  injectCSS: false,
})
</script>

<style lang="scss">
.tiptap .is-editor-empty:first-child::before {
  @apply content-[attr(data-placeholder)] float-left h-0 pointer-events-none text-gray-300 dark:text-gray-500;
}
</style>
