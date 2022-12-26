import { Input, Stack, styled } from '@mui/material'

export const StyledTextInput = styled(Input)(({ theme }) => ({
  '&.MuiInputBase-root': {
    backgroundColor: theme.palette.primary.light,
    paddingLeft: theme.spacing(1),
    color: theme.palette.primary.dark,
  },
}))

export const ContentWrapper = styled(Stack)(({ theme }) => ({
  padding: theme.spacing(3),
  gap: theme.spacing(2),
  border: `1px solid ${theme.palette.primary.contrastText}`,
  borderRadius: 4,
}))
