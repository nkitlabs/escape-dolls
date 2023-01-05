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

export type ShowModalInfo = {
  id: number
  params: string[]
}

export type StoryInfo = {
  key: string
  name?: string
  mapKeyword?: string
  newItems?: ItemDetails[]
  replaceItems?: ReplaceItemInfos[]
  destroyItems?: ReplaceItemInfos[]
  showModal?: ShowModalInfo
  dialogs?: string[]
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
}

// always has an image.
export type ItemDetails = {
  key: string
  name: string
  possibleKeywords?: string[]
  image?: string
  description?: string
}
