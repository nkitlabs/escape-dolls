import { Box, Button, Input, Stack, Typography } from '@mui/material'
import { ChangeEvent, useState } from 'react'

import { base64ToBinary, decryptWithSalt, getDecryptedDataFromFile, getHash } from 'utils/cryptography'
import { METADATA_FILE_PREFIX_REGEX } from 'utils/regex'
import { downloadData } from 'utils/utils'

import { ContentWrapper, StyledTextInput } from 'views/pages/Encryption/components'

export const DecryptData = () => {
  const [inputData, setInputData] = useState<undefined | string>(undefined)
  const [inputKey, setInputKey] = useState('')
  const [IV, setIV] = useState('')
  const [decryptedData, setDecryptedData] = useState('')

  const onInputChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target?.files?.[0]
    try {
      const newInputData = await getDecryptedDataFromFile(file)
      setInputData(newInputData)
    } catch (err) {
      console.error(err)
      setInputData(undefined)
    }
  }

  const onExportDecryptedData = () => {
    downloadData(decryptedData)
  }

  const onDecrypt = () => {
    setDecryptedData('')
    if (!inputData) {
      return
    }

    const key = getHash(inputKey)
    const result = decryptWithSalt(Buffer.from(inputData, 'base64'), key, IV)
    setDecryptedData(result.toString('binary'))
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
            <Typography>IV:</Typography>
            <StyledTextInput name="key" onChange={(e) => setIV(e.target.value)} value={IV} />
          </Stack>
          <Stack direction="row" gap={2} alignItems="center">
            <Typography>Upload File</Typography>
            <Input type="file" name="myFile" onChange={onInputChange} disableUnderline />
          </Stack>
        </Stack>
        <Box>
          <Button variant="contained" size="small" onClick={onDecrypt}>
            Decrypt
          </Button>
        </Box>
      </Stack>

      {!!decryptedData && (
        <Stack>
          <Stack direction="row" justifyContent="space-between" gap={2}>
            <Stack direction="row" gap={2} justifyContent="flex-start" minWidth={0}>
              <Typography>Decrypted data:</Typography>
              <Typography overflow="hidden" textOverflow="ellipsis">
                {decryptedData.slice(0, 100)}
              </Typography>
            </Stack>

            <Box>
              <Button variant="contained" onClick={onExportDecryptedData} size="small">
                Download
              </Button>
            </Box>
          </Stack>
          {decryptedData.startsWith('data:image') ? (
            <img src={decryptedData} width={'250px'} />
          ) : (
            <Typography>{base64ToBinary(decryptedData.replace(METADATA_FILE_PREFIX_REGEX, ''))}</Typography>
          )}
        </Stack>
      )}
    </ContentWrapper>
  )
}
