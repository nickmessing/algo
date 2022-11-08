import { isRef, type Ref } from 'vue'

export type RefOrValue<T> = Ref<T> | T
export const getRefValue = <T>(ref: RefOrValue<T>): T => {
  return isRef(ref) ? ref.value : ref
}
