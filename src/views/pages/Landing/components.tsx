import { Button, Stack, Typography, styled } from '@mui/material'

export const PlayButton = styled(Button)(({ theme }) => ({
  height: 56,
  width: 200,
  borderRadius: '50vh',
  ...theme.typography.h6,
  fontWeight: 800,
  background: '#db6900', // dark orange
  '&:hover': {
    background: '#a85203', // darker orange
  },
  [theme.breakpoints.down('sm')]: {
    ...theme.typography.body1,
    fontWeight: 800,
    height: 40,
    width: 120,
  },
}))

export const LandingWrapper = styled(Stack)(() => ({
  margin: 'auto',
  alignItems: 'center',
  position: 'relative',
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

export const SupportUsTypography = styled(Typography)(({ theme }) => ({
  ...theme.typography.body2,
  color: theme.palette.text.secondary,
  transition: '400ms ease',
  textDecoration: 'underline',
  cursor: 'pointer',
  '&:hover': {
    color: theme.palette.text.primary,
  },
  [theme.breakpoints.down('sm')]: {
    ...theme.typography.caption,
  },
}))
