export type MappedC<A, B> = {
  [K in keyof A & keyof B]: A[K] extends B[K] ? never : K
}

export type NullableKeys<T> = {
  [Key in keyof T]: undefined extends T[Key] ? Key : never
}[keyof T]

export type NonNullableKeys<T> = Exclude<keyof T, NullableKeys<T>>

export type Optionize<T> = {
  [Key in NullableKeys<T>]?: T[Key] | undefined
} & {
  [Key in NonNullableKeys<T>]: T[Key]
}
