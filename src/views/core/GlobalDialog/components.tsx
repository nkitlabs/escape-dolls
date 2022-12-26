import { Dialog, DialogContent, IconButton, styled } from '@mui/material'

export const StyledDialog = styled(Dialog, {
  shouldForwardProp: (props: string) => !['backgroundColor', 'borderRadius'].includes(props),
})<{
  backgroundColor?: string
  borderRadius?: number
}>(({ theme, backgroundColor, borderRadius }) => ({
  zIndex: 1500,
  '.MuiDialog-paper': {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(0),
    backgroundColor: backgroundColor ?? theme.palette.background.default,
    borderRadius: borderRadius,
    [theme.breakpoints.down('xs')]: {
      minWidth: 0,
    },
  },
}))

export const StyledDialogTitle = styled('div')(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  height: 40,
  padding: theme.spacing(0),
  marginBottom: theme.spacing(1),
}))

export const StyledDialogContent = styled(DialogContent)(({ theme }) => ({
  margin: theme.spacing(0),
  width: '100%',
  padding: theme.spacing(0),
}))

export const StyledCloseIcon = styled(IconButton)(() => ({
  position: 'absolute',
  right: 0,
  top: 0,
  bottom: 0,
}))
