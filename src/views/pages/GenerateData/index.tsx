import { Button } from '@mui/material'
import { saveAs } from 'file-saver'
import JSZip from 'jszip'

import { KEY_SALT } from 'types/constants'
import { StoryInfo } from 'types/types'

import { encryptWithSalt, getHash, randomIv } from 'utils/cryptography'

const STORY_DATA_FOLDERS = 'data/draft/stories'
const IMAGE_FOLDERS = 'data/draft/images'

const toBuffer = (arrayBuffer: ArrayBuffer) => {
  const buf = Buffer.alloc(arrayBuffer.byteLength)
  const view = new Uint8Array(arrayBuffer)
  for (let i = 0; i < buf.length; ++i) {
    buf[i] = view[i]
  }
  return buf
}

export const getTextFile = async (filename: string): Promise<string> => {
  const result = await fetch(filename)
  const buffer = toBuffer(await result.arrayBuffer())
  return buffer.toString()
}

export const getImageFile = async (filename: string): Promise<string> => {
  const result = await fetch(filename)
  const buffer = toBuffer(await result.arrayBuffer())
  return 'data:image/png;base64,' + buffer.toString('base64')
}

const onClick = async () => {
  const storyFilenames = (await getTextFile(`${STORY_DATA_FOLDERS}/01-index-file.txt`)).split('\n')

  const storyData = await Promise.all(
    storyFilenames.map(async (filename) => {
      const data = await getTextFile(`${STORY_DATA_FOLDERS}/${filename}`)
      const obj = JSON.parse(data) as StoryInfo
      const buffer = Buffer.from(data)
      const key = obj.key
      const hashedKey = getHash(key)
      const hashedFilename = getHash(key + KEY_SALT)
      const iv = randomIv(8)
      const encryptedData = encryptWithSalt(buffer, hashedKey, iv).toString('base64')

      return { key, hashedKey, hashedFilename, iv, encryptedData }
    }),
  )

  const imgFilenames = (await getTextFile(`${IMAGE_FOLDERS}/01-index-file.txt`)).split('\n')

  const imgData = await Promise.all(
    imgFilenames.map(async (filename) => {
      const data = await getImageFile(`${IMAGE_FOLDERS}/${filename}`)
      const buffer = Buffer.from(data)
      const key = filename.replace('.png', '') + '-img'
      const hashedKey = getHash(key)
      const hashedFilename = getHash(key + KEY_SALT)
      const iv = randomIv(8)
      const encryptedData = encryptWithSalt(buffer, hashedKey, iv).toString('base64')

      return { key, hashedKey, hashedFilename, iv, encryptedData }
    }),
  )

  const storyMappingInfo = storyData.concat(imgData)
  const storyMappingDev = storyMappingInfo.map(({ key, hashedKey, hashedFilename, iv }) => ({
    key,
    hashedKey,
    hashedFilename,
    iv,
  }))
  const storyMapping = storyMappingInfo.reduce((acc, v) => {
    acc[v.hashedFilename] = v.iv
    return acc
  }, {})

  const zip = new JSZip()
  zip.file('story-mapping.json', JSON.stringify(storyMapping))
  zip.file('story-mapping-dev.json', JSON.stringify(storyMappingDev))
  storyMappingInfo.forEach((v) => {
    zip.file(`${v.hashedFilename}.txt`, v.encryptedData)
  })

  const content = await zip.generateAsync({ type: 'blob' })
  saveAs(content, 'encrypted-game-data.zip')
}

export const GenerateDataPage = () => {
  return <Button onClick={onClick}>Generate Data</Button>
}
