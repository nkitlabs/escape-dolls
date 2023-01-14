import { Stack, Typography } from '@mui/material'
import { observer } from 'mobx-react-lite'

import { useBreakpoints } from 'hooks/useBreakpoints'

import { timerStore } from 'stores/timerStore'

import { GameDialog } from 'views/core/CoreEscapeGame/GameDialog'
import { ObservableItems } from 'views/core/CoreEscapeGame/ObservableItems'
import { SearchItem } from 'views/core/CoreEscapeGame/SearchItem'

export const CoreEscapeGame = observer(() => {
  const { downMd, downSm, downLg } = useBreakpoints()

  if (downSm) {
    return (
      <Stack px={4} py={4} my="auto" gap={2}>
        <Stack gap={1}>
          <Typography variant="body1">Objective: Escape from the locked room.</Typography>
          <Typography variant="body2" color="text.secondary">
            {timerStore.displayTimer}
          </Typography>
        </Stack>
        <Stack mx="auto">
          <img src="/static/escape-dolls-room.png" width={256} style={{ borderRadius: 16 }} />
        </Stack>
        <SearchItem />
        <ObservableItems />
        <GameDialog />
      </Stack>
    )
  }

  if (downMd) {
    return (
      <Stack p={4} gap={2} m="auto">
        <Typography variant="h6">Objective: Escape from the locked room.</Typography>
        <Stack gap={2}>
          <Stack direction="row" gap={4}>
            <Stack justifyContent="center" gap={2}>
              <Typography variant="body1" color="text.secondary">
                {timerStore.displayTimer}
              </Typography>
              <img src="/static/escape-dolls-room.png" width={240} style={{ borderRadius: 16 }} />
            </Stack>
            <Stack width={400} gap={2}>
              <SearchItem />
              <ObservableItems />
            </Stack>
          </Stack>
          <Stack>
            <GameDialog />
          </Stack>
        </Stack>
      </Stack>
    )
  }

  return (
    <Stack px={4} py={2} m="auto" direction="row" gap={4}>
      <img
        src="/static/escape-dolls-room.png"
        width={downLg ? 450 : 600}
        height="auto"
        style={{ borderRadius: 16, objectFit: 'cover' }}
      />
      <Stack gap={4} width={downLg ? 450 : 650} justifyContent="center">
        <Stack>
          <Typography variant="h6">Objective: Escape from the locked room.</Typography>
          <Typography variant="body1" color="text.secondary">
            {timerStore.displayTimer}
          </Typography>
        </Stack>
        <SearchItem />
        <ObservableItems />
        <GameDialog />
      </Stack>
    </Stack>
  )
})
