import { Typography } from '@mui/material'
import { useState } from 'react'

import { ItemDetails } from 'types/types'

import { SVGWrapper } from 'views/common/SVGWrapper'

import { ItemCardWrapper, TickBox } from './components'

type Props = {
  item: ItemDetails
  onClick?: () => {}
}
export const ItemCard = ({ item, onClick }: Props) => {
  const [isTicked, setIsTicked] = useState(false)
  const handleClick = () => {
    setIsTicked((value) => !value)
    onClick?.()
  }

  return (
    <ItemCardWrapper onClick={handleClick}>
      <TickBox isTicked={isTicked}>{isTicked && <SVGWrapper src="static/icons/done.svg" width={14} />}</TickBox>
      <img src={item.image} width={80} height={80} />
      <Typography variant="label" color="text.secondary" className="item-name">
        {item.name}
      </Typography>
    </ItemCardWrapper>
  )
}
