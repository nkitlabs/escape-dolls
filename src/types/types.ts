export type FunctionResult<T = undefined> =
  | {
      success: true
      data: T
    }
  | {
      success: false
      error: Error
      penalty?: number
    }

export type ReplaceItemInfos = {
  oldKey: string
  newKey: string
  newDescription?: string
  newName?: string
  hasNewImage?: boolean
}

export type StoryInfo = {
  key: string
  name?: string
  mapKeyword?: string
  newItems?: ItemDetails[]
  replaceItems?: ReplaceItemInfos[]
  showModalId?: string
  dialogs?: string[]
  penalty?: number
}

export type GetStoryInfoResult = {
  story: StoryInfo
  chainKeys: string[]
  actualKey: string
  isFirstTime: boolean
}

export type UpdateNewObjectResult = {
  key: string
  isFirstTime: boolean
  newItems: ItemDetails[]
}

// always has an image.
export type ItemDetails = {
  key: string
  name?: string
  image?: string
  description?: string
}
