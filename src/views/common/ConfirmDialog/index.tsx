import { Button, Stack, Typography } from '@mui/material'

import { StyledDialog } from './components'

type Props = {
  open: boolean
  descriptionText?: string
  descriptionComponent?: React.ReactNode
  onConfirm: () => void
  onCancel: () => void
}

export const ConfirmDialog = ({ onConfirm, onCancel, open, descriptionText, descriptionComponent }: Props) => {
  return (
    <StyledDialog open={open}>
      <Typography variant="h6" color="primary.darken" fontWeight="bold">
        Confirmation
      </Typography>
      {descriptionText ? (
        <Typography>{descriptionText}</Typography>
      ) : descriptionComponent ? (
        descriptionComponent
      ) : null}
      <Stack direction="row" gap={5}>
        <Button onClick={onConfirm}>Yes</Button>
        <Button onClick={onCancel}>No</Button>
      </Stack>
    </StyledDialog>
  )
}
