import { Close as CloseIcon } from '@mui/icons-material'
import { Stack, Typography, useTheme } from '@mui/material'
import { observer } from 'mobx-react-lite'
import { useMemo, useState } from 'react'

import { dialogStore } from 'stores/dialogStore'

import { SVGWrapper } from 'views/common/SVGWrapper'

import { IconWrapper, ModalWrapper, StyledCloseIcon } from 'views/modals/HelperModal//components'
import { HelperMainPanel } from 'views/modals/HelperModal/HelperMainPanel'

import { HintPanel } from './HintPanel'
import { TutorialPanel } from './TutorialPanel'

export const openHelperModal = () => {
  dialogStore.open(() => <HelperModal />, {
    borderRadius: 16,
    hideHeader: true,
  })
}

export const HelperButton = () => {
  const theme = useTheme()
  return (
    <IconWrapper onClick={openHelperModal}>
      <SVGWrapper
        className="icon-normal"
        src="static/icons/question-mark-circle.svg"
        width={20}
        color={theme.palette.primary.main}
        fill
      />
      <SVGWrapper
        className="icon-hover"
        src="static/icons/question-mark-circle.svg"
        color={theme.palette.primary.contrastText}
        fill
        width={20}
      />
    </IconWrapper>
  )
}

export const HelperModal = observer(() => {
  const [isShowHintPanel, setIsShowHintPanel] = useState(false)
  const [isShowTutorialPanel, setIsShowTutorialPanel] = useState(false)

  const title = useMemo(() => {
    if (isShowHintPanel) return 'Hint'
    if (isShowTutorialPanel) return 'How to play'
    return 'Help'
  }, [isShowHintPanel, isShowTutorialPanel])

  return (
    <ModalWrapper>
      <Stack position="relative" width="100%" alignItems="center">
        <Typography variant="h6" color="primary.darken" fontWeight="bold">
          {title}
        </Typography>
        <StyledCloseIcon onClick={dialogStore.close}>
          <CloseIcon />
        </StyledCloseIcon>
      </Stack>
      {isShowTutorialPanel ? (
        <TutorialPanel onClickBack={() => setIsShowTutorialPanel(false)} />
      ) : isShowHintPanel ? (
        <HintPanel onClickBack={() => setIsShowHintPanel(false)} />
      ) : (
        <HelperMainPanel
          onClickTutorial={() => setIsShowTutorialPanel(true)}
          onClickHint={() => setIsShowHintPanel(true)}
        />
      )}
    </ModalWrapper>
  )
})
