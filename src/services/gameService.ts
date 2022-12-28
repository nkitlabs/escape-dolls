import { zip } from 'lodash'

import { FunctionResult, ItemDetails } from 'types/types'

import { dataLoaderService } from 'services/dataLoaderService'

import { gameStore } from 'stores/gameStore'

import { REGEX_METADATA_FILE_PREFIX } from 'utils/regex'

class GameService {
  public updateNewObject = async (key: string): Promise<FunctionResult<ItemDetails[]>> => {
    try {
      // get actual key
      const actualKey = dataLoaderService.getActualKey(key)
      if (!actualKey) {
        return { success: false, message: 'not found' }
      }

      // find storyInfo
      const storyInfoResult = await dataLoaderService.getStoryInfo(actualKey)
      if (!storyInfoResult.success) {
        return storyInfoResult
      }

      // store image url and add items into gameStore
      let newItems: ItemDetails[] = []
      if (storyInfoResult.data?.newItems) {
        const imgResults = await Promise.all(storyInfoResult.data.newItems.map(({ key }) => this.updateImage(key)))
        const errorMsg = imgResults.filter((result) => !result.success)

        if (errorMsg.length > 0 && !errorMsg[0].success) {
          return errorMsg[0]
        }
        const newImageUrls = imgResults.map((result) => (result.success ? result.data : ''))
        newItems = zip(newImageUrls, storyInfoResult.data.newItems).map(([url, item]) => ({
          ...item,
          key: item?.key ?? '',
          image: url,
        }))
        gameStore.addItems(newItems)
      }

      // update new story (dialog + records)
      gameStore.addStoryRecord(key)
      if (storyInfoResult.data.dialogs) {
        gameStore.addDialog(storyInfoResult.data.dialogs)
      }

      return { success: true, data: newItems }
    } catch (err) {
      console.error('[updateNewObject]', err, key)
      return { success: false, isInteralError: true, message: err.message }
    }
  }

  public updateImage = async (key: string): Promise<FunctionResult<string>> => {
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
      return { success: false, isInteralError: true, message: err.message }
    }
  }
}

export const gameService = new GameService()
