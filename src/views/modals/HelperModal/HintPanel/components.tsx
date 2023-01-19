import { Stack, styled } from '@mui/material'

export const HintTextWrapper = styled(Stack)(({ theme }) => ({
  padding: theme.spacing(2),
  gap: theme.spacing(3),
  borderRadius: 8,
  width: '100%',
  height: 224,
  color: theme.palette.primary.darken,
  backgroundColor: theme.palette.primary.contrastText,
  overflowY: 'scroll',
  [theme.breakpoints.down('sm')]: {
    height: 200,
  },
}))

export const HintContainer = styled(Stack)(({ theme }) => ({
  gap: theme.spacing(3),
  alignItems: 'center',
  [theme.breakpoints.down('sm')]: {
    gap: theme.spacing(2),
  },
}))
