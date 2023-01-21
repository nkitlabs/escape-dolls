import { Button, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import { observer } from 'mobx-react-lite'

import { useBreakpoints } from 'hooks/useBreakpoints'

import { dialogStore } from 'stores/dialogStore'
import { gameStore } from 'stores/gameStore'

import { Header, ModalWrapper } from './components'

type Item01ModalProps = {
  name: string
  img: string
  description: string
}

export const openItem01Modal = (params: string[]) => {
  dialogStore.open(() => <Item01Modal name={params[0]} img={params[1]} description={params[2]} />, {
    isHeaderHidden: true,
    borderRadius: 16,
  })
}

export const Item01Modal = observer(({ name, img, description }: Item01ModalProps) => {
  const { downSm } = useBreakpoints()
  const imgUrl = gameStore.imgIdToUrl[img]

  return (
    <ModalWrapper>
      <Stack alignItems="center">
        <Header>{`You observe`}</Header>
        <Header>{name}</Header>
      </Stack>
      <img src={imgUrl} height={downSm ? 120 : 240} />
      <Typography align="center" color="primary.darken" variant={downSm ? 'body2' : 'body1'}>
        {description}
      </Typography>
      <Button sx={{ height: 40, width: 160 }} onClick={() => dialogStore.close()}>
        Back
      </Button>
    </ModalWrapper>
  )
})
