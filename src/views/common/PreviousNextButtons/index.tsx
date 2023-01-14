import { Stack, Typography, useTheme } from '@mui/material'
import { Dispatch, SetStateAction } from 'react'

import { SVGWrapper } from 'views/common/SVGWrapper'

import { ArrowWrapper } from './components'

type Props = {
  currentPage: number
  setCurrentPage: Dispatch<SetStateAction<number>>
  maxPage: number
  darkColor?: boolean
}

export const PreviousNextButtons = ({ currentPage, maxPage, setCurrentPage, darkColor }: Props) => {
  const theme = useTheme()
  const normalColor = darkColor ? theme.palette.primary.darken : theme.palette.text.primary
  const disableColor = darkColor ? theme.palette.text.secondary : theme.palette.text.disabled
  const disableLeft = currentPage === 0
  const disableRight = currentPage === maxPage - 1

  return (
    <Stack direction="row" gap={1} alignItems="center">
      <ArrowWrapper
        disabled={disableLeft}
        onClick={() => {
          if (!disableLeft) setCurrentPage((v) => v - 1)
        }}
      >
        <SVGWrapper
          src="static/icons/arrow-left.svg"
          width={24}
          color={disableLeft ? disableColor : normalColor}
          fill
        />
      </ArrowWrapper>
      <Typography variant="body2" fontFamily="Monospace" color={normalColor}>{`${
        currentPage + 1
      }/${maxPage}`}</Typography>
      <ArrowWrapper
        disabled={disableRight}
        onClick={() => {
          if (!disableRight) setCurrentPage((v) => v + 1)
        }}
      >
        <SVGWrapper
          src="static/icons/arrow-left.svg"
          flipX
          width={24}
          color={disableRight ? disableColor : normalColor}
          fill
        />
      </ArrowWrapper>
    </Stack>
  )
}
