import { computed, reactive } from 'vue'

import type z from 'zod'

type InitialData<T> = {
  [K in keyof T]: T[K] | null
}

export function useValidation<Schema extends z.AnyZodObject, Data extends InitialData<z.infer<Schema>>>(
  schema: Schema,
  initialData: Data,
) {
  const formData = reactive(initialData)
  const touched = reactive(
    Object.fromEntries(Object.keys(initialData).map(key => [key, false] as const)) as Record<
      keyof z.infer<Schema>,
      boolean
    >,
  )

  const parseResult = computed(
    () => schema.safeParse(formData) as z.SafeParseReturnType<z.infer<Schema>, z.infer<Schema>>,
  )
  const zodFieldErrors = computed(() => {
    if (parseResult.value.success) {
      return null
    }
    return parseResult.value.error.formErrors.fieldErrors
  })
  const visibleErrors = computed(() =>
    zodFieldErrors.value
      ? (Object.fromEntries(
          Object.entries(zodFieldErrors.value).map(([key, value]) => [key, touched[key] ? value : null] as const),
        ) as Record<keyof z.infer<Schema>, string[] | null>)
      : null,
  )
  const touch = (key: keyof z.infer<Schema>) => {
    ;(touched[key] as boolean) = true
  }
  const touchAll = () => {
    Object.keys(touched).forEach(key => {
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
      ;(touched[key] as boolean) = true
    })
  }

  return {
    formData,
    touched,
    parseResult,
    zodFieldErrors,
    visibleErrors,
    touch,
    touchAll,
  }
}
