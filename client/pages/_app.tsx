import '../styles/globals.css';
import { AppProps } from 'next/app';
import { MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import  Head  from 'next/head';
import { NextPage } from 'next';
import { ReactElement, ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { MeContextProvider } from '../context/me';

const queryClient = new QueryClient();

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {

  const getLayout = Component.getLayout || ((page) => page);

  return (
    <>
    <Head>
      <title>VidAge - Video Storage Website</title>
      <meta 
      name='viewport' 
      content='minimum-scale=1, initial-scale=1, width=device-width'
      />
    </Head>
    <MantineProvider
    withGlobalStyles
    withNormalizeCSS
    theme = {{
      colorScheme : "light",
    }}
    >
      <NotificationsProvider>
        <QueryClientProvider client={ queryClient }>
          <MeContextProvider>
          {getLayout(<main>
          <Component {...pageProps} />
          </main>)}
          </MeContextProvider>
      </QueryClientProvider>
      </NotificationsProvider>
    </MantineProvider>
    </>
  );
}

export default MyApp;
