import { Stack, Typography } from '@mui/material'
import { observer } from 'mobx-react-lite'
import { useMemo } from 'react'

import { ItemDetails } from 'types/types'

import { gameStore } from 'stores/gameStore'

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
  const isTicked = useMemo(() => {
    return gameStore.selectedItems.has(item.key)
  }, [gameStore.selectedItems.size])

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
