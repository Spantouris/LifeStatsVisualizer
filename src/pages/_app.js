import { CacheProvider } from '@emotion/react';
import { CssBaseline, createTheme } from '@mui/material';
import { createEmotionCache } from '../utils/create-emotion-cache';
import { ThemeProvider } from '@mui/styles';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import StatsService from 'src/services/statsService';

const clientSideEmotionCache = createEmotionCache();

const App = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <CacheProvider value={emotionCache}>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <ThemeProvider theme={theme}>
          <StatsService>
            <CssBaseline />
            {getLayout(<Component {...pageProps} />)}
          </StatsService>
        </ThemeProvider>
      </LocalizationProvider>
    </CacheProvider>
  );
};

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1600,
      xl: 1920,
    },
  },
});

export default App;
