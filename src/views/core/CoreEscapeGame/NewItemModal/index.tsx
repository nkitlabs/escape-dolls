import { Button, Stack, Typography } from '@mui/material'
import { observer } from 'mobx-react-lite'

import { ItemDetails } from 'types/types'

import { dialogStore } from 'stores/dialogStore'

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
  return (
    <Stack p={2} gap={4} alignItems="center" justifyContent="center" maxHeight={560} width={560}>
      <Typography variant="h6" fontWeight="bold" color="primary.darken">
        You found: {newItems[0].name}
      </Typography>
      <img src={newItems[0].image} height={240} />
      <Stack gap={2} alignItems="center">
        <Typography variant="body1" color="primary.darken" align="center">
          {newItems[0].description}
        </Typography>
        <Button
          sx={{ height: 40, width: 160 }}
          onClick={() => {
            dialogStore.close()
          }}
        >
          Put in item list
        </Button>
      </Stack>
    </Stack>
  )
})
