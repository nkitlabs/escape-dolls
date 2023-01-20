import { zip } from 'lodash'

import { START_GAME_STORY_ID } from 'types/constants'
import {
  CombineItemsError,
  DuplicateStoryError,
  NotFoundError,
  ObserveItemsError,
  SearchExistingItemError,
  SearchItemsError,
  SolveItemError,
  StoryPenaltyError,
  customErrorName,
} from 'types/errors'
import { FunctionResult, ItemDetails, ReplaceItemInfo, UpdateNewStoryResult } from 'types/types'

import { dataLoaderService } from 'services/dataLoaderService'

import { gameStore } from 'stores/gameStore'
import { hintStore } from 'stores/hintStore'
import { itemStore } from 'stores/itemStore'

import { REGEX_ARTICLE, REGEX_METADATA_FILE_PREFIX } from 'utils/regex'

class GameService {
  public combineItems = async (): Promise<FunctionResult<UpdateNewStoryResult>> => {
    const storyId = 'combine+' + Array.from(itemStore.selectedIds).sort().join('+')
    const result = await this.updateNewStory(storyId)
    itemStore.clearSelectedItems()

    if (!result.success) {
      const newErr = customErrorName.has(result.error.name) ? new CombineItemsError() : result.error
      return { ...result, error: newErr }
    }
    return result
  }

  public observeItem = async (): Promise<FunctionResult<UpdateNewStoryResult>> => {
    const selectedId = Array.from(itemStore.selectedIds)[0]
    const storyId = 'observe+' + selectedId
    const result = await this.updateNewStory(storyId)
    itemStore.clearSelectedItems()

    if (!result.success) {
      const itemIndex = itemStore.existingItems.findIndex((item) => item.id === selectedId)
      if (itemIndex < 0) {
        return { success: false, error: new Error(`cannot find item with id ${selectedId}`) }
      }
      const itemName = itemStore.existingItems[itemIndex].name ?? 'an undefined object'
      const newErr = customErrorName.has(result.error.name) ? new ObserveItemsError(itemName) : result.error
      return { ...result, error: newErr }
    }
    return result
  }

  public searchItem = async (keyword: string): Promise<FunctionResult<UpdateNewStoryResult>> => {
    const transformedKeyword = keyword
      .trim()
      .replace(REGEX_ARTICLE, '')
      .replace(new RegExp('\\s+'), '-')
      .trim()
      .toLowerCase()
    if (itemStore.idToName[transformedKeyword]) {
      return { success: false, error: new SearchExistingItemError(itemStore.idToName[transformedKeyword]) }
    }

    const storyId = 'search+' + transformedKeyword
    const result = await this.updateNewStory(storyId)

    if (!result.success) {
      const newErr = customErrorName.has(result.error.name) ? new SearchItemsError(keyword) : result.error
      return { ...result, error: newErr }
    }

    if (result.data.isRepeated) {
      return { success: false, error: new DuplicateStoryError(result.data.id) }
    }
    return result
  }

  public solveItem = async (itemId: string, answer: string): Promise<FunctionResult<UpdateNewStoryResult>> => {
    const storyId = `solve+${itemId}+${answer}`
    const result = await this.updateNewStory(storyId)

    if (!result.success) {
      const newErr = customErrorName.has(result.error.name) ? new SolveItemError() : result.error
      return { ...result, error: newErr, penalty: result.penalty }
    }
    return result
  }

  public startGame = async (): Promise<FunctionResult<UpdateNewStoryResult>> => {
    const result = await this.updateNewStory(START_GAME_STORY_ID)
    return result
  }

  private updateNewStory = async (id: string): Promise<FunctionResult<UpdateNewStoryResult>> => {
    try {
      // find storyInfo
      const storyInfoResult = await dataLoaderService.getStoryInfo(id)
      if (!storyInfoResult.success) {
        return storyInfoResult
      }
      const { isRepeated, newRelatedIds, story: storyInfo } = storyInfoResult.data
      const { dialogs, newItems, penalty, triggerFunctionId, destroyItems } = storyInfo

      // if story cause a player some penalty. return result with penalty
      if (penalty) {
        if (dialogs) gameStore.addDialog(dialogs)
        return { success: false, error: new StoryPenaltyError(storyInfo.id, penalty), penalty: penalty }
      }

      // if it is not first time add dialogs and return.
      if (isRepeated) {
        if (dialogs && dialogs.length > 0) {
          gameStore.addDialog(dialogs)
        }
        return {
          success: true,
          data: { isRepeated: isRepeated, id: storyInfo.id, triggerFunctionId: triggerFunctionId },
        }
      }

      // get updatedItems
      let updatedItems: ItemDetails[] = []
      if (newItems) {
        const imgResults = await Promise.all(newItems.map(({ id }) => this.updateImage(id)))
        const errorMsg = imgResults.filter((result) => !result.success)
        if (errorMsg.length > 0 && !errorMsg[0].success) {
          return errorMsg[0]
        }

        const newImageUrls = imgResults.map((result) => (result.success ? result.data : ''))
        updatedItems = zip(newImageUrls, newItems).map(([url, item]) => ({
          ...item,
          name: item!.name,
          id: item!.id ?? '',
          image: url,
        }))
      }

      // get replace item details.
      let replaceItemDetails: { id: number; newItem: ItemDetails }[] = []
      if (storyInfo.replaceItems) {
        replaceItemDetails = await Promise.all(storyInfo.replaceItems.map((v) => this.getReplaceItemDetails(v)))
      }

      // update hintStore
      hintStore.addPossibleHints(storyInfo.hints ?? [])
      hintStore.removePossibleHints(storyInfo.obsoleteHintIds ?? [])

      // update store at the end
      itemStore.addExistingItems(updatedItems)
      if (storyInfo.destroyItems) {
      }
      replaceItemDetails.map(({ newItem }, index) => itemStore.replaceItem(index, newItem))
      for (const { id } of destroyItems ?? []) {
        const index = itemStore.existingItems.findIndex((item) => item.id === id)
        itemStore.removeExistingItem(index)
      }
      if (dialogs && dialogs.length > 0) {
        gameStore.addDialog(dialogs)
        newRelatedIds.map((id) => gameStore.addStoryInfo(id, storyInfo))
      }

      return {
        success: true,
        data: { newItems: updatedItems, id: storyInfo.id, triggerFunctionId: triggerFunctionId },
      }
    } catch (err) {
      console.error('[updateNewObject]', err, id)
      return { success: false, error: err }
    }
  }

  private updateImage = async (itemId: string): Promise<FunctionResult<string>> => {
    try {
      const imgId = `${itemId}-img`
      const result = await dataLoaderService.getImage(imgId)
      if (!result.success) {
        return result
      }

      const buffer = Buffer.from(result.data?.replace(REGEX_METADATA_FILE_PREFIX, ''), 'base64')
      const blob = new Blob([buffer], { type: 'image/png' })
      const imgUrl = URL.createObjectURL(blob)
      gameStore.addNewImage(imgId, imgUrl)

      return { success: true, data: imgUrl }
    } catch (err) {
      console.error('[updateImage]', err, itemId)
      return { success: false, error: err }
    }
  }

  private getReplaceItemDetails = async (item: ReplaceItemInfo) => {
    const oldId = item.oldId
    const id = itemStore.existingItems.findIndex((item) => item.id === oldId)
    if (id === -1) {
      throw new NotFoundError(`item: ${oldId}`)
    }

    let newImgUrl: string | undefined = undefined
    if (item.hasNewImage) {
      const result = await this.updateImage(item.newId)
      if (!result.success) {
        throw result.error
      }
      newImgUrl = result.data
    }

    const { image, name, description } = itemStore.existingItems[id]
    const newItem: ItemDetails = {
      id: item.newId,
      name: item.newName ?? name,
      description: item.newDescription ?? description,
      image: newImgUrl ?? image,
    }

    return { id, newItem }
  }
}

export const gameService = new GameService()
