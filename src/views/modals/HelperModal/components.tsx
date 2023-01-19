import { Box, IconButton, Stack, styled } from '@mui/material'

export const IconWrapper = styled(Box)(() => ({
  position: 'relative',
  transitionProperty: 'all',
  transitionDuration: '400ms',
  transitionTimingFunction: 'ease',
  width: 20,
  height: 20,
  cursor: 'pointer',
  '&:hover': {
    '& div.icon-normal': {
      opacity: 0,
    },
    '& div.icon-hover': {
      opacity: 1,
    },
  },
  '& div.icon-normal': {
    position: 'absolute',
    transition: 'opacity 500ms ease',
    opacity: 1,
  },
  '& div.icon-hover': {
    position: 'absolute',
    transition: 'opacity 500ms ease',
    opacity: 0,
  },
}))

export const ModalWrapper = styled(Stack)(({ theme }) => ({
  padding: theme.spacing(2),
  gap: theme.spacing(3),
  alignItems: 'center',
  justifyContent: 'center',
  width: 400,
  [theme.breakpoints.down('sm')]: {
    gap: theme.spacing(2),
    width: 300,
  },
}))

export const StyledCloseIcon = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  padding: theme.spacing(1),
  height: 24,
  width: 24,
  right: 16,
  top: '50%',
  transform: 'translateY(-50%)',
  bottom: 0,
}))
