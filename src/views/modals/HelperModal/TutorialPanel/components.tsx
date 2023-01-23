import { Stack, styled } from '@mui/material'

export const TutorialTextWrapper = styled(Stack)(({ theme }) => ({
  padding: theme.spacing(2),
  gap: theme.spacing(3),
  borderRadius: 8,
  width: '100%',
  height: 400,
  color: theme.palette.primary.darken,
  backgroundColor: theme.palette.primary.contrastText,
  overflowY: 'scroll',
  [theme.breakpoints.down('sm')]: {
    height: 300,
  },
}))
