import React from 'react';
import PropTypes from 'prop-types';
import { CacheProvider } from '@emotion/react';
import { ThemeProvider, CssBaseline, createTheme, Grid } from '@mui/material';

import createEmotionCache from '../utility/createEmotionCache';
import darkTheme from '../styles/theme/darkTheme';
import '../styles/globals.css';

import '../components/Globals'
import lightTheme from '../styles/theme/lightTheme';
import Head from 'next/head';

import { GoogleAnalytics, usePageViews } from "nextjs-google-analytics";

const clientSideEmotionCache = createEmotionCache();

export const ColorModeContext = React.createContext({ toggleColorMode: () => { } });

const MyApp = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  const [mode, setMode] = React.useState('dark');
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
      currentMode: () => mode,
    }),
    [mode],
  );

  const theme = React.useMemo(
    () =>
      mode === 'dark' ? darkTheme : lightTheme,
    [mode],
  );

  usePageViews();

  return (
    <div>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />

      </Head>
      <GoogleAnalytics />
      <Grid container justifyContent={"center"}>
        <Grid item style={{ maxWidth: 1200 }}>
          <CacheProvider value={emotionCache}>
            <ColorModeContext.Provider value={colorMode}>
              <ThemeProvider theme={theme}>
                <CssBaseline />
                <Component {...pageProps} />
              </ThemeProvider>
            </ColorModeContext.Provider>
          </CacheProvider>
        </Grid>
      </Grid>
    </div>
  );
};

export default MyApp;

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};