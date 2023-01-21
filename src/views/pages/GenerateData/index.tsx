import { Button, Stack, Typography } from '@mui/material'
import { saveAs } from 'file-saver'
import JSZip from 'jszip'
import { useState } from 'react'

import { IMG_FILENAMES_FILE, STORY_FILENAMES_FILE } from 'types/constants'
import { EncryptedStoryInfo, StoryInfo } from 'types/types'

import { encryptWithSalt, getHash, randomIv } from 'utils/cryptography'

import { StyledTextInput } from './components'

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

const onClick = (salt: string) => async () => {
  const storyFilenames = (await getTextFile(STORY_FILENAMES_FILE)).split('\n')

  const storyData: EncryptedStoryInfo[] = await Promise.all(
    storyFilenames.map(async (filename) => {
      const data = await getTextFile(`${STORY_DATA_FOLDERS}/${filename}`)
      const obj = JSON.parse(data) as StoryInfo
      const iv = randomIv(8)
      const hashedId = getHash(obj.id)
      return {
        id: obj.id,
        hashedId: hashedId,
        hashedFilename: getHash(obj.id + salt),
        iv: iv,
        encryptedData: encryptWithSalt(Buffer.from(data), hashedId, iv).toString('base64'),
      }
    }),
  )

  const imgFilenames = (await getTextFile(IMG_FILENAMES_FILE)).split('\n')

  const imgData: EncryptedStoryInfo[] = await Promise.all(
    imgFilenames.map(async (filename) => {
      const data = await getImageFile(`${IMAGE_FOLDERS}/${filename}`)
      const id = filename.replace('.png', '') + '-img'
      const hashedId = getHash(id)
      const iv = randomIv(8)
      return {
        id: id,
        hashedId: hashedId,
        hashedFilename: getHash(id + salt),
        iv: iv,
        encryptedData: encryptWithSalt(Buffer.from(data), hashedId, iv).toString('base64'),
      }
    }),
  )

  const storyMappingInfo = storyData.concat(imgData)
  const storyMappingDev = storyMappingInfo.map(({ id, hashedId, hashedFilename, iv }) => ({
    id,
    hashedId,
    hashedFilename,
    iv,
  }))
  const storyMapping = storyMappingInfo.reduce((acc, storyInfo) => {
    acc[storyInfo.hashedFilename] = storyInfo.iv
    return acc
  }, {})

  const zip = new JSZip()
  zip.file('story-mapping.json', JSON.stringify(storyMapping))
  zip.file('story-mapping-dev.json', JSON.stringify(storyMappingDev))
  storyMappingInfo.map((storyInfo) => zip.file(`${storyInfo.hashedFilename}.txt`, storyInfo.encryptedData))

  const content = await zip.generateAsync({ type: 'blob' })
  saveAs(content, 'encrypted-game-data.zip')
}

export const GenerateDataPage = () => {
  const [salt, setSalt] = useState<string>('')

  return (
    <Stack gap={2} p={2}>
      <Stack direction="row" gap={2} alignItems="center">
        <Typography>Salt:</Typography>
        <StyledTextInput name="salt" onChange={(e) => setSalt(e.target.value)} value={salt} />
      </Stack>
      <Button onClick={onClick(salt)}>Generate Data</Button>
    </Stack>
  )
}
