import { Stack, Typography } from '@mui/material'

import { SearchButton, SearchTextField } from './components'

export const SearchItem = () => {
  return (
    <Stack gap={2}>
      <Typography variant="body1">Search</Typography>
      <Stack direction="row" gap={2}>
        <SearchTextField fullWidth></SearchTextField>
        <SearchButton size="small">Search</SearchButton>
      </Stack>
    </Stack>
  )
}
