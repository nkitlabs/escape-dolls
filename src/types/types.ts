export type FunctionResult<T = undefined> =
  | {
      success: true
      data: T
    }
  | {
      success: false
      isInteralError?: boolean
      message?: string
    }

export type StoryInfo = {
  dialogs: string[]
}
