import { Box, Stack, styled } from '@mui/material'

export const ItemCardWrapper = styled(Stack)(({ theme }) => ({
  background: theme.palette.primary.dark,
  border: `1px solid ${theme.palette.text.secondary}`,
  position: 'relative',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 8,
  width: 128,
  height: 128,
  padding: theme.spacing(1),
  flexShrink: 0,
  gap: theme.spacing(1),
  cursor: 'pointer',
  '&:hover': {
    opacity: 0.6,
  },
  [theme.breakpoints.down('md')]: {
    '&:hover': { opacity: 'unset' },
  },
}))

export const TickBox = styled(Box, {
  shouldForwardProp: (props: string) => !['isTicked'].includes(props),
})<{ isTicked?: boolean }>(({ isTicked, theme }) => ({
  position: 'absolute',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  top: 8,
  left: 8,
  width: 16,
  height: 16,
  border: `1px solid ${theme.palette.primary.darken}`,
  backgroundColor: isTicked ? theme.palette.success.main : theme.palette.primary.lighten,
}))
