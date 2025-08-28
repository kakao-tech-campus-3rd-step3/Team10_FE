import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from '@emotion/react';
import HomePage from '@/Pages/HomePage';
import { theme } from '@/styles/theme';
import { GlobalStyles } from '@/styles/global';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <HomePage />
    </ThemeProvider>
  </StrictMode>,
);