import { Box, Stack, Typography } from '@mui/material'
import { useState } from 'react'

import { CoreEscapeGame } from 'views/core/CoreEscapeGame'

import { PlayButton, StyledButton } from './components'

export const LandingPage = () => {
  const [playing, setPlaying] = useState(false)
  const onClickPlay = () => {
    setPlaying(true)
  }
  return playing ? (
    <CoreEscapeGame />
  ) : (
    <Stack m="auto" alignItems="center">
      <Box height={96} visibility="hidden"></Box>
      <Stack justifyContent="center" alignItems="center" gap={8}>
        <Typography variant="h1">Escape - Dolls</Typography>
        <PlayButton variant="contained" size="large" onClick={onClickPlay}>
          Play
        </PlayButton>
      </Stack>
      <Stack mt={5}>
        <StyledButton variant="contained" size="large">
          Donate
        </StyledButton>
      </Stack>
    </Stack>
  )
}
