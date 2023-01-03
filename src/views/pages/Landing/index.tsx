import { Box, Stack, Typography } from '@mui/material'
import { observer } from 'mobx-react-lite'
import { useSnackbar } from 'notistack'
import { useState } from 'react'

import { useBreakpoints } from 'hooks/useBreakpoints'
import { useGameSetup } from 'hooks/useGameSetup'

import { gameService } from 'services/gameService'

import { timerStore } from 'stores/timerStore'

import { CoreEscapeGame } from 'views/core/CoreEscapeGame'

import { PlayButton, StyledButton } from './components'

export const LandingPage = observer(() => {
  const { isReady } = useGameSetup()
  const [playing, setPlaying] = useState(false)
  const { downSm } = useBreakpoints()
  const { enqueueSnackbar } = useSnackbar()
  const onClickPlay = async () => {
    const result = await gameService.startGame()
    if (result.success) {
      timerStore.resetTimer()
      setPlaying(true)
    } else {
      enqueueSnackbar(`something went wrong, please contact admin`, {
        variant: 'error',
        autoHideDuration: 3000,
        anchorOrigin: { vertical: 'top', horizontal: 'center' },
      })
      console.error('[Landing Page]', result.error.message)
    }
  }
  if (playing) return <CoreEscapeGame />

  if (downSm) {
    return (
      <Stack m="auto" alignItems="center">
        <Box height={96} visibility="hidden"></Box>
        <Stack justifyContent="center" alignItems="center" gap={6}>
          <Typography variant="h4">Escape - Dolls</Typography>
          <PlayButton variant="contained" size="large" onClick={onClickPlay} disabled={!isReady}>
            Play
          </PlayButton>
        </Stack>
        <Stack mt={3}>
          <StyledButton variant="contained" size="large">
            Donate
          </StyledButton>
        </Stack>
      </Stack>
    )
  }
  return (
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
})
