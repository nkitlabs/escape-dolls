import { Stack, useTheme } from '@mui/material'

import { SVGWrapper } from 'views/common/SVGWrapper'

import { ArrowWrapper } from './components'

type Props = {
  onClickLeft: () => void
  onClickRight: () => void
  disabledLeft: boolean
  disabledRight: boolean
}

export const PreviousNextButtons = ({ onClickLeft, onClickRight, disabledLeft, disabledRight }: Props) => {
  const theme = useTheme()
  return (
    <Stack direction="row" gap={1}>
      <ArrowWrapper disabled={disabledLeft} onClick={onClickLeft}>
        <SVGWrapper
          src="static/icons/arrow-left.svg"
          width={24}
          color={disabledLeft ? theme.palette.text.primary : theme.palette.text.disabled}
          fill
        />
      </ArrowWrapper>
      <ArrowWrapper disabled={disabledRight} onClick={onClickRight}>
        <SVGWrapper
          src="static/icons/arrow-left.svg"
          flipX
          width={24}
          color={disabledRight ? theme.palette.text.primary : theme.palette.text.disabled}
          fill
        />
      </ArrowWrapper>
    </Stack>
  )
}
