import { Stack, Typography } from '@mui/material'

import { useBreakpoints } from 'hooks/useBreakpoints'

type Props = {
  penalty: number
  isSpoilSolution?: boolean
}

export const HintConfirmDescriptionComponent = ({ penalty, isSpoilSolution }: Props) => {
  const { downSm } = useBreakpoints()
  return (
    <Stack gap={downSm ? 0 : 1} alignItems="center">
      <Typography color="primary.dark" variant={downSm ? 'body2' : 'body1'}>
        Do you want to get the hint?
      </Typography>
      <Stack alignItems="center">
        <Stack direction="row" gap={1}>
          <Typography color="primary.dark" variant={downSm ? 'body2' : 'body1'}>
            Penalty:
          </Typography>
          <Typography color="error" fontWeight="bold" variant={downSm ? 'body2' : 'body1'}>
            {`${penalty} sec`}
          </Typography>
        </Stack>
        {isSpoilSolution ? (
          <Typography color="error" variant="caption">
            Solution will be shown.
          </Typography>
        ) : null}
      </Stack>
    </Stack>
  )
}
