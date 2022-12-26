import { Stack, Typography } from '@mui/material'
import { EncryptData } from 'views/pages/Encryption/EncryptData'
import { DecryptData } from 'views/pages/Encryption/DecryptData'

export const EncryptionPage = () => {
  return (
    <Stack gap={3} p={3}>
      <Typography variant="h3">Encrypt File</Typography>
      <EncryptData />
      <Typography variant="h3" mt={3}>
        Decrypt File
      </Typography>
      <DecryptData />
    </Stack>
  )
}
