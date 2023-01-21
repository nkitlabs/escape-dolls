import { Box, Button, Input, Stack, Typography } from '@mui/material'
import { isString } from 'lodash'
import { ChangeEvent, useState } from 'react'

import { encryptWithSalt, getHash, randomIv } from 'utils/cryptography'
import { downloadData } from 'utils/utils'

import { ContentWrapper, StyledTextInput } from 'views/pages/Encryption/components'

export const EncryptData = () => {
  const [inputData, setInputData] = useState<undefined | string>(undefined)
  const [inputKey, setInputKey] = useState('')
  const [encryptedData, setEncryptedData] = useState('')
  const [generatedIV, setGeneratedIV] = useState('')

  const onInputChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target?.files?.[0]
    if (!file) {
      setInputData(undefined)
      return
    }
    const reader = new FileReader()
    reader.onload = () => {
      if (!isString(reader.result)) {
        setInputData(undefined)
        return
      }
      const newData = Buffer.from(reader.result).toString('base64')
      setInputData(newData)
    }
    reader.readAsDataURL(file)
  }

  const onExportEncryptedData = () => {
    downloadData(encryptedData, 'encrypted-data.txt')
  }

  const onEncrypt = async () => {
    setEncryptedData('')
    setGeneratedIV('')

    if (!inputData || !inputKey) {
      return
    }
    const key = getHash(inputKey)
    const iv = randomIv(8)
    const data = encryptWithSalt(Buffer.from(inputData, 'base64'), key, iv)
    setGeneratedIV(iv)
    setEncryptedData(data.toString('base64'))
  }

  return (
    <ContentWrapper>
      <Stack direction="row" justifyContent="space-between">
        <Stack gap={2}>
          <Stack direction="row" gap={2} alignItems="center">
            <Typography>Key:</Typography>
            <StyledTextInput name="key" onChange={(e) => setInputKey(e.target.value)} value={inputKey} />
          </Stack>
          <Stack direction="row" gap={2} alignItems="center">
            <Typography>Upload file</Typography>
            <Input type="file" name="myFile" onChange={onInputChange} disableUnderline />
          </Stack>
        </Stack>
        <Box>
          <Button variant="contained" size="small" onClick={onEncrypt}>
            Encrypt
          </Button>
        </Box>
      </Stack>
      {!!encryptedData && (
        <Stack gap={2}>
          <Stack direction="row" justifyContent="space-between" gap={2}>
            <Stack direction="row" gap={2} minWidth={0}>
              <Typography>Encrypted data:</Typography>
              <Typography overflow="hidden" textOverflow="ellipsis">
                {encryptedData.slice(0, 100)}
              </Typography>
            </Stack>
            <Box>
              <Button variant="contained" onClick={onExportEncryptedData} size="small">
                Download
              </Button>
            </Box>
          </Stack>
          <Stack direction="row" gap={2}>
            <Typography>IV:</Typography>
            <Typography>{generatedIV}</Typography>
          </Stack>
        </Stack>
      )}
    </ContentWrapper>
  )
}
