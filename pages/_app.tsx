import * as React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ToastContainer } from 'react-toastify';

import { CacheProvider, EmotionCache } from '@emotion/react';
import ptbr from 'date-fns/locale/pt-BR';
import { NextComponentType, NextPageContext } from 'next';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';

import { createEmotionCache } from '../src/cache';
import { theme } from '../src/theme';

import 'react-toastify/dist/ReactToastify.css';
import { SessionProvider } from 'next-auth/react';

const clientSideEmotionCache = createEmotionCache();
interface TrashSaverAppProps extends AppProps {
  emotionCache?: EmotionCache;
  Component: NextComponentType<NextPageContext> & { auth: boolean };
}

export default function TJRNApp(props: TrashSaverAppProps) {
  const {
    Component,
    emotionCache = clientSideEmotionCache,
    pageProps: { session, ...pageProps },
  } = props;

  const router = useRouter();
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            cacheTime: 0,
            refetchOnWindowFocus: false,
            refetchInterval: 60 * 60 * 1000,
          },
        },
      })
  );

  return (
    <React.StrictMode>
      <SessionProvider session={session}>
        <CacheProvider value={emotionCache}>
          <Head>
            <title>Trash Saver</title>
            <meta name="viewport" content="initial-scale=1, width=device-width" />
          </Head>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <LocalizationProvider dateAdapter={AdapterDateFns} locale={ptbr}>
              <QueryClientProvider client={queryClient}>
                <Component {...pageProps} />
                <ToastContainer
                  position="top-right"
                  autoClose={8000}
                  hideProgressBar={false}
                  draggable={false}
                  closeOnClick
                  pauseOnHover
                />
              </QueryClientProvider>
            </LocalizationProvider>
          </ThemeProvider>
        </CacheProvider>
      </SessionProvider>
    </React.StrictMode>
  );
}
