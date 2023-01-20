import { Input, styled } from '@mui/material'

export const StyledTextInput = styled(Input)(({ theme }) => ({
  '&.MuiInputBase-root': {
    backgroundColor: theme.palette.primary.light,
    paddingLeft: theme.spacing(1),
    color: theme.palette.primary.dark,
  },
}))
