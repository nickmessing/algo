import type { Optionize } from './common'

export type GraphqlModel = {
  __typename?: string
}

export type GraphqlModelPicker<Model extends GraphqlModel> = {
  [Key in keyof Model]?: Model[Key] extends GraphqlModel
    ? GraphqlModelPicker<Model[Key]>
    : Model[Key] extends GraphqlModel[]
    ? GraphqlModelPicker<Model[Key][number]>
    : true
}

export type DeepPick<Model extends GraphqlModel, Picker extends GraphqlModelPicker<Model>> = Optionize<{
  [Key in keyof Picker]: Key extends keyof Model
    ? Picker[Key] extends true
      ? Model[Key]
      : Model[Key] extends GraphqlModel
      ? Picker[Key] extends GraphqlModelPicker<Model[Key]>
        ? DeepPick<Model[Key], Picker[Key]>
        : never
      : Model[Key] extends GraphqlModel[]
      ? Picker[Key] extends GraphqlModelPicker<Model[Key][number]>
        ? DeepPick<Model[Key][number], Picker[Key]>[]
        : never
      : never
    : never
}>
