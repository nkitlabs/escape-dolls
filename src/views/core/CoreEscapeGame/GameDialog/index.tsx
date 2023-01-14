import { Stack, Typography } from '@mui/material'
import { observer } from 'mobx-react-lite'
import { useEffect, useState } from 'react'

import { gameStore } from 'stores/gameStore'

import { PreviousNextButtons } from 'views/common/PreviousNextButtons'

import { ClickableText, DialogContentWrapper } from './components'

export const GameDialog = observer(() => {
  const [currentDialogId, setCurrentDialogId] = useState(0)
  useEffect(
    () => {
      setCurrentDialogId(gameStore.dialogs.length - 1)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [gameStore.dialogs.length],
  )

  return (
    <Stack gap={1}>
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="body1">Details</Typography>
        <PreviousNextButtons
          currentPage={currentDialogId}
          setCurrentPage={setCurrentDialogId}
          maxPage={gameStore.dialogs.length}
        />
      </Stack>
      <Stack>
        <DialogContentWrapper key={`dialog-content-${gameStore.dialogs.length}`} variant="body1">
          {(gameStore.dialogs[currentDialogId] ?? []).join('\n\n')}
        </DialogContentWrapper>
        <Stack alignItems="self-end">
          <ClickableText variant="label" onClick={() => setCurrentDialogId(0)}>
            Return to preface
          </ClickableText>
        </Stack>
      </Stack>
    </Stack>
  )
})
