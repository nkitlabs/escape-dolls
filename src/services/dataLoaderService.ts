import axios from 'axios'

import { FunctionResult, StoryInfo } from 'types/types'

import KeywordMapping from 'data/keyword_mapping.json'
import StoryMapping from 'data/story_mapping.json'

import { base64ToBinary, decryptWithSalt, getHash } from 'utils/cryptography'
import { METADATA_FILE_PREFIX_REGEX } from 'utils/regex'

class DataLoaderService {
  salt: string

  constructor() {
    this.salt = 'SaltEscapeDolls'
  }

  public getStoryInfo = async (key: string): Promise<FunctionResult<StoryInfo>> => {
    try {
      const base64EncodedStory = await this.getData(key)
      if (!base64EncodedStory) return { success: false, message: 'not found' }
      const story = JSON.parse(base64ToBinary(base64EncodedStory.replace(METADATA_FILE_PREFIX_REGEX, ''))) as StoryInfo

      return { success: true, data: story }
    } catch (err) {
      console.error(err)
      return { success: false, message: err.message }
    }
  }

  public getImage = async (key: string): Promise<FunctionResult<string>> => {
    try {
      const img = await this.getData(key)
      if (img) return { success: false, message: 'not found' }

      return { success: true, data: img }
    } catch (err) {
      console.error(err)
      return { success: false, message: err.message }
    }
  }

  private getData = async (key: string): Promise<string> => {
    const newKey = key.trim().replace('^(the |a |an )', '').trim()
    const mappedKey = KeywordMapping[newKey] ?? newKey

    const filename = getHash(mappedKey.concat(this.salt))
    if (!StoryMapping[filename]) {
      return ''
    }

    const { iv } = StoryMapping[filename]
    const hashedKey = getHash(key)
    const { data } = await axios.get(`data/${filename}.txt`)
    const result = decryptWithSalt(Buffer.from(data, 'base64'), hashedKey, iv).toString('binary')

    if (!METADATA_FILE_PREFIX_REGEX.test(result)) throw new Error('incorrect decryption')

    return result
  }
}

export const dataLoaderService = new DataLoaderService()
