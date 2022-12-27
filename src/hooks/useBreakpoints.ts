import { useMediaQuery, useTheme } from '@mui/material'

export const useBreakpoints = () => {
  const theme = useTheme()

  return {
    downXs: useMediaQuery(theme.breakpoints.down('xs')),
    downSm: useMediaQuery(theme.breakpoints.down('sm')),
    downMd: useMediaQuery(theme.breakpoints.down('md')),
    downLg: useMediaQuery(theme.breakpoints.down('lg')),
  }
}
