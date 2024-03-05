<script setup lang="ts">
import AccountForm from '../AccountForm.vue';
import EditorSection from '../EditorSection.vue';

import { object, string, type InferType } from 'yup'
import type { FormSubmitEvent } from '#ui/types'

const { toast, view } = await useEditor();

const schema = object({
    email: string().email('Invalid email').required('Required'),
    password: string().required('Required')
})

type Schema = InferType<typeof schema>

const state = reactive({
    email: undefined,
    password: undefined
})

async function onSubmit(event: FormSubmitEvent<Schema>) {
    try {
        await $fetch('/api/editable/auth/login', {
            method: 'POST',
            body: event.data
        })
        view.go({ view: 'collections' })
    } catch (error) {
        toast.add({ title: 'An error occurred while signing in.', color: 'red', type: 'error' })
    }
}
</script>

<template>
  <EditorSection>
    <AccountForm title="Sign in to manage your site">
      <UForm
        class="col-span-3 grid grid-cols-3 gap-8 items-start"
        :schema="schema"
        :state="state"
        @submit="onSubmit"
      >
        <UFormGroup
          label="Email"
          name="email"
        >
          <UInput
            v-model="state.email"
            label="Email"
            type="email"
            size="xl"
          />
        </UFormGroup>
        <UFormGroup
          label="Password"
          name="password"
        >
          <UInput
            v-model="state.password"
            label="Password"
            type="password"
            size="xl"
          />
        </UFormGroup>
        <UButton
          type="submit"
          block
          class="mt-6"
          size="xl"
        >
          Sign in
        </UButton>
      </UForm>
    </AccountForm>
  </EditorSection>
</template>

<style scoped></style>