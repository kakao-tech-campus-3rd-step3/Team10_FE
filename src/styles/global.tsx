import { css, Global } from '@emotion/react';

export const GlobalStyles = () => {
  return (
    <Global
      styles={css`
        *,
        *::before,
        *::after {
          box-sizing: border-box;
        }
        html,
        body,
        #root {
          height: 100%;
        }
        body {
          margin: 0;
          font-family: 'pretendard';
          background: #fff;
          color: #000000;
          overflow-x: hidden;
          overflow-y: auto;
          -webkit-overflow-scrolling: touch;
        }
        a {
          color: inherit;
          text-decoration: none;
        }
        button {
          font: inherit;
        }
      `}
    />
  );
};
