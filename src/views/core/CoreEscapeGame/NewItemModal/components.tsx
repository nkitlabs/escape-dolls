import { Stack, Typography, styled } from '@mui/material'

export const Header = styled(Typography)(({ theme }) => ({
  ...theme.typography.h6,
  fontWeight: 'bold',
  color: theme.palette.primary.darken,
  align: 'center',
}))

export const ModalWrapper = styled(Stack)(({ theme }) => ({
  padding: theme.spacing(2),
  gap: theme.spacing(3),
  alignItems: 'center',
  justifyContent: 'center',
  width: 560,
  [theme.breakpoints.down('sm')]: {
    gap: theme.spacing(2),
    width: 300,
  },
}))
