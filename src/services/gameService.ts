import { zip } from 'lodash'

import { START_GAME_KEY } from 'types/constants'
import {
  CombineItemsError,
  DuplicateStoryError,
  NotFoundError,
  ObserveItemsError,
  SearchExistingItemError,
  SearchItemsError,
  StoryPenaltyError,
  customErrorName,
} from 'types/errors'
import { FunctionResult, ItemDetails, ReplaceItemInfo, UpdateNewObjectResult } from 'types/types'

import { dataLoaderService } from 'services/dataLoaderService'

import { gameStore } from 'stores/gameStore'

import { REGEX_ARTICLE, REGEX_METADATA_FILE_PREFIX } from 'utils/regex'

class GameService {
  public combineItems = async (): Promise<FunctionResult<UpdateNewObjectResult>> => {
    const keyword = 'combine+' + Array.from(gameStore.selectedItems).sort().join('+')
    const result = await this.updateNewObject(keyword)
    gameStore.clearSelectedItems()

    if (!result.success) {
      console.error('[combineItems]:', result.error.message)
      const newErr = customErrorName.has(result.error.name) ? new CombineItemsError() : result.error
      return { ...result, error: newErr }
    }
    return result
  }

  public observeItem = async (): Promise<FunctionResult<UpdateNewObjectResult>> => {
    const selectedItem = Array.from(gameStore.selectedItems)[0]
    const keyword = 'observe+' + selectedItem
    const result = await this.updateNewObject(keyword)
    gameStore.clearSelectedItems()

    if (!result.success) {
      const objName = gameStore.existingItems.filter((v) => v.key === selectedItem)[0].name ?? 'an undefined object'
      console.error('[observeItems]:', result.error.message)
      const newErr = customErrorName.has(result.error.name) ? new ObserveItemsError(objName) : result.error
      return { ...result, error: newErr }
    }
    return result
  }

  public searchItem = async (inputKey: string): Promise<FunctionResult<UpdateNewObjectResult>> => {
    const key = inputKey.trim().replace(REGEX_ARTICLE, '').replace(new RegExp('\\s+'), '-').trim().toLowerCase()
    if (gameStore.itemKeywordToName[key]) {
      return { success: false, error: new SearchExistingItemError(gameStore.itemKeywordToName[key]) }
    }

    const keyword = 'search+' + key
    const result = await this.updateNewObject(keyword)

    if (!result.success) {
      console.error('[searchItems]:', result.error.message)
      const newErr = customErrorName.has(result.error.name) ? new SearchItemsError(inputKey) : result.error
      return { ...result, error: newErr }
    }

    if (result.data.isRepeated) {
      return { success: false, error: new DuplicateStoryError(result.data.key) }
    }
    return result
  }

  public startGame = async (): Promise<FunctionResult<UpdateNewObjectResult>> => {
    const result = await this.updateNewObject(START_GAME_KEY)
    if (!result.success) {
      console.error('[startGame]:', result.error.message)
    }
    return result
  }

  private updateNewObject = async (key: string): Promise<FunctionResult<UpdateNewObjectResult>> => {
    try {
      // find storyInfo
      const storyInfoResult = await dataLoaderService.getStoryInfo(key)
      if (!storyInfoResult.success) {
        return storyInfoResult
      }
      const { isRepeated, chainKeys, story: storyInfo } = storyInfoResult.data
      const { dialogs, newItems, penalty, functionMapping, destroyItems } = storyInfo

      // if story cause a player some penalty. return result with penalty
      if (penalty) {
        if (dialogs) gameStore.addDialog(dialogs)
        return { success: false, error: new StoryPenaltyError(storyInfo.key, penalty), penalty: penalty }
      }

      // if it is not first time add dialogs and return.
      if (isRepeated) {
        if (dialogs && dialogs.length > 0) {
          gameStore.addDialog(dialogs)
          chainKeys.forEach((key) => gameStore.addDialogMapping(key, dialogs))
        }
        return { success: true, data: { isRepeated: isRepeated, key: storyInfo.key, functionMapping: functionMapping } }
      }

      // get updatedItems
      let updatedItems: ItemDetails[] = []
      if (newItems) {
        const imgResults = await Promise.all(newItems.map(({ key }) => this.updateImage(key)))
        const errorMsg = imgResults.filter((result) => !result.success)
        if (errorMsg.length > 0 && !errorMsg[0].success) {
          return errorMsg[0]
        }

        const newImageUrls = imgResults.map((result) => (result.success ? result.data : ''))
        updatedItems = zip(newImageUrls, newItems).map(([url, item]) => ({
          ...item,
          name: item!.name,
          key: item!.key ?? '',
          image: url,
        }))
      }

      // get replace item details.
      let replaceItemDetails: { id: number; newItem: ItemDetails }[] = []
      if (storyInfo.replaceItems) {
        replaceItemDetails = await Promise.all(storyInfo.replaceItems.map((v) => this.getReplaceItemDetails(v)))
      }

      // update store at the end
      gameStore.addExistingItems(updatedItems)
      if (storyInfo.destroyItems) {
      }
      replaceItemDetails.forEach(({ id, newItem }) => gameStore.replaceItem(id, newItem))
      destroyItems?.forEach(({ key }) => {
        const id = gameStore.existingItems.findIndex((v) => v.key === key)
        gameStore.removeExistingItem(id)
      })
      if (dialogs && dialogs.length > 0) {
        gameStore.addDialog(dialogs)
        chainKeys.forEach((key) => {
          gameStore.addDialogMapping(key, dialogs)
          gameStore.addStoryInfo(key, storyInfo)
        })
      }

      return { success: true, data: { newItems: updatedItems, key: storyInfo.key, functionMapping: functionMapping } }
    } catch (err) {
      console.error('[updateNewObject]', err, key)
      return { success: false, error: err }
    }
  }

  private updateImage = async (key: string): Promise<FunctionResult<string>> => {
    try {
      const actualKey = `${key}-img`
      const result = await dataLoaderService.getImage(actualKey)
      if (!result.success) {
        return result
      }

      const buffer = Buffer.from(result.data?.replace(REGEX_METADATA_FILE_PREFIX, ''), 'base64')
      const blob = new Blob([buffer], { type: 'image/png' })
      const imgUrl = URL.createObjectURL(blob)
      gameStore.addNewImage(actualKey, imgUrl)

      return { success: true, data: imgUrl }
    } catch (err) {
      console.error('[updateImage]', err, key)
      return { success: false, error: err }
    }
  }

  private getReplaceItemDetails = async (item: ReplaceItemInfo) => {
    const oldKey = item.oldKey
    const id = gameStore.existingItems.findIndex((v) => v.key === oldKey)
    if (id === -1) {
      throw new NotFoundError(`item: ${oldKey}`)
    }

    let newImgUrl: string | undefined = undefined
    if (item.hasNewImage) {
      const result = await this.updateImage(item.newKey)
      if (!result.success) {
        throw result.error
      }
      newImgUrl = result.data
    }

    const { image, name, description } = gameStore.existingItems[id]
    const newItem: ItemDetails = {
      key: item.newKey,
      name: item.newName ?? name,
      description: item.newDescription ?? description,
      image: newImgUrl ?? image,
    }

    return { id, newItem }
  }
}

export const gameService = new GameService()
