import { isString } from 'lodash'
import { observer } from 'mobx-react-lite'
import { Close as CloseIcon } from '@mui/icons-material'
import { Divider, Typography } from '@mui/material'

import { dialogStore } from 'stores/dialogStore'

import { StyledCloseIcon, StyledDialog, StyledDialogContent, StyledDialogTitle } from './components'

export const GlobalDialog = observer(() => {
  const {
    title,
    isContentCenter,
    divider = false,
    hideHeader,
    backgroundColor,
    borderRadius,
    ...restProps
  } = dialogStore.options

  if (!dialogStore.content) {
    return null
  }

  const Content = dialogStore.content as React.ElementType

  return (
    <StyledDialog
      open={dialogStore.isOpen}
      backgroundColor={backgroundColor}
      borderRadius={borderRadius}
      {...restProps}
      fullWidth
    >
      {!hideHeader && (
        <>
          <StyledDialogTitle>
            <Typography variant="h6" textAlign="center" flex={1}>
              {title ?? ''}
            </Typography>
            <StyledCloseIcon onClick={dialogStore.close}>
              <CloseIcon />
            </StyledCloseIcon>
          </StyledDialogTitle>
          {divider && <Divider />}
        </>
      )}
      <StyledDialogContent>
        {isString(dialogStore.content) ? (
          <Typography variant="body1" color="text.primary" align={isContentCenter ? 'center' : 'left'}>
            {dialogStore.content}
          </Typography>
        ) : (
          <Content />
        )}
      </StyledDialogContent>
    </StyledDialog>
  )
})
