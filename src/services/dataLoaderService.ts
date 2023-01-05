import axios from 'axios'

import { KEY_SALT } from 'types/constants'
import { NotFoundError } from 'types/errors'
import { FunctionResult, GetStoryInfoResult, StoryInfo } from 'types/types'

import { gameStore } from 'stores/gameStore'

import { decryptWithSalt, getHash } from 'utils/cryptography'

const MAX_CHAIN_KEY = 5

class DataLoaderService {
  public storyMapping: Record<string, string> | undefined = undefined
  constructor() {}

  public setStoryMapping = async () => {
    if (this.storyMapping) return
    const resp = await fetch('data/info/story-mapping.json')
    this.storyMapping = await resp.json()
  }

  public getStoryInfo = async (key: string): Promise<FunctionResult<GetStoryInfoResult>> => {
    let countChain = 0
    let actualKey = key

    const result: GetStoryInfoResult = {
      story: { key: actualKey },
      chainKeys: [],
      actualKey: key,
    }

    try {
      while (countChain < MAX_CHAIN_KEY) {
        if (gameStore.storyRecord[actualKey]) {
          result.story = gameStore.storyRecord[actualKey]
          result.isRepeated = true
          break
        }

        result.chainKeys.push(actualKey)
        const storyInfoText = await this.getData(actualKey)
        const story = JSON.parse(storyInfoText) as StoryInfo

        if (story.mapKeyword) {
          actualKey = story.mapKeyword
        } else {
          result.story = story
          result.actualKey = actualKey
          break
        }
        countChain += 1
      }

      if (countChain === MAX_CHAIN_KEY) return { success: false, error: new Error('chain key is too long') }

      return { success: true, data: result }
    } catch (err) {
      console.error('[getStoryInfo]', err)
      return { success: false, error: err }
    }
  }

  public getImage = async (key: string): Promise<FunctionResult<string>> => {
    try {
      const img = await this.getData(key)
      return { success: true, data: img }
    } catch (err) {
      console.error('[getImage]:', err)
      if (err instanceof NotFoundError) {
        return { success: false, error: new Error(`internal error: ${err.message}`) }
      }
      return { success: false, error: err }
    }
  }

  private getData = async (key: string): Promise<string> => {
    if (!this.storyMapping) {
      throw new Error('storyMapping has not been set')
    }

    const filename = getHash(key.concat(KEY_SALT))
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
