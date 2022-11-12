<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import z from 'zod'

import DescriptionEditor from '@/components/common/forms/DescriptionEditor.vue'
import TagsPicker from '@/components/common/forms/TagsPicker.vue'
import TextField from '@/components/common/forms/TextField.vue'
import PageContainer from '@/components/common/layout/PageContainer.vue'
import { useValidation } from '@/composables/useValidation'
import { useCreateTaskMutation } from '@/generated/graphql'
import { languages } from '@/utils/languages'

import EditableText from '../components/common/forms/EditableText.vue'
import ExamplesEditor from '../components/common/forms/ExamplesEditor.vue'
import FileField from '../components/common/forms/FileField.vue'
import TheAlert from '../components/common/TheAlert.vue'
import TheButton from '../components/common/TheButton.vue'
import TheTag from '../components/common/TheTag.vue'
import IconLoadingSpinning from '../icons/IconLoadingSpinning.vue'
import IconPlus from '../icons/IconPlus.vue'

import type { FileWithContent } from '@/types/files'

const router = useRouter()

const { formData, visibleErrors, parseResult, touch, touchAll } = useValidation(
  z.object({
    title: z.string().min(1, 'Denumirea este necesară').max(100, 'Denumirea nu poate fi mai lungă de 100 de caractere'),
    tags: z
      .array(
        z
          .string()
          .min(1, 'Eticheta trebuie să aibă cel puțin un caracter')
          .max(30, 'Eticheta exemplu nu poate fi mai lungă de 30 de caractere'),
      )
      .min(1, 'Trebuie să adăugați cel puțin o etichetă'),
    description: z
      .string()
      .min(1, 'Descrierea este necesară')
      .max(60_000, 'Descrierea nu poate fi mai lungă de 60.000 de caractere'),
    examples: z
      .array(
        z.object({
          input: z
            .string()
            .min(1, 'Intrarea exemplu trebuie să aibă cel puțin un caracter')
            .max(10_000, 'Intrarea exemplu nu poate fi mai lungă de 10.000 de caractere'),
          output: z
            .string()
            .min(1, 'Ieșirea exemplu trebuie să aibă cel puțin un caracter')
            .max(10_000, 'Ieșirea exemplu nu poate fi mai lungă de 10.000 de caractere'),
        }),
      )
      .min(1, 'Trebuie să adăugați cel puțin un exemplu'),
    timeLimit: z
      .string()
      .regex(/^\d{1,}(?:\.\d{1,2})?$/, 'Limita de timp trebuie să fie un număr zecimal cu maxim 2 cifre după virgulă'),
    memoryLimit: z
      .string()
      .regex(/^\d{1,}$/, 'Limita de memorie trebuie să fie un număr întreg')
      .refine(value => Number(value) >= 2, 'Limita de memorie trebuie să fie cel puțin 2 MB'),
    stackMemoryLimit: z
      .string()
      .regex(/^\d{1,}$/, 'Limita de stivă trebuie să fie un număr întreg')
      .refine(value => Number(value) >= 2, 'Limita de stivă trebuie să fie cel puțin 2 MB'),
    inputs: z
      .array(
        z.object({
          filename: z.string().min(1, 'Numele fișierului trebuie să aibă cel puțin un caracter'),
          content: z
            .string()
            .min(1, 'Conținutul fișierului trebuie să aibă cel puțin un caracter')
            .max(60_000, 'Conținutul fișierului nu poate fi mai lung de 60.000 de caractere'),
        }),
      )
      .min(1, 'Trebuie să adăugați cel puțin un fișier de intrare'),
    source: z.object({
      filename: z.string().refine(filename => {
        const extension = filename.split('.').pop() ?? ''
        return languages.some(language => language.extensions.includes(extension))
      }, 'Fișierul ales ca sursă are extensie necunoscută'),
      content: z
        .string()
        .min(1, 'Codul sursă trebuie să aibă cel puțin un caracter')
        .max(60_000, 'Codul sursă nu poate fi mai lung de 60.000 de caractere'),
    }),
  }),
  {
    title: '',
    tags: [] as string[],
    description: `
<h3>Cerința</h3>
<p>TEXT CERINȚĂ</p>
<h3>Date de intrare</h3>
<p>TEXT DATE DE INTRARE</p>
<h3>Date de ieșire</h3>
<p>TEXT DATE DE IEȘIRE</p>
<h3>Restricții</h3>
<ul>
  <li><p>TEXT RESTRICȚIE</p></li>
</ul>
    `.trim(),
    examples: [{ input: '', output: '' }],
    timeLimit: '',
    memoryLimit: '',
    stackMemoryLimit: '',
    inputs: [] as FileWithContent[],
    source: null as null | FileWithContent,
  },
)

const isDisabled = computed(() => {
  if (!visibleErrors.value) {
    return false
  }

  return Object.values(visibleErrors.value).some(errors => (errors?.length ?? 0) > 0)
})

const selectedLanguage = computed(() => {
  if (formData.source == null) {
    return null
  }

  const extension = formData.source.filename.split('.').pop() ?? ''

  return languages.find(language => language.extensions.includes(extension))
})

const { mutate, loading: isMutating } = useCreateTaskMutation({})

const addExample = () => {
  formData.examples = [...formData.examples, { input: '', output: '' }]
}
const setInputs = (files: FileWithContent[]) => {
  formData.inputs = files
  touch('inputs')
}
const setSource = (files: FileWithContent[]) => {
  formData.source = files[0]
  touch('source')
}

const onSubmit = async () => {
  touchAll()
  if (!parseResult.value.success || selectedLanguage.value == null || isMutating.value) {
    return
  }

  const { data } = parseResult.value

  const result = await mutate({
    input: {
      title: data.title,
      tags: data.tags,
      description: data.description,
      examples: data.examples,
      timeLimit: Math.round(Number(data.timeLimit) * 1000),
      memoryLimit: Number(data.memoryLimit) * 1024 * 1024,
      stackMemoryLimit: Number(data.stackMemoryLimit) * 1024 * 1024,
      inputs: data.inputs.map(input => input.content),
      languageId: selectedLanguage.value.languageId,
      solutionSource: data.source.content,
    },
  })
  if (result?.data?.createTask.id) {
    void router.push(`/tasks/${result.data.createTask.id}`)
  }
}
</script>

<template>
  <PageContainer>
    <form class="page-flex" @submit.prevent="onSubmit">
      <TheAlert v-if="visibleErrors?.title" type="error" :message="visibleErrors?.title" />
      <TextField
        v-model="formData.title"
        placeholder="Denumirea Problemei"
        :isErrored="Boolean(visibleErrors?.title)"
        @blur="touch('title')"
      />

      <TheAlert v-if="visibleErrors?.tags" type="error" :message="visibleErrors.tags" />
      <TagsPicker
        v-model="formData.tags"
        placeholder="Etichete"
        :isErrored="Boolean(visibleErrors?.tags)"
        @blur="touch('tags')"
      />

      <TheAlert v-if="visibleErrors?.description" type="error" :message="visibleErrors.description" />
      <DescriptionEditor
        v-model="formData.description"
        placeholder="Descriere"
        :isErrored="Boolean(visibleErrors?.description)"
        @blur="touch('description')"
      />

      <div class="section-title">
        <div>Exemple</div>
        <IconPlus class="icon" @click="addExample" />
      </div>
      <TheAlert v-if="visibleErrors?.examples" type="error" :message="visibleErrors.examples" />
      <ExamplesEditor v-model="formData.examples" @blur="touch('examples')" />

      <TheAlert v-if="visibleErrors?.timeLimit" type="error" :message="visibleErrors.timeLimit" />
      <TheAlert v-if="visibleErrors?.memoryLimit" type="error" :message="visibleErrors.memoryLimit" />
      <TheAlert v-if="visibleErrors?.stackMemoryLimit" type="error" :message="visibleErrors.stackMemoryLimit" />
      <div class="section-title">
        <div>Limite</div>
        <TheTag class="limit-editor" :isErrored="Boolean(visibleErrors?.timeLimit)">
          <div>Timp limită:</div>
          <EditableText v-model="formData.timeLimit" placeholder="0.1" @blur="touch('timeLimit')" />
          <div>s</div>
        </TheTag>
        <TheTag class="limit-editor" :isErrored="Boolean(visibleErrors?.memoryLimit)">
          <div>Memorie limită (total):</div>
          <EditableText v-model="formData.memoryLimit" placeholder="128" @blur="touch('memoryLimit')" />
          <div>MB</div>
        </TheTag>
        <TheTag class="limit-editor" :isErrored="Boolean(visibleErrors?.stackMemoryLimit)">
          <div>Memorie limită (stivă):</div>
          <EditableText v-model="formData.stackMemoryLimit" placeholder="128" @blur="touch('stackMemoryLimit')" />
          <div>MB</div>
        </TheTag>
      </div>

      <div class="section-title">Încarcă fișiere de intrare</div>
      <TheAlert v-if="visibleErrors?.inputs" type="error" :message="visibleErrors.inputs" />
      <FileField isMultiple :isErrored="Boolean(visibleErrors?.inputs)" @change="setInputs" />

      <div class="section-title">Încarcă soluție</div>
      <TheAlert v-if="visibleErrors?.source" type="error" :message="visibleErrors.source" />
      <div class="row">
        <FileField class="grow" :isErrored="Boolean(visibleErrors?.source)" @change="setSource" />
        <TheTag v-if="selectedLanguage">{{ selectedLanguage.name }}</TheTag>
      </div>
      <TheButton type="submit" :disabled="isDisabled">
        Adaugă problema
        <IconLoadingSpinning v-if="isMutating" />
      </TheButton>
    </form>
  </PageContainer>
</template>

<style lang="scss" scoped>
.page-flex {
  .row {
    display: flex;
    align-items: center;
    gap: 16px;
    width: 100%;

    .grow {
      flex-grow: 1;
    }
  }

  .section-title {
    font-size: var(--font-size-heading);
    line-height: 34px;
    gap: 16px;
    display: flex;
    align-items: center;

    .icon {
      cursor: pointer;
    }

    .limit-editor {
      display: flex;
      gap: 4px;
    }
  }
}
</style>
