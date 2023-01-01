import { Box, styled } from '@mui/material'

export const ArrowWrapper = styled(Box, {
  shouldForwardProp: (props: string) => !['disabled'].includes(props),
})<{ disabled?: boolean }>(({ disabled }) => ({
  cursor: disabled ? 'auto' : 'pointer',
  borderRadius: '100%',
}))
