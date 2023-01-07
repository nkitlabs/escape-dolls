import { Stack, Typography, styled } from '@mui/material'

export const Header = styled(Typography)(({ theme }) => ({
  ...theme.typography.h6,
  fontWeight: 'bold',
  color: theme.palette.primary.darken,
  align: 'center',
}))

export const ModalWrapper = styled(Stack)(({ theme }) => ({
  padding: theme.spacing(2),
  gap: theme.spacing(2),
  alignItems: 'center',
  justifyContent: 'center',
  width: 300,
}))

export const PasswordMonitorWrapper = styled(Stack)(({ theme }) => ({
  width: 160,
  height: 32,
  backgroundColor: theme.palette.grey[400],
  borderRadius: 8,
  border: `1px solid ${theme.palette.primary.darken}`,
  padding: theme.spacing(0, 0, 0, 1),
  justifyContent: 'center',
  alignItems: 'center',
}))

export const SafePadding = styled(Stack)(({ theme }) => ({
  justifyContent: 'center',
  height: 24,
  width: 40,
  alignItems: 'center',
  borderRadius: '50vh',
  border: `2px solid ${theme.palette.primary.contrastText}`,
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
}))
