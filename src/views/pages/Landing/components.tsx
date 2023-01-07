import { Button, Stack, styled } from '@mui/material'

export const StyledButton = styled(Button)(({ theme }) => ({
  height: 56,
  width: 200,
  borderRadius: 8,
  ...theme.typography.h6,
  fontWeight: 800,
  marginTop: theme.spacing(5),
  [theme.breakpoints.down('sm')]: {
    ...theme.typography.body1,
    marginTop: theme.spacing(3),
    fontWeight: 800,
    height: 40,
    width: 160,
  },
}))

export const PlayButton = styled(StyledButton)(() => ({
  background: '#db6900', // dark orange
  '&:hover': {
    background: '#a85203', // darker orange
  },
}))

export const LandingWrapper = styled(Stack)(() => ({
  margin: 'auto',
  alignItems: 'center',
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

export const EndingPageWrapper = styled(Stack)(({ theme }) => ({
  height: '100vh',
  alignItems: 'center',
  justifyContent: 'center',
  gap: theme.spacing(2),
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
