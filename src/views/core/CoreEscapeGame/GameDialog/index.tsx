import { Stack, Typography, useTheme } from '@mui/material'
import { observer } from 'mobx-react-lite'
import { useEffect, useState } from 'react'

import { gameStore } from 'stores/gameStore'

import { SVGWrapper } from 'views/common/SVGWrapper'

import { DialogBorderWrapper, DialogContentWrapper } from './components'

export const GameDialog = observer(() => {
  const theme = useTheme()
  const [currentDialogId, setCurrentDialogId] = useState(0)
  useEffect(() => {
    setCurrentDialogId(gameStore.dialogs.length - 1)
  }, [gameStore.dialogs.length])

  return (
    <Stack gap={1}>
      <Stack direction="row" gap={2} justifyContent="center">
        <div
          onClick={() => currentDialogId > 0 && setCurrentDialogId((value) => value - 1)}
          style={{ cursor: currentDialogId > 0 ? 'pointer' : 'auto' }}
        >
          <SVGWrapper
            src="static/icons/arrow-left.svg"
            width={24}
            color={currentDialogId > 0 ? theme.palette.text.primary : theme.palette.text.disabled}
            fill
          />
        </div>
        <div
          onClick={() => {
            if (currentDialogId < gameStore.dialogs.length - 1) {
              setCurrentDialogId((value) => value + 1)
            }
          }}
          style={{ cursor: currentDialogId < gameStore.dialogs.length - 1 ? 'pointer' : 'auto' }}
        >
          <SVGWrapper
            src="static/icons/arrow-left.svg"
            width={24}
            flipX
            fill
            color={
              currentDialogId < gameStore.dialogs.length - 1 ? theme.palette.text.primary : theme.palette.text.disabled
            }
          />
        </div>
      </Stack>

      <DialogBorderWrapper>
        <DialogContentWrapper>
          <Typography
            variant="body1"
            sx={{
              whiteSpace: 'pre-line',
            }}
          >
            {gameStore.dialogs[currentDialogId].join('\n\n')}
          </Typography>
        </DialogContentWrapper>
      </DialogBorderWrapper>
    </Stack>
  )
})
