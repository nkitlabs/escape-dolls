import { Stack } from '@mui/material'

import { SVGWrapper } from 'views/common/SVGWrapper'

import { DialogWrapper } from './components'

export const GameDialog = () => {
  return (
    <Stack gap={1}>
      <Stack direction="row" gap={2} justifyContent="center">
        <SVGWrapper src="static/icons/arrow-left.svg" width={24} />
        <SVGWrapper src="static/icons/arrow-left.svg" width={24} flipX />
      </Stack>
      <DialogWrapper></DialogWrapper>
    </Stack>
  )
}
