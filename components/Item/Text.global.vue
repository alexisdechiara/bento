<script lang="ts" setup>
import TiptapPlaceholder from '@tiptap/extension-placeholder'
import TiptapUnderline from '@tiptap/extension-underline'
import TiptapHighlight from '@tiptap/extension-highlight'
import TiptapTextAlign from '@tiptap/extension-text-align'
import TiptapColor from '@tiptap/extension-color'
import TextStyle from '@tiptap/extension-text-style'
import TiptapCharacterCount from '@tiptap/extension-character-count'
import TiptapFontFamily from '@tiptap/extension-font-family'

const props = defineProps<{
  values: any
}>()

const editor = useEditor({
  editorProps: {
    attributes: {
      class: 'focus:outline-none overflow-auto size-full',
    }
  },
  content: props.values,
  extensions: [
    TiptapStarterKit,
    TiptapPlaceholder.configure({
      placeholder: 'Write here your text',
      emptyNodeClass: 'text-gray-600',
    }),
    TiptapParagraph.configure({
      HTMLAttributes: {
        class: 'text-gray-600',
      },
    }),
    TiptapBold.configure({
      HTMLAttributes: {
        class: 'font-bold',
      },
    }),
    TiptapUnderline.configure({
      HTMLAttributes: {
        class: 'underline underline-offset-1',
      }
    }),
    TiptapBulletList.configure({
      HTMLAttributes: {
        class: 'list-disc list-inside text-gray-800',
      },
      keepMarks: true,
      keepAttributes: true,
    }),
    TiptapOrderedList.configure({
      HTMLAttributes: {
        class: 'list-decimal list-inside text-gray-800',
      },
    }),
    TiptapBlockquote.configure({
      HTMLAttributes: {
        class: 'text-gray-800 sm:text-xl',
      },
    }),
    TiptapHighlight.configure({
      HTMLAttributes: {
        class: 'bg-yellow-200',
      },
      multicolor: true,
    }),
    TiptapTextAlign.configure({
      types: ['heading', 'paragraph'],
    }),
    TiptapColor,
    TextStyle,
    TiptapCharacterCount,
    TiptapFontFamily,
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
    <div class="flex size-full overflow-hidden @container">
      <TiptapEditorContent :editor="editor" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
div:has(>.tiptap ) {
  @apply size-full overflow-hidden p-2;
}
</style>
