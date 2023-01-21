import { Dialog, styled } from '@mui/material'

export const StyledDialog = styled(Dialog, {
  shouldForwardProp: (props: string) => !['backgroundColor', 'borderRadius', 'width'].includes(props),
})<{
  backgroundColor?: string
  borderRadius?: number
}>(({ theme, backgroundColor, borderRadius }) => ({
  zIndex: 3000,
  '.MuiDialog-paper': {
    color: theme.palette.primary.darken,
    width: 'unset',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(3, 7),
    gap: theme.spacing(2),
    alignItems: 'center',
    backgroundColor: backgroundColor ?? theme.palette.primary.lighten,
    borderRadius: borderRadius ?? 16,
    [theme.breakpoints.down('sm')]: {
      margin: theme.spacing(4, 0),
      gap: theme.spacing(1),
      padding: theme.spacing(3, 3),
    },
  },
}))
