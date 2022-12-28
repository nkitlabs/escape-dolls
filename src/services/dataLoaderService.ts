import axios from 'axios'

import { KEY_SALT } from 'types/constants'
import { FunctionResult, StoryInfo } from 'types/types'

import KeywordMapping from 'data/keyword_mapping.json'
import StoryMapping from 'data/story_mapping.json'

import { base64ToBinary, decryptWithSalt, getHash } from 'utils/cryptography'
import { REGEX_ARTICLE, REGEX_METADATA_FILE_PREFIX } from 'utils/regex'

class DataLoaderService {
  constructor() {}

  public getStoryInfo = async (key: string): Promise<FunctionResult<StoryInfo>> => {
    try {
      const base64EncodedStory = await this.getData(key)
      if (!base64EncodedStory) return { success: false, message: 'not found' }
      const story = JSON.parse(base64ToBinary(base64EncodedStory.replace(REGEX_METADATA_FILE_PREFIX, ''))) as StoryInfo

      return { success: true, data: story }
    } catch (err) {
      console.error('[getStoryInfo]', err)
      return { success: false, message: err.message }
    }
  }

  public getImage = async (key: string): Promise<FunctionResult<string>> => {
    try {
      const img = await this.getData(key)
      if (!img) return { success: false, message: 'not found' }

      return { success: true, data: img }
    } catch (err) {
      console.error('[getImage]:', err)
      return { success: false, message: err.message }
    }
  }

  // TODO: fix logic
  // 1. check require, if not pass required field, return actual key to `${key}-normal`
  // 2. check -combine and -observe format (should check that objects already existed)
  // 3. decode mapping key.
  public getActualKey = (key: string): string => {
    const newKey = key.trim().replace(REGEX_ARTICLE, '').trim()
    const mappedKey = KeywordMapping[newKey] ?? newKey
    return mappedKey
  }

  private getData = async (key: string): Promise<string> => {
    const filename = getHash(key.concat(KEY_SALT))
    if (!StoryMapping[filename]) {
      return ''
    }

    const { iv } = StoryMapping[filename]
    const hashedKey = getHash(key)
    const { data } = await axios.get(`data/${filename}.txt`)
    const result = decryptWithSalt(Buffer.from(data, 'base64'), hashedKey, iv).toString('binary')

    if (!REGEX_METADATA_FILE_PREFIX.test(result)) throw new Error(`incorrect decryption ${key}`)

    return result
  }
}

export const dataLoaderService = new DataLoaderService()
