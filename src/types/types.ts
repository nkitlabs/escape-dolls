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
  oldId: string
  newId: string
  newDescription?: string
  newName?: string
  hasNewImage?: boolean
}

export type DestroyItemInfo = {
  id: string
}

export type TriggerFunctionIdInfo = {
  id: number
  params: string[]
}

export type HintInfo = {
  id: string
  hintDialogs: string[]
  penalty?: number
  isSpoilSolution?: boolean
}

export type StoryInfo = {
  id: string
  name?: string
  mapToId?: string
  newItems?: ItemInfo[]
  replaceItems?: ReplaceItemInfo[]
  destroyItems?: DestroyItemInfo[]
  triggerFunctionId?: TriggerFunctionIdInfo
  dialogs?: string[]
  hints?: HintInfo[]
  obsoleteHintIds?: string[]
  penalty?: number
}

export type GetStoryInfoResult = {
  id: string
  story: StoryInfo
  newRelatedIds: string[]
  isRepeated?: boolean
}

export type UpdateNewStoryResult = {
  id: string
  isRepeated?: boolean
  newItems?: ItemInfo[]
  triggerFunctionId?: TriggerFunctionIdInfo
}

// always has an image.
export type ItemInfo = {
  id: string
  name: string
  relatedIds?: string[]
  image?: string
  description?: string
}

export type EncryptedStoryInfo = {
  id: string
  hashedId: string
  hashedFilename: string
  iv: string
  encryptedData: string
}
