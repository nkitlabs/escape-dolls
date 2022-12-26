import { Button, Stack, Typography } from '@mui/material'
import Router from 'next/router'

export const NotFoundPage = () => {
  return (
    <Stack direction="column" justifyContent="center" alignItems="center" height="100vh" gap={5}>
      <Stack direction="column" alignItems="center" gap={1}>
        <Typography variant="h5" fontWeight={500} textAlign="center">
          Page not found
        </Typography>
        <Typography variant="body2" color="text.secondary" textAlign="center">
          Look like the page you are looking for does not exist
        </Typography>
      </Stack>
      <Button variant="contained" color="primary" size="large" onClick={() => Router.push('/')}>
        Back to home
      </Button>
    </Stack>
  )
}
