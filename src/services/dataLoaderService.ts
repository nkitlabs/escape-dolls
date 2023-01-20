import axios from 'axios'

import { MAX_RELATED_STORY_ID, STORY_MAPPING_FILE } from 'types/constants'
import { NotFoundError, customErrorName } from 'types/errors'
import { FunctionResult, GetStoryInfoResult, StoryInfo } from 'types/types'

import { gameStore } from 'stores/gameStore'

import { decryptWithSalt, getHash } from 'utils/cryptography'

class DataLoaderService {
  public storyMapping: Record<string, string> | undefined = undefined
  constructor() {}

  public setStoryMapping = async () => {
    if (this.storyMapping) return
    const resp = await fetch(STORY_MAPPING_FILE)
    this.storyMapping = await resp.json()
  }

  public getStoryInfo = async (id: string): Promise<FunctionResult<GetStoryInfoResult>> => {
    let currentId = id
    const newRelatedIds: string[] = []

    try {
      while (newRelatedIds.length < MAX_RELATED_STORY_ID) {
        // if already exists, return data with success.
        if (gameStore.storyIdToInfo[currentId]) {
          return {
            success: true,
            data: {
              id: gameStore.storyIdToInfo[currentId].id,
              story: gameStore.storyIdToInfo[currentId],
              isRepeated: true,
              newRelatedIds: newRelatedIds,
            },
          }
        }

        // query data
        newRelatedIds.push(currentId)
        const storyInfoText = await this.getData(currentId)
        const story = JSON.parse(storyInfoText) as StoryInfo

        // if current id isn't mapped to the new id, return this data with success.
        if (!story.mapToId) {
          return {
            success: true,
            data: {
              id: currentId,
              story: story,
              isRepeated: false,
              newRelatedIds: newRelatedIds,
            },
          }
        }

        currentId = story.mapToId
      }

      return { success: false, error: new Error('chain key is too long') }
    } catch (err) {
      if (customErrorName.has(err.name)) console.error('[getStoryInfo]', err)
      return { success: false, error: err }
    }
  }

  public getImage = async (key: string): Promise<FunctionResult<string>> => {
    try {
      const img = await this.getData(key)
      return { success: true, data: img }
    } catch (err) {
      if (customErrorName.has(err.name)) console.error('[getImage]:', err)
      if (err instanceof NotFoundError) {
        console.error('[getImage]:', err)
        return { success: false, error: new Error(`internal error: ${err.message}`) }
      }
      return { success: false, error: err }
    }
  }

  private getData = async (key: string): Promise<string> => {
    if (!this.storyMapping) {
      throw new Error('storyMapping has not been set')
    }

    const filename = getHash(key.concat(process.env.KEY_SALT ?? ''))
    if (!this.storyMapping[filename]) {
      throw new NotFoundError(`file ${key} ${filename}`)
    }

    const iv = this.storyMapping[filename]
    const hashedKey = getHash(key)
    const { data } = await axios.get(`data/info/${filename}.txt`)
    const result = decryptWithSalt(Buffer.from(data, 'base64'), hashedKey, iv).toString('binary')

    return result
  }
}

export const dataLoaderService = new DataLoaderService()
