import { Stack, Typography } from '@mui/material'

import { StyledButton } from './components'

export const ObservableItems = () => {
  return (
    <Stack gap={2}>
      <Typography variant="body1">Observable Items</Typography>
      <Stack
        direction="row"
        width="100%"
        p={2}
        gap={2}
        height={160}
        border="1px solid #ffffff"
        borderRadius={2}
      ></Stack>
      <Stack direction="row" justifyContent="center" gap={2}>
        <StyledButton>Combine</StyledButton>
        <StyledButton>Observe</StyledButton>
      </Stack>
    </Stack>
  )
}
