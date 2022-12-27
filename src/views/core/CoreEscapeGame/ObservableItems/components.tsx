import { Button, styled } from '@mui/material'

export const StyledButton = styled(Button)(({ theme }) => ({
  width: 160,
  height: 40,
  borderRadius: 8,
  background: theme.palette.primary.dark,
  color: theme.palette.text.primary,
  ...theme.typography.body1,
  textTransform: 'none',
  '&:hover': {
    background: theme.palette.primary.main,
  },
  [theme.breakpoints.down('md')]: {
    ...theme.typography.label,
    height: 32,
    width: 120,
  },
}))
