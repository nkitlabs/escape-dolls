import { Dialog, DialogContent, IconButton, styled } from '@mui/material'

export const StyledDialog = styled(Dialog, {
  shouldForwardProp: (props: string) => !['backgroundColor', 'borderRadius', 'width'].includes(props),
})<{
  backgroundColor?: string
  borderRadius?: number
}>(({ theme, backgroundColor, borderRadius }) => ({
  zIndex: 1500,
  '.MuiDialog-paper': {
    width: 'unset',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(0),
    backgroundColor: backgroundColor ?? theme.palette.primary.lighten,
    borderRadius: borderRadius,
    [theme.breakpoints.down('xs')]: {
      minWidth: 0,
    },
    [theme.breakpoints.down('md')]: {
      margin: theme.spacing(4, 0),
    },
  },
}))

export const StyledDialogTitle = styled('div')(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  height: 40,
  padding: theme.spacing(0),
  margin: theme.spacing(1, 0),
}))

export const StyledDialogContent = styled(DialogContent)(({ theme }) => ({
  margin: theme.spacing(0),
  width: '100%',
  padding: theme.spacing(0),
}))

export const StyledCloseIcon = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  padding: theme.spacing(1),
  height: 24,
  width: 24,
  right: 8,
  top: 0,
  bottom: 0,
}))
