import { Stack, Typography } from '@mui/material'
import { observer } from 'mobx-react-lite'
import { useMemo } from 'react'

import { ItemDetails } from 'types/types'

import { itemStore } from 'stores/itemStore'

import { SVGWrapper } from 'views/common/SVGWrapper'

import { ItemCardWrapper, TickBox } from './components'

type Props = {
  item: ItemDetails
  onClick?: () => void
}
export const ItemCard = observer(({ item, onClick }: Props) => {
  const handleClick = () => {
    onClick?.()
  }
  const isTicked = useMemo(
    () => {
      return itemStore.selectedItems.has(item.key)
    },

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [itemStore.selectedItems.size],
  )

  return (
    <ItemCardWrapper onClick={handleClick}>
      <TickBox isTicked={isTicked}>{isTicked && <SVGWrapper src="static/icons/done.svg" width={14} />}</TickBox>
      <img src={item.image} width={80} height={80} />
      <Stack maxWidth="100%">
        <Typography
          variant="label"
          color="text.secondary"
          className="item-name"
          noWrap
          align="center"
          overflow="hidden"
          textOverflow="ellipsis"
        >
          {item.name}
        </Typography>
      </Stack>
    </ItemCardWrapper>
  )
})
