import { Button, Stack, Typography, styled } from '@mui/material'

export const SummaryWrapper = styled(Stack)(({ theme }) => ({
  height: '100vh',
  alignItems: 'center',
  justifyContent: 'center',
  gap: theme.spacing(6),
  animation: 'fade-in 1.5s linear',
  '@keyframes fade-in': {
    '0%': {
      opacity: 0,
    },
    '100%': {
      opacity: 1,
    },
  },
}))

export const StyledButton = styled(Button)(({ theme }) => ({
  width: 160,
  [theme.breakpoints.down('sm')]: {
    width: 120,
    ...theme.typography.caption,
  },
}))

export const TimerInfoWrapper = styled(Stack)(({ theme }) => ({
  alignItems: 'center',
  width: 300,
  gap: theme.spacing(2),
  animation: 'fade-in 5s linear',
  '@keyframes fade-in': {
    '0%': {
      opacity: 0,
    },
    '50%': {
      opacity: 0,
    },
    '100%': {
      opacity: 1,
    },
  },
}))

export const NormalText = styled(Typography)(({ theme }) => ({
  ...theme.typography.body1,
  [theme.breakpoints.down('sm')]: {
    ...theme.typography.caption,
  },
}))
