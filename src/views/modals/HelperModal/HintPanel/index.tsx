import { Button, Stack, Typography } from '@mui/material'
import { observer } from 'mobx-react-lite'
import { useState } from 'react'

import { useCustomSnackbar } from 'hooks/useCustomSnackbar'

import { hintStore } from 'stores/hintStore'

import { ConfirmDialog } from 'views/common/ConfirmDialog'
import { PreviousNextButtons } from 'views/common/PreviousNextButtons'

import { HintConfirmDescriptionComponent } from 'views/modals/HelperModal/HintConfirmDialogDescription'

import { HintContainer, HintTextWrapper } from './components'

type Props = {
  onClickBack: () => void
}
export const HintPanel = observer(({ onClickBack }: Props) => {
  const { pushErrorSnackbar } = useCustomSnackbar()
  const [hintId, setHintId] = useState(hintStore.displayedHints.length - 1)
  const [isShowedConfirmDialog, setIsShowedConfirmDialog] = useState(false)
  const onCancelDialog = () => {
    setIsShowedConfirmDialog(false)
  }
  const onConfirmDialog = () => {
    setIsShowedConfirmDialog(false)
    const penalty = hintStore.nextHint?.penalty ?? 30
    setTimeout(() => {
      hintStore.addDisplayedHints()
      setHintId(hintStore.displayedHints.length - 1)
      pushErrorSnackbar({ error: new Error('You ask for a hint.'), penalty: penalty })
    }, 300)
  }

  return (
    <HintContainer>
      <HintTextWrapper>
        {hintStore.displayedHints[hintId].hintDialogs.map((hintText, id) => (
          <Typography key={`hint-text-${id}`}>{hintText}</Typography>
        ))}
      </HintTextWrapper>
      <PreviousNextButtons
        currentPage={hintId}
        maxPage={hintStore.displayedHints.length}
        setCurrentPage={setHintId}
        darkColor
      />
      <Stack direction="row" justifyContent="space-around" width="100%">
        <Button onClick={() => setIsShowedConfirmDialog(true)} disabled={!hintStore.nextHint} sx={{ width: 120 }}>
          Get next hint
        </Button>
        <Button onClick={onClickBack} sx={{ width: 120 }}>
          Back
        </Button>
      </Stack>
      <ConfirmDialog
        onCancel={onCancelDialog}
        onConfirm={onConfirmDialog}
        open={isShowedConfirmDialog}
        descriptionComponent={
          <HintConfirmDescriptionComponent
            penalty={hintStore.nextHint?.penalty ?? 0}
            isSpoilSolution={hintStore.nextHint?.isSpoilSolution}
          />
        }
      />
    </HintContainer>
  )
})
