import { Stack, Typography } from '@mui/material'
import { useMemo, useState } from 'react'

import { getHash } from 'utils/cryptography'

import { ContentWrapper, StyledTextInput } from 'views/pages/Encryption/components'

export const HashData = () => {
  const [inputData, setInputData] = useState<undefined | string>(undefined)
  const hashValue = useMemo(() => {
    if (!inputData) {
      return ''
    }

    return getHash(inputData)
  }, [inputData])
  return (
    <ContentWrapper>
      <Stack direction="row" gap={2} alignItems="center">
        <Typography>Key:</Typography>
        <StyledTextInput name="key" onChange={(e) => setInputData(e.target.value)} value={inputData} />
      </Stack>
      {hashValue && (
        <Stack direction="row" gap={2} alignItems="center">
          <Typography>Hash:</Typography>
          <Typography>{hashValue}</Typography>
        </Stack>
      )}
    </ContentWrapper>
  )
}
