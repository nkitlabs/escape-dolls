import { Stack, Typography } from '@mui/material'
import { observer } from 'mobx-react-lite'
import { useSnackbar } from 'notistack'
import { useState } from 'react'

import { TIME_LIMIT } from 'types/constants'

import { gameService } from 'services/gameService'

import { timerStore } from 'stores/timerStore'

import { openNewItemModal } from 'views/core/CoreEscapeGame/NewItemModal'

import { SearchButton, SearchTextField } from './components'

export const SearchItem = observer(() => {
  const [item, setItem] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { enqueueSnackbar } = useSnackbar()
  const onClickSearch = async () => {
    if (!item) {
      return
    }
    setIsLoading(true)
    const result = await gameService.updateNewObject(`${item}-search`)

    if (!result.success) {
      setIsLoading(false)

      if (!result.isInteralError) {
        timerStore.addTimer(10)
      }
      const errMsg = result.isInteralError
        ? `something went wrong. Please contact an admin`
        : `he doesn't see ${item} in this room. Penalty ${timerStore.timer > TIME_LIMIT ? '+' : '-'}10 second`
      enqueueSnackbar(errMsg, {
        variant: 'error',
        autoHideDuration: 3000,
        anchorOrigin: { vertical: 'top', horizontal: 'center' },
      })
      return
    }

    setIsLoading(false)
    openNewItemModal({
      newItems: result.data,
    })
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
