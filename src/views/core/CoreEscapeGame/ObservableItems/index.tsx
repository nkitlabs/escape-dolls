import { Stack, Typography } from '@mui/material'
import { observer } from 'mobx-react-lite'

import { gameStore } from 'stores/gameStore'

import { ItemCard } from 'views/core/CoreEscapeGame/ItemCard'

import { ItemListWrapper, StyledButton } from './components'

export const ObservableItems = observer(() => {
  return (
    <Stack gap={2} width="100%">
      <Typography variant="body1">Observable Items</Typography>
      <ItemListWrapper>
        <Stack direction="row" gap={2}>
          {gameStore.items.map((item) => (
            <ItemCard item={item} />
          ))}
        </Stack>
      </ItemListWrapper>
      <Stack direction="row" justifyContent="center" gap={2}>
        <StyledButton>Combine</StyledButton>
        <StyledButton>Observe</StyledButton>
      </Stack>
    </Stack>
  )
})
