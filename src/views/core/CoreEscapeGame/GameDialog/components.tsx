import { Stack, styled } from '@mui/material'

export const DialogWrapper = styled(Stack)(({ theme }) => ({
  border: `1px solid ${theme.palette.common.white}`,
  height: 160,
  padding: theme.spacing(2),
  borderRadius: 8,
  [theme.breakpoints.down('md')]: {
    height: 200,
  },
  [theme.breakpoints.down('sm')]: {
    height: 240,
  },
}))
