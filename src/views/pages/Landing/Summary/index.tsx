import { Grid, Stack, Typography } from '@mui/material'

import { useBreakpoints } from 'hooks/useBreakpoints'

import { formatSeconds } from 'utils/utils'

import { NormalText, StyledButton, SummaryWrapper, TimerInfoWrapper } from './components'

type Props = {
  timeUsed: number
  totalPenalty: number
  onClickBackToLanding: () => void
}
export const Summary = ({ timeUsed, totalPenalty, onClickBackToLanding }: Props) => {
  const { downSm } = useBreakpoints()
  return (
    <SummaryWrapper>
      <Stack gap={2}>
        <Typography variant={downSm ? 'h5' : 'h2'} align="center">
          Congratulations
        </Typography>
        <NormalText align="center">You help him to escape from the room.</NormalText>
      </Stack>
      <TimerInfoWrapper>
        <Grid container rowSpacing={1} columnSpacing={1}>
          <Grid item xs={6}>
            <NormalText align="right">Time used:</NormalText>
          </Grid>
          <Grid item xs={6}>
            <NormalText>{`${formatSeconds(timeUsed)}`}</NormalText>
          </Grid>
          <Grid item xs={6}>
            <NormalText align="right">Penalty time:</NormalText>
          </Grid>
          <Grid item xs={6}>
            <NormalText>{`${totalPenalty ? formatSeconds(totalPenalty) : '-'}`}</NormalText>
          </Grid>
        </Grid>
        <StyledButton onClick={onClickBackToLanding}>Back</StyledButton>
      </TimerInfoWrapper>
    </SummaryWrapper>
  )
}
