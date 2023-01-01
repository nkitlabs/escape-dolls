import { Button, Stack, styled } from '@mui/material'

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

export const ItemListWrapper = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  display: 'flex',
  overflowX: 'auto',
  overflowY: 'clip',
  width: '100%',
  flexGrow: 0,
  boxSizing: 'border-box',
  padding: theme.spacing(2),
  gap: theme.spacing(2),
  height: 160,
  border: `1px solid ${theme.palette.common.white}`,
  borderRadius: 8,
  '&:hover, :active': {
    padding: theme.spacing(2, 2, 0),
  },
}))
