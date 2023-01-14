import { Stack, Typography } from '@mui/material'
import { observer } from 'mobx-react-lite'
import { useSnackbar } from 'notistack'
import { useState } from 'react'

import { useBreakpoints } from 'hooks/useBreakpoints'
import { useGameSetup } from 'hooks/useGameSetup'

import { gameService } from 'services/gameService'

import { gameStore } from 'stores/gameStore'
import { itemStore } from 'stores/itemStore'
import { timerStore } from 'stores/timerStore'

import { Summary } from 'views/pages/Landing/Summary'

import { CoreEscapeGame } from 'views/core/CoreEscapeGame'

import { LandingWrapper, PlayButton } from './components'

export const LandingPage = observer(() => {
  const { isReady } = useGameSetup()
  const [playing, setPlaying] = useState(false)
  const [isEnded, setIsEnded] = useState(false)
  const { downSm } = useBreakpoints()
  const { enqueueSnackbar } = useSnackbar()

  const onEndGame = (_params: string[]) => {
    setIsEnded(true)
    timerStore.stopTimer()
    gameStore.clear()
    itemStore.clear()
  }
  gameStore.registerFunctionsMapping(3, onEndGame)

  const onClickBackToLanding = () => {
    setIsEnded(false)
    setPlaying(false)
  }

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
      <Summary
        timeUsed={timerStore.timer}
        totalPenalty={timerStore.totalPenalty}
        onClickBackToLanding={onClickBackToLanding}
      />
    )

  if (playing) return <CoreEscapeGame />

  if (downSm) {
    return (
      <LandingWrapper>
        {/* <Box height={96} visibility="hidden"></Box> */}
        <Stack justifyContent="center" alignItems="center" gap={4}>
          <Typography variant="h4">Escape - Dolls</Typography>
          <PlayButton variant="contained" size="large" onClick={onClickPlay} disabled={!isReady}>
            Play
          </PlayButton>
        </Stack>
        {/* <StyledButton variant="contained" size="large">
          Donate
        </StyledButton> */}
      </LandingWrapper>
    )
  }
  return (
    <LandingWrapper>
      {/* <Box height={96} visibility="hidden"></Box> */}
      <Stack justifyContent="center" alignItems="center" gap={4}>
        <Typography variant="h1">Escape - Dolls</Typography>
        <PlayButton variant="contained" size="large" onClick={onClickPlay}>
          Play
        </PlayButton>
      </Stack>
      {/* <StyledButton variant="contained" size="large">
        Donate
      </StyledButton> */}
    </LandingWrapper>
  )
})
