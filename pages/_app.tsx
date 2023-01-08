import createCache from '@emotion/cache'
import { CacheProvider, EmotionCache, ThemeProvider as EmotionThemeProvider } from '@emotion/react'
import { CssBaseline, ThemeProvider as MaterialThemeProvider, Stack, StyledEngineProvider, styled } from '@mui/material'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import dayjs from 'dayjs'
import advanced from 'dayjs/plugin/advancedFormat'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'
import { AppProps } from 'next/app'
import Head from 'next/head'
import { SnackbarProvider } from 'notistack'

import { GlobalDialog } from 'views/core/GlobalDialog'

import { theme } from 'themes/theme'

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(advanced)

interface CustomAppProps extends AppProps {
  emotionCache?: EmotionCache
}

const Root = styled(Stack)(() => ({
  flexGrow: 1,
  minHeight: '100vh',
  '@supports (-webkit-hyphens:none)': {
    minHeight: '-webkit-fill-available',
  },
}))

// * Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createCache({ key: 'css', prepend: true })

const CustomStackbarProvider = styled(SnackbarProvider)(({ theme }) => ({
  '&.SnackbarItem-variantInfo': {
    backgroundColor: theme.palette.primary.main,
  },
}))

const CustomApp = ({ Component, emotionCache = clientSideEmotionCache, pageProps }: CustomAppProps) => {
  return (
    <>
      <Head>
        <title>Escape - Dolls</title>
        <meta name="title" content="Escape - Dolls" />
        <meta name="description" content="help a man to escape from the locked room" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
      </Head>

      <StyledEngineProvider injectFirst>
        <CacheProvider value={emotionCache}>
          <MaterialThemeProvider theme={theme}>
            <EmotionThemeProvider theme={theme}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <CustomStackbarProvider hideIconVariant>
                  <CssBaseline />
                  <GlobalDialog />
                  <Root>
                    <Component {...pageProps} />
                  </Root>
                </CustomStackbarProvider>
              </LocalizationProvider>
            </EmotionThemeProvider>
          </MaterialThemeProvider>
        </CacheProvider>
      </StyledEngineProvider>
    </>
  )
}

export default CustomApp
