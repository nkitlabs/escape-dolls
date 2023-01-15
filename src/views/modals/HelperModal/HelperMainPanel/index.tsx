import { Button, Stack } from '@mui/material'

type Props = {
  onClickTutorial: () => void
  onClickHint: () => void
}
export const HelperMainPanel = ({ onClickTutorial, onClickHint }: Props) => {
  return (
    <Stack pt={3} gap={2} pb={5}>
      <Button sx={{ width: 160 }} onClick={onClickTutorial}>
        How to play
      </Button>
      <Button sx={{ width: 160 }} onClick={onClickHint}>
        Hint
      </Button>
    </Stack>
  )
}
