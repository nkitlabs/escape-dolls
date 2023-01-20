import { Close as CloseIcon } from '@mui/icons-material'
import { Divider, Typography } from '@mui/material'
import { isString } from 'lodash'
import { observer } from 'mobx-react-lite'

import { dialogStore } from 'stores/dialogStore'

import { StyledCloseIcon, StyledDialog, StyledDialogContent, StyledDialogTitle } from './components'

export const GlobalDialog = observer(() => {
  const {
    title,
    isContentCenter,
    divider = false,
    isHeaderHidden,
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
      {!isHeaderHidden && (
        <>
          <StyledDialogTitle>
            <Typography variant="h6" textAlign="center" color="primary.darken" flex={1}>
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
