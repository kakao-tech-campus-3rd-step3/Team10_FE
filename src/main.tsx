import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from '@emotion/react';
import { RouterProvider } from 'react-router-dom';
import { theme } from '@/styles/theme';
import { GlobalStyles } from '@/styles/global';
import { router } from '@/routes/router';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './Apis/queryClient';
import { CookiesProvider } from 'react-cookie';

/**
 * MSW 설정 (개발 환경에서만)
 *
 * @description 프로덕션 환경에서는 절대 MSW를 활성화하지 않음
 * @security MSW는 개발용 모킹 도구로, 프로덕션에서 사용 시 보안 위험
 */
if (process.env.NODE_ENV === 'development') {
  import('./mocks/browser').then(({ worker }) => {
    worker.start().then(() => {
      console.log('MSW가 활성화되었습니다. API 요청이 모킹됩니다.');
    });
  });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CookiesProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <GlobalStyles />
          <RouterProvider router={router} />
        </ThemeProvider>
      </QueryClientProvider>
    </CookiesProvider>
  </StrictMode>,
);
