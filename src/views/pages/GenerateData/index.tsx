import { Button, Stack, Typography } from '@mui/material'
import { saveAs } from 'file-saver'
import JSZip from 'jszip'
import { useState } from 'react'

import { StoryInfo } from 'types/types'

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
  console.log('!!!', salt, process.env.KEY_SALT)
  const storyFilenames = (await getTextFile(`data/draft/01-index-file-story.txt`)).split('\n')

  const storyData = await Promise.all(
    storyFilenames.map(async (filename) => {
      const data = await getTextFile(`${STORY_DATA_FOLDERS}/${filename}`)
      const obj = JSON.parse(data) as StoryInfo
      const buffer = Buffer.from(data)
      const key = obj.key
      const hashedKey = getHash(key)
      const hashedFilename = getHash(key + salt)
      const iv = randomIv(8)
      const encryptedData = encryptWithSalt(buffer, hashedKey, iv).toString('base64')

      return { key, hashedKey, hashedFilename, iv, encryptedData }
    }),
  )

  const imgFilenames = (await getTextFile(`data/draft/01-index-file-img.txt`)).split('\n')

  const imgData = await Promise.all(
    imgFilenames.map(async (filename) => {
      const data = await getImageFile(`${IMAGE_FOLDERS}/${filename}`)
      const buffer = Buffer.from(data)
      const key = filename.replace('.png', '') + '-img'
      const hashedKey = getHash(key)
      const hashedFilename = getHash(key + salt)
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
