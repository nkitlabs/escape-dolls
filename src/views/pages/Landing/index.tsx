import { Box, Stack, Typography } from '@mui/material'
import { observer } from 'mobx-react-lite'
import { useSnackbar } from 'notistack'
import { useState } from 'react'

import { START_GAME_KEY } from 'types/constants'

import { dataLoaderService } from 'services/dataLoaderService'

import { gameStore } from 'stores/gameStore'
import { timerStore } from 'stores/timerStore'

import { CoreEscapeGame } from 'views/core/CoreEscapeGame'

import { PlayButton, StyledButton } from './components'

export const LandingPage = observer(() => {
  const [playing, setPlaying] = useState(false)
  const { enqueueSnackbar } = useSnackbar()
  const onClickPlay = async () => {
    const result = await dataLoaderService.getStoryInfo(START_GAME_KEY)
    if (result.success) {
      gameStore.addNewStory(result.data)
      timerStore.resetTimer()
      setPlaying(true)
    } else {
      enqueueSnackbar(`something went wrong, please contact admin`, {
        variant: 'error',
        autoHideDuration: 3000,
        anchorOrigin: { vertical: 'top', horizontal: 'center' },
      })
      console.error('[Landing Page]', result.message)
    }
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
})
