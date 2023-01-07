import { Box, Stack, Typography } from '@mui/material'
import { observer } from 'mobx-react-lite'
import { useSnackbar } from 'notistack'
import { useEffect, useState } from 'react'

import { useBreakpoints } from 'hooks/useBreakpoints'
import { useGameSetup } from 'hooks/useGameSetup'

import { gameService } from 'services/gameService'

import { gameStore } from 'stores/gameStore'
import { timerStore } from 'stores/timerStore'

import { CoreEscapeGame } from 'views/core/CoreEscapeGame'

import { EndingPageWrapper, LandingWrapper, PlayButton, StyledButton } from './components'

export const LandingPage = observer(() => {
  const { isReady } = useGameSetup()
  const [playing, setPlaying] = useState(false)
  const [isEnded, setIsEnded] = useState(false)
  const { downSm } = useBreakpoints()
  const { enqueueSnackbar } = useSnackbar()

  const onEndGame = (_params: string[]) => {
    setIsEnded(true)
  }
  gameStore.registerFunctionsMapping(3, onEndGame)

  useEffect(() => {
    if (isEnded) {
      setTimeout(() => {
        setIsEnded(false)
        setPlaying(false)
      }, 5000)
    }
  }, [isEnded])

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

  if (isEnded)
    return (
      <EndingPageWrapper>
        <Typography variant="h2" align="center">
          Congratulations
        </Typography>
        <Typography variant="body1" align="center">
          You help him to escape from the room.
        </Typography>
      </EndingPageWrapper>
    )

  if (playing) return <CoreEscapeGame />

  if (downSm) {
    return (
      <LandingWrapper>
        <Box height={96} visibility="hidden"></Box>
        <Stack justifyContent="center" alignItems="center" gap={4}>
          <Typography variant="h4">Escape - Dolls</Typography>
          <PlayButton variant="contained" size="large" onClick={onClickPlay} disabled={!isReady}>
            Play
          </PlayButton>
        </Stack>
        <StyledButton variant="contained" size="large">
          Donate
        </StyledButton>
      </LandingWrapper>
    )
  }
  return (
    <LandingWrapper>
      <Box height={96} visibility="hidden"></Box>
      <Stack justifyContent="center" alignItems="center" gap={4}>
        <Typography variant="h1">Escape - Dolls</Typography>
        <PlayButton variant="contained" size="large" onClick={onClickPlay}>
          Play
        </PlayButton>
      </Stack>
      <StyledButton variant="contained" size="large">
        Donate
      </StyledButton>
    </LandingWrapper>
  )
})
