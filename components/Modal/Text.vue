<template>
  <ModalItem :values="editor ? editor.getHTML() : ''" label="Text" :component-id="4" :is-submitable="editor != null" @return="$emit('return')" @close="$emit('close')">
    <template #preview>
      <ItemText :values="editor ? editor.getHTML() : ''" />
    </template>
    <template #content>
      <div v-if="editor" class="relative h-full flex flex-col gap-y-1 overflow-hidden rounded-xl border-2 border-gray-300 bg-white">
        <div class="m-1 flex items-center justify-between rounded-lg bg-gray-100 p-1.5">
          <div class="flex gap-0.5">
            <UButton icon="i-heroicons-bold" color="gray" class="tiptap-btn" :class="{ 'active': editor.isActive('bold') }" square variant="ghost" @click="editor.chain().focus().toggleBold().run()" />
            <UButton icon="i-heroicons-italic" color="gray" class="tiptap-btn" :class="{ 'active': editor.isActive('italic') }" square variant="ghost" @click="editor.chain().focus().toggleItalic().run()" />
            <UButton icon="i-heroicons-underline" color="gray" class="tiptap-btn" :class="{ 'active': editor.isActive('underline') }" square variant="ghost" @click="editor.chain().focus().toggleUnderline().run()" />
            <UButton icon="i-iconoir-strikethrough" color="gray" class="tiptap-btn" :class="{ 'active': editor.isActive('strike') }" square variant="ghost" @click="editor.chain().focus().toggleStrike().run()" />
            <UButton icon="i-fluent-highlight-16-regular" color="gray" class="tiptap-btn" :class="{ 'active': editor.isActive('highlight') }" square variant="ghost" @click="editor.chain().focus().toggleHighlight().run()" />
            <UButton icon="i-heroicons-list-bullet" color="gray" class="tiptap-btn" :class="{ 'active': editor.isActive('bulletList') }" square variant="ghost" @click="editor.chain().focus().toggleBulletList().run()" />
            <UButton icon="i-octicon-list-ordered-24" color="gray" class="tiptap-btn" :class="{ 'active': editor.isActive('orderedList') }" square variant="ghost" @click="editor.chain().focus().toggleOrderedList().run()" />
            <UDivider orientation="vertical" class="mx-2" />
            <UPopover :popper="{ placement: 'bottom-start' }">
              <UButton color="gray" class="tiptap-btn" variant="ghost" label="Colors" trailing-icon="i-heroicons-chevron-down-20-solid" />
              <template #panel>
                <div class="flex flex-col gap-4 p-4 w-fit">
                  <div class="flex flex-col gap-y-1">
                    <span>Fill</span>
                    <div class="flex gap-x-1">
                      <UButton color="gray" class="p-1.5 transition-all hover:ring-1 ring-gray-300 bg-gray-50" :class="{ 'ring-1': !editor.isActive('textStyle', { color: /.*/ }) }" square variant="ghost" @click="editor.chain().focus().unsetColor().run()">
                        <template #leading>
                          <UIcon name="i-heroicons-no-symbol" class="w-6 h-6 rounded" />
                        </template>
                      </UButton>
                      <UButton v-for="(hex, name) in filledColors" :key="name" color="gray" class="p-1.5 transition-all hover:ring-1 ring-gray-300" :class="{ 'ring-1': editor.isActive('textStyle', { color: hex }) }" square variant="ghost" @click="editor.chain().focus().setColor(hex).run()">
                        <template #leading>
                          <div class="w-6 h-6  rounded" :style="{ backgroundColor: hex }" />
                        </template>
                      </UButton>
                      <!-- <UButton color="black" icon="i-heroicons-plus" square variant="link" @click="editor.chain().focus().unsetColor().run()" /> -->
                    </div>
                  </div>
                  <div class="flex flex-col gap-y-1">
                    <span>Highlight</span>
                    <div class="flex gap-x-1">
                      <UButton color="gray" class="p-1.5 transition-all hover:ring-1 ring-gray-300 bg-gray-50" :class="{ 'ring-1': !editor.isActive('highlight', { color: /.*/ }) }" square variant="ghost" @click="editor.chain().focus().unsetHighlight().run()">
                        <template #leading>
                          <UIcon name="i-heroicons-no-symbol" class="w-6 h-6 rounded" />
                        </template>
                      </UButton>
                      <UButton v-for="(hex, name) in highlightedColors" :key="name" color="gray" class="p-1.5 transition-all hover:ring-1 ring-gray-300" :class="{ 'ring-1': editor.isActive('highlight', { color: hex }) }" square variant="ghost" @click="editor.chain().focus().toggleHighlight({ color: hex }).run()">
                        <template #leading>
                          <div class="w-6 h-6  rounded" :style="{backgroundColor: hex}" />
                        </template>
                      </UButton>
                      <!-- <UButton color="black" icon="i-heroicons-plus" square variant="link" @click="editor.chain().focus().unsetHighlight().run()" /> -->
                    </div>
                  </div>
                </div>
              </template>
            </UPopover>
            <UDivider orientation="vertical" class="mx-2" />
            <USelectMenu v-model="selectedFont" :options="fonts" searchable searchable-placeholder="Search a font…" class="rounded-lg text-center align-middle font-sans text-gray-900 transition-all hover:bg-gray-900/10 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" select-class="w-fit max-w-48 cursor-pointer" :ui="{ icon: { base: 'text-gray-900' } }" :ui-menu="{ width: 'w-max' }" size="md" variant="none" @change="editor.chain().focus().setFontFamily(selectedFont).run()" />
          </div>
          <div class="flex gap-0.5">
            <UButton icon="i-heroicons-bars-3-bottom-left" color="gray" class="tiptap-btn" :class="{ 'active': editor.isActive({ textAlign: 'left' }) }" square variant="ghost" @click="editor.chain().focus().setTextAlign('left').run()" />
            <UButton icon="i-heroicons-bars-3-bottom-right" color="gray" class="tiptap-btn" :class="{ 'active': editor.isActive({ textAlign: 'right' }) }" square variant="ghost" @click="editor.chain().focus().setTextAlign('right').run()" />
            <UButton icon="i-heroicons-bars-3-center-left" color="gray" class="tiptap-btn" :class="{ 'active': editor.isActive({ textAlign: 'center' }) }" square variant="ghost" @click="editor.chain().focus().setTextAlign('center').run()" />
            <UButton icon="i-heroicons-bars-3" color="gray" class="tiptap-btn" :class="{ 'active': editor.isActive({ textAlign: 'justify' }) }" square variant="ghost" @click="editor.chain().focus().setTextAlign('justify').run()" />
          </div>
        </div>
        <TiptapEditorContent :editor="editor" />
        <span class="absolute bottom-4 right-6 text-xs text-gray-400 font-medium">{{ editor ? editor.storage.characterCount.characters() : 0 }} characters</span>
      </div>
    </template>
  </ModalItem>
</template>

<script lang="ts" setup>
defineEmits(['return', 'close'])

import TiptapPlaceholder from '@tiptap/extension-placeholder'
import TiptapUnderline from '@tiptap/extension-underline'
import TiptapHighlight from '@tiptap/extension-highlight'
import TiptapTextAlign from '@tiptap/extension-text-align'
import TiptapColor from '@tiptap/extension-color'
import TextStyle from '@tiptap/extension-text-style'
import TiptapCharacterCount from '@tiptap/extension-character-count'
import TiptapFontFamily from '@tiptap/extension-font-family'

const selectedFont = ref('DM Sans')

const editor = useEditor({
  editorProps: {
    attributes: {
      class: 'focus:outline-none overflow-auto size-full',
    }
  },
  content: '',
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
})

const filledColors = {
  blue: '#3b82f6',
  violet: '#8b5cf6',
  green: '#22c55e',
  orange: '#f97316',
  red: '#ef4444',
}

const highlightedColors = {
  blue: '#bfdbfe',
  violet: '#ddd6fe',
  green: '#bbf7d0',
  orange: '#fed7aa',
  red: '#fecaca',
}

const fonts = [
  'Arial',
  'Calibri',
  'Comic Sans MS',
  'DM Sans',
  'DM Sans fallback',
  'Courier New',
  'Droid Sans',
  'Droid Serif',
  'Fira Sans',
  'Fira Serif',
  'Georgia',
  'Helvetica',
  'Lato',
  'Merriweather',
  'Muli',
  'Noto Sans',
  'Noto Serif',
  'Open Sans',
  'Oswald',
  'PT Sans',
  'PT Serif',
  'Playfair Display',
  'Raleway',
  'Roboto',
  'Roboto Slab',
  'Rubik',
  'Source Sans Pro',
  'Tahoma',
  'Times New Roman',
  'Titillium Web',
  'Trebuchet MS',
  'Ubuntu',
  'Verdana'
]

watch(
  () => editor.value?.isActive('textStyle', { fontFamily: selectedFont.value }),
  (isActive) => {
    if (!isActive) {
      const matchingFont = fonts.find(font => editor.value?.isActive('textStyle', { fontFamily: font }))
      if (matchingFont) {
        selectedFont.value = matchingFont
      } else {
        selectedFont.value = 'DM Sans' //Tailwind root font
      }
      console.log(matchingFont)
    }
  }
)

onUnmounted(() => {
  editor.value?.destroy()
})

</script>

<style lang="scss" scoped>
.tiptap-btn {
  @apply select-none place-items-center rounded-lg text-center align-middle font-sans font-normal text-gray-900 transition-all hover:bg-gray-900/10 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none;
}

.tiptap-btn.active {
  @apply bg-gray-900 text-gray-100
}

div:has(>.tiptap ) {
  @apply size-full overflow-hidden p-2;
}

.tiptap ul p,
.tiptap ol p {
  @apply inline;
}

.tiptap .is-editor-empty:first-child::before {
  @apply pointer-events-none float-left h-0 text-sm;
}
</style>
