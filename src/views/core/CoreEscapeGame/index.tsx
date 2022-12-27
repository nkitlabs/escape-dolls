import { Stack, Typography } from '@mui/material'

import { useBreakpoints } from 'hooks/useBreakpoints'

import { GameDialog } from 'views/core/CoreEscapeGame/GameDialog'
import { ObservableItems } from 'views/core/CoreEscapeGame/ObservableItems'
import { SearchItem } from 'views/core/CoreEscapeGame/SearchItem'

export const CoreEscapeGame = () => {
  const { downMd, downSm } = useBreakpoints()

  if (downSm) {
    return (
      <Stack px={4} py={4} my="auto" gap={2}>
        <Stack gap={1}>
          <Typography variant="body1">Objective: Escape the locked room.</Typography>
          <Typography variant="body2" color="text.secondary">
            Time used: 10.38
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
      <Stack px={4} py={4} gap={2} my="auto">
        <Typography variant="h6">Objective: Escape the locked room.</Typography>
        <Stack direction="row" gap={4}>
          <Stack justifyContent="center" gap={2}>
            <Typography variant="body1" color="text.secondary">
              Time used: 10.38
            </Typography>
            <img src="/static/escape-dolls-room.png" width={240} style={{ borderRadius: 16 }} />
          </Stack>
          <Stack width="100%" gap={2}>
            <SearchItem />
            <ObservableItems />
          </Stack>
        </Stack>
        <GameDialog />
      </Stack>
    )
  }

  return (
    <Stack px={4} py={2} my="auto">
      <Stack direction="row" gap={4} justifyContent="center">
        <img src="/static/escape-dolls-room.png" width={600} style={{ borderRadius: 16 }} />
        <Stack gap={4} width="100%" maxWidth={700}>
          <Stack>
            <Typography variant="h6">Objective: Escape the locked room.</Typography>
            <Typography variant="body1" color="text.secondary">
              Time used: 10.38
            </Typography>
          </Stack>
          <SearchItem />
          <ObservableItems />
          <GameDialog />
        </Stack>
      </Stack>
    </Stack>
  )
}
