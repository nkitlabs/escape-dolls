import { Button, Stack, Typography } from '@mui/material'
import { observer } from 'mobx-react-lite'
import { useState } from 'react'

import { ItemDetails } from 'types/types'

import { useBreakpoints } from 'hooks/useBreakpoints'

import { dialogStore } from 'stores/dialogStore'

import { PreviousNextButtons } from 'views/common/PreviousNextButtons'

import { Header, ModalWrapper } from './components'

type NewItemModalProps = {
  newItems: ItemDetails[]
}

export const openNewItemModal = ({ newItems }: NewItemModalProps) => {
  dialogStore.open(() => <NewItemModal newItems={newItems} />, {
    hideHeader: true,
    borderRadius: 16,
  })
}

export const NewItemModal = observer(({ newItems }: NewItemModalProps) => {
  const [id, setId] = useState(0)
  const { downSm } = useBreakpoints()

  return (
    <ModalWrapper>
      <Stack alignItems="center">
        <Header>{`You found: ${newItems.length} ${newItems.length > 1 ? 'items' : 'item'}`}</Header>
        {downSm ? (
          <>
            <Header>{`${newItems[id].name ?? 'an undefined object'}`}</Header>
            <Header>{`${id + 1}/${newItems.length}`}</Header>
          </>
        ) : (
          <Header>{`${newItems[id].name ?? 'an undefined object'} (${id + 1}/${newItems.length})`}</Header>
        )}
      </Stack>
      <Stack gap={1} alignItems="center" px={3}>
        <img src={newItems[id].image} height={downSm ? 120 : 240} />
        <Typography align="center" color="primary.darken" variant={downSm ? 'body2' : 'body1'}>
          {newItems[id].description}
        </Typography>
        {newItems.length > 1 && (
          <PreviousNextButtons
            disabledLeft={id <= 0}
            disabledRight={id >= newItems.length - 1}
            onClickLeft={() => id > 0 && setId((value) => value - 1)}
            onClickRight={() => id < newItems.length - 1 && setId((value) => value + 1)}
            darkColor
          />
        )}
      </Stack>
      <Stack gap={2} alignItems="center">
        <Button sx={{ height: 40, width: 160 }} onClick={() => dialogStore.close()}>
          Put in item list
        </Button>
      </Stack>
    </ModalWrapper>
  )
})
