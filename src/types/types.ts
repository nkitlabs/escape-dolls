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

export type ReplaceItemInfo = {
  oldKey: string
  newKey: string
  newDescription?: string
  newName?: string
  hasNewImage?: boolean
}

export type DestroyItemInfo = {
  key: string
}

export type FunctionMappingInfo = {
  id: number
  params: string[]
}

export type HintInfo = {
  key: string
  hintDialogs: string[]
  penalty?: number
  isSpoilSolution?: boolean
}

export type StoryInfo = {
  key: string
  name?: string
  mapKeyword?: string
  newItems?: ItemDetails[]
  replaceItems?: ReplaceItemInfo[]
  destroyItems?: DestroyItemInfo[]
  functionMapping?: FunctionMappingInfo
  dialogs?: string[]
  hints?: HintInfo[]
  removeHintKeys?: string[]
  penalty?: number
}

export type GetStoryInfoResult = {
  story: StoryInfo
  chainKeys: string[]
  actualKey: string
  isRepeated?: boolean
}

export type UpdateNewObjectResult = {
  key: string
  isRepeated?: boolean
  newItems?: ItemDetails[]
  functionMapping?: FunctionMappingInfo
}

// always has an image.
export type ItemDetails = {
  key: string
  name: string
  possibleKeywords?: string[]
  image?: string
  description?: string
}
