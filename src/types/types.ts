export type FunctionResult<T = undefined> =
  | {
      success: true
      data: T
    }
  | {
      success: false
      penalty?: number
      isInteralError?: boolean
      message?: string
    }

export type StoryInfo = {
  key?: string
  newItems?: ItemDetails[]
  dialogs?: string[]
  penalty?: number
}

// always has an image.
export type ItemDetails = {
  key: string
  name?: string
  image?: string
  description?: string
}
