import { Typography, styled } from '@mui/material'

export const DialogContentWrapper = styled(Typography)(({ theme }) => ({
  border: `1px solid ${theme.palette.common.white}`,
  height: 160,
  borderRadius: 8,
  overflowY: 'auto',
  whiteSpace: 'pre-wrap',
  animation: 'flash 1.5s linear',
  '&::-webkit-scrollbar': {
    width: 8,
    opacity: 0.5,
  },
  '&::-webkit-scrollbar-thumb': {
    borderRadius: 4,
    backgroundColor: theme.palette.text.disabled,
    opacity: 0.5,
  },
  '&::-webkit-scrollbar-thumb:hover': {
    backgroundColor: theme.palette.text.secondary,
  },
  padding: theme.spacing(1, 2),
  '@keyframes flash': {
    '0%': {
      opacity: 1,
    },
    '20%': {
      opacity: 0,
    },
    '100%': {
      opacity: 1,
    },
  },

  [theme.breakpoints.down('md')]: {
    height: 200,
  },
  [theme.breakpoints.down('sm')]: {
    height: 240,
  },
}))
