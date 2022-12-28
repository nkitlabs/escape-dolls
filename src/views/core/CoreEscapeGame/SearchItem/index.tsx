import { Stack, Typography } from '@mui/material'
import { observer } from 'mobx-react-lite'
import { useSnackbar } from 'notistack'
import { useState } from 'react'

import { TIME_LIMIT } from 'types/constants'

import { dataLoaderService } from 'services/dataLoaderService'

import { gameStore } from 'stores/gameStore'
import { timerStore } from 'stores/timerStore'

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
    const result = await dataLoaderService.getStoryInfo(item)

    if (!result.success) {
      setIsLoading(false)
      timerStore.addTimer(10)
      enqueueSnackbar(
        `he doesn't see ${item} in this room. Penalty ${timerStore.timer > TIME_LIMIT ? '+' : '-'}10 second`,
        {
          variant: 'error',
          autoHideDuration: 3000,
          anchorOrigin: { vertical: 'top', horizontal: 'center' },
        },
      )
      return
    }

    gameStore.addNewStory(result.data)
    setIsLoading(false)
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
