import { Button, Stack, Typography } from '@mui/material'

import { TutorialTextWrapper } from './components'

type Props = {
  onClickBack: () => void
}
export const TutorialPanel = ({ onClickBack }: Props) => {
  return (
    <Stack gap={3} alignItems="center">
      <TutorialTextWrapper>
        <Typography>Objective of the game is to help the man find clues and escape from the room.</Typography>
        <Stack>
          <Typography>In order to get clues, you can either</Typography>
          <Typography>- type an object or a keyword in the textbox and click the search button </Typography>
          <Typography>- combine or observe the items via selecting items and click the button</Typography>
        </Stack>
        <Typography>
          A new dialog will be appeared if new action occurs. Read it carefully; it may help him exit the room faster.
        </Typography>
        <Typography>There is a penalty when you incorrectly search/combine items.</Typography>
        <Typography>
          You may ask for hints if you struggle with the situation in the game, but penalty will be applied as well.
        </Typography>
        <Typography>Note that penalty will be different depends on actions or hints you will receive.</Typography>
        <Typography fontWeight="bold">Enjoy.</Typography>
      </TutorialTextWrapper>
      <Button onClick={onClickBack} sx={{ width: 160 }}>
        Back
      </Button>
    </Stack>
  )
}
