import { Button, styled } from '@mui/material'

export const StyledButton = styled(Button)(({ theme }) => ({
  height: 56,
  width: 200,
  borderRadius: 8,
  ...theme.typography.h6,
  fontWeight: 800,
}))

export const PlayButton = styled(StyledButton)(() => ({
  background: '#db6900', // dark orange
  '&:hover': {
    background: '#a85203', // darker orange
  },
}))
