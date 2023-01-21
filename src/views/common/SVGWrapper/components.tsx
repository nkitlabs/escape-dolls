import { styled } from '@mui/material'
import { ReactSVG } from 'react-svg'

type StyledSVGProps = {
  isFill?: boolean
  isStroke?: boolean
  color?: string
  transitionSecond?: number
}

export const StyledSVG = styled(ReactSVG, {
  shouldForwardProp: (props: string) =>
    !['isFill', 'isStroke', 'color', 'height', 'width', 'transitionSecond'].includes(props),
})<StyledSVGProps>(({ isFill, isStroke, color, transitionSecond }) => ({
  svg: {
    stroke: isStroke && (color ?? 'currentColor'),
    fill: isFill && (color ?? 'currentColor'),
    path: {
      stroke: isStroke && (color ?? 'currentColor'),
      fill: isFill && (color ?? 'currentColor'),
    },
    width: '100%',
    height: '100%',
    transition: `color ${transitionSecond}s ease`,
  },
}))
