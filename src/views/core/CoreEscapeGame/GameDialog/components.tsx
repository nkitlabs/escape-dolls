import { Stack, styled } from '@mui/material'

export const DialogBorderWrapper = styled(Stack)(({ theme }) => ({
  border: `1px solid ${theme.palette.common.white}`,
  height: 160,
  borderRadius: 8,
  [theme.breakpoints.down('md')]: {
    height: 200,
  },
  [theme.breakpoints.down('sm')]: {
    height: 240,
  },
}))

export const DialogContentWrapper = styled(Stack)(({ theme }) => ({
  overflowY: 'auto',
  padding: theme.spacing(1, 2, 1, 2),
  '&:hover': {
    padding: theme.spacing(1, 1, 1, 2),
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
  },
}))
