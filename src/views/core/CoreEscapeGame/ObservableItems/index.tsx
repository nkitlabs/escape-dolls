import { Stack, Typography } from '@mui/material'
import { observer } from 'mobx-react-lite'
import { useState } from 'react'

import { useCustomSnackbar } from 'hooks/useCustomSnackbar'

import { gameService } from 'services/gameService'

import { gameStore } from 'stores/gameStore'

import { ItemCard } from 'views/core/CoreEscapeGame/ItemCard'
import { openNewItemModal } from 'views/core/CoreEscapeGame/NewItemModal'

import { ItemListWrapper, StyledButton } from './components'

export const ObservableItems = observer(() => {
  const { pushErrorSnackbar, pushMessageSnackbar } = useCustomSnackbar()
  const [isLoading, setIsLoading] = useState(false)

  const onClickCombine = async () => {
    if (gameStore.selectedItems.size <= 1) {
      pushMessageSnackbar({ message: 'You have to select at least 2 items to combine them.', messageType: 'error' })
      return
    }

    setIsLoading(true)
    const result = await gameService.combineItems()
    if (!result.success) {
      pushErrorSnackbar({ error: result.error, penalty: result.penalty })
      setIsLoading(false)
      return
    }

    setIsLoading(false)

    if (result.data.functionMapping) {
      const { id, params } = result.data.functionMapping
      gameStore.functionMapping[id](params)
    } else if (!result.data?.isRepeated && result.data?.newItems?.length) {
      openNewItemModal({
        newItems: result.data.newItems,
      })
    }
  }

  const onClickObserve = async () => {
    if (gameStore.selectedItems.size !== 1) {
      pushMessageSnackbar({ message: 'You can only observe an item each time.', messageType: 'error' })
      return
    }

    setIsLoading(true)
    const result = await gameService.observeItem()
    if (!result.success) {
      pushErrorSnackbar({ error: result.error, penalty: result.penalty })
      setIsLoading(false)
      return
    }

    setIsLoading(false)

    if (result.data.functionMapping) {
      const { id, params } = result.data.functionMapping
      gameStore.functionMapping[id](params)
    } else if (!result.data?.isRepeated && result.data?.newItems?.length) {
      openNewItemModal({
        newItems: result.data.newItems,
      })
    }
  }

  return (
    <Stack gap={2} width="100%">
      <Typography variant="body1">Observable Items</Typography>
      <ItemListWrapper>
        {gameStore.existingItems.map((item) => (
          <ItemCard item={item} key={`itemCard-${item.key}`} onClick={() => gameStore.toggleSelectedItem(item.key)} />
        ))}
      </ItemListWrapper>
      <Stack direction="row" justifyContent="center" gap={2}>
        <StyledButton onClick={onClickCombine} disabled={isLoading || gameStore.selectedItems.size < 2}>
          Combine
        </StyledButton>
        <StyledButton onClick={onClickObserve} disabled={isLoading || gameStore.selectedItems.size !== 1}>
          Observe
        </StyledButton>
      </Stack>
    </Stack>
  )
})
