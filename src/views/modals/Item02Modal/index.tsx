import { Button, Grid, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import { observer } from 'mobx-react-lite'
import { useState } from 'react'

import { useCustomSnackbar } from 'hooks/useCustomSnackbar'

import { gameService } from 'services/gameService'

import { dialogStore } from 'stores/dialogStore'
import { gameStore } from 'stores/gameStore'

import { Header, ModalWrapper, PasswordMonitorWrapper, SafePadding } from './components'

type Item02ModalProps = {
  name: string
  description: string
  prefixKey: string
}

export const openItem02Modal = (params: string[]) => {
  dialogStore.open(() => <Item02Modal name={params[0]} description={params[1]} prefixKey={params[2]} />, {
    isHeaderHidden: true,
    borderRadius: 16,
  })
}

const PADS = '123456789*0#'

export const Item02Modal = observer(({ name, description, prefixKey }: Item02ModalProps) => {
  const { pushErrorSnackbar } = useCustomSnackbar()
  const [isLoading, setIsLoading] = useState(false)
  const [password, setPassword] = useState('')
  const onClickPad = (key: string) => {
    if (key === '*') return () => setPassword('')
    if (key === '#')
      return async () => {
        if (isLoading) return

        setIsLoading(true)
        const result = await gameService.solveItem(prefixKey, password)
        dialogStore.close()
        setIsLoading(false)
        if (!result.success) {
          pushErrorSnackbar({ error: result.error, penalty: result.penalty ?? 60 })
          return
        }
        if (result.data.triggerFunctionId) {
          const { id, params } = result.data.triggerFunctionId
          gameStore.functionIdMapping[id](params)
        }
      }
    return () => {
      if (password.length < 6) {
        setPassword((v) => v + key)
      }
    }
  }

  return (
    <ModalWrapper>
      <Stack alignItems="center">
        <Header>{`You observe: ${name}`}</Header>
      </Stack>
      <PasswordMonitorWrapper>
        <Typography variant="body2" color="primary.darken" fontFamily="Monospace" letterSpacing={10}>
          {password}
        </Typography>
      </PasswordMonitorWrapper>
      <Stack width={160} bgcolor="primary.darken" py={2.5} px={1.5} borderRadius={4}>
        <Grid container spacing={1} justifyContent="center" alignItems="center">
          {PADS.split('').map((v) => (
            <Grid item xs={12 / 3} p={0} key={`safe-pad-${v}`}>
              <SafePadding onClick={onClickPad(v)}>{v}</SafePadding>
            </Grid>
          ))}
        </Grid>
      </Stack>
      <Typography align="center" color="primary.darken" variant="body2">
        {description}
      </Typography>
      <Button sx={{ height: 40, width: 160 }} onClick={() => dialogStore.close()}>
        Back
      </Button>
    </ModalWrapper>
  )
})
