import { Stack, Typography } from '@mui/material'
import { observer } from 'mobx-react-lite'
import { useState } from 'react'

import { DuplicateStoryError, SearchExistingItemError } from 'types/errors'

import { useCustomSnackbar } from 'hooks/useCustomSnackbar'

import { gameService } from 'services/gameService'

import { gameStore } from 'stores/gameStore'

import { openNewItemModal } from 'views/core/CoreEscapeGame/NewItemModal'

import { SearchButton, SearchTextField } from './components'

export const SearchItem = observer(() => {
  const [item, setItem] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { pushErrorSnackbar, pushMessageSnackbar } = useCustomSnackbar()

  const onClickSearch = async () => {
    if (!item) {
      return
    }
    setIsLoading(true)
    const result = await gameService.searchItem(item)

    if (!result.success) {
      if (result.error instanceof DuplicateStoryError) {
        const readableName = gameStore.storyRecord[result.error.key].name
        pushMessageSnackbar({ message: `He already searched ${readableName}`, messageType: 'info' })
      } else if (result.error instanceof SearchExistingItemError) {
        const readableName = result.error.itemName
        pushMessageSnackbar({ message: `He already has ${readableName}`, messageType: 'info' })
      } else {
        pushErrorSnackbar({ error: result.error, penalty: result.penalty })
      }
      setIsLoading(false)
      return
    }

    setIsLoading(false)

    if (result.data?.newItems?.length) {
      openNewItemModal({
        newItems: result.data.newItems,
      })
    }
  }

  return (
    <Stack gap={2}>
      <Typography variant="body1">Search</Typography>
      <Stack direction="row" gap={2}>
        <SearchTextField fullWidth onChange={(e) => setItem(e.target.value)} value={item}></SearchTextField>
        <SearchButton size="small" onClick={onClickSearch} disabled={isLoading || !item}>
          Search
        </SearchButton>
      </Stack>
    </Stack>
  )
})
