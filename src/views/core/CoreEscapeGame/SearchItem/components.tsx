import { Button, TextField, styled } from '@mui/material'

export const SearchButton = styled(Button)(({ theme }) => ({
  background: theme.palette.primary.dark,
  minWidth: 68,
  borderRadius: 8,
  color: theme.palette.text.primary,
  ...theme.typography.label,
  textTransform: 'none',
  '&:hover': {
    background: theme.palette.primary.main,
  },
}))

export const SearchTextField = styled(TextField)(({ theme }) => ({
  '& .MuiInputBase-root': {
    height: 32,
  },
  '& .MuiInputBase-input': {
    height: 32,
    padding: theme.spacing(0, 1),
    background: theme.palette.text.primary,
    color: theme.palette.primary.darken,
    borderRadius: 4,
  },
}))
