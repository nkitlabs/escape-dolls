import { StyledSVG } from './components'

type Props = {
  src: string
  color?: string
  width?: number
  height?: number
  fill?: boolean
  stroke?: boolean
  rotate?: number
  flipX?: boolean
  flipY?: boolean
  className?: string
  transitionSecond?: number
}

/**
 * @param src Src of svg file
 * @param color Color HEX code start with #
 * @param width Width of image
 * @param height Height of image
 * @param fill Svg using fill props for color
 * @param stroke Svg using fill props for color
 * @param rotate the number of degree that svg rotate
 * @param flipX  whether the svg flip side x-axis
 * @param flipY  whether the svg flip side y-axis
 * @param className class of svg
 */
export const SVGWrapper = ({
  src,
  color,
  height: heightProps,
  width: widthProps,
  fill,
  stroke,
  className,
  rotate,
  flipX,
  flipY,
  transitionSecond = 0.4,
}: Props) => {
  const width = widthProps ?? heightProps ?? 32
  const height = heightProps ?? widthProps ?? 32

  let transformKeyword = ''
  if (rotate) {
    transformKeyword += ` rotate(${rotate}deg)`
  }
  if (flipX) {
    transformKeyword += ` scaleX(-1)`
  }
  if (flipY) {
    transformKeyword += ` scaleY(-1)`
  }
  transformKeyword = transformKeyword.trim()

  return (
    <StyledSVG
      className={className}
      src={src}
      color={color}
      isFill={fill}
      isStroke={stroke}
      sx={{
        div: {
          display: 'flex',
          width,
          height,
          minWidth: width,
          minHeight: height,
        },
        transform: transformKeyword ? transformKeyword : undefined,
      }}
      transitionSecond={transitionSecond}
    />
  )
}
