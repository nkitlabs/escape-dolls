import { Stack, useTheme } from '@mui/material'

import { SVGWrapper } from 'views/common/SVGWrapper'

import { ArrowWrapper } from './components'

type Props = {
  onClickLeft: () => void
  onClickRight: () => void
  disabledLeft: boolean
  disabledRight: boolean
  darkColor?: boolean
}

export const PreviousNextButtons = ({ onClickLeft, onClickRight, disabledLeft, disabledRight, darkColor }: Props) => {
  const theme = useTheme()
  const normalColor = darkColor ? theme.palette.primary.darken : theme.palette.text.primary
  const disableColor = darkColor ? theme.palette.text.secondary : theme.palette.text.disabled
  return (
    <Stack direction="row" gap={1}>
      <ArrowWrapper disabled={disabledLeft} onClick={onClickLeft}>
        <SVGWrapper
          src="static/icons/arrow-left.svg"
          width={24}
          color={disabledLeft ? disableColor : normalColor}
          fill
        />
      </ArrowWrapper>
      <ArrowWrapper disabled={disabledRight} onClick={onClickRight}>
        <SVGWrapper
          src="static/icons/arrow-left.svg"
          flipX
          width={24}
          color={disabledRight ? disableColor : normalColor}
          fill
        />
      </ArrowWrapper>
    </Stack>
  )
}
