<script setup lang="ts">
import { Editor, EditorContent, BubbleMenu, FloatingMenu } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'

import { defineProps, computed, ref, watch, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps<{
    modelValue: string;
    componentProps: any;
}>()

const emit = defineEmits(['update:modelValue'])

const state = computed({
    get: () => props.modelValue,
    set: (value) => emit('update:modelValue', value)
})

const editor = ref(null)

onMounted(() => {
    state.value = props.modelValue

    editor.value = new Editor({
        content: state.value,
        extensions: [
            StarterKit,
            Underline,
            Link,
            Image
        ],
        onUpdate: ({ editor }) => {
            state.value = editor.getHTML()
        },
        editorProps: {
            attributes: {
                class: 'prose dark:prose-invert'
            }
        }
    })

    Link.configure({
        openOnClick: false,
    })
})

watch(() => props.modelValue, (value) => {
    const isSame = editor.value.getHTML() === value
    if (isSame) {
        return
    }
    editor.value.commands.setContent(value, false)
})

onBeforeUnmount(() => {
    editor.value.destroy()
})

const headingDropdownButtons = [1,2,3,4,5,6].map((level) => {
    return {
        label: `H${level}`,
        class: "font-semibold",
        click: () => editor.value.chain().focus().toggleHeading({ level }).run()
    }
})

const headingLevel = computed(() => {
    return editor.value.isActive('heading') ? editor.value.getAttributes('heading').level : 1
})

const linkHref = computed({
    get: () => {
        return editor.value.getAttributes('link')?.href || ''
    },
    set: (value: any) => {
        if (!value) {
            return editor.value.chain().focus().unsetLink().run()
        } else {
            editor.value.chain().setLink({ href: value }).run()
        }
    }

})

const linkTarget = computed({
    get: () => {
        return editor.value.getAttributes('link')?.target || false
    },
    set: (value: any) => {
        if (!value) {
            return editor.value.chain().setLink({ href: linkHref.value, target: '' }).run()
        } else {
            editor.value.chain().setLink({ href: linkHref.value, target: '_blank' }).run()
        }
    }
})

const imageURL = computed({
    get: () => {
        return editor.value.getAttributes('image')?.src || ''
    },
    set: (value: any) => {
        if (!value) {
            return editor.value.chain().unsetImage().run()
        } else {
            editor.value.chain().setImage({ src: value }).run()
        }
    }
})

const imageAlt = computed({
    get: () => {
        return editor.value.getAttributes('image')?.alt || null
    },
    set: (value: any) => {
        if (!value) {
            return editor.value.chain().setImage({ src: imageURL.value, alt: '' }).run()
        } else {
            editor.value.chain().setImage({ src: imageURL.value, alt: value }).run()
        }
    }
})

</script>

<template>
  <div class="w-full">
    <BubbleMenu
      v-if="editor"
      :editor="editor"
    >
      <UButtonGroup
        size="sm"
        orientation="horizontal"
        class="mb-2"
      >
        <UButton
          icon="i-ic:baseline-format-bold"
          color="gray"
          @click="editor.chain().focus().toggleBold().run()"
        />
        <UButton
          icon="i-ic:baseline-format-italic"
          color="gray"
          @click="editor.chain().focus().toggleItalic().run()"
        />
        <UButton
          icon="i-ic:baseline-format-underlined"
          color="gray"
          @click="editor.chain().focus().toggleUnderline().run()"
        />
        <UButton
          icon="i-ic:baseline-format-strikethrough"
          color="gray"
          @click="editor.chain().focus().toggleStrike().run()"
        />
        <UDropdown
          :items="[headingDropdownButtons]"
          mode="hover"
          :popper="{ placement: 'bottom-start' }"
        >
          <UButton
            color="gray"
            :label="`H${headingLevel}`"
            trailing-icon="i-heroicons-chevron-down-20-solid"
            class="font-bold"
          />
        </UDropdown>
        <UButton
          icon="i-ic:baseline-format-quote"
          color="gray"
          @click="editor.chain().focus().toggleBlockquote().run()"
        />

        <!-- Link -->
        <UPopover
          mode="hover"
          :popper="{ placement: 'bottom-start' }"
        >
          <UButton
            color="gray"
            label="Link"
            trailing-icon="i-ic:baseline-insert-link"
          />
          <template #panel>
            <div class="p-4">
              <UFormGroup label="URL">
                <UButtonGroup
                  size="sm"
                  class="mb-2"
                >
                  <UInput
                    v-model="linkHref"
                    type="text"
                    placeholder="Paste or type a link"
                    class="w-64"
                  />
                  <UButton
                    v-if="linkHref"
                    color="gray"
                    icon="i-ic:baseline-close"
                    @click="linkHref = null"
                  />
                </UButtonGroup>
              </UFormGroup>
              <UCheckbox
                v-model="linkTarget"
                label="Open in new Tab"
                name="_blank"
              />
            </div>
          </template>
        </UPopover>
      </UButtonGroup>
    </BubbleMenu>

    <FloatingMenu
      v-if="editor"
      :editor="editor"
    >
      <UButtonGroup
        size="sm"
        orientation="horizontal"
        class="ml-8"
      >
        <UButton
          icon="i-ic:baseline-format-list-bulleted"
          color="gray"
          @click="editor.chain().focus().toggleBulletList().run()"
        />
        <UButton
          icon="i-ic:baseline-format-list-numbered"
          color="gray"
          @click="editor.chain().focus().toggleOrderedList().run()"
        />
        <UButton
          icon="i-ic:baseline-horizontal-rule"
          color="gray"
          @click="editor.chain().focus().setHorizontalRule().run()"
        />
        <!-- Link -->
        <UPopover
          mode="hover"
          :popper="{ placement: 'bottom-start' }"
        >
          <UButton
            color="gray"
            icon="i-ic:baseline-image"
          />
          <template #panel>
            <div class="p-4">
              <UFormGroup label="Image URL">
                <UButtonGroup
                  size="sm"
                  class="mb-2"
                >
                  <UInput
                    v-model="imageURL"
                    type="text"
                    placeholder="Paste URL to an image"
                    class="w-64"
                  />
                  <UButton
                    v-if="imageURL"
                    color="gray"
                    icon="i-ic:baseline-close"
                    @click="imageURL = null"
                  />
                </UButtonGroup>
              </UFormGroup>
              <UInput
                v-model="imageAlt"
                type="text"
                placeholder="Enter the alt text"
                class="w-64"
              />
            </div>
          </template>
        </UPopover>
      </UButtonGroup>
    </FloatingMenu>

    <editor-content
      :editor="editor"
      class="disabled:cursor-not-allowed disabled:opacity-75 shadow-sm bg-white dark:bg-gray-900 ring-1 ring-inset ring-gray-300 dark:ring-gray-700 rounded-md p-4"
    />
  </div>
</template>

<style scoped>

:deep(.ProseMirror:focus) {
    outline: none;
}

:deep(.ProseMirror) {
    max-width: 100%;
}

</style>